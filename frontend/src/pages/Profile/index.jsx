import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import styles from "./index.module.css";
import useHttp from "../../hooks/use-http";
import { getUserDetail } from "../../api/userAPI";
import Post from "../../components/Post/Post";
import { reset } from '../../store/authSlice'

const Profile = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  const {
    sendRequest: fetchUserDetail,
    data,
    error,
    status,
  } = useHttp(getUserDetail);

  useEffect(() => {
    fetchUserDetail(token, user.id);
  }, [fetchUserDetail, token, user.id]);

  const refreshPage = () => {
    fetchUserDetail(token, user.id);
  };

  const alertOptions = {
    title: "Log out",
    message: "Are you sure to do this.",
    buttons: [
      {
        label: "Yes",
        onClick: () => {
          console.log("Click Yes");
          localStorage.removeItem('rsToken');
          dispatch(reset());
        },
      },
      {
        label: "No",
      },
    ],
  }

  const logoutHandler = () => {
    confirmAlert(alertOptions)
  }

  return (
    <>
      {error}
      {status === "completed" && !error && (
        <div className={styles.container}>
          <header className={styles.header}>
            <div className={styles.info}>
              <div className={styles.flex}>
                <h2>{data?.username}</h2>
                <button onClick={logoutHandler}>Log out</button>
              </div>
              <p className={styles.email}>{user.email}</p>
              <Link to={`/${data._id}/following`} className={styles.link}>
                <span className={styles.following}>
                  <span className={styles["follow-count"]}>
                    {data?.following.length}
                  </span>{" "}
                  Following
                </span>
              </Link>
              <Link to={`/${data._id}/followers`} className={styles.link}>
                <span className={styles.followers}>
                  <span className={styles["follow-count"]}>
                    {data?.followers.length}
                  </span>{" "}
                  Followers
                </span>
              </Link>
            </div>
          </header>
          <h3 className={styles["label-posts"]}>my posts</h3>
          <main className={styles["posts-box"]}>
            {data.posts.map((post) => (
              <Post
                key={post._id}
                post={post}
                allowDelete={true}
                refresh={refreshPage}
              />
            ))}
          </main>
        </div>
      )}
    </>
  );
};
export default Profile;
