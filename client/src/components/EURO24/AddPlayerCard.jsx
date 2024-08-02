function AddPlayerCard({ setAddingNewPlayer }) {
  return (
    <button
      onClick={() => setAddingNewPlayer(true)}
      className="w-96 rounded-2xl bg-neutral-800 mx-10 my-8 flex flex-col border-8 border-neutral-500 text-neutral-500 border-dashed hover:border-neutral-300 hover:text-neutral-300 transition items-center justify-center duration-500 text-7xl"
    >
      Add a EURO24 player!
    </button>
  );
}

export default AddPlayerCard;
