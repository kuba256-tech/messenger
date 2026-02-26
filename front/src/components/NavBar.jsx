import { LogOut, Menu, Settings, UserRoundPen } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { logout, authUser } = useAuthStore();
  return (
    <header>
      <div className="navbar  shadow-sm border-b-3 ">
        <div className="flex-1">
          <a className="btn btn-ghost  sacramento font-sacramento text-h2">
            Messenger
          </a>
        </div>
        <div className="flex-none hidden md:block">
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
        
        <div className="dropdown dropdown-center md:hidden ">
          <div tabIndex={0} role="button" className="btn m-1 bg-transparent">
            <Menu />
          </div>
          <ul
            tabIndex="-1"
            className="dropdown-content menu mr-[40%]  rounded-box z-1  bg-slate-800 "
          >
           <Link to="/settings">
            <button className="btn w-full  text-white border-black bg-transparent">
              <Settings />
              Setting
            </button>
          </Link>
          {authUser && (
            <>
              <Link to={"/profile"}>
                <button className="btn w-full bg-[#2F2F2F] text-white border-black bg-transparent">
                  <UserRoundPen />
                  Profile
                </button>
              </Link>
              <button
                onClick={logout}
                className="btn w-full bg-[#2F2F2F] text-white border-black bg-transparent"
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
