import addIcon from "../assets/add-circle 1.png";
import searchIcon from "../assets/search-status.png";
import editIcon from "../assets/edit.png";
import trashIcon from "../assets/trash.png";
import maximizeIcon from "../assets/maximize-circle.png";
import receiptIcon from "../assets/receipt.png";

const BookManagement = ({ onAddBook, onReadBook, onRecordBook }) => {
  const rows = [
    {
      id: 1,
      name: "The Silent Patient",
      author: "Alex Michaelides",
      quantity: 10,
      price: "$3.99",
      availability: "Available",
    },
    {
      id: 2,
      name: "Atomic Habits",
      author: "James Clear",
      quantity: 5,
      price: "$4.49",
      availability: "Available",
    },
    {
      id: 3,
      name: "The Midnight Library",
      author: "Matt Haig",
      quantity: 12,
      price: "$3.99",
      availability: "Available",
    },
    {
      id: 4,
      name: "The Alchemist",
      author: "Paulo Coelho",
      quantity: 19,
      price: "$2.49",
      availability: "Available",
    },
    {
      id: 5,
      name: "Project Hail Mary",
      author: "Andy Weir",
      quantity: 14,
      price: "$5",
      availability: "Available",
    },
    {
      id: 6,
      name: "Educated",
      author: "Tara Westover",
      quantity: 2,
      price: "$4.29",
      availability: "Available",
    },
    {
      id: 7,
      name: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      quantity: 99,
      price: "$3.3",
      availability: "Available",
    },
    {
      id: 8,
      name: "Where the Crawdads Sing",
      author: "Delia Owens",
      quantity: 32,
      price: "$3.29",
      availability: "Available",
    },
    {
      id: 9,
      name: "The Psychology of Money",
      author: "Morgan Housel",
      quantity: 19,
      price: "$2.49",
      availability: "Available",
    },
    {
      id: 10,
      name: "The 5 AM Club",
      author: "Robin Sharma",
      quantity: 43,
      price: "$3.7",
      availability: "Available",
    },
  ];

  return (
    <div className="rounded-md border bg-white">
      <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between">
        <div className="text-sm font-semibold">Book Management</div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onAddBook}
            className="flex items-center gap-2 rounded bg-black px-4 py-2 text-xs font-semibold text-white"
          >
            <img src={addIcon} alt="add" className="h-4 w-4" />
            Add Book
          </button>
          <div className="relative">
            <img
              src={searchIcon}
              alt="search"
              className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60"
            />
            <input
              className="h-9 w-56 rounded border border-slate-300 pl-8 pr-3 text-xs outline-none focus:border-slate-400"
              placeholder="Search books..."
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-left text-xs">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-4 py-3 font-semibold">ID</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Author</th>
              <th className="px-4 py-3 font-semibold">Quantity</th>
              <th className="px-4 py-3 font-semibold">Price</th>
              <th className="px-4 py-3 font-semibold">Availability</th>
              <th className="px-4 py-3 font-semibold text-center">Record Book</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-3">{r.id}</td>
                <td className="px-4 py-3">{r.name}</td>
                <td className="px-4 py-3">{r.author}</td>
                <td className="px-4 py-3">{r.quantity}</td>
                <td className="px-4 py-3">{r.price}</td>
                <td className="px-4 py-3">{r.availability}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-3">
                    <button type="button" onClick={onReadBook}>
                      <img src={maximizeIcon} alt="view" className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => {}}>
                      <img src={editIcon} alt="edit" className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => {}}>
                      <img src={trashIcon} alt="trash" className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={onRecordBook}>
                      <img src={receiptIcon} alt="record" className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookManagement;
