import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/auth/secured-auth', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.status === 200) {
          setLoading(false);
        } else {
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Session check failed:', error);
        navigate('/', { replace: true });
      }
    };

    checkSession();
  }, [navigate]);

  if (loading) return null; // ou <Loading />
  return children;
};

export default ProtectedRoute;
