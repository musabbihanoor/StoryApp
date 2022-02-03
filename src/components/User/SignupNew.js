import React, { useState } from "react";

const SignupNew = ({ authenticate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    authenticate(formData, "signup");
  };

  return (
    <form className='p-5' onSubmit={(e) => onSubmit(e)}>
      <h1>Sign up</h1>
      <div class='mb-3'>
        <label for='exampleInputEmail1' class='form-label'>
          Username
        </label>
        <input
          type='text'
          class='form-control'
          id='exampleInputEmail1'
          aria-describedby='emailHelp'
          name='name'
          value={name}
          required
          onChange={(e) => onChange(e)}
        />
      </div>
      <div class='mb-3'>
        <label for='exampleInputEmail1' class='form-label'>
          Email address
        </label>
        <input
          type='email'
          class='form-control'
          id='exampleInputEmail1'
          aria-describedby='emailHelp'
          name='email'
          value={email}
          required
          onChange={(e) => onChange(e)}
        />
      </div>
      <div class='mb-3'>
        <label for='exampleInputPassword1' class='form-label'>
          Password
        </label>
        <input
          type='password'
          class='form-control'
          id='exampleInputPassword1'
          name='password'
          value={password}
          required
          minLength='8'
          onChange={(e) => onChange(e)}
        />
      </div>
      <div class='mb-3'>
        <a href='/user/login'>Already a user? Login</a>
      </div>
      <button type='submit' class='btn btn-primary'>
        Submit
      </button>
    </form>
  );
};

export default SignupNew;
