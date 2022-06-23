import React, { useState, useEffect } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { BookStore } from "../../store/book";
import { AuthStore } from "../../store/auth";
import { observer } from "mobx-react";

const Cover = observer(() => {
  const history = useHistory();

  useEffect(() => {
    if (!AuthStore.auth.isAuthenticated) {
      history.push("/");
    }
  }, [AuthStore.auth.isAuthenticated]);
  return (
    <div className="cover">
      <div
        className="print"
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + "/images/bg-print.png"
          })`,
        }}>
        <h1>{BookStore.state.book.title && BookStore.state.book.title}</h1>
        <Link to="/read">
          <img
            alt="cover"
            src={
              BookStore.state.book.picture
                ? `data:image/png;base64,${BookStore.state.book.picture}`
                : "http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg"
            }
          />
        </Link>
      </div>
    </div>
  );
});

export default withRouter(Cover);
