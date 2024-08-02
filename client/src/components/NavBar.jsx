import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const buttonClass =
    "text-sky-100 font-bold text-sm px-2 py-1 border-2 border-gray-100 hover:bg-gray-100 hover:text-gray-800 rounded-lg transition duration-300 m-1";
  const buttons = (
    <>
      <button
        onClick={() => {
          setIsOpen(false);
          navigate("/euro-24");
        }}
        className={buttonClass}
      >
        EURO24 Data
      </button>
      <button
        onClick={() => {
          setIsOpen(false);
          navigate("/fpl");
        }}
        className={buttonClass}
      >
        FPL Data
      </button>
      <button
        onClick={() => {
          setIsOpen(false);
          navigate("/fpl-squad");
        }}
        className={buttonClass}
      >
        FPL Playerbase Data
      </button>
      <button
        onClick={() => {
          setIsOpen(false);
          navigate("/settings");
        }}
        className={buttonClass}
      >
        Settings
      </button>
    </>
  );

  return (
    <nav className="bg-sky-800 text-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            FPL Helper
          </div>
          <div className="hidden md:block">
            <div className="flex ml-10 items-baseline space-x-2">{buttons}</div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              type="button"
              className="fill-sky-100"
            >
              {!isOpen ? (
                <IoMdMenu color="white" size={40} />
              ) : (
                <IoCloseSharp color="white" size={40} />
              )}
            </button>
          </div>
        </div>
      </div>
      <div>
        <div
          className={`${
            isOpen ? "fixed left-0" : "fixed left-[-200%]"
          } bg-sky-700 flex flex-row justify-between px-2 pt-2 pb-3 space-y-1 sm:px-3 top-16 ease-in-out duration-300 md:hidden h-24`}
        >
          {buttons}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
