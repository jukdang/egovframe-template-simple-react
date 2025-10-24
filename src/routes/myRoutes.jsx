import { Route, Routes } from "react-router-dom";

import AdminRoutes from "@/routes/AdminRoutes";
import MainRoutes from "@/routes/MainRoutes";
import UserRoutes from "@/routes/UserRoutes";



const MyRoutes = () => {

  

  return (
    <Routes>
      <Route path="/*" element={<MainRoutes />} />


      {/* GJ2025 */}
      <Route path="operation/*" element={<UserRoutes />} />
      <Route path="admin/*" element={<AdminRoutes />} />
    </Routes>
  );
};





export default MyRoutes;