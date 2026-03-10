import { useState, useEffect, useCallback } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("seopulse-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("seopulse-theme", "light");
      }
      return next;
    });
  }, []);

  return { isDark, toggle };
}
