import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  return (
    <div className="bg-sky-600 flex justify-between h-[7vh] text-xl w-screen fixed top-0 px-3 items-center rounded-b-2xl">
      <p
        className="text-3xl font-bold text-stone-900 cursor-pointer"
        onClick={() => navigate("/")}
      >
        FPL Helper
      </p>

      <ul className="list-none p-0 m-0 flex justify-between gap-5 items-center font-semibold">
        <li className="hover:rounded-xl bg-sky-700 bg-opacity-60 px-3 py-3 hover:bg-sky-100 transition-all duration-500 hover:px-5 hover:py-2 hover:text-neutral-800">
          <p onClick={() => navigate("/euro-24")} className="cursor-pointer">
            EURO24 Data
          </p>
        </li>
        <li className="hover:rounded-xl bg-sky-700 bg-opacity-60 px-3 py-3 hover:bg-sky-100 transition-all duration-500 hover:px-5 hover:py-2 hover:text-neutral-800">
          <p onClick={() => navigate("/fpl")} className="cursor-pointer">
            FPL Data
          </p>
        </li>
        <li className="hover:rounded-xl bg-sky-700 bg-opacity-60 px-3 py-3 hover:bg-sky-100 transition-all duration-500 hover:px-5 hover:py-2 hover:text-neutral-800">
          <p onClick={() => navigate("/fpl-squad")} className="cursor-pointer">
            FPL Squad Planning
          </p>
        </li>
        <li className="hover:rounded-xl bg-sky-700 bg-opacity-60 px-3 py-3 hover:bg-sky-100 transition-all duration-500 hover:px-5 hover:py-2 hover:text-neutral-800">
          <p onClick={() => navigate("/settings")} className="cursor-pointer">
            Settings
          </p>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
