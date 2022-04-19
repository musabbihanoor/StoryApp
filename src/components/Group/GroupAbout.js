import React from "react";

const GroupAbout = ({ description }) => {
  return (
    <div className="about">
      <p>{description && description}</p>
    </div>
  );
};

export default GroupAbout;
