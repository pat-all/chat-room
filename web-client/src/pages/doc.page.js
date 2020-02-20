import React from "react";

const DocumentationPage = () => {
  const redColor = { color: "#b71c1c" };
  return (
    <div className='container'>
      <h3>Documentation</h3>
      <a>Project on github</a>
      <p>This is chat room restful api demonstration web-app</p>
      <h5>Auth API</h5>
      <p>
        <blockquote>POST: /api/auth/register</blockquote>
        creates new user in databse, required parameters:
        <ul>
          <li>
            <b>username</b> - name of a user
          </li>
          <li>
            <b>email</b> - user email
          </li>
          <li>
            <b>password</b> - user password
          </li>
          <li>
            <b>confirmpassword</b> - confirm user password
          </li>
        </ul>
      </p>
      <p>
        <blockquote>POST: /api/auth/login</blockquote>
        authancicates user, and returns him a <i>token</i>,{" "}
        <span style={redColor}>whitch is not used in this web-app</span>,
        required parameters:
        <ul>
          <li>
            <b>username</b> - name of a user
          </li>
          <li>
            <b>email</b> - user email
          </li>
          <li>
            <b>password</b> - user password
          </li>
          <li>
            <b>confirmpassword</b> - confirm user password
          </li>
        </ul>
      </p>

      <h5>Messages API:</h5>
      <p>
        <blockquote>GET: /api/messages/list/:num</blockquote>
        get 10 messages from database, <b>:num</b> is a number of page starting
        from 0
      </p>
      <p>
        <blockquote>GET: /api/messages/single/:id</blockquote>
        get single message from database, <b>:id</b> is a <i>ObjectId</i> of
        message in a database
      </p>
      <p>
        <blockquote>POST: /api/messages/single</blockquote>
        create new message in a database, required parameters:
        <ul>
          <li>
            <b>author</b> - <i>user name</i>, if authenticated, or{" "}
            <i>unauthenticated</i>
          </li>
          <li>
            <b>email</b> - <i>user email</i>, if authenticated, or <i>null</i>{" "}
            if unauthenticated
          </li>
          <li>
            <b>text</b> - entire text from 1 to 99 chars (min 1 non <i>space</i>{" "}
            char)
          </li>
          <li>
            <b>created</b> - <i>Date</i> of message creation (
            <i>automatically</i>)
          </li>
          <li>
            <b>updated</b> - <i>Date</i> of message creation (
            <i>automatically</i>)
          </li>
        </ul>
      </p>

      <p>
        <blockquote>
          PUT: /api/messages/single -{" "}
          <span style={redColor}>is not implemented in this web-app(!)</span>
        </blockquote>
        updates existing message, required parameters:
        <ul>
          <li>
            <b>id</b> - is a <i>ObjectId</i> of message
          </li>
          <li>
            <b>text</b> - entire text from 1 to 99 chars (min 1 non <i>space</i>{" "}
            char)
          </li>
          <li>
            <b>updated</b> - <i>Date</i> of message updating (
            <i>automatically</i>)
          </li>
        </ul>
      </p>
      <p>
        <blockquote>DELETE: /api/messages/single</blockquote>
        removes existing message from database, required parameters:
        <ul>
          <li>
            <b>id</b> - is a <i>ObjectId</i> of message
          </li>
        </ul>
      </p>
    </div>
  );
};

export default DocumentationPage;
