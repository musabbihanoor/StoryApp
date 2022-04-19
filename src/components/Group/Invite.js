import React, { useEffect } from "react";
import { AuthStore } from "../../store/auth";
import { GroupStore } from "../../store/group";
import { observer } from "mobx-react";

const Invite = observer(({ close, title }) => {
  useEffect(() => {
    AuthStore.getAllUsers();
  }, []);

  const invite = (email) => {
    GroupStore.joinGroup({ title: title, email: email });
    close(false);
  };

  return (
    <div className="absolute">
      <div className="absolute-content invite">
        <button className="absolute-close" onClick={() => close(false)}>
          <i className="fa fa-times"></i>
        </button>
        <h1>Invite</h1>
        <hr />

        {AuthStore.auth.users.length > 0 &&
          AuthStore.auth.users.map((x) => (
            <div className="account d-flex">
              <img
                alt="profile"
                src={
                  x.imgsrc
                    ? x.imgsrc
                    : "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
                }
              />
              <span style={{ flex: 1 }}>
                <h2>{x.name}</h2>
                <p>{x.email}</p>
              </span>
              <button className="btn btn-gray" onClick={() => invite(x.email)}>
                Invite
              </button>
            </div>
          ))}
      </div>
    </div>
  );
});

export default Invite;
