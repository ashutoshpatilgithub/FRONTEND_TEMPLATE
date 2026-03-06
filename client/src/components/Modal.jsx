export default function Modal({ title, children, onClose, size = "md" }) {
  const width =
    size === "lg" ? "max-w-3xl" : size === "sm" ? "max-w-sm" : "max-w-xl";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4">
      <div className={`w-full ${width} rounded-md bg-white shadow-xl`}>
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="text-sm font-semibold">{title}</div>
          <button
            type="button"
            onClick={onClose}
            className="rounded px-2 py-1 text-lg leading-none text-slate-600 hover:bg-slate-100"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
}

