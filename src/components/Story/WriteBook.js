import React, { useState } from "react";

const WriteBook = ({ close }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    file: "",
    story: "",
  });

  const { title, author, genre, file, story } = formData;

  return (
    <div className='absolute'>
      <div className='absolute-content write-story'>
        <button className='absolute-close' onClick={() => close(false)}>
          <i className='fa fa-times'></i>
        </button>
        <h1>Write a book</h1>
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

          <div className='d-flex justify-content-between'>
            <span>
              <select>
                <option>Choose a genre</option>
                <option>genre</option>
                <option>genre</option>
              </select>
            </span>
            <span>
              <label className='file '>
                <input type='file' className='d-none' />
                <p>amueso.padding</p>
                <button>Upload</button>
              </label>
            </span>
          </div>

          <label>story</label>
          <div className='story'>
            <button className='add-chapter'>
              <i className='far fa-plus'></i> Add
            </button>
            <textarea />
            <div className='d-flex justify-content-center'>
              <button className='btn btn-primary btn-green m-1'>
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

export default WriteBook;
