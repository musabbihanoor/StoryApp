import React from "react";

const MainScreen = () => {
  return (
    <div className='main'>
      <h1 className='fw-bold mb-5'>Welcome back, Rehman</h1>
      <div className='ad d-flex justify-content-between'>
        <div className='item'>
          <img src='https://www.jagahonline.com/blog/wp-content/uploads/2020/08/Main-Title_8.jpg' />
          <h6 className='fw-bold mt-3'>
            Planning for a picnic? We've got you covered
          </h6>
        </div>
        <div className='item'>
          <img src='https://image.made-in-china.com/2f0j00jbyRBsJqycoE/2020-New-Good-Quality-English-Story-Kids-Children-Books-Printing-for-Child-Book.jpg' />
          <h6 className='fw-bold mt-3'>The story time with Jessica</h6>
        </div>
        <div className='item'>
          <img src='https://api.time.com/wp-content/uploads/2018/04/listening-to-music-headphones.jpg?quality=85&w=1200&h=628&crop=1' />
          <h6 className='fw-bold mt-3'>Listen and scream</h6>
        </div>
      </div>
      <h2 className='fw-bold my-5'>Top picks for you</h2>
      <div className='book d-flex'>
        <div className='item'>
          <img src='https://www.jagahonline.com/blog/wp-content/uploads/2020/08/Main-Title_8.jpg' />
          <h6 className='fw-bold mt-3'>
            Planning for a picnic? We've got you covered
          </h6>
        </div>
        <div className='item'>
          <img src='https://image.made-in-china.com/2f0j00jbyRBsJqycoE/2020-New-Good-Quality-English-Story-Kids-Children-Books-Printing-for-Child-Book.jpg' />
          <h6 className='fw-bold mt-3'>The story time with Jessica</h6>
        </div>
        <div className='item'>
          <img src='https://api.time.com/wp-content/uploads/2018/04/listening-to-music-headphones.jpg?quality=85&w=1200&h=628&crop=1' />
          <h6 className='fw-bold mt-3'>Listen and scream</h6>
        </div>
        <div className='item'>
          <img src='https://www.jagahonline.com/blog/wp-content/uploads/2020/08/Main-Title_8.jpg' />
          <h6 className='fw-bold mt-3'>
            Planning for a picnic? We've got you covered
          </h6>
        </div>
        <div className='item'>
          <img src='https://image.made-in-china.com/2f0j00jbyRBsJqycoE/2020-New-Good-Quality-English-Story-Kids-Children-Books-Printing-for-Child-Book.jpg' />
          <h6 className='fw-bold mt-3'>The story time with Jessica</h6>
        </div>
        <div className='item'>
          <img src='https://api.time.com/wp-content/uploads/2018/04/listening-to-music-headphones.jpg?quality=85&w=1200&h=628&crop=1' />
          <h6 className='fw-bold mt-3'>Listen and scream</h6>
        </div>
        <div className='item'>
          <img src='https://www.jagahonline.com/blog/wp-content/uploads/2020/08/Main-Title_8.jpg' />
          <h6 className='fw-bold mt-3'>
            Planning for a picnic? We've got you covered
          </h6>
        </div>
        <div className='item'>
          <img src='https://image.made-in-china.com/2f0j00jbyRBsJqycoE/2020-New-Good-Quality-English-Story-Kids-Children-Books-Printing-for-Child-Book.jpg' />
          <h6 className='fw-bold mt-3'>The story time with Jessica</h6>
        </div>
        <div className='item'>
          <img src='https://api.time.com/wp-content/uploads/2018/04/listening-to-music-headphones.jpg?quality=85&w=1200&h=628&crop=1' />
          <h6 className='fw-bold mt-3'>Listen and scream</h6>
        </div>
      </div>
      <h2 className='fw-bold my-5'>See what's happening around you</h2>
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
      <h2 className='fw-bold my-5'>Based on what you read</h2>
      <div className='book d-flex'>
        <div className='item'>
          <img src='https://www.jagahonline.com/blog/wp-content/uploads/2020/08/Main-Title_8.jpg' />
          <h6 className='fw-bold mt-3'>
            Planning for a picnic? We've got you covered
          </h6>
        </div>
        <div className='item'>
          <img src='https://image.made-in-china.com/2f0j00jbyRBsJqycoE/2020-New-Good-Quality-English-Story-Kids-Children-Books-Printing-for-Child-Book.jpg' />
          <h6 className='fw-bold mt-3'>The story time with Jessica</h6>
        </div>
        <div className='item'>
          <img src='https://api.time.com/wp-content/uploads/2018/04/listening-to-music-headphones.jpg?quality=85&w=1200&h=628&crop=1' />
          <h6 className='fw-bold mt-3'>Listen and scream</h6>
        </div>
        <div className='item'>
          <img src='https://www.jagahonline.com/blog/wp-content/uploads/2020/08/Main-Title_8.jpg' />
          <h6 className='fw-bold mt-3'>
            Planning for a picnic? We've got you covered
          </h6>
        </div>
        <div className='item'>
          <img src='https://image.made-in-china.com/2f0j00jbyRBsJqycoE/2020-New-Good-Quality-English-Story-Kids-Children-Books-Printing-for-Child-Book.jpg' />
          <h6 className='fw-bold mt-3'>The story time with Jessica</h6>
        </div>
        <div className='item'>
          <img src='https://api.time.com/wp-content/uploads/2018/04/listening-to-music-headphones.jpg?quality=85&w=1200&h=628&crop=1' />
          <h6 className='fw-bold mt-3'>Listen and scream</h6>
        </div>
        <div className='item'>
          <img src='https://www.jagahonline.com/blog/wp-content/uploads/2020/08/Main-Title_8.jpg' />
          <h6 className='fw-bold mt-3'>
            Planning for a picnic? We've got you covered
          </h6>
        </div>
        <div className='item'>
          <img src='https://image.made-in-china.com/2f0j00jbyRBsJqycoE/2020-New-Good-Quality-English-Story-Kids-Children-Books-Printing-for-Child-Book.jpg' />
          <h6 className='fw-bold mt-3'>The story time with Jessica</h6>
        </div>
        <div className='item'>
          <img src='https://api.time.com/wp-content/uploads/2018/04/listening-to-music-headphones.jpg?quality=85&w=1200&h=628&crop=1' />
          <h6 className='fw-bold mt-3'>Listen and scream</h6>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
