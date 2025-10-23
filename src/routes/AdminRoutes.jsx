import MyFooter from "@/components/MyFooter";
import MyHeader from "@/components/MyHeader";
import MyNav from "@/components/MyNav";
import UsageStats from "@/pages/stats/UsageStats";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";


const AdminRoutes = () => {
  useEffect(() => {
    import('@/css2/common.css');
    import('@/css2/font.css');
    import('@/css2/reset.css');
    import('@/css2/admin-style.css');
  }, []);

  return (

    <div className="wrap admin" id="wrap">
      <MyHeader />
      <MyNav />
      <div id="container" className="scrollBar">
        <Routes>
          <Route path={'/'} element={<Navigate to="usage" replace />} />
          <Route path={'usage'} element={<UsageStats />} />
        </Routes>

        <MyFooter />
      </div>
    </div>
  );
};

export default AdminRoutes;