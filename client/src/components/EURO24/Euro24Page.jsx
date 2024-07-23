import { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import AddPlayerCard from "./AddPlayerCard";
import AddPlayerMenu from "./AddPlayerMenu";
import Spinner from "../Spinner";

function Euro24Page({ refreshPlayers, setRefreshPlayers, enabledStatistics }) {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [addingNewPlayer, setAddingNewPlayer] = useState(false);
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // get players
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const refreshingPlayers = async () => {
      setIsLoading(true);
      setSelectedPlayers([]);
      try {
        const res = await fetch(
          "https://fpl-helper-a-o.onrender.com/players/v1/euros/refresh",
          {
            signal: signal,
          }
        );
        const data = await res.json();
        setPlayers(data.data);
        setRefreshPlayers(false);
      } catch (error) {
        console.log("failed to fetch");
      } finally {
        setIsLoading(false);
      }
    };

    const gettingPlayers = async () => {
      setIsLoading(true);
      setSelectedPlayers([]);
      try {
        const res = await fetch(
          "https://fpl-helper-a-o.onrender.com/players/v1/euros/get",
          {
            signal: signal,
          }
        );
        const data = await res.json();
        setPlayers(data.data);
      } catch (error) {
        console.log("failed to fetch");
      } finally {
        setIsLoading(false);
      }
    };

    if (refreshPlayers) {
      refreshingPlayers();
    } else {
      gettingPlayers();
    }

    return () => {
      controller.abort();
    };
  }, [refreshPlayers]);

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
            <CardComponent
              enabledStatistics={enabledStatistics}
              key={el.id}
              player={el}
              selectedPlayers={selectedPlayers}
              setSelectedPlayers={setSelectedPlayers}
            />
          ))}
          {addingNewPlayer ? (
            <AddPlayerMenu
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

export default Euro24Page;
