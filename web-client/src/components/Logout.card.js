import React from "react";
import { Link } from "react-router-dom";

const LogoutCard = ({ logoutHandler, user }) => {
  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <div className='card blue-grey darken-1'>
          <div className='card-content white-text'>
            <span className='card-title'>User</span>
            <p>username: {user && user.username}</p>
            <p>email: {user && user.email}</p>
            <br />
            <p>Your messages ids:</p>
            {user &&
              user.messages.map((id, i) => (
                <div key={id}>
                  <Link to={`/messages`}>{id}</Link>
                </div>
              ))}
          </div>
          <div className='card-action'>
            <button
              className='btn waves-effect waves-light'
              onClick={logoutHandler}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutCard;
