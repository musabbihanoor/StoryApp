import React from "react";

const CreateGroup = ({ close }) => {
  return (
    <div className='absolute'>
      <div className='absolute-content write-story '>
        <button className='absolute-close' onClick={() => close(false)}>
          <i className='fa fa-times'></i>
        </button>
        <h1>create a group</h1>
        <form className='d-flex flex-column'>
          <div className='d-flex justify-content-between'>
            <span>
              <label>group topic</label>
              <input />
            </span>
            <span>
              <label>choose privacy</label>
              <select style={{ margin: 0, height: 45 }}>
                <option>Public</option>
                <option>Private</option>
              </select>
            </span>
          </div>
          <label>about group</label>
          <textarea style={{ background: "#eee", height: 300 }} />
          <button className='btn btn-primary btn-purple align-self-center mt-3'>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
