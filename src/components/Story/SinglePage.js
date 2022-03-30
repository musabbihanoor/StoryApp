import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

const SinglePage = ({ user: { _id } }) => {
  const location = useLocation();
  const { bookid, book } = location.state;
  let history = useHistory();

  const createBookmark = async () => {
    axios
      .post(`http://18.191.249.121:4000/api/books/bookmark/${_id}/${bookid}`)
      .then((res) => {
        console.log(res);
        history.goBack();
      })
      .catch((err) => console.log(err));
  };

  //const [book, setBook] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get(`http://18.191.249.121:4000/api/books/booksbyId/${bookid}`)
  //     .then((res) => {
  //       setBook(res.data);
  //       console.log(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, [bookid]);

  return (
    <div className='story-single'>
      <button
        className='btn btn-outline-primary mb-3'
        onClick={(e) => history.goBack()}
      >
        Go back
      </button>
      <h1>{book.title}</h1>
      <div className='page mx-auto mt-5'>
        <img src={book.imgsrc} />
        <h2>{book.author}</h2>
        <h3 className='text-primary'>Published on: {book.published}</h3>
        <h5>
          Genre:
          {book.genre.map((x) => (
            <span key={x}>{x}</span>
          ))}
        </h5>
        <div>
          {book.booksrc && (
            <a
              className='btn btn-success me-2'
              target='_blank'
              href={book.booksrc}
            >
              Read
            </a>
          )}
          <button
            onClick={() => createBookmark()}
            className='btn btn-warning'
            target='_blank'
          >
            Bookmark
          </button>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
