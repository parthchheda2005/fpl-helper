import { useEffect, useState } from "react";
import CardComponentPL from "./CardComponentPL";
import AddPlayerCardPL from "./AddPlayerCardPL";
import AddPlayerMenuPL from "./AddPlayerMenuPL";
import Spinner from "../Spinner";

function FPLPage({ enabledStatistics }) {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [addingNewPlayer, setAddingNewPlayer] = useState(false);
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // get players
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const gettingPlayers = async () => {
      setIsLoading(true);
      console.log("loading...");
      setSelectedPlayers([]);
      try {
        const res = await fetch(
          "https://fpl-helper-dockerized-backend.onrender.com/players/v1/pl/get",
          {
            signal: signal,
          }
        );
        const data = await res.json();
        setPlayers(data.data);
        console.log("players fetched");
      } catch (error) {
        console.log("failed to fetch");
      } finally {
        setIsLoading(false);
        console.log("finished loading");
      }
    };

    gettingPlayers();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div
      className={`h-screen min-w-max pt-[7vh] bg-neutral-800 text-stone-100 overflow-y-hidden overflow-x-auto flex`}
    >
      {isLoading || players.length === 0 ? (
        <div className="flex justify-center items-center w-full h-full scale-150">
          <Spinner />
        </div>
      ) : (
        <>
          {selectedPlayers.map((el) => (
            <CardComponentPL
              enabledStatistics={enabledStatistics}
              key={el.id}
              player={el}
              selectedPlayers={selectedPlayers}
              setSelectedPlayers={setSelectedPlayers}
            />
          ))}
          {addingNewPlayer ? (
            <AddPlayerMenuPL
              setAddingNewPlayer={setAddingNewPlayer}
              players={players}
              setSelectedPlayers={setSelectedPlayers}
              selectedPlayers={selectedPlayers}
            />
          ) : (
            <AddPlayerCardPL setAddingNewPlayer={setAddingNewPlayer} />
          )}
        </>
      )}
    </div>
  );
}

export default FPLPage;
