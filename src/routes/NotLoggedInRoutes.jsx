import { useAuth } from "@/mypages/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const NotLoggedInRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  // 1. /me 요청이 아직 끝나지 않으면 렌더하지 않음
  if (loading) return null; // 혹은 로딩 스켈레톤

  return user ? <Navigate to="/" replace /> : <Outlet />;

}

export default NotLoggedInRoutes;