import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { AuthStore } from "../../store/auth";

const Signup = ({ setAuth }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: null,
    description: "",
    imgsrc: " ",
  });

  const { name, email, password, dob, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthStore.register(formData);
  };

  return (
    <div className="absolute login">
      <div className="absolute-content">
        <button className="absolute-close" onClick={() => setAuth("")}>
          <i className="fa fa-times"></i>
        </button>
        <form className="d-flex flex-column" onSubmit={(e) => onSubmit(e)}>
          <h2 className="fw-bold my-3">Welcome to Amueso</h2>
          <label className="fw-bold my-2">Your Name</label>
          <input
            placeholder="Enter your full name"
            name="name"
            value={name}
            required
            onChange={(e) => onChange(e)}
          />

          <label className="fw-bold my-2">Date of birth</label>
          <input
            type="date"
            name="dob"
            value={dob}
            required
            onChange={(e) => onChange(e)}
          />
          <label className="fw-bold my-2">Description</label>
          <input
            placeholder="Add description"
            name="description"
            value={description}
            required
            onChange={(e) => onChange(e)}
          />
          <label className="fw-bold my-2">Email</label>
          <input
            placeholder="Enter your email address"
            name="email"
            value={email}
            required
            onChange={(e) => onChange(e)}
          />
          <span className="d-flex justify-content-between">
            <label className="fw-bold my-2">Password</label>
            <button className="fw-bold">Forgot password?</button>
          </span>
          <input
            placeholder="Enter your password"
            name="password"
            type="password"
            value={password}
            required
            minLength="8"
            onChange={(e) => onChange(e)}
          />

          {AuthStore.auth.err.signup && (
            <h6 className="text-danger mt-2">
              {AuthStore.auth.err.signup.message}
            </h6>
          )}

          <button className="btn btn-warning my-3" type="submit">
            Continue
          </button>
          <span className="d-flex">
            <hr />
            <label className="mx-3">or</label>
            <hr />
          </span>
          <p className="text-center">
            By continuing, you agree to Amuesos Terms of Services and
            acknowledge you've read our Privacy Policy
          </p>
          <button className="fw-bold" onClick={() => setAuth("login")}>
            Already have an account? Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Signup);
