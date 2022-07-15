import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./index.module.css";
import useHttp from "../../hooks/use-http";
import { getUserDetail, toggleFollowing } from "../../api/userAPI";
import Post from "../../components/Post/Post";

const UserDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { uid } = params;
  const { token, user } = useSelector((state) => state.auth);

  const [isFollowing, setIsFollowing] = useState(false);

  const {
    sendRequest: fetchUserDetail,
    data,
    error,
    status,
  } = useHttp(getUserDetail);

  useEffect(() => {
    if (uid === user.id) {
      navigate("/profile", { replace: true });
    }
    if (!status) {
      fetchUserDetail(token, uid);
    }
  }, [fetchUserDetail, token, uid, user, navigate, status]);

  const fIndex = data?.followers.findIndex(
    (followerId) => followerId === user.id
  );

  useEffect(() => {
    if (status === "completed") {
      setIsFollowing(fIndex !== -1);
    }
  }, [status, fIndex]);

  let btnFollowClasses = `${styles.btn} ${styles["btn-follow"]}`;
  let btnFollowTxt = "follow";
  if (isFollowing) {
    btnFollowClasses = `${styles.btn} ${styles["btn-following"]}`;
    btnFollowTxt = "following";
  }

  const { sendRequest: fetchToggleFollowing } = useHttp(toggleFollowing);

  const clickToggleFollowingHandler = () => {
    const fetch = async () => {
      await fetchToggleFollowing(token, uid);
    };
    fetch();
    setIsFollowing((prev) => !prev);
  };

  return (
    <>
      {status === "sending" && <p>loading</p>}
      {status === "completed" && (
        <div className={styles.container}>
          {error}
          <header className={styles.header}>
            <div className={styles.info}>
              <h2>{data?.username}</h2>
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
            <button
              onClick={clickToggleFollowingHandler}
              className={btnFollowClasses}
            >
              {btnFollowTxt}
            </button>
          </header>
          <h3 className={styles["label-posts"]}>Posts</h3>
          <main className={styles["posts-box"]}>
            {data?.posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </main>
        </div>
      )}
    </>
  );
};
export default UserDetail;
