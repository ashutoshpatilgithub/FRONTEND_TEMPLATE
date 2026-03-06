import { Link, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-2xl border bg-white p-6">
        <h1 className="text-xl font-semibold">Reset password</h1>
        <p className="mt-1 text-sm text-slate-600">
          Reset token: <span className="font-mono">{token}</span>
        </p>

        <form className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-medium">New password</span>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
              type="password"
              placeholder="New password"
              autoComplete="new-password"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Confirm password</span>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
              type="password"
              placeholder="Confirm password"
              autoComplete="new-password"
            />
          </label>

          <button
            type="button"
            className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Update password
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-700">
          <Link className="hover:underline" to="/login">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
