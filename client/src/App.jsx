import NavBar from "./components/NavBar";
import "./App.css";
import MainPage from "./components/MainPage";
import { useState } from "react";

function App() {
  const [refreshPlayers, setRefreshPlayers] = useState(false);
  return (
    <div>
      <NavBar setRefreshPlayers={setRefreshPlayers} />
      <MainPage
        refreshPlayers={refreshPlayers}
        setRefreshPlayers={setRefreshPlayers}
      />
    </div>
  );
}

export default App;
