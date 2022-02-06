import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SinglePage = () => {
  const location = useLocation();
  const { bookid, book } = location.state;

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
          <a className='btn btn-warning' target='_blank'>
            Bookmark
          </a>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
