import React, { useState, useEffect } from "react";
import { BookStore } from "../../store/book";

const WriteStory = ({ close }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    content: "",
  });

  const { title, author, content } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    BookStore.createBook(formData);
  };
  // useEffect(() => {
  //   BookStore
  // },[])

  return (
    <div className="absolute">
      <div className="absolute-content write-story">
        <button className="absolute-close" onClick={() => close(false)}>
          <i className="fa fa-times"></i>
        </button>
        <h1>Write a story</h1>
        <form>
          <div className="d-flex justify-content-between">
            <span>
              <label>title</label>
              <input name="title" value={title} onChange={onChange} />
            </span>
            <span>
              <label>author name</label>
              <input name="author" value={author} onChange={onChange} />
            </span>
          </div>

          <div className="d-flex justify-content-between">
            <span>
              <select
                onChange={(e) =>
                  setFormData({ ...formData, genre: e.target.value })
                }>
                {BookStore.state.genres.map((x, i) => (
                  <option key={i} value={x.genre}>
                    {x.genre}
                  </option>
                ))}
              </select>
            </span>
            <span>
              <label className="file ">
                <input type="file" className="d-none" />
                <p>amueso.padding</p>
                <button>Upload</button>
              </label>
            </span>
          </div>

          <label>story</label>
          <div className="story">
            <textarea name="content" value={content} onChange={onChange} />
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary btn-green m-1">
                Proof Read
              </button>
              <button
                onClick={(e) => onSubmit(e)}
                className="btn btn-primary btn-purple m-1">
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
