import LoginForm from "@/mypages/auth/loginForm";
import RegisterForm from "@/mypages/auth/registerForm";
import Main from "@/mypages/main";
import NotLoggedInRoutes from "@/routes/NotLoggedInRoutes";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";


import "@/api/customFetch";
import { AuthProvider } from "@/mypages/AuthProvider";
import Chat from "@/mypages/chat";
import Users from "@/mypages/users";

const MainRoutes = () => {

  return (

    <AuthProvider>
      <Toaster />
      <div className="wrap h-screen" id="wrap">
        


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
      
    </AuthProvider >
  );
};

export default MainRoutes;