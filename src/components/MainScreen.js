import React, { useState, useEffect, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import WriteStory from "./Story/WriteStory";
import WriteBook from "./Story/WriteBook";
import CreateGroup from "./Group/CreateGroup";
import { AuthStore } from "../store/auth";
import { BookStore } from "../store/book";
import { GroupStore } from "../store/group";
import { observer } from "mobx-react";

const MainScreen = observer(({ history }) => {
  const [genre, setGenre] = useState("");
  const [writeStory, setWriteStory] = useState(false);
  const [writeBook, setWriteBook] = useState(false);
  const [createGroup, setCreateGroup] = useState(false);

  useEffect(() => {
    if (!AuthStore.auth.isAuthenticated) {
      history.push("/");
    }
    GroupStore.getGroups();
    BookStore.getBooks();
    BookStore.getStories();
    BookStore.getGenres();
    BookStore.getOldBooks();
    BookStore.getBookmarkBooks(localStorage.id);
    genre !== "" && BookStore.getGenreBooks(genre);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre, AuthStore.auth.isAuthenticated]);

  return (
    <Fragment>
      <div className="main">
        <h1 className="fw-bold mb-5">
          Welcome back, {AuthStore.auth.user.name && AuthStore.auth.user.name}
        </h1>
        <div className="ad d-flex justify-content-between">
          <div className="item">
            <img
              alt="theme"
              src="https://media-cdn.tripadvisor.com/media/photo-s/0b/33/a1/93/picnix-setup.jpg"
            />
            <h6 className="fw-bold mt-3">
              Planning for a picnic? We've got you covered
            </h6>
          </div>
          <div className="item">
            <img
              alt="theme"
              src="https://image.made-in-china.com/2f0j00jbyRBsJqycoE/2020-New-Good-Quality-English-Story-Kids-Children-Books-Printing-for-Child-Book.jpg"
            />
            <h6 className="fw-bold mt-3">The story time with Jessica</h6>
          </div>
          <div className="item">
            <img
              alt="theme"
              src="https://api.time.com/wp-content/uploads/2018/04/listening-to-music-headphones.jpg?quality=85&w=1200&h=628&crop=1"
            />
            <h6 className="fw-bold mt-3">Listen and scream</h6>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <h2 className="fw-bold my-5">Top picks for you</h2>
          <span>
            {AuthStore.auth.role === "writer" && (
              <>
                <button
                  className="btn btn-primary btn-purple"
                  onClick={() => setWriteStory(true)}>
                  Write a Story
                </button>
                <button
                  className="btn btn-primary btn-purple mx-3"
                  onClick={() => setWriteBook(true)}>
                  Write a Book
                </button>
              </>
            )}

            <button
              className="btn btn-primary btn-purple"
              onClick={() => setCreateGroup(true)}>
              Create a group
            </button>
          </span>
        </div>
        <div className="book d-flex">
          {BookStore.state.books.length > 0 ? (
            BookStore.state.books.map((x) => <Book x={x} />)
          ) : (
            <p>No books</p>
          )}
        </div>

        <h2 className="fw-bold my-5">Top Stories for you</h2>
        <div className="book d-flex">
          {BookStore.state.stories.length > 0 ? (
            BookStore.state.stories.map((x) => <Story x={x} />)
          ) : (
            <p>No books</p>
          )}
        </div>

        <h2 className="fw-bold my-5">Author's books</h2>
        <div className="book d-flex">
          {BookStore.state.oldBooks.length > 0 ? (
            BookStore.state.oldBooks.map((x) => (
              <div className="item" key={x._id}>
                <a
                  href={x.booksrc}
                  target="_blank"
                  onClick={() => {
                    BookStore.setBook(x);
                    BookStore.markRead(x.book_id, localStorage.id);
                  }}>
                  <img
                    alt="book"
                    src={
                      x.imgsrc
                        ? x.imgsrc
                        : "http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg"
                    }
                  />
                  <h6 className="fw-bold mt-3">{x.title}</h6>
                </a>
              </div>
            ))
          ) : (
            <p>No books</p>
          )}
        </div>

        <h2 className="fw-bold my-5">Your bookmarks</h2>
        <div className="book d-flex">
          {BookStore.state.bookmarks.length > 0 ? (
            BookStore.state.bookmarks.map((x, i) => <Book x={x} />)
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <h2 className="fw-bold my-5">Groups for you</h2>
        <div className="group d-flex">
          {GroupStore.state.groups.length > 0 &&
            GroupStore.state.groups.map((x, i) => (
              <div key={i}>
                {x.type === "private" &&
                !x.members.find((x) => AuthStore.auth.user.email === x) &&
                !x.members.find(
                  (x) => AuthStore.auth.user.email === x.email,
                ) ? (
                  <div></div>
                ) : (
                  <Group x={x} i={i} />
                )}
              </div>
            ))}
        </div>

        <h2 className="fw-bold my-5">Choose by genre</h2>
        {BookStore.state.genres.length > 0 ? (
          <>
            <select value={genre} onChange={(e) => setGenre(e.target.value)}>
              <option>Choose</option>
              {BookStore.state.genres.map((x) => (
                <option key={x._id} value={x.genre}>
                  {x.genre}
                </option>
              ))}
            </select>
            <div className="book d-flex">
              {BookStore.state.genreBooks.books &&
                BookStore.state.genreBooks.books.map((x) => <Book x={x} />)}
              {BookStore.state.genreBooks.stories &&
                BookStore.state.genreBooks.stories.map((x) => <Story x={x} />)}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {writeStory && <WriteStory close={setWriteStory} />}
      {writeBook && <WriteBook close={setWriteBook} />}
      {createGroup && (
        <CreateGroup close={setCreateGroup} user={AuthStore.auth.user} />
      )}
    </Fragment>
  );
});

export default withRouter(MainScreen);

const Book = ({ x }) => {
  // const [img, setImg] = useState(null);

  // const fetchImg = async () => {
  //   const data = await BookStore.getBookImg(x.book_id);
  //   setImg(data);
  // };

  // useEffect(() => {
  //   // fetchImg();
  // }, []);

  return (
    <Fragment>
      <div className="item" key={x._id}>
        <Link
          to="/cover"
          onClick={() => {
            BookStore.setBook({ ...x, book: true });
            BookStore.markRead(x.book_id, localStorage.id);
          }}>
          <img
            alt="book"
            src={
              x.imgsrc
                ? x.imgsrc
                : "http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg"
            }
            // src={
            //   img
            //     ? `data:image/png;base64,${img}`
            //     : "http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg"
            // }
          />
          <h6 className="fw-bold mt-3">{x.title}</h6>
        </Link>
      </div>
    </Fragment>
  );
};

const Story = ({ x }) => {
  // const [img, setImg] = useState(null);

  // const fetchImg = async () => {
  //   const data = await BookStore.getStoryImg(x.story_id);
  //   setImg(data);
  // };

  // useEffect(() => {
  //   // fetchImg();
  // }, []);

  return (
    <Fragment>
      <div className="item" key={x._id}>
        <Link
          to="/cover"
          onClick={() => {
            BookStore.setBook({
              ...x,
              book: false,
            });
            BookStore.markRead(x.book_id, localStorage.id);
          }}>
          <img
            alt="book"
            src={
              x.imgsrc
                ? x.imgsrc
                : "http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg"
            }
            // src={
            //   img
            //     ? `data:image/png;base64,${img}`
            //     : "http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg"
            // }
          />
          <h6 className="fw-bold mt-3">{x.title}</h6>
        </Link>
      </div>
    </Fragment>
  );
};

const Group = ({ x, i }) => {
  // const [img, setImg] = useState(null);

  // const fetchImage = async () => {
  //   const data = await GroupStore.getImage(x.title);
  //   setImg(data);
  // };

  // useEffect(() => {
  //   // fetchImage();
  // }, []);

  return (
    <Fragment>
      <div className="item me-3 mb-3">
        <img
          alt="group"
          src={
            x.imgsrc
              ? x.imgsrc
              : "http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg"
          }
          // src={
          //   img
          //     ? `data:image/png;base64,${img}`
          //     : "http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg"
          // }
        />
        <div>
          <h5 className="fw-bold">{x.title}</h5>
          <Link key={i} to="/group" onClick={() => GroupStore.setGroup(x)}>
            View
          </Link>
        </div>
      </div>
    </Fragment>
  );
};
