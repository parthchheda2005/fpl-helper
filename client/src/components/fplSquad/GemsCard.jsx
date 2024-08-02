import { useState } from "react";
import DetailedStatsCard from "./DetailedStatsCard";

function GemsCard({ player }) {
  const [showDetailedStats, setShowDetailedStats] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowDetailedStats((curr) => !curr)}
        key={player.name}
        className="w-full md:w-[24rem] h-24 text-neutral-100 bg-neutral-700 my-4 md:my-8 shadow-lg rounded-lg px-3 py-3 flex items-center justify-between hover:scale-110 hover:font-semibold transition duration-300"
      >
        <div className="text-left">
          {player.name} <br /> {player.team}
          <br /> {player.position}
        </div>
        <div className="text-right">
          {`${player.ownership}%`} <br /> {`£${player.price}`}
          <br /> {`${player.totalPoints} points`}
        </div>
      </button>
      {showDetailedStats && <DetailedStatsCard player={player} />}
    </>
  );
}

export default GemsCard;
