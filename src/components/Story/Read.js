import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { BookStore } from "../../store/book";
import { observer } from "mobx-react";
import { AuthStore } from "../../store/auth";

const Read = observer(() => {
  const history = useHistory();
  const [switched, setSwitched] = useState(false);
  const [page, setPage] = useState(0);

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
                  {i === page && (
                    <>
                      <div
                        className="left"
                        dangerouslySetInnerHTML={{
                          __html: x.content,
                        }}></div>
                      <div className="right">
                        <span></span>
                        <br />
                      </div>{" "}
                    </>
                  )}
                </>
              ))}
            </div>
          )}

          {BookStore.state.book.content && (
            <div className="page">
              <div
                className="left"
                dangerouslySetInnerHTML={{
                  __html: BookStore.state.book.content,
                }}></div>
              <div className="right"></div>
            </div>
          )}

          {localStorage.content &&
            !BookStore.state.book.booksrc &&
            !BookStore.state.book.content && (
              <div className="page">
                <div
                  className="left"
                  dangerouslySetInnerHTML={{
                    __html: localStorage.content,
                  }}></div>
                <div className="right"></div>
              </div>
            )}

          {BookStore.state.book.booksrc &&
            page < BookStore.state.book.booksrc.length - 1 && (
              <button className="fold" onClick={() => setPage(page + 1)}>
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
