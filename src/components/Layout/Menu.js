import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthStore } from "../../store/auth";

const Menu = () => {
  const [option, setOption] = useState("");

  return (
    <div className="menu">
      <div className="bg">
        <div className="option">
          <span>
            <div className="item">
              <p>READER</p>
              <img
                className={`${option === "reader" && "selected"}`}
                onClick={() => setOption("reader")}
                alt="reader"
                src={process.env.PUBLIC_URL + "/images/reader.png"}
              />
            </div>
            <hr />
            <div className="item">
              <p>WRITER</p>
              <img
                className={`${option === "writer" && "selected"}`}
                onClick={() => setOption("writer")}
                alt="writer"
                src={process.env.PUBLIC_URL + "/images/writer.png"}
              />
            </div>
          </span>
          <center>
            <Link
              to="/mainscreen"
              onClick={() => option !== "" && AuthStore.setRole(option)}
              className="btn btn-purple btn-primary mt-3"
              style={{ width: 150 }}>
              Next
            </Link>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Menu;
