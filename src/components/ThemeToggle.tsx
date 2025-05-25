"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // On mount, check local storage or system preference
    const stored = localStorage.getItem("theme");
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="ml-4 p-2 rounded-lg border border-accent bg-background hover:bg-accent/10 transition-colors text-accent focus:outline-none focus:ring-2 focus:ring-accent"
    >
      {theme === "dark" ? (
        <span role="img" aria-label="Switch to light mode">🌞</span>
      ) : (
        <span role="img" aria-label="Switch to dark mode">🌙</span>
      )}
    </button>
  );
}
