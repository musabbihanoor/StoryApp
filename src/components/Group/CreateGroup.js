import React, { useState } from "react";
import { GroupStore } from "../../store/group";
import { AuthStore } from "../../store/auth";

const CreateGroup = ({ close, user }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("public");
  const [imgsrc, setImgsrc] = useState({});
  const [description, setDescription] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    var formdata = new FormData();
    formdata.append("title", title);
    formdata.append("type", type);
    formdata.append("picture", imgsrc);
    formdata.append("description", description);
    formdata.append("imgsrc", "...");
    formdata.append("admin", localStorage.id);

    GroupStore.createGroup(formdata, user);
    close(false);
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
                    setImgsrc(e.target.files[0]);
                  }}
                />
              </label>
            </div>
          </span>
          <label>about group</label>
          <textarea
            style={{ background: "#eee", height: 300 }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary btn-purple align-self-center mt-3">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
