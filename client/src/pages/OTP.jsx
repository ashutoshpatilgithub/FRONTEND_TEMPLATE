import { Link } from "react-router-dom";
import logo from "../assets/black-logo.png";
import AuthLayout from "../components/AuthLayout.jsx";

const OTP = () => {
  return (
    <AuthLayout
      title="Check your Mailbox"
      subtitle="Please enter the otp to proceed"
      leftPrompt="New to our platform? Sign up now."
      leftLinkText="SIGN UP"
      leftLinkTo="/register"
    >
      <div className="flex items-center justify-center">
        <img src={logo} alt="logo" className="h-10 w-auto opacity-90" />
      </div>

      <form className="mt-8 space-y-3">
        <input
          className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
          type="text"
          placeholder="OTP"
          inputMode="numeric"
        />

        <Link
          to="/reset-password/demo-token"
          className="mt-2 flex h-10 w-full items-center justify-center rounded bg-black text-xs font-semibold tracking-[0.18em] text-white"
        >
          VERIFY
        </Link>
      </form>
    </AuthLayout>
  );
};

export default OTP;
