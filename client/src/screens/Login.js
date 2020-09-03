import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";
import { userContext } from "../App";

function Login() {
  const { state, dispatch } = useContext(userContext);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  const sendLoginData = () => {
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    // console.log(email, password);
    if (!re.test(email)) {
      M.toast({
        html: "Invalid email 😔",
        classes: "red darken-3",
      });
    } else {
      fetch("/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          email: email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "red darken-3" });
          } else {
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            dispatch({ type: "USER", payload: data.user });

            M.toast({
              html: "Signined Successfully",
              classes: "green darken-1",
            });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="login">
      <div className="card login__card">
        <div className="card-content dark-text">
          <span className="card-title brand-logo">Instagram</span>
          <div className="row input-field">
            {/* <form className="col s12" onSubmit={sendLoginData}> */}
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

            <button
              className="btn waves-effect waves-light blue lighten-1"
              // type="submit"
              // name="action"
              onClick={() => sendLoginData()}
            >
              Login
            </button>
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
