import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);  // { name, role }
  const [loading, setLoading] = useState(true);

  // ✅ 1. 페이지 로드 시 /me로 로그인 상태 확인
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser({ name: data.userName, role: data.userRole });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Failed to fetch /me:", err);
        setUser(null);
      } finally {
        setLoading(false);
        console.log("AuthProvider: /me fetch complete");
      }
    };

    fetchUser();
  }, []);

  // ✅ 2. 로그인 성공 시 user 정보 갱신
  const login = (userInfo) => {
    setUser({
      name: userInfo.userName,
      role: userInfo.userRole,
    });
  };

  // ✅ 3. 로그아웃 처리
  const logout = async () => {
    await fetch("/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
  };

  if (loading) {
    return (<></>);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}