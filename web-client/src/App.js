import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "materialize-css";

//pages
import AuthPage from "./pages/auth.page";
import DocPage from "./pages/doc.page";
import MessagesPage from "./pages/messages.page";

//components
import Navbar from "./components/Navbar";

//hooks
import useAuth from "./hooks/useAuth";

//contexts
import AuthContext from "./context/auth.context";

function App() {
  const { token, user, login, logout } = useAuth();
  const isAuth = !!token;
  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuth }}>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/authorization'>
            <AuthPage />
          </Route>
          <Route path='/messages'>
            <MessagesPage />
          </Route>
          <Route path='/' exact>
            <DocPage />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
