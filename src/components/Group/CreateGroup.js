import React, { useState } from "react";
import { GroupStore } from "../../store/group";
import { AuthStore } from "../../store/auth";
import { uploadImage } from "../utils/imageUpload";
import axios from "axios";
import { BASE_URL } from "../../store/url";

const CreateGroup = ({ close, user }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("public");
  const [image, setImage] = useState("");
  const [next, setNext] = useState(false);
  const [wait, setWait] = useState(false);
  const [imgsrc, setImgsrc] = useState({});
  const [description, setDescription] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    var formdata = new FormData();
    formdata.append("title", title);
    formdata.append("type", type);
    // formdata.append("picture", imgsrc);
    formdata.append("description", description);
    formdata.append("imgsrc", image);
    formdata.append("admin", localStorage.id);

    const data = {
      title: title,
      type: type,
      description: description,
      imgsrc: image,
      admin: localStorage.id,
    };

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    // try {
    //   const res = await axios.post(
    //     `${BASE_URL}/groups/creategroup`,
    //     data,
    //     config,
    //   );
    //   console.log(res);
    //   // this.state.groups = [
    //   //   ...this.state.groups,
    //   //   {
    //   //     ...res.data.data,
    //   //     members: [
    //   //       { email: user.email, name: user.name, imgsrc: user.imgsrc },
    //   //     ],
    //   //   },
    //   // ];
    //   // this.state.group = res.data.data;
    //   // this.joinGroup({ title: res.data.data.title, email: user.email });
    // } catch (err) {
    //   console.log(err);
    //   // this.state = { ...this.state, err: err };
    // }

    GroupStore.createGroup(data, user);
    close(false);
  };

  const fileUpload = async (file) => {
    setWait(true);
    const image_url = await uploadImage(file);
    console.log(image_url, "UPLOADED URL");
    setImage(image_url);
    setWait(false);
    setNext(true);
  };

  return (
    <div className="absolute">
      <div className="absolute-content write-story ">
        <button className="absolute-close" onClick={() => close(false)}>
          <i className="fa fa-times"></i>
        </button>
        <h1>create a group</h1>
        <form className="d-flex flex-column" onSubmit={(e) => onSubmit(e)}>
          <div className="d-flex justify-content-between">
            <span>
              <label>group topic</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </span>
            <span>
              <label>choose privacy</label>
              <select
                onChange={(e) => setType(e.target.value)}
                style={{ margin: 0, height: 45 }}>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </span>
          </div>
          <span>
            <div className="img">
              <img
                alt="file"
                src={process.env.PUBLIC_URL + "/images/file.png"}
              />
              <p>{imgsrc.name ? imgsrc.name : "Select"}</p>
              <label>
                Upload
                <input
                  type="file"
                  onChange={(e) => {
                    fileUpload(e.target.files[0]);
                    // setImgsrc(e.target.files[0]);
                  }}
                />
              </label>
            </div>
            {wait && (
              <p style={{ color: "gray", marginTop: 5 }}>Please wait!</p>
            )}
          </span>
          <label>about group</label>
          <textarea
            style={{ background: "#eee", height: 300 }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {next && title !== "" && (
            <button
              type="submit"
              className="btn btn-primary btn-purple align-self-center mt-3">
              Create
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
