import axios from "axios";
import { makeObservable, observable, action } from "mobx";
import { BASE_URL } from "./url";

class Group {
  state = {
    groups: [],
    group: {},
    messages: [],
    members: [],
    err: {},
  };

  constructor() {
    makeObservable(this, {
      state: observable,
      createGroup: action,
      getGroups: action,
      joinGroup: action,
      getMessages: action,
      createMessage: action,
      updateGroup: action,
      getImage: action,
    });
  }

  setGroup = (group) => {
    this.state.group = group;
  };

  createGroup = async (formData, user) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(`${BASE_URL}/groups/creategroup`, formData, config)
      .then((res) => {
        this.state.groups = [
          ...this.state.groups,
          {
            ...res.data.data,
            members: [
              { email: user.email, name: user.name, imgsrc: user.imgsrc },
            ],
          },
        ];
        this.state.group = res.data.data;
        this.joinGroup({ title: res.data.data.title, email: user.email });
      })
      .catch((err) => {
        this.state = { ...this.state, err: err };
      });
  };

  getGroups = async () => {
    axios
      .get(`${BASE_URL}/groups/getallgroups`)
      .then((res) => (this.state = { ...this.state, groups: res.data.data }))
      .catch((err) => (this.state = { ...this.state, err: err }));
  };

  joinGroup = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(`${BASE_URL}/groups/joingroup`, formData, config)
      .then(
        (res) =>
          (this.state.groups = this.state.groups.map((x) =>
            x._id === res.data.data._id ? res.data.data : x,
          )),
      )
      .catch((err) => {
        this.state.err = err;
      });
  };

  getMessages = async () => {
    axios
      .get(`${BASE_URL}/chats/allchats`)
      .then((res) => (this.state.messages = res.data.message))
      .catch((err) => (this.state = { ...this.state, err: err }));
  };

  createMessage = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(`${BASE_URL}/chats/send`, formData, config)
      .then((res) => (this.state.group.forum = res.data.message))
      .catch((err) => (this.state = { ...this.state, err: err }));
  };

  updateGroup = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios.post(`${BASE_URL}/chats/editChats`, formData, config).then((res) => {
      this.state.group = res.data.data;
    });
  };

  getImage = async (title) => {
    const data = await axios.get(`${BASE_URL}/groups/getGroupImage/${title}`);
    return data.data;
  };
}
export const GroupStore = new Group();
