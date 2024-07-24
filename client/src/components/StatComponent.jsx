function StatComponent({ type, data, highlight = "" }) {
  return (
    <div
      className={`flex justify-between px-3 py-5 border-t-2 border-dotted border-gray-400 min-w-72 ${
        highlight === "max" && "bg-green-900"
      } ${highlight === "min" && "bg-red-900"} hover:font-bold`}
    >
      <span className="capitalize">{type}: </span>
      <span>{data}</span>
    </div>
  );
}

export default StatComponent;
