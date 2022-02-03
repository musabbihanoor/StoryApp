import React from "react";

const Navbar = () => {
  return (
    <div className='navbar d-flex align-items-center'>
      <img src={process.env.PUBLIC_URL + "/images/amueso-v2.png"} />
      <div className='d-flex align-items-center'>
        <a href='/' className='mx-3'>
          About us
        </a>
        <a href='/' className='mx-3'>
          Help
        </a>
        <button>
          <i className='fa fa-user-circle-o'></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
