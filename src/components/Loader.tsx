function Loader() {
  return (
    <div
      role="status"
      className="flex flex-col m-2 rounded shadow animate-pulse"
    >
      <div className="h-48 w-full object-cover object-center group-hover:opacity-75 bg-gray-400 rounded">
        {" "}
      </div>
      <div className="h-4 w-full  bg-gray-400 mt-4"></div>
      <div className="h-4 w-48 bg-gray-400 mt-2"></div>
      <div className="h-2 bg-gray-400 mt-8"></div>
      <div className="h-2 w-24 bg-gray-400 mt-2"></div>
      <div className="h-2 w-16 bg-gray-400 mt-4"></div>
    </div>
  );
}

export default Loader;
