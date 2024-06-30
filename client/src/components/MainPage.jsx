import CardComponent from "./CardComponent";

function MainPage() {
  return (
    <div className="h-screen min-w-max pt-[7vh] bg-neutral-800 text-stone-100 overflow-y-hidden overflow-x-auto flex">
      <CardComponent />
      <CardComponent />
    </div>
  );
}

export default MainPage;
