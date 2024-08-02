import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full sm:pt-[7vh] pt-1 bg-neutral-800 text-stone-100 flex justify-center items-center flex-col">
      <div className="relative">
        <div
          className={`relative bounce-in sm:text-5xl text-center font-semibold w-full text-2xl px-4 mb-7`}
        >
          <h1 className="m-3">Welcome to your</h1>
          <h1 className="m-3">Fantasy Football Helper</h1>
        </div>
        <div
          className={`relative come-in m-5 text-neutral-800 flex flex-wrap justify-center`}
        >
          <button
            onClick={() => navigate("/euro-24")}
            className="bg-stone-100 rounded-xl mx-2 px-4 py-3 w-[150px] text-lg hover:bg-blue-600 hover:text-stone-100 transition duration-300 ease-out my-2"
          >
            🇪🇺 EURO24 Data
          </button>
          <button
            onClick={() => navigate("/fpl")}
            className="bg-stone-100 rounded-xl mx-2 px-4 py-3 w-[150px] text-lg hover:bg-lime-600 hover:text-stone-100 transition duration-300 ease-out my-2"
          >
            🏴󠁧󠁢󠁥󠁮󠁧󠁿 FPL Data
          </button>
          <button
            onClick={() => navigate("/fpl-squad")}
            className="bg-stone-100 rounded-xl mx-2 px-4 py-3 w-[200px] text-lg hover:bg-amber-700 hover:text-stone-100 transition duration-300 ease-out my-2"
          >
            📊 FPL Squad Planning
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
