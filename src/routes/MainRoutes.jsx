import LoginForm from "@/mypages/auth/loginForm";
import RegisterForm from "@/mypages/auth/registerForm";
import Header from "@/mypages/layout/header";
import Main from "@/mypages/main";
import NotLoggedInRoutes from "@/routes/NotLoggedInRoutes";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";


import "@/api/customFetch";
import { AuthProvider } from "@/mypages/AuthProvider";
import Chat from "@/mypages/chat";
import Users from "@/mypages/users";

const MainRoutes = () => {


  // JWT 토큰 정보 가져오기
  const [userName, setUserName] = useState(""); // 사용자 이름 저장
  const [userRole, setUserRole] = useState(""); // 사용자 권한 저장

  return (

    <AuthProvider>
      <Toaster />
      <div className="wrap" id="wrap">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">


          <Routes>
            <Route path={'/'} element={<Main />} />
            <Route path={'/users'} element={<Users />} />
            <Route path={'/chat'} element={<Chat />} />

            <Route element={<NotLoggedInRoutes />}>
              <Route path={'/auth/login'} element={<LoginForm />} />
              <Route path={'/auth/register'} element={<RegisterForm />} />
            </Route>

            {/* <Route path={'/auth/forgot'} element={<ForgotPasswordForm />} /> */}
          </Routes>
        </div>

        {/* <MyFooter /> */}
      </div>
    </AuthProvider >
  );
};

export default MainRoutes;