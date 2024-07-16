import { useState } from "react";

function SquadCard({ player, allPlayers, squad }) {
  const {
    name,
    team,
    position,
    ownership,
    price,
    form,
    totalPoints,
    goalsAllowedPer90,
    xGAllowedPer90,
    xGAPer90,
    xG,
    ga,
  } = player;
  const [showRec, setShowRec] = useState(false);

  let recommendedPlayers = allPlayers.filter(
    (el) => !squad.includes(el) && el.position === position
  );

  if (position === "GKP") {
    recommendedPlayers = recommendedPlayers
      .filter(
        (el) =>
          el !== player &&
          el.price <= price + 0.5 &&
          (el.totalPoints > totalPoints ||
            el.goalsAllowedPer90 > goalsAllowedPer90)
      )
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, 3);
  } else if (position === "DEF") {
    recommendedPlayers = recommendedPlayers
      .filter(
        (el) =>
          el !== player &&
          el.price <= price + 0.5 &&
          (el.totalPoints > totalPoints ||
            el.goalsAllowedPer90 > goalsAllowedPer90 ||
            el.xGAllowedPer90 > xGAllowedPer90 ||
            el.xGAPer90 > xGAPer90)
      )
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, 3);
  } else if (position === "MID") {
    recommendedPlayers = recommendedPlayers
      .filter(
        (el) =>
          el !== player &&
          el.price <= price + 0.5 &&
          (el.totalPoints > totalPoints ||
            el.xGAllowedPer90 > xGAllowedPer90 ||
            el.xGAPer90 > xGAPer90 ||
            el.xG > xG ||
            el.ga > ga)
      )
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, 3);
  } else if (position === "FWD") {
    recommendedPlayers = recommendedPlayers
      .filter(
        (el) =>
          el !== player &&
          el.price <= price + 0.5 &&
          (el.totalPoints > totalPoints ||
            el.xGAllowedPer90 > xGAllowedPer90 ||
            el.xGAPer90 > xGAPer90 ||
            el.xG > xG ||
            el.ga > ga)
      )
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, 3);
  }

  return (
    <>
      <button
        onClick={() => setShowRec((curr) => !curr)}
        className="min-w-96 h-24 text-neutral-100 bg-neutral-700 mx-10 my-8 shadow-lg rounded-lg px-3 py-3 flex items-center justify-between hover:scale-110 hover:font-semibold transition duration-300"
      >
        <div className="text-left">
          {name} <br /> {team}
          <br /> {position}
        </div>
        <div className="text-right">
          {`${ownership}%`} <br /> {`£${price}`}
          <br /> {form}
        </div>
      </button>
      {showRec && (
        <div className="">
          <h1 className="flex justify-center">Potential transfers</h1>
          {recommendedPlayers.map((el) => (
            <div className="min-w-96 h-20 bg-neutral-100 text-neutral-700 mx-10 my-8 shadow-lg rounded-lg p-3 flex items-center justify-between">
              <div>
                {el.name} <br /> {el.team}
                <br /> {`${el.ownership}%`}
              </div>
              <div>
                {`${el.totalPoints} points`} <br /> {`£${el.price}`}
                <br /> {el.form}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SquadCard;
