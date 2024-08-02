function GemsCard({ player }) {
  return (
    <button
      key={player.name}
      className="w-full md:w-[24rem] h-24 text-neutral-100 bg-neutral-700 my-4 md:my-8 shadow-lg rounded-lg px-3 py-3 flex items-center justify-between"
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
  );
}

export default GemsCard;
