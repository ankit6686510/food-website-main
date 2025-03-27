import { useState, useEffect } from "react";

const useTheme = () => {
  // Get theme from localStorage or use system preference if available
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme) {
      return savedTheme === "dark";
    }
    
    // Check if user has dark mode preference in system
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    
    // Default to light mode
    return false;
  };

  const [darkMode, setDarkMode] = useState(false);
  
  // Initialize theme after component mounts to avoid SSR issues
  useEffect(() => {
    setDarkMode(getInitialTheme());
  }, []);
  
  // Update localStorage and apply theme when darkMode changes
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    
    // Apply theme to document
    if (darkMode) {
      document.documentElement.classList.add("dark-theme");
      document.documentElement.classList.remove("light-theme");
    } else {
      document.documentElement.classList.add("light-theme");
      document.documentElement.classList.remove("dark-theme");
    }
  }, [darkMode]);
  
  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };
  
  return { darkMode, toggleTheme };
};

export default useTheme; 