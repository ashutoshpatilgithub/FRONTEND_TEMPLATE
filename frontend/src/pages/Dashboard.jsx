import { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideBar from "../layout/SideBar.jsx";
import Header from "../layout/Header.jsx";
import AdminDashboard from "../components/AdminDashboard.jsx";
import BookManagement from "../components/BookManagement.jsx";
import Catalog from "../components/Catalog.jsx";
import Users from "../components/Users.jsx";
import UserDashboard from "../components/UserDashboard.jsx";
import MyBorrowedBooks from "../components/MyBorrowedBooks.jsx";
import AddNewAdmin from "../popups/AddNewAdmin.jsx";
import AddBookPopup from "../popups/AddBookPopup.jsx";
import ReadBookPopup from "../popups/ReadBookPopup.jsx";
import RecordBookPopup from "../popups/RecordBookPopup.jsx";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");

  const [addNewAdminOpen, setAddNewAdminOpen] = useState(false);
  const [addBookOpen, setAddBookOpen] = useState(false);
  const [readBookOpen, setReadBookOpen] = useState(false);
  const [recordBookOpen, setRecordBookOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const content = useMemo(() => {
    if (!user) return null;

    if (user.role === "Admin") {
      if (selectedComponent === "Dashboard") return <AdminDashboard />;
      if (selectedComponent === "Books")
        return (
          <BookManagement
            onAddBook={() => setAddBookOpen(true)}
            onReadBook={() => setReadBookOpen(true)}
            onRecordBook={() => setRecordBookOpen(true)}
          />
        );
      if (selectedComponent === "Catalog") return <Catalog />;
      if (selectedComponent === "Users") return <Users />;
      return <AdminDashboard />;
    }

    if (selectedComponent === "Dashboard") return <UserDashboard />;
    if (selectedComponent === "My Borrowed Books") return <MyBorrowedBooks />;
    return <UserDashboard />;
  }, [selectedComponent, user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <div className="flex min-h-screen">
        <SideBar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
          setSelectedComponent={setSelectedComponent}
          selectedComponent={selectedComponent}
          role={user.role}
          onAddNewAdmin={() => setAddNewAdminOpen(true)}
        />

        <div className="flex min-h-screen flex-1 flex-col md:ml-64">
          <Header
            userName={user.name}
            role={user.role}
            onToggleSideBar={() => setIsSideBarOpen((v) => !v)}
          />
          <div className="flex-1 p-4 md:p-8">{content}</div>
        </div>
      </div>

      {addNewAdminOpen ? (
        <AddNewAdmin onClose={() => setAddNewAdminOpen(false)} />
      ) : null}
      {addBookOpen ? (
        <AddBookPopup onClose={() => setAddBookOpen(false)} />
      ) : null}
      {readBookOpen ? (
        <ReadBookPopup onClose={() => setReadBookOpen(false)} />
      ) : null}
      {recordBookOpen ? (
        <RecordBookPopup onClose={() => setRecordBookOpen(false)} />
      ) : null}
    </div>
  );
}

