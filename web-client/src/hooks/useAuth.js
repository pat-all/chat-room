import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = useCallback((jwt, useR) => {
    setToken(jwt);
    setUser(useR);

    localStorage.setItem(
      storageName,
      JSON.stringify({ token: jwt, user: useR })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem(storageName));
    if (storageData && storageData.token) {
      login(storageData.token, storageData.user);
    }
  }, [login]);

  return { token, user, login, logout };
};

export default useAuth;
