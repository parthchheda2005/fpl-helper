function AggregateSquadStats({ players, stat }) {
  const hiddenGems = [...players]
    .filter((el) => el.season === "24-25" && el.ownership <= 10)
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, 15);
  const cheapBeasts = [...players]
    .filter((el) => el.season === "24-25")
    .sort((a, b) => b.totalPoints / b.price - a.totalPoints / a.price)
    .slice(0, 15);
  const GKTemplate = [...players]
    .filter((el) => el.position === "GKP" && el.season === "24-25")
    .sort((a, b) => b.ownership - a.ownership)
    .slice(0, 2);
  const DEFTemplate = [...players]
    .filter((el) => el.position === "DEF" && el.season === "24-25")
    .sort((a, b) => b.ownership - a.ownership)
    .slice(0, 5);
  const MIDTemplate = [...players]
    .filter((el) => el.position === "MID" && el.season === "24-25")
    .sort((a, b) => b.ownership - a.ownership)
    .slice(0, 5);
  const FWDTemplate = [...players]
    .filter((el) => el.position === "FWD" && el.season === "24-25")
    .sort((a, b) => b.ownership - a.ownership)
    .slice(0, 3);

  return (
    <div className="flex flex-col text-neutral-100 mt-8 p-4 max-h-[33rem] overflow-hidden">
      <h1 className="text-2xl mx-10 capitalize">{stat}:</h1>
      <div className="overflow-y-auto">
        {stat === "Most Owned Players" && (
          <div>
            {GKTemplate.map((el) => (
              <button className="min-w-96 h-24 text-neutral-100 bg-neutral-700 mx-10 my-8 shadow-lg rounded-lg px-3 py-3 flex items-center justify-between">
                <div className="text-left">
                  {el.name} <br /> {el.team}
                  <br /> {el.position}
                </div>
                <div className="text-right">
                  {`${el.ownership}%`} <br /> {`£${el.price}`}
                  <br /> {el.form}
                </div>
              </button>
            ))}
            {DEFTemplate.map((el) => (
              <button className="min-w-96 h-24 text-neutral-100 bg-neutral-700 mx-10 my-8 shadow-lg rounded-lg px-3 py-3 flex items-center justify-between">
                <div className="text-left">
                  {el.name} <br /> {el.team}
                  <br /> {el.position}
                </div>
                <div className="text-right">
                  {`${el.ownership}%`} <br /> {`£${el.price}`}
                  <br /> {el.form}
                </div>
              </button>
            ))}
            {MIDTemplate.map((el) => (
              <button className="min-w-96 h-24 text-neutral-100 bg-neutral-700 mx-10 my-8 shadow-lg rounded-lg px-3 py-3 flex items-center justify-between">
                <div className="text-left">
                  {el.name} <br /> {el.team}
                  <br /> {el.position}
                </div>
                <div className="text-right">
                  {`${el.ownership}%`} <br /> {`£${el.price}`}
                  <br /> {el.form}
                </div>
              </button>
            ))}
            {FWDTemplate.map((el) => (
              <button className="min-w-96 h-24 text-neutral-100 bg-neutral-700 mx-10 my-8 shadow-lg rounded-lg px-3 py-3 flex items-center justify-between ">
                <div className="text-left">
                  {el.name} <br /> {el.team}
                  <br /> {el.position}
                </div>
                <div className="text-right">
                  {`${el.ownership}%`} <br /> {`£${el.price}`}
                  <br /> {el.form}
                </div>
              </button>
            ))}
          </div>
        )}
        {stat === "Best Value (points per £)" &&
          cheapBeasts.map((el) => (
            <button className="min-w-96 h-24 text-neutral-100 bg-neutral-700 mx-10 my-8 shadow-lg rounded-lg px-3 py-3 flex items-center justify-between">
              <div className="text-left">
                {el.name} <br /> {el.team}
                <br /> {`${el.position}`}
              </div>
              <div className="text-right">
                {`${el.ownership}%`} <br /> {`£${el.price}`}
                <br /> {`${Math.round(el.totalPoints / el.price)} pts per £`}
              </div>
            </button>
          ))}
        {stat === "Hidden Gems" &&
          hiddenGems.map((el) => (
            <button className="min-w-96 h-24 text-neutral-100 bg-neutral-700 mx-10 my-8 shadow-lg rounded-lg px-3 py-3 flex items-center justify-between">
              <div className="text-left">
                {el.name} <br /> {el.team}
                <br /> {el.position}
              </div>
              <div className="text-right">
                {`${el.ownership}%`} <br /> {`£${el.price}`}
                <br /> {`${el.totalPoints} points`}
              </div>
            </button>
          ))}
      </div>
    </div>
  );
}

export default AggregateSquadStats;
