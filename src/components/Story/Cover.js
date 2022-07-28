import React, { useState, useEffect } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { BookStore } from "../../store/book";
import { AuthStore } from "../../store/auth";
import { observer } from "mobx-react";

const Cover = observer(() => {
  const history = useHistory();
  const [author, setAuthor] = useState("");

  const fetchAuthor = () => {
    AuthStore.getAllUsers().then((res) => {
      console.log(BookStore.state.book.title);
      setAuthor(res.filter((x) => x._id === BookStore.state.book.author));
      // .map((x) => setAdmin(x));
    });
  };

  useEffect(() => {
    if (!AuthStore.auth.isAuthenticated) {
      history.push("/");
    }

    fetchAuthor();
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
        <div>
          <h1>{BookStore.state.book.title && BookStore.state.book.title}</h1>
          <h4>{author[0]?.name}</h4>
        </div>

        <Link to="/read">
          <img
            alt="cover"
            src={
              BookStore.state.book.imgsrc
                ? BookStore.state.book.imgsrc
                : "http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg"
            }
          />
        </Link>
      </div>
    </div>
  );
});

export default withRouter(Cover);
