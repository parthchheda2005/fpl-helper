import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import SquadCard from "./SquadCard";
import AggregateSquadStats from "./AggregateSquadStats";

function removeSpecialCharacters(str) {
  let normalizedStr = str.normalize("NFD");
  let cleanedStr = normalizedStr.replace(/[\u0300-\u036f]/g, "");
  cleanedStr = cleanedStr.replace(/[ð]/g, "d");
  return cleanedStr;
}

function ViewFPLSquad() {
  const [url, setUrl] = useState("");
  const [gw, setGw] = useState("");
  const [teamId, setTeamId] = useState("");
  const [players, setPlayers] = useState([]);
  const [squad, setSquad] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const gettingPlayers = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("http://127.0.0.1:8000/players/v1/pl/get", {
          signal: signal,
        });
        const data = await res.json();
        setPlayers(data.data);
      } catch (error) {
        console.log("failed to fetch");
      }
      setIsLoading(false);
    };

    gettingPlayers();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getSquad = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/squad/v1/get/${teamId}/${gw}`,
          {
            signal: signal,
          }
        );
        const data = await res.json();
        let squad = data.squad;
        squad = squad.map((el) =>
          players.find(
            (curr) =>
              removeSpecialCharacters(el.name) ===
                removeSpecialCharacters(curr.name) &&
              el.position === curr.position
          )
        );
        console.log(squad);
        setSquad(squad);
      } catch (error) {
        console.log("failed to fetch");
      }
      setIsLoading(false);
    };

    getSquad();

    return () => {
      controller.abort();
    };
  }, [teamId, gw]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parts = url.split("/");
    const numbers = parts.filter((part) => !isNaN(part) && part !== "");
    setTeamId(numbers[0]);
    setGw(numbers[1]);
  };

  return (
    <div className="h-screen w-screen pt-[7vh] bg-neutral-800 text-stone-100 flex items-center flex-col mt-5">
      <p className="text-2xl">
        Go to the Points Tab in the FPL Website and copy the URL:{" "}
      </p>
      <form
        className="mt-3 flex flex-col items-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          className="text-stone-800 text-sm w-[26rem] h-8 flex justify-center p-3"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-2xl text-xl px-6 py-2 bg-sky-700 mt-4 w-48 flex justify-center hover:bg-neutral-50 hover:text-neutral-800 transition-colors duration-300"
        >
          View my squad
        </button>
      </form>
      <div className="mt-5">
        {url !== "" ? (
          isLoading ? (
            <Spinner />
          ) : (
            <div className="overflow-scroll">
              {squad.map((el) => (
                <SquadCard player={el} allPlayers={players} squad={squad} />
              ))}
            </div>
          )
        ) : (
          <div className="flex flex-row space-x-4">
            <AggregateSquadStats
              players={players}
              stat={"Best Value (points per £)"}
            />
            <AggregateSquadStats
              players={players}
              stat={"Most Owned Players"}
            />
            <AggregateSquadStats players={players} stat={"Hidden Gems"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewFPLSquad;
