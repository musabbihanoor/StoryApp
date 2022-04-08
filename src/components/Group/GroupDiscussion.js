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
          src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
        />
        <span>
          <h2>amueso</h2>
          <p>Group Admin</p>
        </span>
      </div>
      <h1>5 best books you need to read</h1>
      <span className="d-flex">
        <p className="mx-2">2 comments</p>
        <p className="mx-2">250 share</p>
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
              src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
            />
            <span>
              <h3>
                {x.sender} <span>4hr ago</span>
              </h3>
              <p>{x.message}</p>
            </span>
          </div>
        ))}
    </div>
  );
});

export default GroupDiscussion;
