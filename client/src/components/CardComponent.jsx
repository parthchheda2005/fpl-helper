import StatComponent from "./StatComponent";

const fakeData = {
  name: "Cole Palmer",
  team: "Chelsea",
  img: "https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_8-220.png",
  price: "6.0",
  starts: "29",
  goals: "22",
  assists: "11",
  ga: "33",
  penalties: "9",
  goalsPer90: "0.76",
  gaPer90: "1.14",
  gaPer90NoPens: "0.83",
  xGPer90: "0.63",
  xGAPer90: "1.01",
  xGAPer90NoPens: "0.77",
};

function CardComponent() {
  const {
    name,
    team,
    price,
    starts,
    goals,
    assists,
    ga,
    penalties,
    goalsPer90,
    gaPer90,
    gaPer90NoPens,
    xGPer90,
    xGAPer90,
    xGAPer90NoPens,
  } = fakeData;
  return (
    <div className="w-96 rounded-2xl shadow-lg bg-neutral-700 mx-10 my-8 flex flex-col">
      <div className="px-6 py-4">
        <h1 className="font-bold text-xl mb-2 items-center uppercase flex justify-center">
          {name}
        </h1>
        {/* <img
          src={img}
          alt={name}
          className="py-3 my-2 flex justify-center items-center"
        /> */}
      </div>
      <div className="flex-1 overflow-y-scroll px-6 py-4">
        <StatComponent type="Team" data={team} />
        <StatComponent type="Price" data={price} />
        <StatComponent type="starts" data={starts} />
        <StatComponent type="Goals" data={goals} />
        <StatComponent type="Assists" data={assists} />
        <StatComponent type="Goals + Assists" data={ga} />
        <StatComponent type="penalties" data={penalties} />
        <StatComponent type="Goals Per 90" data={goalsPer90} />
        <StatComponent type="Goals + Assists Per 90" data={gaPer90} />
        <StatComponent type="Goals + Assists Per 90" data={gaPer90} />
        <StatComponent
          data={gaPer90NoPens}
          type="Goals + Assists Per 90 w/o Pens"
        />
        <StatComponent data={xGPer90} type="xG Per 90" />
        <StatComponent data={xGAPer90} type="xG + xA per 90" />
        <StatComponent data={xGAPer90NoPens} type="xG + xA per 90 w/o Pens" />
      </div>
    </div>
  );
}

export default CardComponent;
