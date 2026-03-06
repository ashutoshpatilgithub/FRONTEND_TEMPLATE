import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP, resetAuthSlice } from "../store/slices/authSlice.js";
import logo from "../assets/black-logo.png";
import AuthLayout from "../components/AuthLayout.jsx";
import { toast } from "react-toastify";

const OTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const email = location.state?.email;

  const { loading, error, isAuthenticated, message } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is missing. Please register again.");
      return;
    }
    dispatch(verifyOTP({ email, otp }));
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
      title="Check your Mailbox"
      subtitle="Please enter the otp to proceed"
      leftPrompt="New to our platform? Sign up now."
      leftLinkText="SIGN UP"
      leftLinkTo="/register"
    >
      <div className="flex items-center justify-center">
        <img src={logo} alt="logo" className="h-10 w-auto opacity-90" />
      </div>

      <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
        <input
          className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
          type="text"
          placeholder="OTP"
          inputMode="numeric"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          disabled={loading}
        />

        <button
          type="submit"
          className="mt-2 flex h-10 w-full items-center justify-center rounded bg-black text-xs font-semibold tracking-[0.18em] text-white disabled:bg-slate-400"
          disabled={loading}
        >
          {loading ? "VERIFYING..." : "VERIFY"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default OTP;
