import { Navigate, Route, Routes } from "react-router-dom";

import AdminRoutes from "@/routes/AdminRoutes";
import UserRoutes from "@/routes/UserRoutes";



const MyRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="operation" replace />} />
      <Route path="operation/*" element={<UserRoutes />} />
      <Route path="admin/*" element={<AdminRoutes />} />
    </Routes>
  );
};





export default MyRoutes;