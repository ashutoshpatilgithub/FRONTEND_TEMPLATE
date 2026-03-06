import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../store/slices/authSlice.js";
import AuthLayout from "../components/AuthLayout.jsx";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate register logic
    dispatch(register({ email, name: fullName, role: "User" }));
    navigate("/dashboard");
  };

  return (
    <AuthLayout
      title="Sign Up"
      subtitle="Please provide your information to sign up."
      leftPrompt="Already have Account? Sign in now."
      leftLinkText="SIGN IN"
      leftLinkTo="/login"
    >
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
          type="text"
          placeholder="Full Name"
          autoComplete="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="mt-2 h-10 w-full rounded bg-black text-xs font-semibold tracking-[0.18em] text-white"
        >
          SIGN UP
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;
