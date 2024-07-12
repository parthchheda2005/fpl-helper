import { useEffect, useState } from "react";

function AddPlayerMenu({
  players,
  setAddingNewPlayer,
  setSelectedPlayers,
  selectedPlayers,
}) {
  const seasons = [...new Set(players.map((el) => el.season))];
  const positions = ["GKP", "DEF", "MID", "FWD"];
  const [teams, setTeams] = useState([]);

  const [invalidInput, setInvalidInput] = useState(false);

  const [season, setSeason] = useState("Season");
  const [position, setPosition] = useState("Position");
  const [currTeam, setCurrTeam] = useState("Team");
  const [player, setPlayer] = useState("Player");

  function updateHighlighting(newPlayer) {
    const stats = [
      "form",
      "totalPoints",
      "matchesPlayed",
      "matchesStarted",
      "minPlayed",
      "goals",
      "assists",
      "ga",
      "penalties",
      "gaPer90",
      "xGPer90",
      "xGAPer90",
      "npXGAPer90",
    ];

    let updatedSelectedPlayers = [...selectedPlayers, newPlayer];

    if (updatedSelectedPlayers.length > 1) {
      stats.forEach((stat) => {
        let max = Math.max(
          ...updatedSelectedPlayers.map((player) => player[stat])
        );
        let min = Math.min(
          ...updatedSelectedPlayers.map((player) => player[stat])
        );

        updatedSelectedPlayers = updatedSelectedPlayers.map((player) => {
          const newStatus = { ...player.statsHighlightStatus };
          if (player[stat] * 1 === max) {
            newStatus[stat] = "max";
          } else if (player[stat] * 1 === min) {
            newStatus[stat] = "min";
          } else {
            newStatus[stat] = "none";
          }
          return {
            ...player,
            statsHighlightStatus: newStatus,
          };
        });
      });
    }

    console.log(updatedSelectedPlayers);
    setSelectedPlayers(updatedSelectedPlayers);
  }

  function addPlayerToSelectedPlayers(e) {
    e.preventDefault();
    if (
      player === "Player" ||
      season === "Season" ||
      currTeam === "Team" ||
      position === "Position"
    ) {
      setInvalidInput(true);
      return;
    } else {
      setInvalidInput(false);
    }

    let playerToAdd = players.find(
      (el) => el.season === season && el.name === player
    );
    playerToAdd = {
      ...playerToAdd,
      statsHighlightStatus: {
        form: "none",
        totalPoints: "none",
        matchesPlayed: "none",
        matchesStarted: "none",
        minPlayed: "none",
        goals: "none",
        assists: "none",
        ga: "none",
        penalties: "none",
        gaPer90: "none",
        xGPer90: "none",
        xGAPer90: "none",
        npXGAPer90: "none",
      },
    };

    updateHighlighting(playerToAdd);
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
            <h1>Season: </h1>{" "}
            <select
              name="season"
              className="text-neutral-700"
              value={season}
              onChange={(e) => {
                setSeason(e.target.value);
                setTeams(
                  [
                    ...new Set(
                      players
                        .filter((el) => el.season === e.target.value)
                        .map((el) => el.team)
                    ),
                  ] || []
                );
              }}
            >
              <option value="Season">Season</option>
              {seasons.map((el) => (
                <option key={el} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>
          <div className="my-8 flex justify-between text-xl">
            <h1>Position: </h1>{" "}
            <select
              name="position"
              className="text-neutral-700"
              value={position}
              onChange={(e) => {
                setPosition(e.target.value);
              }}
            >
              <option value="Position">Position</option>
              {positions.map((el) => (
                <option key={el} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>
          <div className="my-8 flex justify-between text-xl">
            <h1>Team: </h1>{" "}
            <select
              name="team"
              className="text-neutral-700"
              value={currTeam}
              onChange={(e) => {
                setCurrTeam(e.target.value);
              }}
            >
              <option value="Team">Team</option>
              {teams.map((el) => (
                <option key={el} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>
          <div className="my-8 flex justify-between text-xl">
            <h1>Player: </h1>{" "}
            <select
              name="player"
              className="text-neutral-700"
              value={player}
              onChange={(e) => {
                setPlayer(e.target.value);
              }}
            >
              <option value="Player">Player</option>
              {players
                .filter(
                  (el) =>
                    el.team === currTeam &&
                    el.season === season &&
                    el.position === position
                )
                .map((el) => (
                  <option key={el.name} value={el.name}>
                    {el.name}
                  </option>
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
          {invalidInput && (
            <p className="text-red-600 flex justify-center text-xl m-6">
              Please select a valid input
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddPlayerMenu;
