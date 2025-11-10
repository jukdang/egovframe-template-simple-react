import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { name, role }
  const [loading, setLoading] = useState(true);

  // ✅ 1. 페이지 로드 시 /me로 로그인 상태 확인
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          data.resultCode == 200 ? setUser({ name: data.result.id, role: data.result.role }) : setUser(null);
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

    // fetchUser();
    setLoading(false);
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
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
  };

  if (loading) {
    return <></>;
  }

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>;
}
