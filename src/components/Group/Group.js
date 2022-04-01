import React from "react";

const Group = () => {
  return (
    <div className='group'>
      <div className='cover'>
        <button>Upload Image</button>
      </div>
      <div className='info'>
        <div>
          <h1>amueso</h1>
          <button>Join</button>
        </div>
        <span>
          <p>Public Group</p>
          <p>10 Member</p>
        </span>
        <div className='nav'>
          <button>About</button>
          <button>Discussion</button>
          <button>Members</button>
        </div>
      </div>
    </div>
  );
};

export default Group;
