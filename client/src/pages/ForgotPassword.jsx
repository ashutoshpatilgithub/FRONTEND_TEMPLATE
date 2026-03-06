import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";

const ForgotPassword = () => {
  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Please provide your information to reset password."
      leftPrompt="Already have Account? Sign in now."
      leftLinkText="SIGN IN"
      leftLinkTo="/login"
    >
      <form className="space-y-3">
        <input
          className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
          type="email"
          placeholder="Email"
          autoComplete="email"
        />

        <Link
          to="/otp"
          className="mt-2 flex h-10 w-full items-center justify-center rounded bg-black text-xs font-semibold tracking-[0.18em] text-white"
        >
          CONTINUE
        </Link>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
