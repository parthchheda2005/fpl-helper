import { useState } from "react";
import DetailedStatsCard from "./DetailedStatsCard";

function TemplateCard({ player }) {
  const [showDetailedStats, setShowDetailedStats] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowDetailedStats((curr) => !curr)}
        key={player.name}
        className="hover:scale-110 hover:font-semibold transition duration-300 w-full md:w-[24rem] h-24 text-neutral-100 bg-neutral-700 my-4 md:my-8 shadow-lg rounded-lg px-3 py-3 flex items-center justify-between"
      >
        <div className="text-left">
          {player.name} <br /> {player.team}
          <br /> {player.position}
        </div>
        <div className="text-right">
          {`${player.ownership}%`} <br /> {`£${player.price}`}
          <br />
          {`${
            Math.round((player.totalPoints / player.matchesStarted) * 10) / 10
          } points per start`}
        </div>
      </button>
      {showDetailedStats && <DetailedStatsCard player={player} />}
    </>
  );
}

export default TemplateCard;
