import adminIcon from "../assets/pointing.png";
import usersIcon from "../assets/people-black.png";
import bookIcon from "../assets/book-square.png";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import logo from "../assets/black-logo.png";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const AdminDashboard = () => {
  const data = {
    labels: ["Total Borrowed Books", "Total Returned Books"],
    datasets: [
      {
        data: [55, 45],
        backgroundColor: ["#111827", "#6b7280"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { position: "bottom" },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-md border bg-white p-4 lg:col-span-2">
          <div className="h-[340px]">
            <Pie data={data} options={options} />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <img src={logo} alt="logo" className="h-10 w-10" />
            <div className="rounded border bg-white px-4 py-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-black" />
                <span>Total Borrowed Books</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-slate-500" />
                <span>Total Returned Books</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-md border bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-slate-100">
                <img src={usersIcon} alt="users" className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-slate-500">Total User Size</div>
                <div className="text-xl font-semibold">8</div>
              </div>
            </div>
          </div>

          <div className="rounded-md border bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-slate-100">
                <img src={bookIcon} alt="books" className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-slate-500">Total Book Count</div>
                <div className="text-xl font-semibold">10</div>
              </div>
            </div>
          </div>

          <div className="rounded-md border bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-slate-100">
                <img src={adminIcon} alt="admin" className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-slate-500">Total Admin Count</div>
                <div className="text-xl font-semibold">3</div>
              </div>
            </div>
          </div>

          <div className="rounded-md border bg-white p-6 text-center">
            <img
              src={adminIcon}
              alt="admin"
              className="mx-auto h-16 w-16 rounded-full object-contain"
            />
            <div className="mt-3 text-sm font-semibold">ashutosh patil</div>
            <p className="mt-2 text-xs text-slate-500">
              Welcome to your admin dashboard. Here you can manage all the
              settings and monitor the statistics.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-md border bg-white p-6">
        <div className="text-xl font-semibold">
          "Embarking on the journey of reading fosters personal growth, nurturing
          a path towards excellence and the refinement of character."
        </div>
        <div className="mt-4 text-right text-sm text-slate-500">
          -- BookWorm Team
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
