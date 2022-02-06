import React from "react";

const Navbar = ({ auth: { isAuthenticated } }) => {
  return (
    <div className='navbar d-flex align-items-center'>
      <img src={process.env.PUBLIC_URL + "/images/amueso-v2.png"} />
      {isAuthenticated && (
        <form class='form-inline d-flex'>
          <div class='form-group mx-sm-3 mb-2'>
            <input placeholder='Search' />
          </div>
          <button type='submit' class='btn btn-primary mb-2'>
            Search
          </button>
        </form>
      )}
      <div className='d-flex notAuth align-items-center'>
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
        <button>
          <i className='fa fa-user-circle-o'></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
