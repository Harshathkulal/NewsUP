import { useState, useRef, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { ModeToggle } from "./mode-toggle";

function Navbar({ setQuery }: { setQuery: (query: string) => void }) {
  const [sidenav, setSidenav] = useState(false);
  const [search, setSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (search && inputRef.current) {
      inputRef.current.focus();
    }
  }, [search]);

  const toggleSearch = (close = false) => {
    setSearch(close ? false : !search);
  };

  const handleCategoryClick = (category: string) => {
    setQuery(category);
    setSidenav(false);
    toggleSearch(false);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const searchTerm = (event.target as HTMLFormElement).search.value || "All";
    setQuery(searchTerm);
    setSearch(false);
    toggleSearch(false);
  };

  return (
    <div className="fixed top-0 -translate-x-1/2 w-full bg-black/20 border border-neutral-800/50 shadow-lg left-1/2 bg-opacity-80 shadow-black/50 backdrop-blur-md  mx-auto overflow-hidden">
      <nav className="flex justify-between mx-2 m-2">
        <div className="flex justify-center gap-1">
          <img
            src="/Newspaper.svg"
            alt=""
            className="w-6 h-6 bg-white rounded-full"
          />
          NewsUP🚀
        </div>

        <div className="flex items-center justify-between h-full">
          <div className="hidden lg:block">
            <div className="flex gap-6 justify-center items-center mt-1">
              <a href="#" onClick={() => handleCategoryClick("All")}>
                Home
              </a>
              <p onClick={() => handleCategoryClick("India")}>India</p>
              <p onClick={() => handleCategoryClick("Cricket")}>Cricket</p>
              <p onClick={() => handleCategoryClick("Politics")}>Politics</p>
              <p onClick={() => handleCategoryClick("Crime")}>Crime</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4">
          <ModeToggle />
          <div className="hidden border-black border-1 bg-[#f5f5f5] rounded-full items-center p-1 lg:flex">
            <form onSubmit={handleSearch} className="flex items-center">
              <IoSearchOutline size={20} className="text-black m-0.5" />
              <input
                name="search"
                type="text"
                placeholder="Search"
                className="text-black rounded-lg m-0.5 focus:outline-none bg-[#f5f5f5]"
              />
            </form>
          </div>

          <IoSearchOutline
            size={24}
            className="lg:hidden"
            onClick={() => setSearch(!search)}
          />

          {search && (
            <div>
              <div
                onClick={() => toggleSearch(false)}
                className="fixed top-0 left-0 w-full h-screen bg-gray-900 bg-opacity-60 blur z-20 transition ease-in-out duration-500"
              ></div>
              <div className="fixed top-0 left-0  w-screen h-60 bg-white z-30 shadow-lg transition ease-in-out duration-300">
                <div className="flex justify-center items-center gap-4 mt-4">
                  <div className="flex border-black border-2 bg-[#f5f5f5] rounded-full items-center w-3/4">
                    <IoSearchOutline size={20} className="text-black" />
                    <form
                      onSubmit={handleSearch}
                      className="w-full flex items-center"
                    >
                      <input
                        ref={inputRef}
                        name="search"
                        type="text"
                        placeholder="Search"
                        className="text-black rounded-lg p-1 w-full focus:outline-none bg-[#f5f5f5]"
                      />
                    </form>
                  </div>
                  <div
                    className="font-semibold hover:text-slate-500"
                    onClick={() => toggleSearch(false)}
                  >
                    Cancel
                  </div>
                </div>
                <div className="flex ml-8 lg:ml-44 flex-col">
                  <p className="text-sm text-gray-500 mt-4">
                    Popular Search Terms
                  </p>
                  <ul className="font-medium mt-2 space-y-1">
                    <p onClick={() => handleCategoryClick("India")}>India</p>
                    <p onClick={() => handleCategoryClick("Cricket")}>
                      Cricket
                    </p>
                    <p onClick={() => handleCategoryClick("Politics")}>
                      Politics
                    </p>
                    <p onClick={() => handleCategoryClick("Crime")}>Crime</p>
                  </ul>
                </div>
              </div>
            </div>
          )}

          <AiOutlineMenu
            size={24}
            onClick={() => setSidenav(!sidenav)}
            className="md:hidden cursor-pointer"
          />
          {sidenav && (
            <div className="fixed top-0 left-0 w-full h-screen bg-gray-900 bg-opacity-70 z-20">
              <div className="fixed top-0 right-0 w-[85%] h-full bg-white z-30 shadow-lg transition ease-in-out duration-500">
                <button
                  onClick={() => setSidenav(false)}
                  className="text-black right-2 absolute m-2 top-2"
                >
                  <AiOutlineClose size={24} />
                </button>
                <div className="p-6 mt-14">
                  <ul className="flex flex-col font-semibold text-xl leading-relaxed gap-6">
                    <li onClick={() => handleCategoryClick("India")}>India</li>
                    <li onClick={() => handleCategoryClick("Cricket")}>
                      Cricket
                    </li>
                    <li onClick={() => handleCategoryClick("Politics")}>
                      Politics
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
