import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthStore } from "../../store/auth";

const Profile = () => {
  const [switched, setSwitched] = useState(false);

  return (
    <div className="profile">
      <div className="bg">
        <div className="content">
          <button className="back">
            <i className="fa fa-arrow-left"></i>
          </button>
          <div className="user">
            <div className="left">
              <img alt="profile" src={AuthStore.auth.user.imgsrc} />
              <h1>{AuthStore.auth.user.name}</h1>
              <div className="switch">
                <button
                  className={`${switched && "switched"}`}
                  onClick={() => setSwitched(!switched)}>
                  <i className="fa fa-circle"></i>
                </button>
                <p>switch to reader</p>
              </div>
            </div>
            <div className="right">
              <h1>{AuthStore.auth.user.name}</h1>
              <div className="about">
                <h2>about</h2>
                <p>
                  Amet labore ullamco ea id ex tempor anim nostrud anim. Commodo
                  amet aliqua excepteur laboris et sit nisi occaecat laborum
                  incididunt. Sunt deserunt proident anim anim eu Lorem sunt
                  culpa consequat. Qui mollit nulla qui ipsum incididunt
                  cupidatat voluptate.
                </p>
              </div>
              <h2>D.O.B</h2>
              <div className="dob">
                <p>20</p>
                <p>08</p>
                <p>2022</p>
              </div>
            </div>
          </div>

          <div className="books ">
            <h1>My Books</h1>
            <div className="list">
              {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((x, i) => (
                <img
                  key={i}
                  alt="cover"
                  src="https://images-na.ssl-images-amazon.com/images/I/61ZKNw0xixL.jpg"
                />
              ))}
            </div>
          </div>

          <div className="books">
            <h1>My Stories</h1>
            <div className="list">
              {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((x, i) => (
                <img
                  key={i}
                  alt="cover"
                  src="https://images-na.ssl-images-amazon.com/images/I/61ZKNw0xixL.jpg"
                />
              ))}
            </div>
          </div>

          <div className="books groups">
            <h1>Groups for you</h1>
            <div className="list">
              {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((x, i) => (
                <div className="item me-3 mb-3">
                  <img
                    alt="group"
                    src="http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg"
                  />
                  <div>
                    <h5 className="fw-bold">amueso</h5>
                    <Link>View</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
