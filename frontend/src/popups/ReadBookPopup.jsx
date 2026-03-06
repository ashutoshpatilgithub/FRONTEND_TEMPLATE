import Modal from "../components/Modal.jsx";

const ReadBookPopup = ({ onClose }) => {
  return (
    <Modal title="View Book Info" onClose={onClose} size="lg">
      <div className="space-y-4">
        <div>
          <div className="text-xs font-semibold text-slate-700">Book Title</div>
          <input
            className="mt-1 h-9 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
            type="text"
            defaultValue="The Silent Patient"
            readOnly
          />
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-700">Author</div>
          <input
            className="mt-1 h-9 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
            type="text"
            defaultValue="Alex Michaelides"
            readOnly
          />
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-700">Description</div>
          <textarea
            className="mt-1 h-28 w-full resize-none rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-400"
            readOnly
            defaultValue={
              "A psychological thriller about a woman who stops speaking after being accused of her husband's murder. A gripping mystery unfolds as a therapist tries to uncover the truth."
            }
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded border px-6 py-2 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReadBookPopup;
