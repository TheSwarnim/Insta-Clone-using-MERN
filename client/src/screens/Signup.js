import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);

  const history = useHistory();

  useEffect(() => {
    if (url) {
      uploadFields();
    }

    return () => {};
  }, [url]);

  const uploadFields = () => {
    var strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    let name = "";

    if (firstName && lastName) {
      name = firstName + " " + lastName;
    }

    if (!re.test(email)) {
      M.toast({
        html: "Invalid email 😔",
        classes: "red darken-3",
      });
    } else {
      fetch("/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          password: password,
          email: email,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "red darken-3" });
          } else {
            M.toast({ html: data.message, classes: "green darken-1" });
            history.push("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // if (!strongRegex.test(password)) {
    //   M.toast({
    //     html: "Please enter strong passoword",
    //     classes: "red darken-3",
    //   });
    // }
  };

  const sendSignupData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
  };

  const uploadPic = () => {
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
  };

  return (
    <div className="signin">
      <div className="card signin__card">
        <div className="card-content dark-text">
          <span className="card-title brand-logo">Instagram</span>
          <div className="row input-field">
            {/* <form className="col s12" onSubmit={sendSignupData}> */}
            <div className="row">
              <div className="input-field col s6">
                <input
                  id="first_name"
                  type="text"
                  className="validate"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="input-field col s6">
                <input
                  id="last_name"
                  type="text"
                  className="validate"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <label htmlFor="last_name">Last Name</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  className="validate"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="password"
                  type="password"
                  className="validate"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>

            <div className="file-field input-field">
              <div className="btn blue lighten-1">
                <span>Upload Profile Pic</span>
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
              onClick={() => sendSignupData()}
            >
              Signup
            </button>
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
