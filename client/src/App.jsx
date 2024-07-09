import NavBar from "./components/NavBar";
import "./App.css";
import MainPage from "./components/MainPage";
import { useState } from "react";

function App() {
  const [refreshPlayers, setRefreshPlayers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <NavBar setRefreshPlayers={setRefreshPlayers} isLoading={isLoading} />
      <MainPage
        refreshPlayers={refreshPlayers}
        setRefreshPlayers={setRefreshPlayers}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}

export default App;
