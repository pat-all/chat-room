import React, { useState } from "react";

const MessagesControlCard = ({
  changeTextmHandler,
  text,
  sendHandler,
  isFetching,
  getListHandler,
  getSingleHandler,
}) => {
  const [listNum, setListNum] = useState("");
  const [singleId, setSingleId] = useState("");

  const changeListNumHandler = event => {
    setListNum(event.target.value);
  };

  const changeSingleIdHandler = event => {
    setSingleId(event.target.value);
  };

  const listNumClickHandler = () => {
    getListHandler(listNum);
    setListNum("");
  };

  const singleIdClickHandler = () => {
    getSingleHandler(singleId);
    setSingleId("");
  };

  return (
    <div className='card blue-grey darken-1'>
      <div className='card-content white-text'>
        <span className='card-title'>Create message</span>
        <textarea
          placeholder='max 99 chars'
          onChange={changeTextmHandler}
          value={text.text}
        ></textarea>
      </div>
      <div className='card-action'>
        <button
          className='btn waves-effect waves-light'
          onClick={sendHandler}
          disabled={isFetching}
        >
          Create
        </button>
      </div>
      <div className='card-action'>
        <div className='row'>
          <div className='col s12'>
            GET: /api/messages/list/:
            <div className='input-field inline'>
              <input
                id='listNum'
                type='text'
                value={listNum}
                onChange={changeListNumHandler}
              />
              <label htmlFor='listNum'>num</label>
            </div>
            <button
              style={{ marginLeft: 10 }}
              className='btn waves-effect waves-light'
              disabled={isFetching}
              onClick={listNumClickHandler}
            >
              Get
            </button>
          </div>
        </div>
        <div className='row'>
          <div className='col s12'>
            GET: /api/messages/single/:
            <div className='input-field inline'>
              <input
                id='singleMess'
                type='text'
                value={singleId}
                onChange={changeSingleIdHandler}
              />
              <label htmlFor='singleMess'>id</label>
            </div>
            <button
              style={{ marginLeft: 10 }}
              className='btn waves-effect waves-light'
              onClick={singleIdClickHandler}
              disabled={isFetching}
            >
              Get
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesControlCard;
