import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookStore } from "../../store/book";

const WriteBook = ({ close }) => {
  const [add, setAdd] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    content: "",
    imgsrc: "",
    type: "book",
  });

  const { title, author, content, imgsrc } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const addChapter = (e) => {
    e.preventDefault();
    BookStore.addChapter({ title: title, content: content });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    close(true);
    if (add) {
      addChapter(e);
    } else {
      BookStore.createBook(formData);
    }
  };

  const onProofRead = () => {
    localStorage.setItem("title", title);
    localStorage.setItem("author", author);
    localStorage.setItem("content", content);
    localStorage.setItem("img", imgsrc);
  };

  return (
    <div className="absolute">
      <div className="absolute-content write-story">
        <button className="absolute-close" onClick={() => close(false)}>
          <i className="fa fa-times"></i>
        </button>
        <h1>Write a book</h1>
        <form onSubmit={(e) => (add ? addChapter(e) : onSubmit(e))}>
          <div className="d-flex justify-content-between">
            <span>
              <label>title</label>
              <input
                name="title"
                value={title}
                onChange={onChange}
                readOnly={add}
                required
              />
            </span>
            <span>
              <label>author name</label>
              <input
                name="author"
                value={author}
                onChange={onChange}
                readOnly={add}
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
              <div className="img">
                <img
                  alt="file"
                  src={process.env.PUBLIC_URL + "/images/file.png"}
                />
                <p>{imgsrc.name ? imgsrc.name : "Select"}</p>
                <label>
                  Upload
                  <input
                    type="file"
                    onChange={(e) =>
                      setFormData({ ...formData, imgsrc: e.target.files[0] })
                    }
                  />
                </label>
              </div>
            </span>
          </div>

          <label>story</label>
          <div className="story">
            <button
              className="add-chapter"
              onClick={(e) => {
                setFormData({ ...formData, content: "" });
                if (!add) {
                  BookStore.createBook(formData);
                  setAdd(true);
                } else {
                  addChapter(e);
                }
              }}>
              <img
                alt="add"
                src={process.env.PUBLIC_URL + "/images/addchapter.png"}
              />
            </button>
            <textarea name="content" value={content} onChange={onChange} />
            <div className="d-flex justify-content-center">
              <Link
                target="_blank"
                className="btn btn-primary btn-green m-1"
                to="/cover"
                onClick={(e) => onProofRead(e)}>
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

export default WriteBook;
