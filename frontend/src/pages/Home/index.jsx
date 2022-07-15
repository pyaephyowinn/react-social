import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import NewPostForm from "../../components/Post/NewPostForm";
import ToastContainer from "../../components/UI/ToastContainer";
import styles from "./index.module.css";
import useHttp from "../../hooks/use-http";
import { getAllPosts } from "../../api/postAPI";
import Post from "../../components/Post/Post";

const Home = () => {
  const { token } = useSelector((state) => state.auth);
  const [toastMsg, setToastMsg] = useState({
    message: "",
    status: "",
  });

  const { sendRequest: fetchAllPost, data, error } = useHttp(getAllPosts);

  useEffect(() => {
    fetchAllPost(token);
  }, [fetchAllPost, token]);

  return (
    // add loading status here!!
    <div>
      <header className={styles.header}>
        <h2>Home</h2>
      </header>
      <NewPostForm refreshPage={fetchAllPost} setToastMsg={setToastMsg} />
      {toastMsg.message && (
        <ToastContainer setToastMsg={setToastMsg} toast={toastMsg} />
      )}
      {error}
      <main>
        {data?.posts.map((post) => (
          <Post post={post} key={post._id.toString()} />
        ))}
      </main>
    </div>
  );
};
export default Home;
