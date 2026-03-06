import placeHolder from "../assets/placeholder.jpg";
import closeIcon from "../assets/close-square.png";
import keyIcon from "../assets/key.png";
import Modal from "../components/Modal.jsx";

const AddNewAdmin = ({ onClose }) => {
  return (
    <Modal title="Add New Admin" onClose={onClose} size="md">
      <div className="relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-0 top-0"
          aria-label="Close"
        >
          <img src={closeIcon} alt="close" className="h-6 w-6" />
        </button>

        <div className="flex flex-col items-center pt-2">
          <div className="relative">
            <img
              src={placeHolder}
              alt="placeholder"
              className="h-20 w-20 rounded-full object-cover"
            />
            <img
              src={keyIcon}
              alt="key"
              className="absolute -bottom-1 -right-1 h-6 w-6"
            />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <div className="text-xs font-semibold text-slate-700">Name</div>
            <input
              className="mt-1 h-9 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
              type="text"
              placeholder="ashutosh patil"
            />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-700">Email</div>
            <input
              className="mt-1 h-9 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
              type="email"
              placeholder="adnan@gmail.com"
            />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-700">Password</div>
            <input
              className="mt-1 h-9 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
              type="password"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded border px-5 py-2 text-xs font-semibold"
          >
            Close
          </button>
          <button
            type="button"
            className="rounded bg-black px-6 py-2 text-xs font-semibold text-white"
          >
            Add
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddNewAdmin;
