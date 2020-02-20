import React from "react";

const LoginCard = ({
  form,
  changeFormHandler,
  submitHandler,
  isRegChecked,
  isRegCheckedHandler,
  isFetching,
}) => {
  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <div className='card blue-grey darken-1'>
          <div className='card-content white-text'>
            <span className='card-title'>Authorization</span>
            <div>
              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    id='email'
                    type='email'
                    className='validate'
                    name='email'
                    onChange={changeFormHandler}
                    value={form.email}
                  />
                  <label htmlFor='email'>Email</label>
                </div>
              </div>
              {isRegChecked && (
                <div className='row'>
                  <div className='input-field col s12'>
                    <input
                      id='username'
                      type='text'
                      className='validate'
                      name='username'
                      onChange={changeFormHandler}
                      value={form.username}
                    />
                    <label htmlFor='username'>User name</label>
                  </div>
                </div>
              )}
              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    id='password'
                    type='password'
                    className='validate'
                    name='password'
                    onChange={changeFormHandler}
                    value={form.password}
                  />
                  <label htmlFor='password'>Password</label>
                </div>
              </div>
              {isRegChecked && (
                <div className='row'>
                  <div className='input-field col s12'>
                    <input
                      id='confirmpassword'
                      type='password'
                      className='validate'
                      name='confirmpassword'
                      onChange={changeFormHandler}
                      value={form.confirmpassword}
                    />
                    <label htmlFor='confirmpassword'>Confirm password</label>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='card-action'>
            <button
              className='btn waves-effect waves-light'
              type='submit'
              name='registration'
              onClick={submitHandler}
            >
              Submit
            </button>
            <label style={{ marginLeft: 20 }}>
              <input
                type='checkbox'
                className='filled-in'
                defaultChecked={isRegChecked}
                onClick={isRegCheckedHandler}
                disabled={isFetching}
              />
              <span>Registration</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
