import React, { useState } from "react";
import { withRouter } from "react-router-dom";

const Login = ({ setAuth, authenticate, history, err }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (authenticate(formData, "login", history)) {
      // alert("logged in");
      console.log("yes");
    } else {
      //alert("user dont exist");
    }
  };
  return (
    <div className='absolute login'>
      <div className='absolute-content'>
        <button className='absolute-close' onClick={() => setAuth("")}>
          <i className='fa fa-times'></i>
        </button>
        <form className='d-flex flex-column' onSubmit={(e) => onSubmit(e)}>
          <h2 className='fw-bold my-3'>Welcome back!</h2>
          <label className='fw-bold my-2'>Email</label>
          <input
            placeholder='Enter your email address'
            name='email'
            required
            value={email}
            onChange={(e) => onChange(e)}
          />
          <span className='d-flex justify-content-between'>
            <label className='fw-bold my-2'>Password</label>
            <button className='fw-bold'>Forgot password?</button>
          </span>

          <input
            placeholder='Enter your password'
            name='password'
            value={password}
            required
            onChange={(e) => onChange(e)}
            type='password'
          />
          {err.login && (
            <h6 className='text-danger mt-2'>{err.login.message}</h6>
          )}
          <button className='btn btn-warning my-3' type='submit'>
            Login
          </button>
          <span className='d-flex'>
            <hr />
            <label className='mx-3'>or</label>
            <hr />
          </span>
          <button
            className='btn btn-outline-primary my-3'
            type='button'
            onClick={(e) => {
              e.preventDefault();
              authenticate({}, "google", history);
            }}
          >
            Continue with Google
          </button>
          <hr />
          <button className='fw-bold' type='button'>
            Not you? Login from a different account
          </button>
          <button
            className='fw-bold'
            onClick={() => setAuth("signup")}
            type='button'
          >
            Don't have an account? Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
