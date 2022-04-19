import React, { useState } from "react";
import { observer } from "mobx-react";

const GroupDiscussion = observer(({ messages, member, func, title }) => {
  const [text, setText] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    func({
      sender: member,
      groupTitle: title,
      message: text,
    });
    setText("");
  };

  return (
    <div className="discussion">
      <div className="account d-flex">
        <img
          alt="profile"
          src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
        />
        <span>
          <h2>{title}</h2>
          <p>Group Admin</p>
        </span>
      </div>
      <h1>5 best books you need to read</h1>
      <span className="d-flex">
        <img
          alt="icon"
          src={process.env.PUBLIC_URL + "/images/comment.png"}
          style={{ height: 15, width: 15, borderRadius: 0 }}
        />
        <p className="me-2">{messages.length} comments</p>
        <img
          alt="icon"
          src={process.env.PUBLIC_URL + "/images/share.png"}
          style={{ height: 15, width: 15, borderRadius: 0 }}
        />
        <p className="me-2">250 share</p>
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
            <span>
              <h3>
                {x.name ? x.name : x.sender} <span>4hr ago</span>
              </h3>
              <p>{x.message}</p>
            </span>
          </div>
        ))}
    </div>
  );
});

export default GroupDiscussion;
