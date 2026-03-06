const Home = () => {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl border bg-white p-6">
        <h1 className="text-2xl font-semibold">Home</h1>
        <p className="mt-2 text-sm text-slate-600">
          Your app is running. This is a starter home page—replace it with your
          actual dashboard or landing UI.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-base font-semibold">Next steps</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li>Build out pages inside `client/src/pages/`</li>
            <li>Connect API calls (Axios is already installed)</li>
            <li>Replace placeholder Redux slices with real ones</li>
          </ul>
        </div>
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-base font-semibold">Routes</h2>
          <p className="mt-3 text-sm text-slate-700">
            Try <span className="font-mono">/login</span> or{" "}
            <span className="font-mono">/register</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home;
