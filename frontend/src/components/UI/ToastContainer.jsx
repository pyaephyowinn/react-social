import { useEffect } from "react";
import styles from "./ToastContainer.module.css";

const ToastContainer = ({ toast, setToastMsg }) => {
  let classes = styles.error;
  if (toast.status === "success") {
    classes = styles.success;
  }

  const closeToastHandler = () => {
    setToastMsg({
      message: "",
      status: "",
    });
  };

  useEffect(() => {
    if (toast.message) {
      const timeoutId = setTimeout(() => {
        closeToastHandler();
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  });

  return (
    <section className={`${styles["toast-container"]} ${classes} `}>
      <p>{toast.message}</p>
      <span className={styles["btn-close"]} onClick={closeToastHandler}>
        x
      </span>
    </section>
  );
};
export default ToastContainer;
