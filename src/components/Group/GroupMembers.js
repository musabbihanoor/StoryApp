import React from "react";
import { observer } from "mobx-react";

const GroupMembers = observer(({ members }) => {
  return (
    <div className="members">
      {/* <h1>Admin</h1> */}
      {/* <div className="account d-flex">
        <img
          alt="profile"
          src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
        />
        <span>
          <h2>amueso</h2>
          <p>Group Admin</p>
        </span>
      </div>
      <hr /> */}
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
