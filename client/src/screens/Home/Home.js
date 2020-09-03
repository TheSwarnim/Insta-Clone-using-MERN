import React, { useState, useEffect, useContext } from "react";
import HomeCard from "../../components/HomeCard";
import { userContext } from "../../App";

function Home() {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(userContext);

  useEffect(() => {
    fetch("/allposts", {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setData(result.posts);
      });

    return () => {};
  }, []);

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);

        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });

        setData(newData);
        console.log(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);

        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });

        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (text, postId) => {
    fetch("/comments", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId, text }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);

        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });

        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const deletePost = (postId) => {
    fetch(`/deletepost/${postId}`, {
      method: "delete",
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);

        const newData = data.filter((item) => {
          return item._id !== result._id;
        });

        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <div className="home__storyCrowser"></div>
      <div className="home__card">
        {data?.map((item) => (
          <HomeCard
            name={item.postedBy.name}
            imgsrc={item.photo}
            title={item.title}
            para={item.body}
            key={item._id}
            likesLen={item.likes.length}
            likePost={likePost}
            unlikePost={unlikePost}
            id={item._id}
            isIncluded={item.likes.includes(state._id) ? true : false}
            makeComment={makeComment}
            comments={item.comments}
            userId={item.postedBy._id}
            deletePost={deletePost}
          />
        ))}
        {/* <HomeCard
          name={"Swarnim"}
          imgsrc={
            "https://images.unsplash.com/photo-1536890274788-51861e124205?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
          }
          title={"Sunset"}
          para={"This is beautiful sunset"}
        /> */}
      </div>
    </div>
  );
}

export default Home;
