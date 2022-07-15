import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Private = () => {
  const { token } = useSelector((state) => state.auth);

  if (token) return <Outlet />;
  return <Navigate replace={true} to="/login" />;
};

export default Private;
