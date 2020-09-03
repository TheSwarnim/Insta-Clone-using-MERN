import React, { useContext } from "react";
import "./HomeCard.css";
import { userContext } from "../App";
import { Link } from "react-router-dom";

function HomeCard({
  name,
  imgsrc,
  title,
  para,
  likesLen,
  likePost,
  unlikePost,
  id,
  isIncluded,
  makeComment,
  comments,
  userId,
  deletePost,
}) {
  const { state, dispatch } = useContext(userContext);

  const showComments = (comments) => {
    return comments.map((record) => {
      return (
        <h6 key={record._id}>
          <span className="home__postedByComment">{record.postedBy.name} </span>
          {record.text}
        </h6>
      );
    });
  };

  return (
    <div className="homeCard">
      <div className="card homeCard__card">
        <div className="card-content">
          <span className="card-title">
            <Link
              to={userId !== state._id ? "/profile/" + userId : "/profile/"}
            >
              {name}
            </Link>

            {userId == state._id && (
              <i
                className="material-icons homeCard__deletePost"
                onClick={() => {
                  deletePost(id);
                }}
              >
                delete
              </i>
            )}
          </span>
          <div className="card-image">
            <img src={imgsrc} alt="" />
          </div>

          <br />

          <i className="material-icons homeCard__favorite">favorite</i>
          {isIncluded ? (
            <i className="material-icons" onClick={() => unlikePost(id)}>
              thumb_down
            </i>
          ) : (
            <i className="material-icons" onClick={() => likePost(id)}>
              thumb_up
            </i>
          )}

          <h6>{likesLen} likes</h6>

          <span className="card-title">{title}</span>
          <p>{para}</p>

          {showComments(comments)}

          <div className="homeCard__inputField col s6 homeCard__input">
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                makeComment(e.target[0].value, id);
              }}
            >
              <input
                type="text"
                className="validate"
                placeholder="Add a comment"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCard;
