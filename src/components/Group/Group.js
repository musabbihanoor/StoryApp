import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import About from "./GroupAbout";
import Discussion from "./GroupDiscussion";
import Members from "./GroupMembers";
import Invite from "./Invite";
import { AuthStore } from "../../store/auth";
import { GroupStore } from "../../store/group";
import { observer } from "mobx-react";

const Group = observer(({ history }) => {
  const [selected, setSelected] = useState(1);
  const [invite, setInvite] = useState(false);
  const [joined, setJoined] = useState(false);
  const [img, setImg] = useState(null);

  const fetchImage = async () => {
    const data = await GroupStore.getImage(GroupStore.state.group.title);
    setImg(data);
  };

  const joinGroup = () => {
    GroupStore.joinGroup({
      email: AuthStore.auth.user.email,
      title: GroupStore.state.group.title,
    });
    setJoined(true);
  };

  useEffect(() => {
    if (!AuthStore.auth.isAuthenticated) {
      history.push("/");
    }

    const data = GroupStore.state.group.members.find(
      (x) => AuthStore.auth.user.email === x.email,
    );

    data && setJoined(true);

    console.log(data);
    console.log(AuthStore.auth.user.email);
    GroupStore.state.group.members.map((x) => console.log(x.email));
    fetchImage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AuthStore.auth.isAuthenticated, GroupStore.state.group]);

  return (
    <Fragment>
      <div className="group">
        <div className="cover">
          <img
            alt="group"
            src={
              img
                ? `data:image/png;base64,${img}`
                : "http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg"
            }
          />
        </div>
        <div className="info">
          <div className="d-flex justify-content-between">
            <h1>{GroupStore.state.group.title}</h1>
            {!joined ? (
              <button
                className="btn-purple btn btn-primary"
                onClick={() => joinGroup()}>
                Join
              </button>
            ) : (
              <button
                className="btn-purple btn btn-primary"
                onClick={() => setInvite(true)}>
                Invite
              </button>
            )}
          </div>
          <span className="d-flex">
            <img
              alt="icon"
              src={process.env.PUBLIC_URL + "/images/globe.png"}
              style={{
                background: "#33336C",
                height: 15,
                width: 15,
                padding: 3,
              }}
            />
            <p className="me-2">{GroupStore.state.group.type} Group</p>
            <img
              alt="icon"
              src={process.env.PUBLIC_URL + "/images/person.png"}
              style={{
                background: "#33336C",
                height: 15,
                width: 15,
                padding: 3,
              }}
            />
            <p className="me-2">
              {GroupStore.state.group.members.length} Member
            </p>
          </span>
          <div className="nav">
            <button
              className={`${selected === 1 && "selected"}`}
              onClick={() => setSelected(1)}>
              About
            </button>
            <button
              className={`${selected === 2 && "selected"}`}
              onClick={() => setSelected(2)}>
              Discussion
            </button>
            <button
              className={`${selected === 3 && "selected"}`}
              onClick={() => setSelected(3)}>
              Members
            </button>
          </div>
        </div>
        {selected === 1 && (
          <About description={GroupStore.state.group.description} />
        )}
        {selected === 2 && (
          <Discussion
            func={GroupStore.createMessage}
            messages={GroupStore.state.group.forum}
            title={GroupStore.state.group.title}
            member={
              GroupStore.state.group.members.find(
                (x) => AuthStore.auth.user.email === x.email,
              )
                ? AuthStore.auth.user.email
                : null
            }
          />
        )}
        {selected === 3 && <Members members={GroupStore.state.group.members} />}
        {invite && (
          <Invite close={setInvite} title={GroupStore.state.group.title} />
        )}
      </div>
    </Fragment>
  );
});

export default withRouter(Group);
