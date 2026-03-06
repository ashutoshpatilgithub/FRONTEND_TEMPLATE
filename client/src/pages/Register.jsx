import AuthLayout from "../components/AuthLayout.jsx";

const Register = () => {
  return (
    <AuthLayout
      title="Sign Up"
      subtitle="Please provide your information to sign up."
      leftPrompt="Already have Account? Sign in now."
      leftLinkText="SIGN IN"
      leftLinkTo="/login"
    >
      <form className="space-y-3">
        <input
          className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
          type="text"
          placeholder="Full Name"
          autoComplete="name"
        />
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
          autoComplete="new-password"
        />

        <button
          type="button"
          className="mt-2 h-10 w-full rounded bg-black text-xs font-semibold tracking-[0.18em] text-white"
        >
          SIGN UP
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;
