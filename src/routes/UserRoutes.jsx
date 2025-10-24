import MyFooter from "@/components/MyFooter";
import MyUserHeader from '@/components/MyUserHeader';
import DriverList from "@/pages/operation/driverList";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";




const UserRoutes = () => {

  useEffect(() => {
    import('@/css2/common.css');
    import('@/css2/font.css');
    import('@/css2/popup.css');
    import('@/css2/reset.css');
    import('@/css2/style.css');
  }, []);
  useEffect(() => {


    import('@/css2/common.css');
    import('@/css2/font.css');
    import('@/css2/popup.css');
    import('@/css2/reset.css');
    import('@/css2/style.css');
  }, []);

  return (

    <div className="wrap" id="wrap">
      <MyUserHeader />
      <div id="container" className="scrollBar">
        <Routes>
          <Route path={'/'} element={<Navigate to="driverList" replace />} />
          <Route path={'driverList'} element={<DriverList />} />
        </Routes>

        <MyFooter />
      </div>
    </div>
  );
};

export default UserRoutes;