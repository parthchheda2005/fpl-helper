import { useEffect, useState } from "react";
import CardComponentPL from "./CardComponentPL";
import AddPlayerCard from "./AddPlayerCard";
import AddPlayerMenuPL from "./AddPlayerMenuPL";
import Spinner from "./Spinner";

function FPLPage({
  refreshPlayers,
  setRefreshPlayers,
  setIsLoading,
  isLoading,
}) {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [addingNewPlayer, setAddingNewPlayer] = useState(false);
  const [players, setPlayers] = useState([]);

  // get players
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const refreshingPlayers = async () => {
      setIsLoading(true);
      setSelectedPlayers([]);
      try {
        const res = await fetch("http://127.0.0.1:8000/players/v1/pl/refresh", {
          signal: signal,
        });
        const data = await res.json();
        setPlayers(data.data);
        setRefreshPlayers(false);
      } catch (error) {
        console.log("failed to fetch");
      }
      setIsLoading(false);
    };

    const gettingPlayers = async () => {
      setIsLoading(true);
      setSelectedPlayers([]);
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

    // if (refreshPlayers) {
    //   refreshingPlayers();
    // } else {
    //   gettingPlayers();
    // }

    gettingPlayers();

    return () => {
      controller.abort();
    };
  }, [refreshPlayers]);

  return (
    <div
      className={`h-screen min-w-max pt-[7vh] bg-neutral-800 text-stone-100 overflow-y-hidden overflow-x-auto flex ${
        isLoading && "justify-center items-center"
      }`}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {selectedPlayers.map((el) => (
            <CardComponentPL
              key={el.id} // Assuming each player object has a unique id
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
            <AddPlayerCard setAddingNewPlayer={setAddingNewPlayer} />
          )}
        </>
      )}
    </div>
  );
}

export default FPLPage;
