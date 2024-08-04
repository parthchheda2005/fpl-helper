import StatComponent from "../StatComponent";

function CardComponentPL({
  player,
  selectedPlayers,
  setSelectedPlayers,
  enabledStatistics,
}) {
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
    goalsAllowed,
    goalsAllowedPer90,
    xGAllowedPer90,
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
      "price",
      "fixtureDifficultyRanking",
      "goalsAllowed",
      "goalsAllowedPer90",
      "xGAllowedPer90",
    ];

    const statsMaxBetter = [
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

    const statsMinBetter = [
      "price",
      "fixtureDifficultyRanking",
      "goalsAllowed",
      "goalsAllowedPer90",
      "xGAllowedPer90",
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
          if (player[stat] * 1 === max && statsMaxBetter.includes(stat)) {
            newStatus[stat] = "max";
          } else if (
            player[stat] * 1 === min &&
            statsMaxBetter.includes(stat)
          ) {
            newStatus[stat] = "min";
          } else if (
            player[stat] * 1 === min &&
            statsMinBetter.includes(stat)
          ) {
            newStatus[stat] = "max";
          } else if (
            player[stat] * 1 === max &&
            statsMinBetter.includes(stat)
          ) {
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
        <h1 className="font-bold text-l sm:text-xl mb-2 items-center uppercase flex justify-center">
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
        {enabledStatistics.includes("team") && (
          <StatComponent type="Team" data={team} />
        )}
        {enabledStatistics.includes("season") && (
          <StatComponent type="Season" data={season} />
        )}
        {enabledStatistics.includes("position") && (
          <StatComponent type="position" data={position} />
        )}
        {enabledStatistics.includes("ownership") && (
          <StatComponent
            type="ownership"
            data={ownership}
            highlight={
              enabledStatistics.includes("ownership")
                ? statsHighlightStatus.ownership
                : ""
            }
          />
        )}
        {enabledStatistics.includes("price") && (
          <StatComponent
            type="price"
            data={price}
            highlight={
              enabledStatistics.includes("price")
                ? statsHighlightStatus.price
                : ""
            }
          />
        )}
        {player.fixtureDifficultyRanking &&
          enabledStatistics.includes("fixtureDifficultyRanking") && (
            <StatComponent
              type="Fixture Difficulty Ranking"
              data={player.fixtureDifficultyRanking}
              highlight={
                enabledStatistics.includes("fixtureDifficultyRanking")
                  ? statsHighlightStatus.fixtureDifficultyRanking
                  : ""
              }
            />
          )}
        {enabledStatistics.includes("form") && (
          <StatComponent
            type="form"
            data={form}
            highlight={
              enabledStatistics.includes("comparisonHighlight")
                ? statsHighlightStatus.form
                : ""
            }
          />
        )}
        {enabledStatistics.includes("totalPoints") && (
          <StatComponent
            type="total Points"
            data={totalPoints}
            highlight={
              enabledStatistics.includes("comparisonHighlight")
                ? statsHighlightStatus.totalPoints
                : ""
            }
          />
        )}
        {enabledStatistics.includes("matchesPlayed") && (
          <StatComponent
            type="Matches Played"
            data={matchesPlayed}
            highlight={
              enabledStatistics.includes("comparisonHighlight")
                ? statsHighlightStatus.matchesPlayed
                : ""
            }
          />
        )}
        {enabledStatistics.includes("matchesStarted") && (
          <StatComponent
            type="starts"
            data={matchesStarted}
            highlight={
              enabledStatistics.includes("comparisonHighlight")
                ? statsHighlightStatus.matchesStarted
                : ""
            }
          />
        )}
        {enabledStatistics.includes("minPlayed") && (
          <StatComponent
            type="minutes played"
            data={minPlayed}
            highlight={
              enabledStatistics.includes("comparisonHighlight")
                ? statsHighlightStatus.minPlayed
                : ""
            }
          />
        )}
        {enabledStatistics.includes("goals") && (
          <StatComponent
            type="Goals"
            data={goals}
            highlight={
              enabledStatistics.includes("comparisonHighlight")
                ? statsHighlightStatus.goals
                : ""
            }
          />
        )}
        {enabledStatistics.includes("assists") && (
          <StatComponent
            type="Assists"
            data={assists}
            highlight={
              enabledStatistics.includes("comparisonHighlight")
                ? statsHighlightStatus.assists
                : ""
            }
          />
        )}
        {enabledStatistics.includes("penalties") && (
          <StatComponent
            type="penalties"
            data={penalties}
            highlight={
              enabledStatistics.includes("comparisonHighlight")
                ? statsHighlightStatus.penalties
                : ""
            }
          />
        )}
        {enabledStatistics.includes("ga") && (
          <StatComponent
            type="Goals + Assists"
            data={ga}
            highlight={
              enabledStatistics.includes("comparisonHighlight")
                ? statsHighlightStatus.ga
                : ""
            }
          />
        )}
        {enabledStatistics.includes("gaPer90") && (
          <StatComponent
            type="Goals + Assists per 90"
            data={gaPer90}
            highlight={
              enabledStatistics.includes("comparisonHighlight")
                ? statsHighlightStatus.gaPer90
                : ""
            }
          />
        )}
        {enabledStatistics.includes("xGPer90") && (
          <StatComponent
            type="xG per 90"
            data={xGPer90}
            highlight={
              enabledStatistics.includes("comparisonHighlight")
                ? statsHighlightStatus.xGPer90
                : ""
            }
          />
        )}
        {enabledStatistics.includes("xGAPer90") && (
          <StatComponent
            type="xG + xA per 90"
            data={xGAPer90}
            highlight={
              enabledStatistics.includes("comparisonHighlight")
                ? statsHighlightStatus.xGAPer90
                : ""
            }
          />
        )}
        {enabledStatistics.includes("npXGAPer90") && (
          <StatComponent
            type="Non-Penalty xG + xA per 90"
            data={npXGAPer90}
            highlight={
              enabledStatistics.includes("comparisonHighlight")
                ? statsHighlightStatus.npXGAPer90
                : ""
            }
          />
        )}
        {enabledStatistics.includes("goalsAllowed") && (
          <StatComponent
            type="Team Goals Conceded"
            data={goalsAllowed}
            highlight={
              enabledStatistics.includes("goalsAllowed")
                ? statsHighlightStatus.goalsAllowed
                : ""
            }
          />
        )}
        {enabledStatistics.includes("goalsAllowedPer90") && (
          <StatComponent
            type="Team Goals Conceded Per 90"
            data={goalsAllowedPer90}
            highlight={
              enabledStatistics.includes("goalsAllowedPer90")
                ? statsHighlightStatus.goalsAllowedPer90
                : ""
            }
          />
        )}
        {enabledStatistics.includes("xGAllowedPer90") && (
          <StatComponent
            type="xG Conceded Per 90"
            data={xGAllowedPer90}
            highlight={
              enabledStatistics.includes("xGAllowedPer90")
                ? statsHighlightStatus.xGAllowedPer90
                : ""
            }
          />
        )}
      </div>
    </div>
  );
}

export default CardComponentPL;
