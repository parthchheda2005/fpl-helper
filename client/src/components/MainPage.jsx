import { useEffect, useState } from "react";
import CardComponent from "./CardComponent";

function MainPage() {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/players/v1/euros/get")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.data.players);
        setPlayers(data.data.players);
      })
      .catch((err) => console.log("failed to fetch"));
  }, [players]);

  return (
    <div className="h-screen min-w-max pt-[7vh] bg-neutral-800 text-stone-100 overflow-y-hidden overflow-x-auto flex">
      <CardComponent player={players.find((el) => el.name === "Cole Palmer")} />
      <CardComponent
        player={players.find((el) => el.name === "Cristiano Ronaldo")}
      />
      <CardComponent
        player={players.find((el) => el.name === "Jamal Musiala")}
      />
    </div>
  );
}

export default MainPage;
