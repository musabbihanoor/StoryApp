import React from "react";

const WriteStory = ({ close, role }) => {
  return (
    <div className='absolute'>
      <div className='absolute-content write-story'>
        <button className='absolute-close' onClick={() => close(false)}>
          <i className='fa fa-times'></i>
        </button>
        <h1>Write a {role}</h1>
        <form>
          <div className='d-flex justify-content-between'>
            <span>
              <label>title</label>
              <input />
            </span>
            <span>
              <label>author name</label>
              <input />
            </span>
          </div>

          <div>
            <label className='file '>
              <input type='file' className='d-none' />
              <p>amueso.padding</p>
              <button>Upload</button>
            </label>
          </div>

          <label>story</label>
          <div className='story'>
            <textarea />
            <div className='d-flex justify-content-center'>
              <button className='btn btn-primary btn-purple m-1'>
                Proof Read
              </button>
              <button className='btn btn-primary btn-purple m-1'>
                Published
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteStory;
