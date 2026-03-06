const Users = () => {
  const rows = [
    {
      id: 1,
      name: "ashutosh patil",
      email: "mendeveloper@gmail.com",
      role: "User",
      borrowed: 2,
      registeredOn: "08-02-2025 19:23:45",
    },
    {
      id: 2,
      name: "Jhon Doe",
      email: "jhon@gmail.com",
      role: "User",
      borrowed: 10,
      registeredOn: "21-02-2025 10:43:26",
    },
    {
      id: 3,
      name: "Michael Scofield",
      email: "mike@gmail.com",
      role: "User",
      borrowed: 0,
      registeredOn: "21-02-2025 10:42:48",
    },
    {
      id: 4,
      name: "Jackal",
      email: "jackal@gmail.com",
      role: "User",
      borrowed: 0,
      registeredOn: "21-02-2025 10:43:15",
    },
    {
      id: 5,
      name: "Tom Cruise",
      email: "tom@gmail.com",
      role: "User",
      borrowed: 0,
      registeredOn: "21-02-2025 10:43:48",
    },
    {
      id: 6,
      name: "Tony Stark",
      email: "tony@gmail.com",
      role: "User",
      borrowed: 0,
      registeredOn: "21-02-2025 10:46:14",
    },
    {
      id: 7,
      name: "Alan",
      email: "alan@gmail.com",
      role: "User",
      borrowed: 0,
      registeredOn: "21-02-2025 10:46:14",
    },
    {
      id: 8,
      name: "ashutosh patil",
      email: "mendeveloper@gmail.com",
      role: "User",
      borrowed: 0,
      registeredOn: "22-02-2025 11:15:39",
    },
  ];

  return (
    <div className="rounded-md border bg-white">
      <div className="border-b p-4 text-sm font-semibold">Registered Users</div>
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-left text-xs">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-4 py-3 font-semibold">ID</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">No. of Books Borrowed</th>
              <th className="px-4 py-3 font-semibold">Registered On</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-3">{r.id}</td>
                <td className="px-4 py-3">{r.name}</td>
                <td className="px-4 py-3">{r.email}</td>
                <td className="px-4 py-3">{r.role}</td>
                <td className="px-4 py-3">{r.borrowed}</td>
                <td className="px-4 py-3">{r.registeredOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
