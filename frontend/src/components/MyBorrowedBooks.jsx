const MyBorrowedBooks = () => {
  const rows = [
    {
      id: 1,
      name: "The Silent Patient",
      author: "Alex Michaelides",
      price: 10,
      dueDate: "26-02-2025",
      dateTime: "19-02-2025 11:13",
      returned: true,
    },
    {
      id: 2,
      name: "Atomic Habits",
      author: "James Clear",
      price: 3.99,
      dueDate: "28-02-2025",
      dateTime: "21-02-2025 11:06",
      returned: true,
    },
  ];

  return (
    <div className="rounded-md border bg-white">
      <div className="border-b p-4 text-sm font-semibold">My Borrowed Books</div>
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-left text-xs">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-4 py-3 font-semibold">ID</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Author</th>
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
                <td className="px-4 py-3">{r.name}</td>
                <td className="px-4 py-3">{r.author}</td>
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

export default MyBorrowedBooks;
