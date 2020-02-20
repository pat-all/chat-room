import React from "react";

const spanStyle = {
  marginRight: 10,
  color: "#1b5e20",
};

const dataContainer = { display: "flex", flexDirection: "row" };

const MessagesList = ({ messages, deleteMessageHandler }) => {
  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h5>
          Messages{messages && messages.length > 0 && `: ${messages.length}`}
        </h5>
      </li>
      {messages && messages.length > 0 ? (
        messages.map(m => (
          <li className='collection-item' key={m._id}>
            <div style={dataContainer}>
              <div className='col m8 s8'>
                <div>
                  <span style={spanStyle}>id:</span>
                  {m._id}
                </div>
                <div>
                  <span style={spanStyle}>author:</span>
                  {m.author}
                </div>
                <div>
                  <span style={spanStyle}>text:</span>
                  {m.text}
                </div>
                <div>
                  <span style={spanStyle}>created:</span>
                  {m.created}
                </div>
                <div>
                  <span style={spanStyle}>updated:</span>
                  {m.updated}
                </div>
              </div>
              <div className='col m4 s4'>
                <div className='row'>
                  <button
                    style={{ marginLeft: 10 }}
                    className='btn waves-effect waves-light red accent-4'
                    onClick={() => deleteMessageHandler(m._id)}
                  >
                    Delete
                  </button>
                </div>
                <div className='row'>
                  <button
                    style={{ marginLeft: 10 }}
                    className='btn waves-effect waves-light light-blue darken-4'
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))
      ) : (
        <li className='collection-item'>List is empty</li>
      )}
    </ul>
  );
};

export default MessagesList;
