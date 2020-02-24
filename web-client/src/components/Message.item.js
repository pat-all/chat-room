import React, { useState } from "react";

const spanStyle = {
  marginRight: 10,
  color: "#1b5e20",
};

const dataContainer = { display: "flex", flexDirection: "row" };

const MessageItem = ({
  message,
  deleteMessageHandler,
  updateMessageHandler,
}) => {
  const [textEdit, setTextEdit] = useState(message.text);
  const [isUpdating, setUpdating] = useState(false);

  const changeTextEditHandler = event => {
    setTextEdit(event.target.value);
  };
  const setUpdatingHandler = () => {
    setUpdating(!isUpdating);
  };

  const confirmUpdatingHandler = () => {
    updateMessageHandler(message._id, textEdit);
    setUpdating(false);
  };

  const cancelUpdateHandler = () => {
    setTextEdit(message.text);
    setUpdating(false);
  };
  return (
    <li className='collection-item' key={message._id}>
      <div style={dataContainer}>
        <div className='col m8 s8'>
          {!isUpdating ? (
            <>
              <div>
                <span style={spanStyle}>id:</span>
                {message._id}
              </div>
              <div>
                <span style={spanStyle}>author:</span>
                {message.author}
              </div>
              <div>
                <span style={spanStyle}>text:</span>
                {message.text}
              </div>
              <div>
                <span style={spanStyle}>created:</span>
                {message.created}
              </div>
              <div>
                <span style={spanStyle}>updated:</span>
                {message.updated}
              </div>
            </>
          ) : (
            <div>
              <textarea
                value={textEdit}
                onChange={changeTextEditHandler}
                style={{
                  width: "100%",
                  height: 100,
                }}
              ></textarea>
            </div>
          )}
        </div>
        <div className='col m4 s4'>
          <div className='row'>
            {!isUpdating ? (
              <button
                style={{ marginLeft: 10 }}
                className='btn waves-effect waves-light red accent-4'
                onClick={() => deleteMessageHandler(message._id)}
              >
                Delete
              </button>
            ) : (
              <button
                style={{ marginLeft: 10 }}
                className='btn waves-effect waves-light green darken-3'
                onClick={confirmUpdatingHandler}
                disabled={message.text === textEdit}
              >
                Confirm
              </button>
            )}
          </div>
          <div className='row'>
            {!isUpdating ? (
              <button
                style={{ marginLeft: 10 }}
                onClick={setUpdatingHandler}
                className='btn waves-effect waves-light light-blue darken-4'
              >
                Update
              </button>
            ) : (
              <button
                style={{ marginLeft: 10 }}
                onClick={cancelUpdateHandler}
                className='btn waves-effect waves-light orange darken-3'
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default MessageItem;
