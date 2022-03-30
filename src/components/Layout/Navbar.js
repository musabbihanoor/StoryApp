import React from "react";

const Navbar = ({ auth: { isAuthenticated }, setAuth, auth, history }) => {
  return (
    <div className='navbar d-flex align-items-center'>
      <img src={process.env.PUBLIC_URL + "/images/amueso-v2.png"} />
      {isAuthenticated && (
        <form className='form-inline d-flex'>
          <div className='form-group mx-sm-3 mb-2'>
            <input placeholder='Search' />
          </div>
          <button type='submit' className='btn btn-primary mb-2'>
            Search
          </button>
        </form>
      )}
      <div className='d-flex align-items-center'>
        {!isAuthenticated && (
          <>
            <a href='/' className='mx-3'>
              About us
            </a>
            <a href='/' className='mx-3'>
              Help
            </a>{" "}
          </>
        )}
        <button className='user'>
          <i className='fa fa-user-circle-o'></i>
        </button>
        {isAuthenticated && (
          <button
            onClick={() => {
              setAuth({
                ...auth,
                isAuthenticated: false,
                user: null,
                err: { ...auth.err, signup: null, login: null },
              });
              // history.push("/");
            }}
            className='btn btn-warning mx-3'
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
