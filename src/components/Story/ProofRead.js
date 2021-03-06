import React, { useState } from "react";
import { BookStore } from "../../store/book";
import { AuthStore } from "../../store/auth";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";

const ProofRead = () => {
  const [show, setShow] = useState(true);

  const bookmark = () => {
    BookStore.createBookMark(localStorage.id, BookStore.state.book.book_id);
    setShow(false);
  };

  return (
    <div className="proof-read">
      <div className="head">
        <h1>proof read</h1>
        <p>Your story</p>
        {BookStore.state.book.booksrc &&
          show &&
          !BookStore.state.bookmarks.find(
            (x) => x.title === BookStore.state.book.title,
          ) && (
            <button
              onClick={() => bookmark()}
              style={{
                position: "absolute",
                top: 100,
                right: 50,
                fontFamily: "Poppins",
              }}
              className="btn btn-gray">
              Add
            </button>
          )}
      </div>
      <div className="content">
        {BookStore.state.book.title ? (
          <h1>{BookStore.state.book.title}</h1>
        ) : (
          <h1>{localStorage.title}</h1>
        )}

        {BookStore.state.book.booksrc ? (
          BookStore.state.book.booksrc.map((x, i) => (
            <div key={i}>
              <h2>chapter #{x.chapter}</h2>
              <p>{x.content}</p>
            </div>
          ))
        ) : BookStore.state.book.content ? (
          <p>{BookStore.state.book.content}</p>
        ) : (
          <p dangerouslySetInnerHTML={{ __html: localStorage.content }}></p>
        )}
      </div>
    </div>
  );
};

export default ProofRead;
