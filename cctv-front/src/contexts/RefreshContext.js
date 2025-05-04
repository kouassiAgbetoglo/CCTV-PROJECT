import React, { createContext, useContext, useState, useCallback } from 'react';

const RefreshContext = createContext();

export const useRefresh = () => useContext(RefreshContext);

export const RefreshProvider = ({ children }) => {
  const [refreshIndex, setRefreshIndex] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshIndex((prev) => prev + 1); // change la valeur pour forcer les useEffect à re-s'exécuter
  }, []);

  return (
    <RefreshContext.Provider value={{ refreshIndex, triggerRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};
