import React from "react";
import { observer } from "mobx-react";

const GroupMembers = observer(({ members }) => {
  return (
    <div className="members">
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
