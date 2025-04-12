import React, { useState } from 'react';

const Test_ = () => {
  const [loginStatus, setLoginStatus] = useState(null);
  const [sessionData, setSessionData] = useState(null);

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        credentials: 'include', // this is crucial!
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'admin',
          password: 'admin',
        }),
      });

      const data = await res.json();
      setLoginStatus(data.message);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const fetchSessionData = async () => {
    try {
      const res = await fetch('http://localhost:5000/cam/getID', {
        method: 'POST',
        credentials: 'include', // include the cookie
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      setSessionData(data);
    } catch (error) {
      console.error('Fetching session failed', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Test Auth Session</h2>

      <button onClick={handleLogin}>Login</button>
      {loginStatus && <p><strong>Login status:</strong> {loginStatus}</p>}

      <button onClick={fetchSessionData} style={{ marginTop: '1rem' }}>
        Get Session Info
      </button>
      {sessionData && (
        <pre style={{ marginTop: '1rem', background: '#f0f0f0', padding: '1rem' }}>
          {JSON.stringify(sessionData, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default Test_;
