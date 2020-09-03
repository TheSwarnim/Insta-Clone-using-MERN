import React, { useState, useEffect } from "react";
import "./CreatePost.css";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "red darken-3" });
          } else {
            M.toast({
              html: "Posted Successfully",
              classes: "green darken-1",
            });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return () => {};
  }, [url]);

  const postDetails = () => {
    const data = new FormData();

    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "s-p-inc");

    fetch("https://api.cloudinary.com/v1_1/s-p-inc/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.secure_url))
      .catch((err) => console.log(err));
    // console.log("Authen", "Bearer:" + localStorage.getItem("jwt"));
  };

  return (
    <div className="createPost">
      <div className="card homeCard__card">
        <div className="card-content">
          {/* <form action="#"> */}
          <div className="row">
            <div className="input-field col s12">
              <input
                id="title"
                type="text"
                className="validate"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="title">Title</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="body"
                type="text"
                className="validate"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <label htmlFor="body">Body</label>
            </div>
          </div>

          <div className="file-field input-field">
            <div className="btn blue lighten-1">
              <span>Upload Image</span>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>

          <button
            className="btn waves-effect waves-light blue lighten-1"
            // type="submit"
            // name="action"
            onClick={() => postDetails()}
          >
            Submit Post
          </button>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
