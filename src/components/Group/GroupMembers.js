import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { AuthStore } from "../../store/auth";

const GroupMembers = observer(({ members, admin }) => {
  const [img, setImg] = useState("");

  const fetchImg = async () => {
    const data = await AuthStore.getUserImage(admin[0]?.email);
    setImg(data);
  };

  useEffect(() => {
    fetchImg();
  }, [admin]);

  return (
    <div className="members">
      <h1>Admin</h1>
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
          <h2>{admin[0]?.name}</h2>
          <p>Group Member</p>
        </span>
      </div>
      <h1>Members</h1>
      {members.length > 0 &&
        members.map((x, i) => (
          <div key={i} className="account d-flex">
            <img
              alt="profile"
              src={
                x.imgsrc
                  ? x.imgsrc
                  : "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
              }
            />
            <span>
              <h2>{x.name ? x.name : x}</h2>
              <p>Group Member</p>
            </span>
          </div>
        ))}
    </div>
  );
});

export default GroupMembers;
