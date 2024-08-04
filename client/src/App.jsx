import NavBar from "./components/NavBar";
import "./App.css";
import { useState } from "react";
import HomePage from "./components/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Euro24Page from "./components/EURO24/Euro24Page";
import FPLPage from "./components/FPL/FPLPage";
import Settings from "./components/Settings";
import ViewFPLSquad from "./components/fplSquad/ViewFPLSquad";

function App() {
  const [refreshPlayers, setRefreshPlayers] = useState(false);
  const [enabledStatistics, setEnabledStatistics] = useState([
    "season",
    "team",
    "position",
    "ownership",
    "price",
    "form",
    "totalPoints",
    "fixtureDifficultyRanking",
    "matchesPlayed",
    "matchesStarted",
    "minPlayed",
    "goals",
    "assists",
    "ga",
    "penalties",
    "gaPer90",
    "xGPer90",
    "xGAPer90",
    "npXGAPer90",
    "comparisonHighlight",
    "goalsAllowed",
    "goalsAllowedPer90",
    "xGAllowedPer90",
  ]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/euro-24"
          element={
            <Euro24Page
              enabledStatistics={enabledStatistics}
              refreshPlayers={refreshPlayers}
              setRefreshPlayers={setRefreshPlayers}
            />
          }
        />
        <Route
          path="/fpl"
          element={<FPLPage enabledStatistics={enabledStatistics} />}
        />
        <Route path="fpl-squad" element={<ViewFPLSquad />} />
        <Route
          path="/settings"
          element={
            <Settings
              enabledStatistics={enabledStatistics}
              setEnabledStatistics={setEnabledStatistics}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
