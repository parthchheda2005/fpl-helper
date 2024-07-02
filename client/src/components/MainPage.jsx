import { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import AddPlayerCard from "./AddPlayerCard";
import AddPlayerMenu from "./AddPlayerMenu";

function MainPage() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [addingNewPlayer, setAddingNewPlayer] = useState(false);

  // get players
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("http://127.0.0.1:8000/players/v1/euros/get", { signal: signal })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPlayers(data.data.euroPlayers);
      })
      .catch((err) => console.log("failed to fetch"));

    return () => {
      controller.abort();
    };
  }, [players]);

  return players.length > 0 ? (
    <div className="h-screen min-w-max pt-[7vh] bg-neutral-800 text-stone-100 overflow-y-hidden overflow-x-auto flex">
      {selectedPlayers.map((el) => (
        <CardComponent player={el} setSelectedPlayers={setSelectedPlayers} />
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
    </div>
  ) : (
    <div className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-spin z-40 bg-conic-gradient(white_0deg, white_300deg, transparent_270deg, transparent_360deg) before-animate-spin_2s_linear_infinite before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-conic-gradient(white_0deg, white_270deg, transparent_180deg, transparent_360deg) after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after-animate-spin_3s_linear_infinite after:bg-conic-gradient(#065f46_0deg, #065f46_180deg, transparent_180deg, transparent_360deg)">
      <span className="absolute w-[85%] aspect-square rounded-full z-[60] animate-spin_5s_linear_infinite bg-conic-gradient(#34d399_0deg, #34d399_180deg, transparent_180deg, transparent_360deg)"></span>
    </div>
  );
}

export default MainPage;
