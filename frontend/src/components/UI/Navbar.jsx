import { NavLink } from "react-router-dom";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import {
  HiOutlineUserCircle,
  HiUserCircle,
  HiSearch,
  HiUserGroup,
  HiOutlineUserGroup,
} from "react-icons/hi";

import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>react-social</h1>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
              to="/home"
            >
              {({ isActive }) =>
                isActive ? (
                  <div className={styles.option}>
                    <span className={styles.icon}>
                      <AiFillHome />
                    </span>
                    <span className={styles["option-text"]}>Home</span>
                  </div>
                ) : (
                  <div className={styles.option}>
                    <span className={styles.icon}>
                      <AiOutlineHome />
                    </span>
                    <span className={styles["option-text"]}>Home</span>
                  </div>
                )
              }
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
              to="/following"
            >
              {({ isActive }) =>
                isActive ? (
                  <div className={styles.option}>
                    <span className={styles.icon}>
                      <HiUserGroup />
                    </span>
                    <span className={styles["option-text"]}>Following</span>
                  </div>
                ) : (
                  <div className={styles.option}>
                    <span className={styles.icon}>
                      <HiOutlineUserGroup />
                    </span>
                    <span className={styles["option-text"]}>Following</span>
                  </div>
                )
              }
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
              to="/profile"
            >
              {({ isActive }) =>
                isActive ? (
                  <div className={styles.option}>
                    <span className={styles.icon}>
                      <HiUserCircle />
                    </span>
                    <span className={styles["option-text"]}>Profile</span>
                  </div>
                ) : (
                  <div className={styles.option}>
                    <span className={styles.icon}>
                      <HiOutlineUserCircle />
                    </span>
                    <span className={styles["option-text"]}>Profile</span>
                  </div>
                )
              }
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
              to="/search"
            >
              {({ isActive }) =>
                isActive ? (
                  <div className={styles.option}>
                    <span className={styles.icon}>
                      <HiSearch />
                    </span>
                    <span className={styles["option-text"]}>search</span>
                  </div>
                ) : (
                  <div className={styles.option}>
                    <span className={styles.icon}>
                      <HiSearch />
                    </span>
                    <span className={styles["option-text"]}>search</span>
                  </div>
                )
              }
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;
