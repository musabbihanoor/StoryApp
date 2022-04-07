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
    });
  }

  createGroup = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(`${BASE_URL}/groups/creategroup`, formData, config)
      .then(
        (res) =>
          (this.state = {
            ...this.state,
            groups: [...this.state.groups, res.data],
          }),
      )
      .catch((err) => (this.state = { ...this.state, err: err }));
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
          (this.state = {
            ...this.state,
            members: [...this.state.members, res.data],
          }),
      )
      .catch((err) => (this.state = { ...this.state, err: err }));
  };

  getMessages = async () => {
    axios
      .get(`${BASE_URL}/chats/allchats`)
      .then((res) => (this.state = { ...this.state, messages: res.data.data }))
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
      .then(
        (res) =>
          (this.state = {
            ...this.state,
            messages: [...this.state.messages, res.data],
          }),
      )
      .catch((err) => (this.state = { ...this.state, err: err }));
  };
}
export const GroupStore = new Group();
