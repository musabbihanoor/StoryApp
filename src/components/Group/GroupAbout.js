import React, { Fragment, useState } from "react";
import { GroupStore } from "../../store/group";

const GroupAbout = ({ description }) => {
  const [text, setText] = useState(description);
  const [update, setUpdate] = useState(false);

  const updateGroup = () => {
    GroupStore.updateGroup({
      ...GroupStore.state.group,
      description: text,
    });
    setText("");
    setUpdate(false);
  };

  return (
    <Fragment>
      <div className="about">
        {!update ? (
          <p>
            {description && description}
            {localStorage.id === GroupStore.state.group.admin && (
              <button onClick={() => setUpdate(true)}>
                <i className="fa fa-edit"></i>
              </button>
            )}
          </p>
        ) : (
          <>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ width: "95%" }}
            />
            <button onClick={() => updateGroup()}>
              <i className="fa fa-check"></i>
            </button>{" "}
          </>
        )}
      </div>{" "}
    </Fragment>
  );
};

export default GroupAbout;
