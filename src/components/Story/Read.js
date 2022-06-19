import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { BookStore } from "../../store/book";
import { observer } from "mobx-react";
import { AuthStore } from "../../store/auth";

const Read = observer(() => {
  const history = useHistory();
  const [switched, setSwitched] = useState(false);
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(true);

  const bookmark = () => {
    BookStore.createBookMark(
      AuthStore.auth.user._id,
      BookStore.state.book.book_id,
    );
    setShow(false);
  };

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
