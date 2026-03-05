import { LogOut, Menu, Settings, UserRoundPen } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { logout, authUser } = useAuthStore();
  return (
    <header>
      <div className="navbar border-b border-base-300 bg-base-100/90 px-2 shadow-sm backdrop-blur sm:px-4">
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost sacramento px-2 font-sacramento text-h3 sm:text-h2"
          >
            Messenger
          </Link>
        </div>
        <div className="flex-none hidden items-center gap-2 md:flex">
          <Link to="/settings">
            <button className="btn bg-[#2F2F2F] text-white border-black">
              <Settings />
              Setting
            </button>
          </Link>
          {authUser && (
            <>
              <Link to={"/profile"}>
                <button className="btn bg-[#2F2F2F] text-white border-black">
                  <UserRoundPen />
                  Profile
                </button>
              </Link>
              <button
                onClick={logout}
                className="btn bg-[#2F2F2F] text-white border-black"
              >
                <LogOut />
                Logout
              </button>
            </>
          )}
        </div>

        <div className="dropdown dropdown-end md:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm m-0">
            <Menu className="size-5" />
          </div>
          <ul
            tabIndex="-1"
            className="menu dropdown-content z-10 mt-2 w-44 rounded-box bg-slate-800 p-2 shadow"
          >
            <Link to="/settings">
              <button className="btn w-full border-black bg-transparent text-white">
                <Settings />
                Setting
              </button>
            </Link>
            {authUser && (
              <>
                <Link to={"/profile"}>
                  <button className="btn w-full border-black bg-transparent text-white">
                    <UserRoundPen />
                    Profile
                  </button>
                </Link>
                <button
                  onClick={logout}
                  className="btn w-full border-black bg-transparent text-white"
                >
                  <LogOut />
                  Logout
                </button>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
