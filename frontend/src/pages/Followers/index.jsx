import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from './index.module.css'
import useHttp from "../../hooks/use-http";
import { getFollowers } from "../../api/userAPI";
import PillowUser from "../../components/User/PillowUser";

const Followers = () => {
  const params = useParams();
  const { uid } = params;
  const { token } = useSelector((state) => state.auth);

  const {
    sendRequest: fetchFollowers,
    data,
    error,
    status,
  } = useHttp(getFollowers);

  useEffect(() => {
    fetchFollowers(token, uid);
  }, [fetchFollowers, token, uid]);

  return (
    <>
    <div>
      {error}
      {status === 'sending' && <p>loading</p>}
      {status === "completed" && !error && (
        <div className={styles.container}>
          <header className={styles.header}>
            <h2>{data?.username}'s followers</h2>
          </header>
          <main>
            {data.followers.map((followingUser) => (
              <PillowUser user={followingUser} key={followingUser._id} />
            ))}
          </main>
        </div>
      )}
    </div>
    </>
  );
};
export default Followers;
