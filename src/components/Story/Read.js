import React, { useState } from "react";
import { BookStore } from "../../store/book";
import { observer } from "mobx-react";

const Read = observer(() => {
  const [page, setPage] = useState(1);

  return (
    <div className="read">
      <div
        className="print"
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + "/assets/images/bg-print.png"
          })`,
        }}>
        <div
          className="book"
          style={{
            backgroundImage: `url(${
              process.env.PUBLIC_URL + "/assets/images/open-book.png"
            })`,
          }}>
          {BookStore.state.book.booksrc && (
            <div className="page">
              {BookStore.state.book.booksrc.map((x, i) => (
                <>
                  {i % 2 === 0 && i === page - 1 && (
                    <div className="left">
                      <span>{x.chapter}</span>
                      <br />
                      {x.content}
                    </div>
                  )}
                </>
              ))}
              {BookStore.state.book.booksrc.map((x, i) => (
                <>
                  {i % 2 === 1 && i === page && (
                    <div className="right">
                      <span>{x.chapter}</span>
                      <br />
                      {x.content}
                    </div>
                  )}
                </>
              ))}
            </div>
          )}

          {console.log(BookStore.state.book.title)}

          {BookStore.state.book.content && (
            <div className="page">
              <div className="left">{BookStore.state.book.content}</div>
              <div className="right">{BookStore.state.book.content}</div>
            </div>
          )}

          {BookStore.state.book.booksrc &&
            page < BookStore.state.book.booksrc.length - 1 && (
              <button className="fold" onClick={() => setPage(page + 2)}>
                <img
                  alt="fold"
                  src={process.env.PUBLIC_URL + "/assets/images/fold.png"}
                />
              </button>
            )}
        </div>
      </div>
    </div>
  );
});

export default Read;
