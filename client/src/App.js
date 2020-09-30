import React, { createContext, useReducer, useEffect, useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./screens/Home/Home";
import Signup from "./screens/Signup";
import Profile from "./screens/Profile/Profile";
import Login from "./screens/Login";
import CreatePost from "./screens/CreatePost/CreatePost";
import { initialState, reducer } from "./reducers/userReducer";
import UserProfile from "./screens/UserProfile/UserProfile";
import SubUserPost from "./screens/SubUserPosts/SubUserPost";
export const userContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(userContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/login");
    }
    return () => {};
  }, []);

  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route exact path="/profile">
        <Profile />
      </Route>

      <Route path="/create-post">
        <CreatePost />
      </Route>

      <Route path="/profile/:userid">
        <UserProfile />
      </Route>

      <Route path="/myfollowingpost">
        <SubUserPost />
      </Route> 
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="app">
      <userContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Navbar />
          <Routing />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
