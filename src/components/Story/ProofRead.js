import React, { useEffect } from "react";
import { BookStore } from "../../store/book";

const ProofRead = () => {
  useEffect(() => {
    // console.log(localStorage);
  }, []);
  return (
    <div className="proof-read">
      <div className="head">
        <h1>proof read</h1>
        <p>Your story</p>
      </div>
      <div className="content">
        {BookStore.state.book.title ? (
          <h1>{BookStore.state.book.title}</h1>
        ) : (
          <h1>{localStorage.title}</h1>
        )}

        {BookStore.state.book.author ? (
          <h3>written by {BookStore.state.book.author}</h3>
        ) : (
          <h3>written by {localStorage.author}</h3>
        )}

        {BookStore.state.book.booksrc ? (
          BookStore.state.book.booksrc.map((x, i) => (
            <div key={i}>
              <h2>chapter #{x.chapter}</h2>
              <p>{x.content}</p>
            </div>
          ))
        ) : (
          <p>{localStorage.content}</p>
        )}
      </div>
    </div>
  );
};

export default ProofRead;
