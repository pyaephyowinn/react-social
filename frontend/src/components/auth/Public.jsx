import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Public = () => {
  const { token } = useSelector((state) => state.auth);

  if (!token) return <Outlet />;
  return <Navigate replace={true} to="/home" />;
};
export default Public;
