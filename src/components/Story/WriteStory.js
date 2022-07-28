import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookStore } from "../../store/book";
import { AuthStore } from "../../store/auth";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import { uploadImage } from "../utils/imageUpload";

const WriteStory = ({ close }) => {
  const [showDetails, setShowDetails] = useState(true);
  const [count, setCount] = useState(0);
  const [raw, setRaw] = useState("");
  const [image, setImage] = useState("");
  const [next, setNext] = useState(false);
  const [wait, setWait] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: localStorage.id,
    genre: "",
    content: EditorState.createEmpty(),
    type: "story",
  });

  const { title, content, genre } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (content.getCurrentContent().getPlainText("\u0001") === "") {
      return;
    }

    // var formdata = new FormData();
    // formdata.append("title", title);
    // formdata.append("author", author);
    // formdata.append(
    //   "content",
    //   draftToHtml(convertToRaw(content.getCurrentContent())),
    // );
    // formdata.append("genre", [genre]);
    // formdata.append("imgsrc", image);
    // // formdata.append("picture", picture);
    // formdata.append("type", type);

    await BookStore.createBook({
      ...formData,
      imgsrc: image,
      content: draftToHtml(convertToRaw(content.getCurrentContent())),
    });
    close(false);
  };

  const onProofRead = () => {
    localStorage.setItem("title", title);
    localStorage.setItem("author", AuthStore.auth.user.name);
    localStorage.setItem(
      "content",
      draftToHtml(convertToRaw(content.getCurrentContent())),
    );
  };

  useEffect(() => {
    setCount(raw.split(" ").length);
    console.log(raw);
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
        <button className="absolute-close" onClick={() => close(false)}>
          <i className="fa fa-times"></i>
        </button>
        <h1>Write a story</h1>
        <p style={{ color: "gray", textAlign: "center" }}>
          Enter = New Page <br /> Shift + Enter = New Line
        </p>
        <form onSubmit={(e) => onSubmit(e)}>
          {showDetails ? (
            <>
              <div className="d-flex justify-content-between">
                <span>
                  <label>title</label>
                  <input
                    name="title"
                    value={title}
                    onChange={onChange}
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
                {/* <p
                  style={{
                    textAlign: "end",
                    fontSize: 16,
                    color: count > 200 ? "red" : "black",
                  }}>
                  {count - 1}/200
                </p> */}

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
                    className="btn btn-green m-1"
                    to="/story/proofread"
                    onClick={() => onProofRead()}>
                    Proof Read
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary btn-purple m-1">
                    Published
                  </button>
                </div>
              </div>{" "}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
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

export default WriteStory;
