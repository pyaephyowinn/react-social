import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./index.module.css";
import { loginUser } from "../../store/authSlice";

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isError, message, token, isSuccess } = useSelector(state => state.auth)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  useEffect(() => {
    if (isSuccess) {
      navigate('/home', { replace: true })
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
    dispatch(loginUser(formData))
  };

  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <form onSubmit={submitFormHandler}>
          <legend>Welcome back!</legend>
          {isError && <p className={styles["error-text"]}>* {message}</p>}
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
          <button>Login</button>
          <div>
            doesn't have account?
            <span>
              <Link to="/register">create account here</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
