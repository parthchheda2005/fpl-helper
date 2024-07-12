import NavBar from "./components/NavBar";
import "./App.css";
import { useState } from "react";
import HomePage from "./components/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Euro24Page from "./components/Euro24Page";
import FPLPage from "./components/FPLPage";

function App() {
  const [refreshPlayers, setRefreshPlayers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <BrowserRouter>
      <NavBar setRefreshPlayers={setRefreshPlayers} isLoading={isLoading} />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/euro-24"
          element={
            <Euro24Page
              refreshPlayers={refreshPlayers}
              setRefreshPlayers={setRefreshPlayers}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route
          path="/fpl"
          element={
            <FPLPage
              refreshPlayers={refreshPlayers}
              setRefreshPlayers={setRefreshPlayers}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
