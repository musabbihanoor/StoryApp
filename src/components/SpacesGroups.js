import React from "react";

const SpacesGroups = () => {
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
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((x) => (
          <div className='item me-3 mb-3'>
            <h5 className='fw-bold'>Story Title</h5>
            <h6 className='mb-5'>Expected time</h6>
            <p>Hosted by</p>
            <span className='d-flex'>
              <img
                className='avatar me-3'
                src='https://api.time.com/wp-content/uploads/2018/04/listening-to-music-headphones.jpg?quality=85&w=1200&h=628&crop=1'
              />
              <h5>Host Name</h5>
            </span>
          </div>
        ))}
      </div>

      <h2 className='fw-bold my-5'>Read stories that are being hosted</h2>
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

export default SpacesGroups;
