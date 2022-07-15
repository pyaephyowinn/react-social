import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./index.module.css";
import useHttp from "../../hooks/use-http";
import { getFollowing } from "../../api/userAPI";
import PillowUser from "../../components/User/PillowUser";

const Following = () => {
  const params = useParams();
  const { uid } = params;
  const { token } = useSelector((state) => state.auth);

  const {
    sendRequest: fetchFollowing,
    data,
    error,
    status,
  } = useHttp(getFollowing);

  useEffect(() => {
    fetchFollowing(token, uid);
  }, [fetchFollowing, token, uid]);

  return (
    <>
      {error}
      {status ==='sending' && <p>Loading...</p>}
      {status === "completed" && !error && (
        <div className={styles.container}>
          <header className={styles.header}>
            <h2>{data?.username}'s following</h2>
          </header>
          <main>
            {data.following.map((followingUser) => (
              <PillowUser user={followingUser} key={followingUser._id} />
            ))}
          </main>
        </div>
      )}
    </>
  );
};
export default Following;
