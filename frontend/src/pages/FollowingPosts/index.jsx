import { useEffect } from "react";
import { useSelector } from "react-redux";

import styles from './index.module.css'
import useHttp from "../../hooks/use-http";
import { getFollowingPosts } from "../../api/userAPI";
import Post from "../../components/Post/Post";

const FollowingPosts = () => {
  const { token } = useSelector((state) => state.auth);
  const {
    sendRequest: fetchFollowingPosts,
    data,
    error,
    status,
  } = useHttp(getFollowingPosts);

  useEffect(() => {
    fetchFollowingPosts(token);
  }, [fetchFollowingPosts, token]);

  return (
    <>
      <header className={styles.header}>
        <h2>following posts</h2>
      </header>
      {error}
      {status === "sending" && <p>loading</p>}
      {status === "completed" && !error && (
        <main>
          {data.posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </main>
      )}
    </>
  );
};
export default FollowingPosts;
