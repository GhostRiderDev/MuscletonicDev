import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import IUser from "@/interfaces/IUser";
import { CiLogout } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setUser } from "@/reducers/userReducer";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: { user: IUser }) => state.user);
  const dispatch: AppDispatch = useDispatch();

  return (
    <header className="bg-slate-900  md:px-11 md:py-2 w-screen text-white">
      <nav className="flex flex-col px-4 md:px-0 items-start w-full md:flex-row  md:items-center md:justify-around md:gap-20">
        <Link className="flex-col justify-stretch items-start" to="/home">
          <img src="/logo.png" className="w-20  mb-[-15px] md:mx-auto" />
          <h1 className="text-white text-2xl font-bold">Muscletonic</h1>
        </Link>
        <div className="md:hidden absolute top-4 right-4">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
        <div
          className={`flex flex-col  w-screen items-start  md:flex-row  md:gap-16 md:items-center md:w-[40vw] md:flex ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {!user && (
            <>
              <Link
                to="/home"
                className="text-white px-0 h-10 md:h-auto border-y-[1px] md:border-y-0 flex md:justify-center  w-full md:rounded-lg md:px-4 py-2 m-2 sm:m-0 md:bg-[rgba(255,255,255,0.1)] md:backdrop-blur-md hover:bg-sky-200 hover:text-slate-800 transition-all duration-200"
              >
                Home
              </Link>
              <Link
                to="/contact"
                className="text-white px-0 h-10 md:h-auto md:border-t-0 w-screen md:rounded-lg md:px-4 md:py-2 mx-2 flex items-center sm:m-0 md:bg-[rgba(255,255,255,0.1)] md:backdrop-blur-md hover:bg-sky-200 hover:text-slate-800 transition-all duration-200 md:max-w-32 md:justify-center"
              >
                About us
              </Link>
              <Link
                to="/pricing"
                className="text-white px-0 h-10 md:h-auto md:border-t-0 w-screen md:rounded-lg md:px-4 md:py-2 mx-2 flex items-center sm:m-0 md:bg-[rgba(255,255,255,0.1)] md:backdrop-blur-md hover:bg-sky-200 hover:text-slate-800 transition-all duration-200 md:max-w-32 md:justify-center"
              >
                Pricing
              </Link>
            </>
          )}
          {user && (
            <>
              <Link
                to="/user/muscles"
                className="text-white ml-2 h-10 md:h-auto border-b-[1px] md:border-b-0  md:border-t-0 w-full md:rounded-lg md:px-4 flex items-center py-2 md:m-2 sm:m-0 md:bg-[rgba(255,255,255,0.1)] md:backdrop-blur-md hover:bg-sky-200 hover:text-slate-800 transition-all duration-200 md:max-w-32 md:justify-center"
              >
                Muscles
              </Link>
              <Link
                to="/user/routines/favorites"
                className="text-white ml-2 h-10 md:h-auto border-b-[1px] md:border-b-0  md:border-t-0 w-full md:rounded-lg md:px-4 flex items-center py-2 md:m-2 sm:m-0 md:bg-[rgba(255,255,255,0.1)] md:backdrop-blur-md hover:bg-sky-200 hover:text-slate-800 transition-all duration-200 md:max-w-32 md:justify-center"
              >
                Favorites
              </Link>
              {user.role === "admin" && (
                <Link
                  to="/user/routines/add"
                  className="text-white min-w-max ml-2 h-10 md:h-auto border-b-[1px] md:border-b-0  md:border-t-0 w-full md:rounded-lg md:px-4 flex items-center py-2 md:m-2 sm:m-0 md:bg-[rgba(255,255,255,0.1)] md:backdrop-blur-md hover:bg-sky-200 hover:text-slate-800 transition-all duration-200 md:max-w-40 md:justify-center"
                >
                  Add Routine
                </Link>
              )}
            </>
          )}
        </div>
        {!user ? (
          <div
            className={`flex flex-row justify-around w-[30vw] md:flex ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <Link
              to="/auth"
              className="rounded-lg hidden md:block bg-blue-700  px-4 py-2 border-white border-[1px] hover:bg-sky-200 hover:text-slate-800 transition-all duration-200"
            >
              Sign In / Sign Up
            </Link>
          </div>
        ) : (
          <div
            className={`flex flex-row justify-around w-[20vw] md:flex ${
              isOpen ? "block" : "hidden"
            }`}
            onClick={() => {
              window.localStorage.removeItem("token");
              dispatch(setUser(null));
            }}
          >
            <Link
              to="/"
              className="rounded-lg hidden md:flex md:flex-
            row bg-blue-700 items-center gap-2  px-4  border-white border-[1px] hover:bg-sky-200 hover:text-slate-800 transition-all duration-200"
            >
              <CiLogout className="w-2/6" size={40} />

              <p>Logout</p>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
