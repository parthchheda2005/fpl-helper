function NavBar({ setRefreshPlayers, isLoading }) {
  return (
    <div className="bg-sky-800 flex justify-between h-[7vh] text-xl w-screen fixed top-0 px-3 items-center">
      <p>Fantasy Football Companion (EURO24 FANTASY & FPL)</p>
      <button
        onClick={() => setRefreshPlayers(true)}
        disabled={isLoading}
        className={`text-cyan-800 bg-neutral-800 px-4 py-1 rounded-full ${
          isLoading && "cursor-not-allowed"
        } ${
          !isLoading &&
          "hover:bg-sky-100 transition-all duration-500 hover:px-5 hover:py-2 hover:text-neutral-800"
        }`}
      >
        Update data
      </button>
    </div>
  );
}

export default NavBar;
