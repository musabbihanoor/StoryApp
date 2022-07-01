import React, { Fragment, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { AuthStore } from "../../store/auth";
import { GroupStore } from "../../store/group";

const GroupDiscussion = observer(({ messages, member, func, title, admin }) => {
  const [text, setText] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [img, setImg] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    func({
      sender: member,
      groupTitle: title,
      message: text,
    });
    setText("");
  };

  const fetchImg = async () => {
    const data = await AuthStore.getUserImage(admin[0]?.email);
    setImg(data);
  };

  const updateGroup = () => {
    GroupStore.updateGroup({
      ...GroupStore.state.group,
      forum: GroupStore.state.group.forum.filter(
        (x) => x.message !== deleteMessage,
      ),
    });
    setDeleteMessage("");
  };

  useEffect(() => {
    deleteMessage && updateGroup();
    fetchImg();
  }, [deleteMessage, admin]);

  return (
    <Fragment>
      <div className="discussion">
        <div className="account d-flex">
          <img
            alt="profile"
            src={
              img
                ? `data:image/png;base64,${img}`
                : "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
            }
          />
          <span>
            {console.log(admin)}
            <h2>{admin[0]?.name}</h2>
            <p>Group Admin</p>
          </span>
        </div>
        <h1>Drop your messages</h1>
        <span className="d-flex">
          <img
            alt="icon"
            src={process.env.PUBLIC_URL + "/images/comment.png"}
            style={{ height: 15, width: 15, borderRadius: 0 }}
          />
          <p className="me-2">{messages.length} comments</p>
        </span>
        {member && (
          <form className="d-flex">
            <input
              style={{ width: "100%" }}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              onClick={(e) => sendMessage(e)}
              className="btn btn-primary btn-purple"
              style={{ marginLeft: "-70px" }}>
              Send
            </button>
          </form>
        )}
        {messages.length > 0 &&
          messages.map((x, i) => (
            <div key={i} className="comment d-flex mt-3">
              <img
                alt="profile"
                src={
                  x.imgsrc
                    ? x.imgsrc
                    : "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
                }
              />
              <span style={{ flex: 1 }}>
                <h3>
                  {x.name ? x.name : x.sender} <span>4hr ago</span>
                </h3>
                <p>{x.message}</p>
              </span>
              {x.sender === AuthStore.auth.user.email && (
                <button
                  style={{ color: "red" }}
                  onClick={() => setDeleteMessage(x.message)}>
                  <i className="fa fa-trash"></i>
                </button>
              )}
            </div>
          ))}
      </div>
    </Fragment>
  );
});

export default GroupDiscussion;
