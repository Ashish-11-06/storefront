export function applyTheme(theme: any) {
  const root = document.documentElement;

  if (theme.background)
    root.style.setProperty("--background", theme.background);

  if (theme.foreground)
    root.style.setProperty("--foreground", theme.foreground);

  if (theme.primary)
    root.style.setProperty("--primary", theme.primary);

  if (theme.secondary)
    root.style.setProperty("--secondary", theme.secondary);

  if (theme.radius)
    root.style.setProperty("--radius", theme.radius);
}