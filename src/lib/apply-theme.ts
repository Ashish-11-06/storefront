export const applyTheme = (theme: Record<string, string>) => {
  if (typeof window === "undefined") return;

  const root = document.documentElement;

  Object.entries(theme).forEach(([key, value]) => {
    if (value) {
      root.style.setProperty(`--${key}`, value);
    }
  });
};