import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice.js";
import logo_with_title from "../assets/logo-with-title.png";
import logoutIcon from "../assets/logout.png";
import closeIcon from "../assets/white-close-icon.png";
import dashboardIcon from "../assets/element.png";
import bookIcon from "../assets/book.png";
import catalogIcon from "../assets/catalog.png";
import settingIcon from "../assets/setting-white.png";
import usersIcon from "../assets/people.png";
import { RiAdminFill } from "react-icons/ri";

const SideBar = ({
  isSideBarOpen,
  setIsSideBarOpen,
  setSelectedComponent,
  selectedComponent,
  role = "Admin",
  onAddNewAdmin,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const NavButton = ({ id, icon, label, onClick }) => {
    const isActive = selectedComponent === id;
    return (
      <button
        onClick={onClick}
        className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium hover:cursor-pointer flex items-center gap-3 ${isActive ? "bg-white/10" : "bg-transparent"
          }`}
      >
        <img src={icon} alt={label} className="h-5 w-5" />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <>
      <aside
        className={`${isSideBarOpen ? "left-0" : "-left-full"
          } z-30 transition-all duration-700 md:relative md:left-0 flex w-64 bg-black text-white flex-col h-full`}
        style={{ position: "fixed" }}
      >
        <div className="px-6 py-4 my-8">
          <img src={logo_with_title} alt="logo" />
        </div>
        <nav className="flex-1 px-6 space-y-1">
          <NavButton
            id="Dashboard"
            icon={dashboardIcon}
            label="Dashboard"
            onClick={() => setSelectedComponent("Dashboard")}
          />
          <NavButton
            id="Books"
            icon={bookIcon}
            label="Books"
            onClick={() => setSelectedComponent("Books")}
          />
          {role === "Admin" && (
            <>
              <NavButton
                id="Catalog"
                icon={catalogIcon}
                label="Catalog"
                onClick={() => setSelectedComponent("Catalog")}
              />
              <NavButton
                id="Users"
                icon={usersIcon}
                label="Users"
                onClick={() => setSelectedComponent("Users")}
              />
              <button
                onClick={onAddNewAdmin}
                className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium hover:cursor-pointer flex items-center gap-3 ${selectedComponent === "Add New Admin" ? "bg-white/10" : ""
                  }`}
              >
                <RiAdminFill className="h-5 w-5" /> <span>Add New Admin</span>
              </button>
            </>
          )}
          {role === "User" && (
            <NavButton
              id="My Borrowed Books"
              icon={catalogIcon}
              label="My Borrowed Books"
              onClick={() => setSelectedComponent("My Borrowed Books")}
            />
          )}
          <button
            onClick={() => { }}
            className="md:hidden w-full rounded-md px-3 py-2 text-left text-sm font-medium hover:cursor-pointer flex items-center gap-3"
          >
            <img src={settingIcon} alt="setting" className="h-5 w-5" />{" "}
            <span>Update Credentials</span>
          </button>
        </nav>
        <div className="px-6 py-4">
          <button
            className="py-2 font-medium text-center bg-transparent rounded-md hover:cursor-pointer flex items-center justify-center space-x-5 mb-7 mx-auto w-fit"
            onClick={handleLogout}
          >
            <img src={logoutIcon} alt="logout" className="h-5 w-5" />{" "}
            <span className="text-sm">Log Out</span>
          </button>
        </div>
        <img
          src={closeIcon}
          alt="closeIcon"
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className="h-fit w-fit absolute top-0 right-4 mt-4 block md:hidden"
        />
      </aside>
    </>
  );
};

export default SideBar;
