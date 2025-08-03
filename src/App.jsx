import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/AuthPage";
import BlogPage from "./pages/BlogPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import MainLayout from "./layout/MainLayout";
import "./App.css";

function App() {
  function ProtectedRoute() {
    const isAuthenticated = localStorage.getItem("token");
    return isAuthenticated ? <Outlet /> : <Navigate to="/Login" />;
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/user" element={<UserPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
