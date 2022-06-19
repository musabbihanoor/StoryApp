import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookStore } from "../../store/book";
import { AuthStore } from "../../store/auth";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";

const WriteBook = ({ close }) => {
  const [showDetails, setShowDetails] = useState(true);
  const [add, setAdd] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: AuthStore.auth.user._id,
    genre: "",
    content: EditorState.createEmpty(),
    type: "book",
    picture: {},
  });

  const { title, author, content, picture, type, genre } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const addChapter = async (e) => {
    e.preventDefault();
    await BookStore.addChapter({
      title: title,
      content: draftToHtml(convertToRaw(content.getCurrentContent())),
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    close(true);
    if (add) {
      addChapter(e);
    } else {
      var formdata = new FormData();
      formdata.append("title", title);
      formdata.append("author", author);
      formdata.append(
        "content",
        draftToHtml(convertToRaw(content.getCurrentContent())),
      );
      formdata.append("genre", [genre]);
      formdata.append("picture", picture);
      formdata.append("type", type);

      await BookStore.createBook(formdata);
    }
  };

  const onProofRead = () => {
    localStorage.setItem("title", title);
    localStorage.setItem("author", AuthStore.auth.user._id);
    localStorage.setItem(
      "content",
      draftToHtml(convertToRaw(content.getCurrentContent())),
    );
  };

  return (
    <div className="absolute">
      <div className="absolute-content write-story">
        <button className="absolute-close" onClick={() => close(false)}>
          <i className="fa fa-times"></i>
        </button>
        <h1>Write a book</h1>
        <form onSubmit={(e) => (add ? addChapter(e) : onSubmit(e))}>
          {showDetails ? (
            <>
              <div className="d-flex justify-content-between">
                <span>
                  <label>title</label>
                  <input
                    name="title"
                    value={title}
                    onChange={(e) => onChange(e)}
                    readOnly={add}
                    required
                  />
                </span>
                <span>
                  <label>author name</label>
                  <input
                    name="author"
                    value={AuthStore.auth.user.name}
                    readOnly
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
                    <p>{picture.name ? picture.name : "Select"}</p>
                    <label>
                      Upload
                      <input
                        type="file"
                        // onChange={(e) => {
                        //   getBase64(e.target.files[0], (result) => {
                        //     console.log(result);
                        //     setFormData({ ...formData, imgsrc: result });
                        //   });
                        // }}
                        onChange={(e) => {
                          console.log(e.target.files[0]);
                          setFormData({
                            ...formData,
                            picture: e.target.files[0],
                          });
                        }}
                      />
                    </label>
                  </div>
                </span>
              </div>
              <button
                className="btn btn-success mt-3"
                onClick={() => setShowDetails(false)}>
                Next
              </button>
            </>
          ) : (
            <>
              <label>story</label>
              <div className="story">
                <button
                  className="add-chapter"
                  onClick={(e) => {
                    setFormData({
                      ...formData,
                      content: EditorState.createEmpty(),
                    });
                    if (!add) {
                      BookStore.createBook({
                        ...formData,
                        content: draftToHtml(
                          convertToRaw(content.getCurrentContent()),
                        ),
                      });
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
                {/* <textarea name="content" value={content} onChange={onChange} /> */}

                <Editor
                  onEditorStateChange={(e) =>
                    setFormData({
                      ...formData,
                      content: e,
                    })
                  }
                />

                <div className="d-flex justify-content-center">
                  <Link
                    target="_blank"
                    className="btn btn-primary btn-green m-1"
                    to="/story/proofread"
                    onClick={(e) => onProofRead(e)}>
                    Proof Read
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary btn-purple m-1">
                    Published
                  </button>
                </div>
              </div>
              <button
                className="btn btn-success mt-3"
                onClick={() => setShowDetails(true)}>
                Go Back
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default WriteBook;
