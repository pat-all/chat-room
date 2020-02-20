import { useCallback, useState, useEffect } from "react";

const useMessages = () => {
  storageMessages = "messagesStore";
  const [messages, setMessages] = useState([]);
  localStorage.setItem(storageMessages, JSON.stringify(messages));

  const addMessage = useCallback(
    message => {
      setMessages([...messages, message]);
      localStorage.setItem(storageMessages, JSON.stringify(messages));
    },
    [messages, message, setMessages]
  );

  useEffect(
    useCallback(() => {
      const localMessages = JSON.parse(localStorage.get(storageMessages));
      if (messages.length === 0) {
        setMessages(localMessages);
      }
    }, [messages, setMessages])
  );
  return { messages, addMessage };
};

export default useMessages;
