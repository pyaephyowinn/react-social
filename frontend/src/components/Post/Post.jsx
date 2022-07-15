import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLike, AiFillLike, AiOutlineComment } from "react-icons/ai";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import useHttp from "../../hooks/use-http";
import { toggleLike, deletePost } from "../../api/postAPI";
import styles from "./Post.module.css";
import { formatTime } from "../../helpers/formatTime";

const Post = ({ post, allowDelete, refresh }) => {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  const likeIndex = post.likes.findIndex((likedUser) => likedUser === user.id);

  let initialLikeStatus = false;
  if (likeIndex !== -1) {
    initialLikeStatus = true;
  }
  const [likePost, toggleLikePost] = useState(initialLikeStatus);

  let initialLikeCount = post.likes.length;
  const [likeCount, toggleLikeCount] = useState(initialLikeCount);

  const time = formatTime(post.createdAt);

  let iconLike = (
    <span className={styles.icon}>
      <AiOutlineLike />
    </span>
  );

  if (likePost) {
    iconLike = (
      <span className={styles.icon}>
        <AiFillLike />
      </span>
    );
  }

  const { sendRequest: handleToggleLike } = useHttp(toggleLike);

  const toggleLikeHandler = async () => {
    handleToggleLike(token, post._id);
    //should have used useReducer hook
    toggleLikePost((prev) => !prev);
    toggleLikeCount((prevCount) => {
      if (likePost) {
        return prevCount - 1;
      }
      return prevCount + 1;
    });
  };

  const clickCommentBoxHandler = () => {
    navigate(`/${post.author._id}/posts/${post._id}`);
  };

  const {
    sendRequest: handleDeletePost,
    data,
    error,
    status,
  } = useHttp(deletePost);
  if (error) {
    console.log("ERROR", error);
  }
  if (status === "completed") {
    console.log(data);
  }

  const alertOptions = {
    title: "Delete the post",
    message: "Are you sure to do this.",
    buttons: [
      {
        label: "Yes",
        onClick: async () => {
          await handleDeletePost(token, post._id);
          refresh();
        },
      },
      {
        label: "No",
      },
    ],
  }

  const clickDeleteHandler = async () => {
    // await handleDeletePost(token, post._id)
    confirmAlert(alertOptions);
  };

  return (
    <div className={styles["post-container"]}>
      <div className={styles.info}>
        <div>
          <Link className={styles["user-link"]} to={"/" + post.author._id}>
            <span className={styles.name}>@{post.author.username}</span>
          </Link>
          <span className={styles.date}>{time}</span>
        </div>
        {allowDelete && (
          <button onClick={clickDeleteHandler} className={styles["btn-delete"]}>
            Delete
          </button>
        )}
      </div>
      <p className={styles.content}>{post.content}</p>
      <div className={styles.actions}>
        <div onClick={toggleLikeHandler} className={styles["like-box"]}>
          {iconLike}
          {likeCount}
        </div>
        <div onClick={clickCommentBoxHandler} className={styles["comment-box"]}>
          <span className={styles.icon}>
            <AiOutlineComment />
          </span>
          {post.comments?.length}
        </div>
      </div>
    </div>
  );
};
export default Post;
