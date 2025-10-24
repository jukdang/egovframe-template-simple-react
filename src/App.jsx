import MyRoutes from "@/routes/myRoutes.jsx";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/*" element={<RootRoutes />} /> */}
        <Route path="/*" element={<MyRoutes />} />

        {/* <RootRoutes /> */}
      </Routes>
    </Router>
  );
}

export default App;
