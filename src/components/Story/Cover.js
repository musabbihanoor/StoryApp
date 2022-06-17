import React from "react";
import { Link } from "react-router-dom";
import { BookStore } from "../../store/book";

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
        <h1>
          {BookStore.state.book.title
            ? BookStore.state.book.title
            : localStorage.title}
        </h1>
        <Link to="/read">
          <img
            alt="cover"
            src={
              BookStore.state.book.imgsrc
                ? BookStore.state.book.imgsrc
                : localStorage.img
            }
          />
        </Link>
      </div>
    </div>
  );
};

export default Cover;
