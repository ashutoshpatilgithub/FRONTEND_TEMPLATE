import settingIcon from "../assets/setting.png";
import userIcon from "../assets/user.png";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = ({ userName, role, onToggleSideBar }) => {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  const date = now.toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-20 border-b bg-white">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSideBar}
            className="rounded-md p-2 hover:bg-slate-100 md:hidden"
            aria-label="Open sidebar"
          >
            <GiHamburgerMenu className="h-5 w-5" />
          </button>

          <img src={userIcon} alt="user" className="h-9 w-9" />
          <div className="leading-tight">
            <div className="text-sm font-semibold">{userName}</div>
            <div className="text-xs text-slate-500">{role}</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right leading-tight">
            <div className="text-xs font-semibold">{time}</div>
            <div className="text-xs text-slate-500">{date}</div>
          </div>
          <button type="button" className="rounded-md p-2 hover:bg-slate-100">
            <img src={settingIcon} alt="setting" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
