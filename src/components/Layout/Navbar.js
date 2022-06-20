import React, { useEffect, useState } from "react";
import { AuthStore } from "../../store/auth";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

const Navbar = observer(() => {
  const [img, setImg] = useState(null);

  useEffect(() => {
    setImg(AuthStore.getUserImage(AuthStore.auth.user.email));
  }, []);

  return (
    <div className="navbar d-flex align-items-center">
      <Link to="/mainscreen">
        <img src={process.env.PUBLIC_URL + "/images/amueso-v2.png"} />
      </Link>
      {/* {AuthStore.auth.isAuthenticated && (
        <form className="form-inline d-flex">
          <div className="form-group mx-sm-3 mb-2">
            <input placeholder="Search" />
          </div>
          <button type="submit" className="btn btn-primary mb-2">
            Search
          </button>
        </form>
      )} */}
      <div className="d-flex align-items-center">
        {!AuthStore.auth.isAuthenticated && (
          <>
            <a href="/" className="mx-3">
              About us
            </a>
            <a href="/" className="mx-3">
              Help
            </a>{" "}
          </>
        )}
        <Link to="/profile" className="d-flex align-items-center">
          <h5 className="me-3">{AuthStore.auth.user.name}</h5>
          <img
            style={{
              width: 50,
              height: 50,
              objectFit: "cover",
              borderRadius: 50,
            }}
            className="my-2"
            alt="user"
            src={
              typeof img === String
                ? `data:image/png;base64,${img}`
                : "http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg"
            }
          />
        </Link>
        {AuthStore.auth.isAuthenticated && (
          <button onClick={AuthStore.logout} className="btn btn-warning mx-3">
            Logout
          </button>
        )}
      </div>
    </div>
  );
});

export default Navbar;
