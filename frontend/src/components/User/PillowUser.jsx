import { Link } from 'react-router-dom';

import styles from './PillowUser.module.css'

const PillowUser = ({ user }) => {

  return (
    <div className={styles.container}>
      <p>
        <Link className={styles['user-link']} to={'/' + user._id}>{user.username}</Link>
      </p>
      <span className={styles.following}>{user.following.length} following</span>
      <span>{user.followers.length} followers</span>
    </div>
  );
};
export default PillowUser;
