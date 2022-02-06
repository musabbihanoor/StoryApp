import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SpacesGroups = () => {
  const [books, setBooks] = useState(null);

  const fetchBooks = async () => {
    axios
      .get("http://18.191.249.121:4000/api/books/allbooks")
      .then((res) => setBooks(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className='spaces'>
      <div className='head mb-5'>
        <h1>
          Lorem ipsum dolor sit amet,
          <br /> consectetur adipiscing elit
          <br />
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
          <br /> ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud
          <br />
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <button className='btn btn-secondary'>Explore Groups</button>
      </div>

      <div className='group d-flex'>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((x) => (
          <div className='item me-3 mb-3'>
            <img
              className='mb-5'
              src={process.env.PUBLIC_URL + "/images/Mask_Group_5_pk.png"}
            />
            <h5 className='fw-bold'>Group Name</h5>
            <h6>description of the group</h6>
          </div>
        ))}
      </div>

      <h3 className='my-5'>Upcoming live stories</h3>
      <div className='stories d-flex'>
        {books ? (
          books.map((x) => (
            <div className='item me-3 mb-3' key={x._id}>
              <h5 className='fw-bold'>{x.title}</h5>
              <h6 className='mb-5'>1 year</h6>
              <p>Hosted by</p>
              <span className='d-flex'>
                <img
                  className='avatar me-3'
                  src='http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg'
                />
                <h5>{x.author}</h5>
              </span>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className='create-space'>
        <h3>
          Lorem ipsum dolor sit amet,
          <br />
          consectetur adipiscing elit
        </h3>
        <button className='btn btn-secondary'>Create a space</button>
      </div>

      <h2 className='fw-bold my-5'>Read stories that are being hosted</h2>
      <div className='book d-flex'>
        {books ? (
          books.map((x) => (
            <Link
              key={x._id}
              to={{
                pathname: "/story/single",
                state: {
                  bookid: x._id,
                  book: x,
                },
              }}
            >
              <div className='item mb-3'>
                <img src={x.imgsrc} />
              </div>
            </Link>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SpacesGroups;
