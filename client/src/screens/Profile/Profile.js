import React, { useEffect, useState, useContext } from "react";
import "./Profile.css";
import { userContext } from "../../App";
import { Avatar } from "@material-ui/core";

function Profile() {
  const [myPics, setMyPics] = useState([]);

  const { state, dispatch } = useContext(userContext);
  // console.log("Name: ", state.name);

  const [image, setImage] = useState("");
  // console.log(state);

  useEffect(() => {
    if (image) {
      const data = new FormData();

      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "s-p-inc");

      fetch("https://api.cloudinary.com/v1_1/s-p-inc/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log("data", data);

          // localStorage.setItem(
          //   "user",
          //   JSON.stringify({ ...state, pic: data.secure_url })
          // );

          // dispatch({ type: "UPDATEPIC", payload: data.secure_url });

          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({ pic: data.secure_url }),
          })
            .then((res) => res.json())
            .then((result) => {
              // console.log(result);

              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );

              dispatch({ type: "UPDATEPIC", payload: result.pic });
            });
        })
        .catch((err) => console.log(err));
    }
  }, [image]);

  const uploadPic = (file) => {
    setImage(file);
  };

  useEffect(() => {
    fetch("/myposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setMyPics(result.mypost);
      });

    return () => {};
  }, []);

  return (
    <div className="profile">
      <div className="profile__userDetails">
        <div className="profile__userAvatar">
          <img src={state ? state.pic : "loading"} alt="" />{" "}
          {/* <div className="btn-floating btn-small waves-effect waves-light red profile__updateProfileBtn">
            <i className="material-icons">update</i>
            <input type="file" className="profile__updateProfileInput" />
          </div> */}
          <div className="file-field input-field ">
            <div className="btn blue lighten-1 profile__updateProfileBtn btn waves-effect waves-light">
              <span>Update Pic</span>
              <input
                type="file"
                onChange={(e) => uploadPic(e.target.files[0])}
              />
            </div>

            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </div>

        <div className="profile__userData">
          <h4>{state?.name}</h4>

          <div className="user__pff">
            <span>
              <strong>{myPics?.length}</strong> posts
            </span>
            <span>
              <strong>{state?.followers?.length}</strong> followers
            </span>
            <span>
              <strong>{state?.following?.length}</strong> following
            </span>
          </div>
        </div>
      </div>

      <div className="profile__gallery">
        {myPics.map((item) => (
          <img
            src={item.photo}
            alt=""
            className="profile__galleryItem"
            key={item._id}
          />
        ))}
        {/* <img
          src="https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80"
          alt=""
          className="profile__galleryItem"
        /> */}
      </div>
    </div>
  );
}

export default Profile;
