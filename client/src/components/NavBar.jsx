function NavBar(players = { players, setPlayers }) {
  function updateData() {
    console.log("updateData reached");

    fetch("http://127.0.0.1:8000/players/v1/euros/save")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPlayers(data.data.euroPlayers);
      })
      .catch((err) => console.log("failed to fetch"));
  }

  return (
    <div className="bg-sky-800 flex justify-between h-[7vh] text-xl w-screen fixed top-0 px-3 items-center">
      <p>Fantasy Football Companion (EURO24 FANTASY & FPL)</p>
      <button
        onClick={updateData}
        className="text-cyan-800 bg-neutral-800 px-4 py-1 rounded-full hover:text-neutral-800 hover:bg-sky-100 transition-all duration-500 hover:px-5 hover:py-2"
      >
        Update data
      </button>
    </div>
  );
}

export default NavBar;
