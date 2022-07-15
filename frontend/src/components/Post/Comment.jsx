import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./Comment.module.css";
import { formatTime } from "../../helpers/formatTime";
import useHttp from "../../hooks/use-http";
import { deleteComment } from "../../api/postAPI";

const Comment = ({ comment, fetchPost }) => {
  const params = useParams();
  const { pid } = params
  const { token, user } = useSelector((state) => state.auth);
  const time = formatTime(comment.createdAt);

  const {sendRequest: deleteCommentHandler } = useHttp(deleteComment)

  const clickDeleteHandler = async () => {
    await deleteCommentHandler(token, pid, comment._id)
    fetchPost(token, pid)
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <Link className={styles.username} to={`/${comment.author._id}`}>
            {comment.author.username}
          </Link>
          <span className={styles.time}>{time}</span>
        </div>
        <div>
          {user.id === comment.author._id && (
            <button onClick={clickDeleteHandler} className={styles["btn-delete"]}>Delete</button>
          )}
        </div>
      </header>
      <p className={styles.content}>{comment.content}</p>
    </div>
  );
};
export default Comment;
