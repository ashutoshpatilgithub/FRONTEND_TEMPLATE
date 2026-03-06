import Modal from "../components/Modal.jsx";

const AddBookPopup = ({ onClose }) => {
  return (
    <Modal title="Add Book" onClose={onClose} size="lg">
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="text-xs font-semibold text-slate-700">Book Title</div>
            <input
              className="mt-1 h-9 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
              type="text"
              placeholder="Book Title"
            />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-700">Book Author</div>
            <input
              className="mt-1 h-9 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
              type="text"
              placeholder="Book Author"
            />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-700">
              Book Price (Price for borrowing)
            </div>
            <input
              className="mt-1 h-9 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
              type="text"
              placeholder="Book Price"
            />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-700">Quantity</div>
            <input
              className="mt-1 h-9 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
              type="text"
              placeholder="Book Quantity"
            />
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-slate-700">Description</div>
          <textarea
            className="mt-1 h-28 w-full resize-none rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-400"
            placeholder="Book's Description"
          />
        </div>

        <div className="flex justify-end gap-3">
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

export default AddBookPopup;
