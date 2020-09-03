import React, { useEffect, useState, useContext } from "react";
import { userContext } from "../../App";
import "./UserProfile.css";
import { useParams } from "react-router-dom";

function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);

  const { state, dispatch } = useContext(userContext);

  const { userid } = useParams();
  //   console.log(userid);

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);

        setUserProfile(result);
      });

    return () => {};
  }, []);

  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ followId: userid }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });

        localStorage.setItem("user", JSON.stringify(data));

        setUserProfile((prevState) => {
          // console.log(prevState);

          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });

        // console.log(userProfile);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unfollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ unfollowId: userid }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });

        localStorage.setItem("user", JSON.stringify(data));

        setUserProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item != data._id
          );

          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {userProfile ? (
        <div className="profile">
          <div className="profile__userDetails">
            <div className="profile__userAvatar">
              <img src={userProfile?.user?.pic} alt="" />
            </div>

            <div className="profile__userData">
              <h4>{userProfile?.user?.name}</h4>
              <h5>{userProfile?.user?.email}</h5>

              <div className="user__pff">
                <span>
                  <strong>{userProfile?.posts?.length}</strong> posts
                </span>
                <span>
                  <strong>{userProfile?.user?.followers?.length}</strong>{" "}
                  followers
                </span>
                <span>
                  <strong>{userProfile?.user?.following?.length}</strong>{" "}
                  following
                </span>
              </div>

              <button
                className="btn waves-effect waves-light blue lighten-1"
                onClick={() => {
                  userProfile.user.followers.includes(state._id)
                    ? unfollowUser()
                    : followUser();
                }}
              >
                {userProfile.user.followers.includes(state._id)
                  ? "Unfollow"
                  : "Follow"}
              </button>
            </div>
          </div>

          <div className="profile__gallery">
            {userProfile.posts.map((item) => (
              <img
                src={item.photo}
                alt=""
                className="profile__galleryItem"
                key={item._id}
              />
            ))}
          </div>
        </div>
      ) : (
        <h2>loading...</h2>
      )}
    </>
  );
}

export default UserProfile;
