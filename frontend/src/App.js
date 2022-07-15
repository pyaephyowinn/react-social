import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUser } from "./store/authSlice";
import Layout from "./components/UI/Layout";
import Private from "./components/auth/Private";
import Public from "./components/auth/Public";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Home from "./pages/Home";
import UserDetail from "./pages/UserDetail";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Following from "./pages/Following";
import Followers from "./pages/Followers";
import FollowingPosts from "./pages/FollowingPosts";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const dispatch = useDispatch();

  const tokenJSONObj = localStorage.getItem("rsToken");

  if (tokenJSONObj) {
    const { expiry, token, user } = JSON.parse(tokenJSONObj);
    const now = Date.now();

    console.log("app");
    if (expiry > now) {
      console.log(new Date(expiry));
      console.log("not expire");
      console.log(user);
      dispatch(setUser({ token, user }));
    } else {
      console.log("expire");
      localStorage.removeItem("rsToken");
    }
  }

  return (
    <>
      {/* PUBLIC ROUTES */}
      <Routes>
        <Route element={<Public />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* PRIVATE ROUTES */}
        <Route element={<Private />}>
          <Route path="/*" element={<Layout />}>
            <Route index element={<Navigate to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="search" element={<Search />} />
            <Route path="following" element={<FollowingPosts />} />
            <Route path=":uid" element={<UserDetail />} />
            <Route path=":uid/posts/:pid" element={<PostDetail />} />
            <Route path=":uid/following" element={<Following />} />
            <Route path=":uid/followers" element={<Followers />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
