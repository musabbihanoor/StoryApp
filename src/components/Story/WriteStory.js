import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookStore } from "../../store/book";

const WriteStory = ({ close }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    content: "",
    imgsrc: "",
    type: "story",
  });

  const { title, author, content, imgsrc } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    BookStore.createBook(formData);
    close(false);
  };

  const onProofRead = () => {
    localStorage.setItem("title", title);
    localStorage.setItem("author", author);
    localStorage.setItem("content", content);
  };

  return (
    <div className="absolute">
      <div className="absolute-content write-story">
        <button className="absolute-close" onClick={() => close(false)}>
          <i className="fa fa-times"></i>
        </button>
        <h1>Write a story</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="d-flex justify-content-between">
            <span>
              <label>title</label>
              <input name="title" value={title} onChange={onChange} required />
            </span>
            <span>
              <label>author name</label>
              <input
                name="author"
                value={author}
                onChange={onChange}
                required
              />
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
              <label>Image</label>
              <input
                name="imgsrc"
                value={imgsrc}
                onChange={onChange}
                required
              />
            </span>
          </div>

          <label>story</label>
          <div className="story">
            <textarea
              name="content"
              value={content}
              onChange={onChange}
              required
            />
            <div className="d-flex justify-content-center">
              <Link
                target="_blank"
                className="btn btn-green m-1"
                to="/story/proofread"
                onClick={() => onProofRead()}>
                Proof Read
              </Link>
              <button type="submit" className="btn btn-primary btn-purple m-1">
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
