import { useState, useEffect } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Button } from "./ui/button"; // Assuming you have a Button component

export function ModeToggle() {
  // State to manage the current theme
  const [theme, setTheme] = useState(() => {
    // Check if there's a theme saved in localStorage
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light"; // Default to light theme if none is saved
  });

  // Effect to update the theme on the document and save it to localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Button size="icon" onClick={toggleTheme} className=" rounded-full w-8 h-8">
      {theme === "light" ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
