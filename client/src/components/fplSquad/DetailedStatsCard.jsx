function DetailedStatsCard({ player }) {
  const {
    name,
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
    goalsAllowed,
    goalsAllowedPer90,
    xGAllowedPer90,
  } = player;
  return (
    <div className="">
      <h1 className="flex justify-center text-lg sm:text-xl">
        {name} Detailed Stats:
      </h1>
      <div className="w-full md:w-[24rem] bg-neutral-100 text-neutral-700 my-4 md:my-8 shadow-lg rounded-lg px-3 py-3 flex items-center justify-between">
        <div>
          {team} <br /> {`${form} form`}
          <br /> {`${ownership}% owned`} <br /> {`${totalPoints} points`} <br />{" "}
          {`£${price}`} <br /> {`${Math.round(totalPoints / price)} pts per £`}{" "}
          <br />{" "}
          {`${
            Math.round((totalPoints / matchesStarted) * 10) / 10
          } points per start`}
          <br />{" "}
          {`${
            Math.round((totalPoints * 10) / (minPlayed / 90)) / 10
          } points per 90`}
        </div>
        <div>
          {`${matchesStarted} games started`} <br /> {`${matchesPlayed} played`}{" "}
          <br /> {`${minPlayed} min played`} <br />{" "}
          {position === "GKP" ? (
            <>
              {`${goalsAllowed} goals allowed`} <br />{" "}
              {`${goalsAllowedPer90} goals allowed per 90`} <br />{" "}
              {`${xGAllowedPer90} xG allowed per 90`}
            </>
          ) : position === "DEF" ? (
            <>
              {`${goalsAllowed} goals allowed`} <br />{" "}
              {`${goalsAllowedPer90} goals allowed per 90`} <br />{" "}
              {`${xGAllowedPer90} xG allowed per 90`} <br />{" "}
              {`${ga} goals + assists`} <br />{" "}
              {`${gaPer90} goals + assists per 90`} <br />{" "}
              {`${xGAPer90} xG + xA per 90`}
            </>
          ) : (
            <>
              {`${goals} goals`} <br />
              {`${assists} assists`} <br />
              {penalties > 0 && (
                <>
                  {`${penalties} penalties`}
                  <br />
                  {`${npXGAPer90} non-penalty xG per 90`}
                  <br />
                </>
              )}
              {`${xGPer90} xG per 90`} <br /> {`${ga} goals + assists`} <br />{" "}
              {`${gaPer90} goals + assists per 90`} <br />{" "}
              {`${xGAPer90} xG + xA per 90`}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailedStatsCard;
