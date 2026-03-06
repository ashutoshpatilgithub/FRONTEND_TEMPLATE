import { useState } from "react";

const Catalog = () => {
  const [tab, setTab] = useState("Borrowed Books");

  const borrowed = [
    {
      id: 1,
      username: "ashutosh patil",
      email: "codewithzeeshul12@gmail.com",
      price: 10,
      dueDate: "26-02-2025",
      dateTime: "19-02-2025 11:13",
      returned: true,
    },
    {
      id: 2,
      username: "Jhon Doe",
      email: "jhon@gmail.com",
      price: 3.99,
      dueDate: "28-02-2025",
      dateTime: "21-02-2025 11:06",
      returned: true,
    },
    {
      id: 3,
      username: "Jhon Doe",
      email: "jhon@gmail.com",
      price: 4.49,
      dueDate: "28-02-2025",
      dateTime: "21-02-2025 11:06",
      returned: true,
    },
    {
      id: 4,
      username: "Jhon Doe",
      email: "jhon@gmail.com",
      price: 3.99,
      dueDate: "28-02-2025",
      dateTime: "21-02-2025 11:06",
      returned: true,
    },
  ];

  const overdue = [
    {
      id: 1,
      username: "ashutosh patil",
      email: "mendeveloper@gmail.com",
      price: 10,
      dueDate: "17-02-2025",
      dateTime: "10-02-2025 21:09",
      returned: true,
    },
    {
      id: 2,
      username: "ashutosh patil",
      email: "mendeveloper@gmail.com",
      price: 10,
      dueDate: "09-02-2025",
      dateTime: "11-02-2025 18:05",
      returned: true,
    },
    {
      id: 3,
      username: "Jhon Doe",
      email: "jhon@gmail.com",
      price: 3.7,
      dueDate: "21-02-2025",
      dateTime: "21-02-2025 11:07",
      returned: true,
    },
  ];

  const rows = tab === "Borrowed Books" ? borrowed : overdue;

  return (
    <div className="rounded-md border bg-white">
      <div className="flex items-center gap-2 border-b p-4">
        <button
          type="button"
          onClick={() => setTab("Borrowed Books")}
          className={`rounded px-4 py-2 text-xs font-semibold ${
            tab === "Borrowed Books" ? "bg-black text-white" : "bg-slate-100"
          }`}
        >
          Borrowed Books
        </button>
        <button
          type="button"
          onClick={() => setTab("Overdue Borrowers")}
          className={`rounded px-4 py-2 text-xs font-semibold ${
            tab === "Overdue Borrowers" ? "bg-black text-white" : "bg-slate-100"
          }`}
        >
          Overdue Borrowers
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-left text-xs">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-4 py-3 font-semibold">ID</th>
              <th className="px-4 py-3 font-semibold">Username</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Price</th>
              <th className="px-4 py-3 font-semibold">Due Date</th>
              <th className="px-4 py-3 font-semibold">Date &amp; Time</th>
              <th className="px-4 py-3 font-semibold text-center">Return</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-3">{r.id}</td>
                <td className="px-4 py-3">{r.username}</td>
                <td className="px-4 py-3">{r.email}</td>
                <td className="px-4 py-3">{r.price}</td>
                <td className="px-4 py-3">{r.dueDate}</td>
                <td className="px-4 py-3">{r.dateTime}</td>
                <td className="px-4 py-3 text-center">
                  <input type="checkbox" defaultChecked={r.returned} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Catalog;
