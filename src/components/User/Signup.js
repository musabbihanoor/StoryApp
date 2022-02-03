import React from "react";

const Signup = ({ setAuth }) => {
  return (
    <div className='absolute login'>
      <div className='absolute-content'>
        <button className='absolute-close' onClick={() => setAuth("")}>
          <i className='fa fa-times'></i>
        </button>
        <form className='d-flex flex-column'>
          <h2 className='fw-bold my-3'>Welcome to Amueso</h2>
          <label className='fw-bold my-2'>Your Name</label>
          <input placeholder='Enter your full name' />
          <label className='fw-bold my-2'>Email</label>
          <input placeholder='Enter your email address' />
          <span className='d-flex justify-content-between'>
            <label className='fw-bold my-2'>Password</label>
            <button className='fw-bold'>Forgot password?</button>
          </span>
          <input placeholder='Enter your password' />

          <button className='btn btn-secondary my-3'>Continue</button>
          <span className='d-flex'>
            <hr />
            <label className='mx-3'>or</label>
            <hr />
          </span>
          <button className='btn btn-outline-secondary my-3'>
            Continue with Google
          </button>
          <button className='btn btn-outline-secondary my-3'>
            Continue with Facebook
          </button>
          <p className='text-center'>
            By continuing, you agree to Amuesos Terms of Services and
            acknowledge you've read our Privacy Policy
          </p>
          <button className='fw-bold' onClick={() => setAuth("login")}>
            Don't have an account? Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
