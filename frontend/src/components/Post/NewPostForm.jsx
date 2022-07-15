import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import styles from "./NewPostForm.module.css";
import { createPost } from "../../api/postAPI";
import useHttp from "../../hooks/use-http";

const NewPostForm = ({ setToastMsg, refreshPage }) => {
  const { token, user } = useSelector((state) => state.auth);
  const [inputText, setInputText] = useState("");

  const { sendRequest: createNewPost, error, status } = useHttp(createPost);

  useEffect(() => {
    if (status === "completed" && !error) {
      setToastMsg({
        message: "successfully created a post",
        status: 'success'
      });
    }
    if (status === "completed" && error) {
      setToastMsg({
        message: error || "successfully created a post",
        status: 'error'
      });
    }
  }, [status, error, setToastMsg]);

  const inputTextChgHandler = (e) => {
    setInputText(e.target.value);
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    const post = {
      content: inputText.trim(),
    };
    await createNewPost(token, post);
    setInputText("");
    refreshPage(token);
  };

  const placeHolderText = `How is the day, ${user.username || ''}?`

  return (
    <section className={styles.input}>
      <form onSubmit={submitFormHandler}>
        <div className={styles["form-control"]}>
          <input
            value={inputText}
            onChange={inputTextChgHandler}
            type="text"
            placeholder={placeHolderText}
            required
          />
        </div>
        <button className={styles["btn-post"]}>Post</button>
      </form>
    </section>
  );
};
export default NewPostForm;
