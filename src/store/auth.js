import axios from "axios";
import { makeObservable, observable, action } from "mobx";
import { BASE_URL } from "./url";
import setAuthToken from "../components/utils/setAuthToken";

class Auth {
  auth = {
    isAuthenticated: false,
    user: {},
    users: [],
    role: "reader",
    img: null,
    err: { login: null, signup: null },
  };

  constructor() {
    makeObservable(this, {
      auth: observable,
      register: action,
      login: action,
      logout: action,
      googleLogin: action,
      getAllUsers: action,
      setRole: action,
      editUser: action,
      uploadImage: action,
      getUserImage: action,
      loadUser: action,
    });
  }

  loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else {
      return;
    }
    try {
      const res = await axios.get(`${BASE_URL}/user/getCurrentUser`);
      this.auth = {
        ...this.auth,
        isAuthenticated: true,
        user: res.data.data.data,
        err: { ...this.auth.err, login: null, signup: null },
      };
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("imgsrc");
      this.auth = {
        ...this.auth,
        isAuthenticated: false,
        user: null,
        err: { ...this.auth.err, signup: err.response.data, login: null },
      };
    }
  };

  register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(`${BASE_URL}/user/signup/`, formData, config)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("imgsrc", res.data.data.imgsrc);
        this.loadUser();
        // this.auth = {
        //   ...this.auth,
        //   isAuthenticated: true,
        //   user: res.data.data,
        //   err: { ...this.auth.err, login: null, signup: null },
        // };
      })
      .catch((err) => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("imgsrc");
        this.auth = {
          ...this.auth,
          isAuthenticated: false,
          user: null,
          err: { ...this.auth.err, signup: err.response.data, login: null },
        };
      });
  };

  login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(`${BASE_URL}/user/login/`, formData, config)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("imgsrc", res.data.data.imgsrc);
        this.loadUser();
        // this.auth = {
        //   ...this.auth,
        //   isAuthenticated: true,
        //   user: res.data.data,
        //   err: { ...this.auth.err, login: null, signup: null },
        // };
      })
      .catch((err) => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("imgsrc");
        this.auth = {
          ...this.auth,
          isAuthenticated: false,
          user: null,
          err: { ...this.auth.err, login: err.response.data, signup: null },
        };
      });
  };

  googleLogin = async (googleData) => {
    if (googleData.error) {
      alert(googleData.error);
    } else {
      try {
        const res = await fetch("http://18.191.249.121:4000/auth/google/", {
          method: "POST",
          body: JSON.stringify({
            token: googleData.tokenId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        this.auth = {
          ...this.auth,
          isAuthenticated: true,
          user: data.data,
          err: { ...this.auth.err, login: null, signup: null },
        };
      } catch (err) {
        this.auth = {
          ...this.auth,
          isAuthenticated: false,
          user: null,
          err: { ...this.auth.err, login: err, signup: null },
        };
      }
    }
  };

  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("imgsrc");
    this.auth = {
      ...this.auth,
      isAuthenticated: false,
      user: {},
      err: { ...this.auth.err, signup: null, login: null },
    };
  };

  getAllUsers = async () => {
    const res = await axios.get(`${BASE_URL}/user/allusers`);
    this.auth.users = res.data.data;
    return res.data.data;
  };

  setRole = (role) => {
    this.auth.role = role;
  };

  editUser = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(`${BASE_URL}/user/editUser/`, formData, config)
      .then((res) => {
        this.auth = {
          ...this.auth,
          isAuthenticated: true,
          user: res.data.data,
          err: { ...this.auth.err, login: null, signup: null },
        };
      })
      .catch((err) => {
        console.log(err);
      });
  };

  uploadImage = async (formData, email) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(`${BASE_URL}/user/uploadImage/${email}`, formData, config)
      .catch((err) => {
        console.log(err);
      });
  };

  getUserImage = async (email) => {
    const data = await axios.get(`${BASE_URL}/user/getUserImage/${email}`);
    return data.data;
  };
}

export const AuthStore = new Auth();
