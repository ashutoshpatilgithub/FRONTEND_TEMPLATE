import { Link } from "react-router-dom";
import logo from "../assets/white-logo.png";

export default function AuthLayout({
  title,
  subtitle,
  children,
  leftPrompt,
  leftLinkText,
  leftLinkTo,
}) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 md:grid-cols-2">
        <section className="relative hidden overflow-hidden rounded-r-[3rem] bg-black md:flex">
          <div className="relative z-10 flex w-full flex-col items-center justify-center px-10 text-center text-white">
            <img src={logo} alt="BookWorm" className="mb-6 h-14 w-auto" />
            <div className="text-3xl font-light tracking-wide">BookWorm</div>
            <div className="text-xs tracking-[0.35em] opacity-80">
              LIBRARY
            </div>

            <p className="mt-10 text-sm text-white/70">{leftPrompt}</p>
            <Link
              to={leftLinkTo}
              className="mt-3 rounded-md border border-white/60 px-10 py-2 text-xs font-semibold tracking-[0.18em] hover:bg-white hover:text-black"
            >
              {leftLinkText}
            </Link>
          </div>

          <div className="absolute inset-0 opacity-30">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            <div className="flex items-center justify-center gap-3">
              <h1 className="text-center text-xl font-semibold tracking-tight">
                {title}
              </h1>
            </div>
            {subtitle ? (
              <p className="mt-2 text-center text-xs text-slate-500">
                {subtitle}
              </p>
            ) : null}

            <div className="mt-8">{children}</div>
          </div>
        </section>
      </div>
    </div>
  );
}

