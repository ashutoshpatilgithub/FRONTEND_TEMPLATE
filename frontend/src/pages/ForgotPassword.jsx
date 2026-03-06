import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, resetAuthSlice } from "../store/slices/authSlice.js";
import AuthLayout from "../components/AuthLayout.jsx";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { loading, error, message } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
  }, [error, message, dispatch]);

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Please provide your email to receive a reset link."
      leftPrompt="Already have Account? Sign in now."
      leftLinkText="SIGN IN"
      leftLinkTo="/login"
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

        <button
          type="submit"
          className="mt-2 flex h-10 w-full items-center justify-center rounded bg-black text-xs font-semibold tracking-[0.18em] text-white disabled:bg-slate-400"
          disabled={loading}
        >
          {loading ? "SENDING..." : "CONTINUE"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
