import { Link } from "react-router-dom";

import styles from "./index.module.css"

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1>Page Not Found</h1>
      <p>
        sorry, we cannot find anything with this url. go to{" "}
        <Link to="/">go to Home</Link>
      </p>
    </div>
  );
};
export default NotFoundPage;
