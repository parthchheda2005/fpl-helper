import StatComponent from "./StatComponent";

// const fakeData = {
//   name: "Cole Palmer",
//   team: "Chelsea",
//   img: "https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_8-220.png",
//   price: "6.0",
//   starts: "29",
//   goals: "22",
//   assists: "11",
//   ga: "33",
//   penalties: "9",
//   goalsPer90: "0.76",
//   gaPer90: "1.14",
//   gaPer90NoPens: "0.83",
//   xGPer90: "0.63",
//   xGAPer90: "1.01",
//   xGAPer90NoPens: "0.77",
// };

function CardComponent({ player, setSelectedPlayers }) {
  const {
    name,
    team,
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
  return (
    <div className="w-96 rounded-2xl shadow-lg bg-neutral-700 mx-10 my-8 flex flex-col">
      <div className="px-6 py-4 justify-between flex items-center">
        <h1 className="font-bold text-xl mb-2 items-center uppercase flex justify-center">
          {name}
        </h1>
        <button
          onClick={() =>
            setSelectedPlayers((curr) => curr.filter((el) => el !== player))
          }
          className="text-xl hover:text-red-600 transition-colors duration-200"
        >
          X
        </button>
      </div>
      <div className="flex-1 overflow-y-scroll px-6 py-4">
        <StatComponent type="Team" data={team} />
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

export default CardComponent;
