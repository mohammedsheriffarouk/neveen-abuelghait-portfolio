/**
 * Placeholder helpers.
 * `lorem(n)` returns n words of neutral filler so the wireframe shows realistic text lengths.
 * Search the project for "lorem(" to find every block that still needs real copy.
 */
const WORDS =
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(
    ' ',
  );

export function lorem(count: number, offset = 0): string {
  const out: string[] = [];
  for (let i = 0; i < count; i++) out.push(WORDS[(i + offset) % WORDS.length]);
  const text = out.join(' ');
  return text.charAt(0).toUpperCase() + text.slice(1) + '.';
}

/** True when a value is still a placeholder token like "[SPOTIFY URL]" or empty. */
export function isPlaceholder(value?: string): boolean {
  return !value || /^\[.*\]$/.test(value.trim());
}

/** True when a string is a usable absolute http(s) URL. */
export function isRealUrl(value?: string): boolean {
  if (!value || isPlaceholder(value)) return false;
  try {
    const u = new URL(value);
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
}
