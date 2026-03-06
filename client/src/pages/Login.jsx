import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";

const Login = () => {
  const navigate = useNavigate();
  return (
    <AuthLayout
      title="Sign In"
      subtitle="Please provide your information to sign in."
      leftPrompt="New to our platform? Sign up now."
      leftLinkText="SIGN UP"
      leftLinkTo="/register"
    >
      <form className="space-y-3">
        <input
          className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
          type="email"
          placeholder="Email"
          autoComplete="email"
        />
        <input
          className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
        />

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mt-2 h-10 w-full rounded bg-black text-xs font-semibold tracking-[0.18em] text-white"
        >
          SIGN IN
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
