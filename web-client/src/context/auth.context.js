import { createContext } from "react";

const AuthContext = createContext({
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
  isAuth: false,
});

export default AuthContext;
