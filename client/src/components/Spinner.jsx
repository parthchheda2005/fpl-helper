function Spinner() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
      <h1 className="m-2">
        Please wait for at least 5 minutes, can take some time to load!
      </h1>
    </div>
  );
}

export default Spinner;
