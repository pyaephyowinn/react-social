import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./index.module.css";
import { registerUser } from "../../store/authSlice";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, message, token, isSuccess } = useSelector(state => state.auth)

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;

  useEffect(() => {
    if (isSuccess) {
      navigate('/home', { replace: true });
      // dispatch(resetState())
    }
  }, [isSuccess, message, navigate, dispatch, token])

  const inputChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };
  

  return (
    <div className={styles.container}>
      <section className={styles["grid-container"]}>
        <div className={styles.description}>
          <h1>react social</h1>
          <p>
            It is good to make new friends. There are no strangers here. Only
            friends you haven't yet met.
          </p>
        </div>
        <div className={styles.input}>
          <form onSubmit={submitFormHandler}>
            <legend>Create an account!</legend>
            {isError && <p className={styles["error-text"]}>* {message}</p>}
            <div className={styles["form-group"]}>
              <label htmlFor="username">Username</label>
              <input
                value={username}
                onChange={inputChangeHandler}
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                required
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="email">Email</label>
              <input
                value={email}
                type="email"
                onChange={inputChangeHandler}
                id="email"
                name="email"
                placeholder="Email address"
                required
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={inputChangeHandler}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <button>Register</button>
            <div>
              already have an account?
              <span>
                <Link to="/login">Login here</Link>
              </span>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
export default RegisterPage;
