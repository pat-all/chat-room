import React from "react";
import MessageItem from "./Message.item";

const MessagesList = ({
  messages,
  deleteMessageHandler,
  updateMessageHandler,
}) => {
  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h5>
          Messages{messages && messages.length > 0 && `: ${messages.length}`}
        </h5>
      </li>
      {messages && messages.length > 0 ? (
        messages.map(m => (
          <MessageItem
            message={m}
            deleteMessageHandler={deleteMessageHandler}
            updateMessageHandler={updateMessageHandler}
          />
        ))
      ) : (
        <li className='collection-item'>List is empty</li>
      )}
    </ul>
  );
};

export default MessagesList;
