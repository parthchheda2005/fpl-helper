import NavBar from "./components/NavBar";
import "./App.css";
import MainPage from "./components/MainPage";
import { useState } from "react";

function App() {
  const [players, setPlayers] = useState([]);

  return (
    <div>
      <NavBar players={players} setPlayers={setPlayers} />
      <MainPage players={players} setPlayers={setPlayers} />
    </div>
  );
}

export default App;
