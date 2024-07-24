import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const buttonClass =
    "text-sky-100 font-bold text-sm px-2 py-1 border-2 border-gray-100 hover:bg-gray-100 hover:text-gray-800 rounded-lg transition duration-300";
  const buttons = (
    <>
      <button onClick={() => navigate("/euro-24")} className={buttonClass}>
        EURO24 Data
      </button>
      <button onClick={() => navigate("/fpl")} className={buttonClass}>
        FPL Data
      </button>
      <button onClick={() => navigate("/fpl-squad")} className={buttonClass}>
        FPL Playerbase Data
      </button>
      <button onClick={() => navigate("/settings")} className={buttonClass}>
        Settings
      </button>
    </>
  );

  return (
    <nav className="bg-sky-800 text-white fixed w-full">
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
              <svg
                className="h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">{buttons}</div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;

// return (
//   <div className="bg-sky-600 flex justify-between h-[7vh] text-xl fixed top-0 px-3 items-center rounded-b-2xl w-screen">
//     <p
//       className="text-lg font-bold text-stone-900 cursor-pointer sm:text-3xl"
//       onClick={() => navigate("/")}
//     >
//       FPL Helper
//     </p>

//     <ul className="md:flex list-none p-0 m-0 flex justify-between gap-5 items-center font-semibold sm:text-lg text-sm">
//       <li className="hover:rounded-xl bg-sky-700 bg-opacity-60 sm:px-3 sm:py-3 py-2 px-2 hover:bg-sky-100 transition-all duration-500 sm:hover:px-5 sm:hover:py-2 hover:text-neutral-800">
//         <p onClick={() => navigate("/euro-24")} className="cursor-pointer">
//           EURO24 Data
//         </p>
//       </li>
//       <li className="hover:rounded-xl bg-sky-700 bg-opacity-60 sm:px-3 sm:py-3 py-2 px-2 hover:bg-sky-100 transition-all duration-500 sm:hover:px-5 sm:hover:py-2 hover:text-neutral-800">
//         <p onClick={() => navigate("/fpl")} className="cursor-pointer">
//           FPL Data
//         </p>
//       </li>
//       <li className="hover:rounded-xl bg-sky-700 bg-opacity-60 sm:px-3 sm:py-3 py-2 px-2 hover:bg-sky-100 transition-all duration-500 sm:hover:px-5 sm:hover:py-2 hover:text-neutral-800">
//         <p onClick={() => navigate("/fpl-squad")} className="cursor-pointer">
//           FPL Playerbase Data
//         </p>
//       </li>
//       <li className="hover:rounded-xl bg-sky-700 bg-opacity-60 sm:px-3 sm:py-3 py-2 px-2 hover:bg-sky-100 transition-all duration-500 sm:hover:px-5 sm:hover:py-2 hover:text-neutral-800">
//         <p onClick={() => navigate("/settings")} className="cursor-pointer">
//           Settings
//         </p>
//       </li>
//     </ul>
//   </div>
// );
