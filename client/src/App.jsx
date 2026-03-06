import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import OTP from "./pages/OTP.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link to="/" className="text-lg font-semibold tracking-tight">
              Frontend Template
            </Link>
            <nav className="flex items-center gap-3 text-sm">
              <Link className="hover:underline" to="/login">
                Login
              </Link>
              <Link className="hover:underline" to="/register">
                Register
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
