function StatComponent({ type, data }) {
  return (
    <div className="flex justify-between px-3 py-5 border-t-2 border-dotted border-gray-400">
      <span className="capitalize">{type}: </span>
      <span>{data}</span>
    </div>
  );
}

export default StatComponent;
