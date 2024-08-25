import { useState } from "react";
import Navbar from "./components/Navbar"
import NewsPage from "./components/NewsPage"


function App() {
  const [query, setQuery] = useState("All");

  return (
    <div>
      <Navbar setQuery={setQuery} />
      <NewsPage query={query} />
    </div>
  )
}

export default App
