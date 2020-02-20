import React, { useState, useEffect, useContext } from "react";

import useFetch from "../hooks/useFetch";
import useToast from "../hooks/useToast";

import AuthContext from "../context/auth.context";

import LoginCard from "../components/Login.card";
import LogoutCard from "../components/Logout.card";

const AuthPage = () => {
  const { isAuth, logout, login, user } = useContext(AuthContext);
  const [message, setMessage] = useState(null);
  const toast = useToast();
  const { isFetching, request, error, clearError } = useFetch();
  const [isRegChecked, setRegChecked] = useState(false);
  const isRegCheckedHandler = () => {
    setRegChecked(!isRegChecked);
  };

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    username: "",
  });

  useEffect(() => {
    toast(error);
    clearError();
  }, [error, toast, clearError]);

  useEffect(() => {
    toast(message);
    setMessage(null);
  }, [toast, message, setMessage]);

  const changeFormHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = async () => {
    try {
      const res = await request(
        `/api/auth/${isRegChecked ? "register" : "login"}`,
        "POST",
        form
      );
      login(res.data.token, res.data.user);
      setMessage(res.message);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      {isAuth ? (
        <LogoutCard logoutHandler={logout} user={user} />
      ) : (
        <LoginCard
          form={form}
          isFetching={isFetching}
          changeFormHandler={changeFormHandler}
          isRegCheckedHandler={isRegCheckedHandler}
          submitHandler={submitHandler}
        />
      )}
    </>
  );
};

export default AuthPage;
