import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookStore } from "../../store/book";
import { AuthStore } from "../../store/auth";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import { uploadImage } from "../utils/imageUpload";

const WriteBook = ({ close }) => {
  const [showDetails, setShowDetails] = useState(true);
  const [add, setAdd] = useState(false);
  const [count, setCount] = useState(0);
  const [image, setImage] = useState("");
  const [raw, setRaw] = useState("");
  const [next, setNext] = useState(false);
  const [wait, setWait] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: localStorage.id,
    genre: "",
    content: EditorState.createEmpty(),
    type: "book",
  });

  const { title, content, genre } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const addChapter = async (e) => {
    e.preventDefault();
    if (content.getCurrentContent().getPlainText("\u0001") === "") {
      return;
    }

    await BookStore.addChapter({
      title: title,
      content: draftToHtml(convertToRaw(content.getCurrentContent())),
    });

    setFormData({ ...formData, content: EditorState.createEmpty() });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (content.getCurrentContent().getPlainText("\u0001") === "") {
      return;
    }

    close(true);
    if (add) {
      addChapter(e);
    } else {
      await BookStore.createBook({
        ...formData,
        imgsrc: image,
        content: draftToHtml(convertToRaw(content.getCurrentContent())),
      });
      setAdd(true);
    }
    setFormData({ ...formData, content: EditorState.createEmpty() });
  };

  const onProofRead = () => {
    localStorage.setItem("title", title);
    localStorage.setItem("author", localStorage._id);
    localStorage.setItem(
      "content",
      draftToHtml(convertToRaw(content.getCurrentContent())),
    );
  };

  useEffect(() => {
    setCount(raw.split(" ").length);
  }, [raw]);

  const fileUpload = async (file) => {
    setWait(true);
    const image_url = await uploadImage(file);
    console.log(image_url, "UPLOADED URL");
    setImage(image_url);
    setWait(false);
    setNext(true);
  };

  return (
    <div className="absolute">
      <div className="absolute-content write-story">
        <button
          className="absolute-close"
          onClick={() => {
            setAdd(false);
            close(false);
          }}>
          <i className="fa fa-times"></i>
        </button>
        <h1>Write a book</h1>
        <p style={{ color: "gray", textAlign: "center" }}>
          Enter = New Page <br /> Shift + Enter = New Line
        </p>
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
                    <option value="">Choose</option>
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
                    <p>{image ? "Uploaded" : "Select"}</p>
                    <label>
                      Upload
                      <input
                        type="file"
                        onChange={(e) => {
                          fileUpload(e.target.files[0]);
                          // setFormData({
                          //   ...formData,
                          //   picture: e.target.files[0],
                          // });
                        }}
                      />
                    </label>
                  </div>
                  {wait && (
                    <p style={{ color: "gray", marginTop: 5 }}>Please wait!</p>
                  )}
                </span>
              </div>
              {next && genre !== "" && title !== "" && (
                <button
                  type="button"
                  className="btn btn-success mt-3"
                  onClick={() => setShowDetails(false)}>
                  Next
                </button>
              )}
            </>
          ) : (
            <>
              <label>story</label>
              <div
                className="story"
                onKeyPress={(e) => {
                  if (
                    count > 200 &&
                    e.key !== "Backspace" &&
                    e.key !== "Enter"
                  ) {
                    e.preventDefault();
                    e.target.blur();
                  }
                  if (e.key === "Enter") {
                    setRaw("");
                    setCount(0);
                  }
                }}>
                <button
                  type="button"
                  className="add-chapter"
                  onClick={(e) => {
                    // if (add) {
                    //   addChapter(e);
                    // } else {
                    //   BookStore.createBook({
                    //     ...formData,
                    //     content: draftToHtml(
                    //       convertToRaw(content.getCurrentContent()),
                    //     ),
                    //   });
                    //   setAdd(true);
                    // }
                    onSubmit(e);
                    setFormData({
                      ...formData,
                      content: EditorState.createEmpty(),
                    });
                  }}>
                  <img
                    alt="add"
                    src={process.env.PUBLIC_URL + "/images/addchapter.png"}
                  />
                </button>
                {/* <textarea name="content" value={content} onChange={onChange} /> */}

                <Editor
                  editorState={content}
                  onEditorStateChange={(e) => {
                    setFormData({
                      ...formData,
                      content: e,
                    });
                    var data = e
                      .getCurrentContent()
                      .getPlainText("\u0001")
                      .split("");
                    setRaw(data[data.length - 1]);
                  }}
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <p
                    style={{
                      fontSize: 16,
                      color: count > 200 ? "red" : "black",
                    }}>
                    Pages:{" "}
                    {
                      content
                        .getCurrentContent()
                        .getPlainText("\u0001")
                        .split("").length
                    }
                  </p>
                  <p
                    style={{
                      fontSize: 16,
                      color: count > 200 ? "red" : "black",
                    }}>
                    Words: {count - 1}/200
                  </p>
                </div>

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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  type="button"
                  className="btn btn-success mt-3"
                  onClick={() => setShowDetails(true)}>
                  Go Back
                </button>
                <p style={{ color: "gray" }}>
                  *Please change page after word limit has been reached
                </p>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default WriteBook;
