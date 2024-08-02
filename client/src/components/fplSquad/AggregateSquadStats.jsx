import GemsCard from "./GemsCard";
import TemplateCard from "./TemplateCard";
import ValueCard from "./ValueCard";

function AggregateSquadStats({ players, stat }) {
  const hiddenGems = [...players]
    .filter(
      (el) => el.season === "24-25" && el.ownership <= 10 && el.name !== "Diaby"
    )
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, 30);
  const cheapBeasts = [...players]
    .filter((el) => el.season === "24-25" && el.name !== "Diaby")
    .sort((a, b) => b.totalPoints / b.price - a.totalPoints / a.price)
    .slice(0, 30);
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
    <div className="flex flex-col text-neutral-100 h-[89vh] overflow-hidden">
      <h1 className="text-2xl mx-4 md:mx-10 capitalize">{stat}:</h1>
      <div className="overflow-y-auto flex-grow px-4 md:px-10">
        {stat === "Most Owned Squad" && (
          <div>
            {GKTemplate.map((el) => (
              <TemplateCard player={el} />
            ))}
            {DEFTemplate.map((el) => (
              <TemplateCard player={el} />
            ))}
            {MIDTemplate.map((el) => (
              <TemplateCard player={el} />
            ))}
            {FWDTemplate.map((el) => (
              <TemplateCard player={el} />
            ))}
          </div>
        )}
        {stat === "Best Value (points per £)" &&
          cheapBeasts.map((el) => <ValueCard player={el} />)}
        {stat === "Hidden Gems" &&
          hiddenGems.map((el) => <GemsCard player={el} />)}
      </div>
    </div>
  );
}

export default AggregateSquadStats;
