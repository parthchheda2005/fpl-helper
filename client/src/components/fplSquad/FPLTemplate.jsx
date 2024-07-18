function FPLTemplate({ players }) {
  const GKs = [...players]
    .filter((el) => el.position === "GKP" && el.season === "24-25")
    .sort((a, b) => b.ownership - a.ownership)
    .slice(0, 2);
  const DEFs = [...players]
    .filter((el) => el.position === "DEF" && el.season === "24-25")
    .sort((a, b) => b.ownership - a.ownership)
    .slice(0, 5);
  const MIDs = [...players]
    .filter((el) => el.position === "MID" && el.season === "24-25")
    .sort((a, b) => b.ownership - a.ownership)
    .slice(0, 5);
  const FWDs = [...players]
    .filter((el) => el.position === "FWD" && el.season === "24-25")
    .sort((a, b) => b.ownership - a.ownership)
    .slice(0, 3);

  return (
    <div className="text-neutral-100 mt-8 ">
      <h1 className="text-2xl">The Template/Most Owned Squad: </h1>
      {GKs.map((el) => (
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
      {DEFs.map((el) => (
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
      {MIDs.map((el) => (
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
      {FWDs.map((el) => (
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
  );
}

export default FPLTemplate;
