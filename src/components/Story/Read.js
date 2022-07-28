import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { BookStore } from "../../store/book";
import { observer } from "mobx-react";
import { AuthStore } from "../../store/auth";
import HTMLFlipBook from "react-pageflip";

const Read = observer(() => {
  const history = useHistory();
  const [show, setShow] = useState(true);
  const [content, setContent] = useState([]);

  const bookmark = () => {
    BookStore.createBookMark(localStorage.id, BookStore.state.book.book_id);
    setShow(false);
  };

  const [img, setImg] = useState(null);

  const fetchImg = async () => {
    const data = BookStore.state.book.book
      ? await BookStore.getBookImg(BookStore.state.book.book_id)
      : await BookStore.getStoryImg(BookStore.state.book.story_id);
    setImg(data);
  };

  const splitText = () => {
    if (BookStore.state.book.book) {
      var text = "";
      BookStore.state.book.booksrc.map((x) => (text += x.content));
      setContent(text.match(/.{1,2000}/g));
      console.log("here");
    }

    !BookStore.state.book.book &&
      setContent(BookStore.state.book.content.match(/.{1,200}/g));
  };

  useEffect(() => {
    if (!AuthStore.auth.isAuthenticated) {
      history.push("/");
    }
    fetchImg();
    splitText();
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
              <i className="fa fa-plus"></i> Add to Bookmarks
            </button>
          )}

        <HTMLFlipBook width={400} height={700} showCover={true}>
          <div id="1" ref="1" className="demoPage">
            <h1 className="cover-title">{BookStore.state.book.title}</h1>
            <img
              style={{ objectFit: "cover" }}
              className="passport"
              src={
                BookStore.state.book.imgsrc
                  ? BookStore.state.book.imgsrc
                  : "http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg"
              }
            />
          </div>
          {content.map((x, i) => (
            <div className="demoPage">
              <p
                key={i}
                className="main"
                dangerouslySetInnerHTML={{
                  __html: x,
                }}></p>
            </div>
          ))}

          {/* {content.length % 2 === 1 && (
            <div className="demoPage">
              <p className="main"></p>
            </div>
          )} */}

          <div className="demoPage">
            <img
              style={{ objectFit: "contain", background: "#1A1A1A" }}
              src="https://play-lh.googleusercontent.com/OuZqDwJcoCna3sbEjlV58dwBxk2bFYdgwRqe3xOphhAm5RymSSfud3qNSy4pSaRYB9M"
            />
          </div>
        </HTMLFlipBook>

        {/* <div
          className="book"
          style={{
            // backgroundImage: `url(${
            //   process.env.PUBLIC_URL + "/images/open-book.png"
            // })`,
            backgroundImage: `url(${
              process.env.PUBLIC_URL + "/images/scroll.png"
            })`,
          }}>
          {BookStore.state.book.booksrc && (
            <div className="page">
              {BookStore.state.book.booksrc.map((x, i) => (
                <div
                  className="left"
                  dangerouslySetInnerHTML={{
                    __html: x.content,
                  }}></div>
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
              </div>
            )}

          {/* {BookStore.state.book.booksrc &&
            page < BookStore.state.book.booksrc.length - 1 && (
              <button className="fold" onClick={() => setPage(page + 1)}>
                <img
                  alt="fold"
                  src={process.env.PUBLIC_URL + "/images/fold.png"}
                />
              </button>
            )} 
        </div> */}
      </div>
    </div>
  );
});

export default withRouter(Read);
