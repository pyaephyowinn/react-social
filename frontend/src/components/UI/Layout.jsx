import { Outlet } from "react-router-dom";

import NavBar from "./Navbar";
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <main className={styles.container}>
      <div className={styles["nav-bar"]}>
        <div>
          <NavBar />
        </div>
      </div>
      <div className={styles["main-content"]}>
        <Outlet />
      </div>
    </main>
  );
};
export default Layout;
