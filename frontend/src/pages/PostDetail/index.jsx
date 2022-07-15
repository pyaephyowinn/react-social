import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdArrowBack } from "react-icons/md";

import styles from "./index.module.css";
import useHttp from "../../hooks/use-http";
import { getPost, addComment } from "../../api/postAPI";
import { formatTime } from "../../helpers/formatTime";
import Comment from "../../components/Post/Comment";

const PostDetail = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const params = useParams();
  const { pid } = params;

  const [commentTxt, setCommentTxt] = useState("");

  const {
    sendRequest: fetchPost,
    data: post,
    error,
    status,
  } = useHttp(getPost);

  useEffect(() => {
    fetchPost(token, pid);
  }, [fetchPost, token, pid]);

  let time;
  if (status === "completed" && !error) {
    time = formatTime(post.createdAt);
  }

  const commentTxtChgHandler = (e) => {
    setCommentTxt(e.target.value);
  };

  const { sendRequest: addNewComment, error: addCommentError } =
    useHttp(addComment);

  const submitCommentHandler = async (e) => {
    e.preventDefault();
    const comment = {
      content: commentTxt,
    };
    await addNewComment(token, pid, comment);
    setCommentTxt("")
    fetchPost(token, pid);
  };

  const clickOnBackHandler = () => {
    navigate(-1);
  };

  return (
    <>
      {error}
      {status === "sending" && <p>loading...</p>}
      {status === "completed" && !error && (
        <div className={styles.container}>
          <div className={styles["btn-back"]} onClick={clickOnBackHandler}>
            <MdArrowBack />
          </div>
          <section className={styles.info}>
            <Link className={styles["user-link"]} to={"/" + post.author._id}>
              <span className={styles.name}>@{post.author.username}</span>
            </Link>
            <span className={styles.date}>{time}</span>
            <p className={styles.content}>{post.content}</p>
          </section>
          <form onSubmit={submitCommentHandler} className={styles.reply}>
            <div className={styles["form-group"]}>
              <input
                value={commentTxt}
                onChange={commentTxtChgHandler}
                type="text"
                name="username"
                id="username"
                placeholder="Write a comment"
                required
                autoFocus
              />
            </div>
          </form>
          {addCommentError}
          <main className={styles["comments-box"]}>
            {post.comments.length === 0 && <p>no comments yet</p>}
            {post.comments.map((comment) => (
              <Comment
                fetchPost={fetchPost}
                comment={comment}
                key={comment._id}
              />
            ))}
          </main>
        </div>
      )}
    </>
  );
};
export default PostDetail;
