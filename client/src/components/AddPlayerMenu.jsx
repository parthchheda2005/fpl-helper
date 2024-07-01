import { useState } from "react";

function AddPlayerMenu({ players, setAddingNewPlayer, setSelectedPlayers }) {
  const teams = [...new Set(players.flatMap((el) => el.team))];

  const [currTeam, setCurrTeam] = useState(teams.at(0));
  const [player, setPlayer] = useState("");

  function addPlayerToSelectedPlayers(e) {
    e.preventDefault();
    setSelectedPlayers((curr) => [
      ...curr,
      players.find((el) => el.team === currTeam && el.name === player),
    ]);
    setAddingNewPlayer(false);
  }

  return (
    <div className="w-96 rounded-2xl shadow-lg bg-neutral-700 mx-10 my-8 flex flex-col">
      <div className="px-9 py-7">
        <h1 className="font-bold text-4xl mb-2 items-center uppercase flex justify-center">
          Add a player!
        </h1>
        <form onSubmit={(e) => addPlayerToSelectedPlayers(e)}>
          <div className="my-8 flex justify-between text-xl">
            <h1>Team: </h1>{" "}
            <select
              name="team"
              className="text-neutral-700"
              value={currTeam}
              onChange={(e) => setCurrTeam(e.target.value)}
            >
              {teams.map((el) => (
                <option value={el}>{el}</option>
              ))}
            </select>
          </div>
          <div className="my-10 flex justify-between text-xl">
            <h1>Player: </h1>{" "}
            <select
              name="team"
              className="text-neutral-700"
              value={player}
              onChange={(e) => {
                setPlayer(e.target.value);
              }}
            >
              {players
                .filter((el) => el.team === currTeam)
                .map((el) => (
                  <option value={el.name}>{el.name}</option>
                ))}
            </select>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-40 h-10 bg-neutral-100 text-neutral-700 text-xl px-4 py-2 rounded-lg hover:bg-sky-800 transition-colors duration-500 hover:text-stone-200"
            >
              Add Player
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setAddingNewPlayer(false)}
              className="w-40 h-10 bg-neutral-100 text-neutral-700 text-xl px-4-py-2 rounded-lg hover:bg-red-800 transition-colors duration-500 hover:text-stone-200"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPlayerMenu;
