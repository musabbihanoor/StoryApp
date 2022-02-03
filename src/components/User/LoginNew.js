import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const LoginNew = ({ authenticate, history }) => {
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
    if (authenticate(formData, "login")) {
      // alert("logged in");
      console.log("yes");
    } else {
      //alert("user dont exist");
    }
  };
  return (
    <form className='p-5' onSubmit={(e) => onSubmit(e)}>
      <h1>Login</h1>
      <div className='mb-3'>
        <label for='exampleInputEmail1' className='form-label'>
          Email address
        </label>
        <input
          type='email'
          className='form-control'
          id='exampleInputEmail1'
          aria-describedby='emailHelp'
          name='email'
          required
          value={email}
          onChange={(e) => onChange(e)}
        />
      </div>
      <div className='mb-3'>
        <label for='exampleInputPassword1' className='form-label'>
          Password
        </label>
        <input
          type='password'
          className='form-control'
          id='exampleInputPassword1'
          name='password'
          value={password}
          required
          onChange={(e) => onChange(e)}
        />
      </div>
      <div className='mb-3'>
        <a href='/user/signup'>Not a user? Register</a>
      </div>
      <button type='submit' className='btn btn-primary'>
        Submit
      </button>
    </form>
  );
};

export default LoginNew;
