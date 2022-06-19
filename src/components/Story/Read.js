import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { BookStore } from "../../store/book";
import { observer } from "mobx-react";
import { AuthStore } from "../../store/auth";

const Read = observer(() => {
  const history = useHistory();
  const [switched, setSwitched] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // if (!AuthStore.auth.isAuthenticated) {
    //   history.push("/");
    // }
  }, [AuthStore.auth.isAuthenticated]);

  return (
    <div className="read">
      <div
        className="print"
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + "/images/bg-print.png"
          })`,
        }}>
        <div
          className="book"
          style={{
            backgroundImage: `url(${
              process.env.PUBLIC_URL + "/images/open-book.png"
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

          {BookStore.state.book.content && (
            <div className="page">
              <div className="left">{BookStore.state.book.content}</div>
              <div className="right"></div>
            </div>
          )}

          {localStorage.content && (
            <div className="page">
              <div className="left">{localStorage.content}</div>
              <div className="right"></div>
            </div>
          )}

          {BookStore.state.book.booksrc &&
            page < BookStore.state.book.booksrc.length - 1 && (
              <button className="fold" onClick={() => setPage(page + 2)}>
                <img
                  alt="fold"
                  src={process.env.PUBLIC_URL + "/images/fold.png"}
                />
              </button>
            )}
        </div>
      </div>
    </div>
  );
});

export default withRouter(Read);
