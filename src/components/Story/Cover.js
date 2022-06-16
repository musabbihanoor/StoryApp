import React from "react";

const Cover = () => {
  return (
    <div className="cover">
      <div
        className="print"
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + "/images/bg-print.png"
          })`,
        }}>
        <h1>the little gingerbread man</h1>
        <img
          alt="cover"
          src="https://m.media-amazon.com/images/I/41J7GPasQ+L.jpg"
        />
      </div>
    </div>
  );
};

export default Cover;
