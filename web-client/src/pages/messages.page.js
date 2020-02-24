import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import useToast from "../hooks/useToast";

import AuthContext from "../context/auth.context";
import MessagesList from "../components/Messages.list";
import MessagesControlCard from "../components/Messages.controlcard";

const MesssagesPage = () => {
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const { isFetching, request, error, clearError } = useFetch();
  const [resMessage, setResMessage] = useState(null);
  const [messages, setMessages] = useState([]);

  const [text, setText] = useState({ text: "" });

  useEffect(() => {
    toast(error);
    clearError();
  }, [error, toast, clearError]);

  useEffect(() => {
    toast(resMessage);
    setResMessage(null);
  }, [toast, resMessage, setResMessage]);

  const changeTextmHandler = event => {
    setText(event.target.value);
  };

  const sendHandler = async () => {
    try {
      const res = await request("/api/messages/single", "POST", {
        text,
        email: user ? user.email : "",
      });
      setResMessage(res.message);
      setMessages([...messages, res.data]);
      setText({ text: "" });
    } catch (e) {
      console.log(e.message);
    }
  };

  const getListHandler = async listNum => {
    console.log("get list");
    try {
      const res = await request(`/api/messages/list/${listNum}`, "GET");
      setResMessage(res.message);
      setMessages([...res.data]);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getSingleHandler = async singleId => {
    try {
      const res = await request(`/api/messages/single/${singleId}`, "GET");
      setResMessage(res.message);
      setMessages([res.data]);
    } catch (e) {
      console.log(e.message);
    }
  };

  const deleteMessageHandler = async id => {
    try {
      const res = await request("/api/messages/single", "DELETE", {
        id,
      });
      setResMessage(res.message);
      setMessages([...messages.filter(m => m._id !== id)]);
    } catch (e) {
      console.log(e.message);
    }
  };

  const updateMessageHandler = async (id, text) => {
    try {
      const res = await request("/api/messages/single", "PUT", { id, text });
      const newMessage = res.data && res.data;
      const index = messages.findIndex(message => message._id === id);
      messages[index] = newMessage;
      setMessages([...messages]);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className='row'>
      <div className='col s6 m6'>
        <MessagesList
          messages={messages}
          deleteMessageHandler={deleteMessageHandler}
          updateMessageHandler={updateMessageHandler}
        />
      </div>
      <div className='col s6 m6'>
        <MessagesControlCard
          changeTextmHandler={changeTextmHandler}
          text={text}
          sendHandler={sendHandler}
          isFetching={isFetching}
          getListHandler={getListHandler}
          getSingleHandler={getSingleHandler}
        />
      </div>
    </div>
  );
};

export default MesssagesPage;
