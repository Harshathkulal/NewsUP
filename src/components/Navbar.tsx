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
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const searchTerm = (event.target as HTMLFormElement).search.value || "All";
    setQuery(searchTerm);
    toggleSearch(false);
  };

  return (
    <div
      className="sticky top-0 w-full border border-neutral-800/50 shadow-lg z-50"
      style={{
        backgroundColor: `var(--background-color)`,
        color: `var(--text-color)`,
      }}
    >
      <nav className="flex justify-between mx-2 m-2">
        <div className="flex justify-center gap-1 m-1">
          <img
            src="/Newspaper.svg"
            alt="Logo"
            className="w-6 h-6 bg-white rounded-full"
          />
          <span className="font-semibold">NewsUP🚀</span>
        </div>

        <div className="flex items-center justify-between h-full">
          <div className="hidden lg:block">
            <div className="flex gap-6 justify-center items-center mt-1 cursor-pointer">
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
          <div
            className="hidden border rounded-full items-center p-1 lg:flex"
            style={{ backgroundColor: `var(--background-color)` }}
          >
            <form onSubmit={handleSearch} className="flex items-center">
              <IoSearchOutline
                size={20}
                className="m-0.5"
                style={{ color: `var(--text-color)` }}
              />
              <input
                name="search"
                type="text"
                placeholder="Search"
                className="rounded-lg m-0.5 focus:outline-none"
                style={{
                  backgroundColor: `var(--background-color)`,
                  color: `var(--text-color)`,
                }}
              />
            </form>
          </div>

          <IoSearchOutline
            size={24}
            className="lg:hidden"
            onClick={() => setSearch(!search)}
            style={{ color: `var(--text-color)` }}
          />

          {search && (
            <div
              className="fixed inset-0 z-60"
              style={{ backgroundColor: `var(--background-color)` }}
            >
              <div className="flex justify-center items-center gap-2 mt-4">
                <div
                  className="flex border-2 rounded-full items-center w-11/12"
                  style={{ borderColor: `var(--text-color)` }}
                >
                  <IoSearchOutline
                    size={20}
                    className="m-0.5"
                    style={{ color: `var(--text-color)` }}
                  />
                  <form onSubmit={handleSearch}>
                    <input
                      ref={inputRef}
                      name="search"
                      type="text"
                      placeholder="Search"
                      className="rounded-lg p-1 w-full focus:outline-none"
                      style={{
                        backgroundColor: `var(--background-color)`,
                        color: `var(--text-color)`,
                      }}
                    />
                  </form>
                </div>
                <div
                  className="font-semibold hover:text-slate-500 cursor-pointer"
                  style={{ color: `var(--text-color)` }}
                  onClick={() => toggleSearch(false)}
                >
                  Cancel
                </div>
              </div>
              <div className="flex flex-col mt-6 px-6">
                <p className="text-sm" style={{ color: `var(--text-color)` }}>
                  Popular Search Terms
                </p>
                <ul className="font-medium mt-2 space-y-2">
                  <p
                    onClick={() => {
                      handleCategoryClick("India");
                      toggleSearch(false);
                    }}
                    className="cursor-pointer"
                  >
                    India
                  </p>
                  <p
                    onClick={() => {
                      handleCategoryClick("Cricket");
                      toggleSearch(false);
                    }}
                    className="cursor-pointer"
                  >
                    Cricket
                  </p>
                  <p
                    onClick={() => {
                      handleCategoryClick("Politics");
                      toggleSearch(false);
                    }}
                    className="cursor-pointer"
                  >
                    Politics
                  </p>
                  <p
                    onClick={() => {
                      handleCategoryClick("Crime");
                      toggleSearch(false);
                    }}
                    className="cursor-pointer"
                  >
                    Crime
                  </p>
                </ul>
              </div>
            </div>
          )}

          <AiOutlineMenu
            size={24}
            onClick={() => setSidenav(!sidenav)}
            className="md:hidden cursor-pointer"
            style={{ color: `var(--text-color)` }}
          />
          {sidenav && (
            <div className="fixed inset-0 bg-opacity-70 z-[1000]">
              <div
                className="fixed top-0 right-0 w-[85%] h-full z-60 shadow-lg transition ease-in-out duration-500"
                style={{ backgroundColor: `var(--background-color)` }}
              >
                <button
                  onClick={() => setSidenav(false)}
                  className="text-black right-2 absolute m-2 top-2"
                  style={{ color: `var(--text-color)` }}
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
