import React, { useEffect, useState, Fragment } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { AuthStore } from "../../store/auth";
import { GroupStore } from "../../store/group";
import { observer } from "mobx-react";
import moment from "moment";
import { BookStore } from "../../store/book";

const Profile = observer(() => {
  const history = useHistory();
  const [description, setDescription] = useState(
    AuthStore.auth.user.description ? AuthStore.auth.user.description : "",
  );
  const [dob, setDob] = useState(
    AuthStore.auth.user.dob ? AuthStore.auth.user.dob : null,
  );
  const [editDesc, setEditDesc] = useState(false);
  const [editDob, setEditDob] = useState(false);
  const [showImg, setShowImg] = useState(null);
  const [tempImg, setTempImg] = useState(null);

  const editingDesc = (e) => {
    e.preventDefault();
    setEditDesc(false);
    AuthStore.editUser({
      email: AuthStore.auth.user.email,
      description: description,
    });
  };

  const editingDob = (e) => {
    e.preventDefault();
    setEditDob(false);
    AuthStore.editUser({
      email: AuthStore.auth.user.email,
      dob: dob,
    });
  };

  const updateImage = (e) => {
    const formData = new FormData();
    formData.append("email", AuthStore.auth.user.email);
    formData.append("picture", e.target.files[0]);

    AuthStore.uploadImage(formData, AuthStore.auth.user.email);

    var binaryData = [];
    binaryData.push(e.target.files[0]);
    setTempImg(
      window.URL.createObjectURL(
        new Blob(binaryData, { type: "application/zip" }),
      ),
    );
  };

  const fetchImg = async () => {
    const data = await AuthStore.getUserImage(AuthStore.auth.user.email);
    setShowImg(data);
  };

  useEffect(() => {
    if (!AuthStore.auth.isAuthenticated) {
      history.push("/");
    }

    BookStore.getBooks();
    GroupStore.getGroups();
    BookStore.getUserBook(AuthStore.auth.user._id);
    BookStore.getUserStory(AuthStore.auth.user._id);
    BookStore.getRead(AuthStore.auth.user._id);
    fetchImg();
  }, [AuthStore.auth.isAuthenticated]);

  return (
    <div className="profile">
      <div className="bg">
        <div className="content">
          <button className="back">
            <Link to="mainscreen">
              <i className="fa fa-arrow-left"></i>
            </Link>
          </button>
          <div className="user">
            <div className="left">
              {console.log(showImg)}
              <img
                alt="profile"
                src={
                  tempImg
                    ? tempImg
                    : showImg
                    ? `data:image/png;base64, ${showImg}`
                    : "http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg"
                }
              />
              <center>
                <label className="btn btn-success">
                  Upload{" "}
                  <input
                    type="file"
                    className="d-none"
                    onChange={(e) => updateImage(e)}
                  />
                </label>
              </center>
              <h1>{AuthStore.auth.user.name}</h1>
              <div className="switch">
                <button
                  className={`${
                    AuthStore.auth.role === "writer" && "switched"
                  }`}
                  onClick={() =>
                    AuthStore.auth.role === "writer"
                      ? AuthStore.setRole("reader")
                      : AuthStore.setRole("writer")
                  }>
                  <i className="fa fa-circle"></i>
                </button>
                <p>
                  switch to{" "}
                  {AuthStore.auth.role === "writer" ? "reader" : "writer"}
                </p>
              </div>
            </div>
            <div className="right">
              <h1>{AuthStore.auth.user.name}</h1>
              <div className="about">
                <h2>
                  about{" "}
                  {!editDesc ? (
                    <button
                      style={{ float: "right" }}
                      onClick={() => setEditDesc(true)}>
                      <i className="fa fa-edit"></i>
                    </button>
                  ) : (
                    <button
                      style={{ float: "right" }}
                      onClick={(e) => editingDesc(e)}>
                      <i className="fa fa-check"></i>
                    </button>
                  )}
                </h2>

                {editDesc ? (
                  <input
                    style={{ width: "100%" }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                ) : (
                  <p>{description}</p>
                )}
              </div>
              <h2>
                D.O.B{" "}
                {!editDob ? (
                  <button
                    style={{ float: "right" }}
                    onClick={() => setEditDob(true)}>
                    <i className="fa fa-edit"></i>
                  </button>
                ) : (
                  <button
                    style={{ float: "right" }}
                    onClick={(e) => editingDob(e)}>
                    <i className="fa fa-check"></i>
                  </button>
                )}
              </h2>
              {!editDob ? (
                <div className="dob">
                  <p>{moment(dob).format("DD")}</p>
                  <p>{moment(dob).format("MM")}</p>
                  <p>{moment(dob).format("YYYY")}</p>
                </div>
              ) : (
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              )}
            </div>
          </div>

          {AuthStore.auth.role === "reader" && (
            <div className="books mt-3">
              <h1>My Reads</h1>
              <div className="list">
                {BookStore.state.read.map((x, i) => (
                  <>
                    {BookStore.state.books
                      .filter((y) => y.title === x)
                      .map((x) => (
                        <Book x={x} i={i} />
                      ))}
                  </>
                ))}
              </div>
              {BookStore.state.read.length === 0 && (
                <p>No reads for this user</p>
              )}
            </div>
          )}

          {AuthStore.auth.role === "writer" && (
            <>
              <div className="books mt-3">
                <h1>My Books</h1>
                <div className="list">
                  {BookStore.state.userBook.map((x, i) => (
                    <Book x={x} i={i} />
                  ))}
                </div>
                {BookStore.state.userBook.length === 0 && (
                  <p>No books for this user</p>
                )}
              </div>

              <div className="books">
                <h1>My Stories</h1>
                <div className="list">
                  {BookStore.state.userStory.map((x, i) => (
                    <Story x={x} i={i} />
                  ))}
                </div>
                {BookStore.state.userStory.length === 0 && (
                  <p>No stories for this user</p>
                )}
              </div>
            </>
          )}

          <div className="books groups">
            <h1 className="my-3">Groups for you</h1>
            <div className="list">
              {GroupStore.state.groups.length > 0 &&
                GroupStore.state.groups.map((x, i) => (
                  <>
                    {x.members.find(
                      (x) => AuthStore.auth.user.email === x.email,
                    ) && <Group x={x} i={i} />}
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default withRouter(Profile);

const Book = ({ x, i }) => {
  const [img, setImg] = useState(null);

  const fetchImg = async () => {
    const data = await BookStore.getBookImg(x.book_id);
    setImg(data);
  };

  useEffect(() => {
    fetchImg();
  }, []);

  return (
    <Link to="/cover" onClick={() => BookStore.setBook(x)}>
      <img
        key={i}
        alt="cover"
        src={
          img
            ? `data:image/png;base64,${img}`
            : "http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg"
        }
      />
      <p>{x.title}</p>
    </Link>
  );
};

const Story = ({ x, i }) => {
  const [img, setImg] = useState(null);

  const fetchImg = async () => {
    const data = await BookStore.getStoryImg(x.story_id);
    setImg(data);
  };

  useEffect(() => {
    fetchImg();
  }, []);

  return (
    <Link to="/cover" onClick={() => BookStore.setBook(x)}>
      <img
        key={i}
        alt="cover"
        src={
          img
            ? `data:image/png;base64,${img}`
            : "http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg"
        }
      />
      <p>{x.title}</p>
    </Link>
  );
};

const Group = ({ x, i }) => {
  const [img, setImg] = useState(null);

  const fetchImage = async () => {
    const data = await GroupStore.getImage(x.title);
    setImg(data);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <Fragment>
      <div className="item me-3 mb-3">
        <img
          alt="group"
          src={
            img
              ? `data:image/png;base64,${img}`
              : "http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg"
          }
        />
        <div>
          <h5 className="fw-bold">{x.title}</h5>
          <Link to="/group" onClick={() => GroupStore.setGroup(x)}>
            View
          </Link>
        </div>
      </div>
    </Fragment>
  );
};
