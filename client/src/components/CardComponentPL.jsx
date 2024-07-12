import StatComponent from "./StatComponent";

function CardComponentPL({ player, selectedPlayers, setSelectedPlayers }) {
  const {
    name,
    season,
    team,
    position,
    ownership,
    price,
    form,
    totalPoints,
    matchesPlayed,
    matchesStarted,
    minPlayed,
    goals,
    assists,
    ga,
    penalties,
    gaPer90,
    xGPer90,
    xGAPer90,
    npXGAPer90,
    statsHighlightStatus,
  } = player;

  function removePlayer(playerToRemove) {
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

    let updatedSelectedPlayers = selectedPlayers
      .slice()
      .filter((el) => el !== playerToRemove);

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
    } else {
      updatedSelectedPlayers = updatedSelectedPlayers.map((player) => {
        return {
          ...player,
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
      });
    }
    console.log(updatedSelectedPlayers);
    setSelectedPlayers(updatedSelectedPlayers);
  }

  return (
    <div className="w-96 rounded-2xl shadow-lg bg-neutral-700 mx-10 my-8 flex flex-col">
      <div className="px-6 py-4 justify-between flex items-center">
        <h1 className="font-bold text-xl mb-2 items-center uppercase flex justify-center">
          {name}
        </h1>
        <button
          onClick={() => removePlayer(player)}
          className="text-xl hover:text-red-600 transition-colors duration-200"
        >
          X
        </button>
      </div>
      <div className="flex-1 overflow-y-scroll px-6 py-4">
        <StatComponent type="Team" data={team} />
        <StatComponent type="Season" data={season} />
        <StatComponent type="position" data={position} />
        <StatComponent type="ownership" data={ownership} />
        <StatComponent type="price" data={price} />
        <StatComponent
          type="form"
          data={form}
          highlight={statsHighlightStatus.form}
        />
        <StatComponent
          type="total Points"
          data={totalPoints}
          highlight={statsHighlightStatus.totalPoints}
        />
        <StatComponent
          type="Matches Played"
          data={matchesPlayed}
          highlight={statsHighlightStatus.matchesPlayed}
        />
        <StatComponent
          type="starts"
          data={matchesStarted}
          highlight={statsHighlightStatus.matchesStarted}
        />
        <StatComponent
          type="minutes played"
          data={minPlayed}
          highlight={statsHighlightStatus.minPlayed}
        />
        <StatComponent
          type="Goals"
          data={goals}
          highlight={statsHighlightStatus.goals}
        />
        <StatComponent
          type="Assists"
          data={assists}
          highlight={statsHighlightStatus.assists}
        />
        <StatComponent
          type="penalties"
          data={penalties}
          highlight={statsHighlightStatus.penalties}
        />
        <StatComponent
          type="Goals + Assists"
          data={ga}
          highlight={statsHighlightStatus.ga}
        />
        <StatComponent
          type="Goals + Assists per 90"
          data={gaPer90}
          highlight={statsHighlightStatus.gaPer90}
        />
        <StatComponent
          type="xG per 90"
          data={xGPer90}
          highlight={statsHighlightStatus.xGPer90}
        />
        <StatComponent
          type="xG + xA per 90"
          data={xGAPer90}
          highlight={statsHighlightStatus.xGAPer90}
        />
        <StatComponent
          type="Non-Penalty xG + xA per 90"
          data={npXGAPer90}
          highlight={statsHighlightStatus.npXGAPer90}
        />
      </div>
    </div>
  );
}

export default CardComponentPL;
