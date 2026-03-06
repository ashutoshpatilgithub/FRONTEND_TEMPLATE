import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, resetAuthSlice } from "../store/slices/authSlice.js";
import AuthLayout from "../components/AuthLayout.jsx";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, isAuthenticated, message } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (isAuthenticated) {
      toast.success(message);
      navigate("/dashboard");
      dispatch(resetAuthSlice());
    }
  }, [error, isAuthenticated, message, navigate, dispatch]);

  return (
    <AuthLayout
      title="Sign In"
      subtitle="Please provide your information to sign in."
      leftPrompt="New to our platform? Sign up now."
      leftLinkText="SIGN UP"
      leftLinkTo="/register"
    >
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        <button
          type="submit"
          className="mt-2 h-10 w-full rounded bg-black text-xs font-semibold tracking-[0.18em] text-white disabled:bg-slate-400"
          disabled={loading}
        >
          {loading ? "SIGNING IN..." : "SIGN IN"}
        </button>

        <div className="pt-2 text-center text-xs text-slate-600">
          <Link to="/forgot-password" className="hover:underline">
            Forgot Password?
          </Link>
        </div>

        <div className="pt-3 text-center text-xs text-slate-600">
          <Link to="/dashboard" className="hover:underline">
            Go to Dashboard
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
