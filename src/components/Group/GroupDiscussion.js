import React from "react";

const GroupDiscussion = () => {
  return <div className="discussion">
    <div className="account d-flex">
      <img alt='profile' src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"/>
      <span>
        <h2>amueso</h2>
        <p>Group Admin</p>
      </span>
    </div>
    <h1>5 best books you need to read</h1>
    <span className="d-flex">
      <p className="mx-2">2 comments</p>
      <p className="mx-2">250 share</p>
    </span>
    <form className="d-flex">
      <input style={{width: '100%'}}/>
      <button className="btn btn-primary btn-purple" style={{marginLeft: '-70px'}}>Send</button>
    </form>
    <div className="comment d-flex mt-3">
      <img alt="profile" src='https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg'/>
      <span>
        <h3>Dedicated4life <span>4hr ago</span></h3>
        <p>Rich Dad poor dad</p>
      </span>
    </div>
    <div className="comment d-flex mt-3">
      <img alt="profile" src='https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg'/>
      <span>
        <h3>Dedicated4life <span>4hr ago</span></h3>
        <p>Rich Dad poor dad</p>
      </span>
    </div>
  </div>;
};

export default GroupDiscussion;
