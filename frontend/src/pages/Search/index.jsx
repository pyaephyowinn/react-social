import { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./index.module.css";
import useHttp from "../../hooks/use-http";
import { searchUser } from "../../api/userAPI";
import PillowUser from "../../components/User/PillowUser";

const Search = () => {
  const { token } = useSelector((state) => state.auth);
  const [searchTxt, setSearchTxt] = useState("");

  const searchTxtChgHandler = (e) => {
    setSearchTxt(e.target.value);
  };

  const { sendRequest: fetchUser, data, error, status } = useHttp(searchUser);

  const submitFormHandler = async (e) => {
    e.preventDefault();
    console.log(searchTxt);
    await fetchUser(token, searchTxt);
  };

  return (
    <div>
      <header className={styles.header}>
        <h2>search your friends</h2>
        <form onSubmit={submitFormHandler}>
          <input
            onChange={searchTxtChgHandler}
            value={searchTxt}
            type="text"
            placeholder="search your friends"
            autoFocus
            required
          />
        </form>
      </header>
      {error}
      {status === "completed" && !error && (
        <main className={styles['users-box']}>
          {data.users.length === 0 && <p className={styles.emptyTxt}>No user is found.</p>}
          {data.users.map((user) => (
            <PillowUser key={user._id} user={user} />
          ))}
        </main>
      )}
    </div>
  );
};
export default Search;
