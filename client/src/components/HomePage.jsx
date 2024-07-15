import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen min-w-max pt-[7vh] bg-neutral-800 text-stone-100 flex justify-center items-center flex-col">
      <div className="text-5xl text-center font-semibold">
        <h1 className="m-3">Welcome to your</h1>
        <h1 className="m-3">Fantasy Football Helper</h1>
      </div>
      <div className="m-5 text-neutral-800">
        <button
          onClick={() => navigate("/euro-24")}
          className="bg-stone-100 rounded-xl mx-6 px-4 py-3 w-[150px] text-lg hover:bg-blue-600 hover:text-stone-100 transition duration-300 ease-out"
        >
          EURO24 Data
        </button>
        <button
          onClick={() => navigate("/fpl")}
          className="bg-stone-100 rounded-xl mx-6 px-4 py-3 w-[150px] text-lg hover:bg-lime-600 hover:text-stone-100 transition duration-300 ease-out"
        >
          FPL Data
        </button>
        <button
          onClick={() => navigate("/fpl-squad")}
          className="bg-stone-100 rounded-xl mx-6 px-4 py-3 w-[200px] text-lg hover:bg-amber-700 hover:text-stone-100 transition duration-300 ease-out"
        >
          FPL Squad Planning
        </button>
      </div>
    </div>
  );
}

export default HomePage;
