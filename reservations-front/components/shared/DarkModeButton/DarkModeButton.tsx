"use client";

import { useTheme } from "next-themes";
import Icon from "../Icon";
import { cva } from "class-variance-authority";

const button = cva([
  "rounded-full",
  "w-[40px]",
  "h-[40px]",
  "border-none",
  "cursor-pointer",
  "text-center",
  "flex",
  "items-center",
  "justify-center",
]);

export const DarkModeButton = () => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <button
      className={button({ class: `${isDarkMode ? "bg-white" : "bg-black"}` })}
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
    >
      <Icon
        name={isDarkMode ? "Sun" : "Moon"}
        className={`${isDarkMode ? "text-gray-900" : "text-white"}`}
      />
    </button>
  );
};

export default DarkModeButton;
