import React from "react";

const LiveHosting = () => {
  return (
    <div className='hosting'>
      <img
        className='main mb-5'
        src='https://www.jagahonline.com/blog/wp-content/uploads/2020/08/Main-Title_8.jpg'
      />
      <div className='d-flex'>
        <div className='details flex-grow-1 me-5'>
          <div className='d-flex justify-content-between align-items-center'>
            <span>
              <h1>Lorem ipsum dolor sit amet</h1>
              <h6>45 mins | Hosted in English and Urdu</h6>
            </span>
            <img
              className='avatar'
              src='https://www.jagahonline.com/blog/wp-content/uploads/2020/08/Main-Title_8.jpg'
            />
          </div>
          <hr />
          <h5>About this space</h5>
          <h6>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor
          </h6>
          <h6>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor
          </h6>
          <h6>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor
          </h6>
        </div>
        <img
          className='flex-grow-1 cover'
          src='https://www.jagahonline.com/blog/wp-content/uploads/2020/08/Main-Title_8.jpg'
        />
      </div>
      <h2>See what people are saying</h2>
      <div className='responses d-flex flex-wrap'>
        {[1, 1, 1, 1, 1, 1].map((x) => (
          <div className='item my-3'>
            <span className='d-flex'>
              <img
                className='avatar me-3'
                src='https://www.jagahonline.com/blog/wp-content/uploads/2020/08/Main-Title_8.jpg'
              />
              <span>
                <h4>Username</h4>
                <p>Feedback Date</p>
              </span>
            </span>
            <h6>
              Sed ut perspiciatitsnatus error sit Sed ut perspiciatis unde omnis
              iste natus error si unde omnis iste natus error sit Sed ut
              perspiciatis unde omnis iste
            </h6>
          </div>
        ))}
      </div>

      <h2 className='fw-bold my-5'>Based on what you read</h2>
      <div className='book d-flex'>
        {[1, 1, 1, 1, 1, 1, 1].map((x) => (
          <div className='item mb-3'>
            <img src='https://www.jagahonline.com/blog/wp-content/uploads/2020/08/Main-Title_8.jpg' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveHosting;
