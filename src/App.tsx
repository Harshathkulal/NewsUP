import { useState } from "react";
import Navbar from "./components/Navbar"
import NewsPage from "./components/NewsPage"
import Footer from "./components/Footer";


function App() {
  const [query, setQuery] = useState("All");

  return (
    <div>
      <Navbar setQuery={setQuery} />
      <NewsPage query={query} />
      <Footer/>
    </div>
  )
}

export default App
