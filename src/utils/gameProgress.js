// Saves board progress to localStorage (not sessionStorage) so a player can
// close the site, walk around the event, and come back later to pick up
// exactly where they left off — the whole point being that this game isn't
// meant to be finishable in one quick sitting at a single booth.
//
// Keyed by first + last name, normalized (trimmed, collapsed whitespace,
// lowercased) so "Jane Doe", " jane  doe ", and "JANE DOE" all resolve to
// the same saved game. This still doesn't fully separate two different
// people who happen to share the exact same full name, but combined with a
// last name it's a lot less likely than first-name-only was.
const KEY = 'sl-progress';

export const normalizeName = (name) => name.trim().replace(/\s+/g, ' ').toLowerCase();

const readAll = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
};

const writeAll = (all) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    // storage full / unavailable (private browsing, etc.) — the game still
    // works, it just won't resume next time
  }
};

export function loadProgress(name) {
  if (!name) return null;
  return readAll()[normalizeName(name)] ?? null;
}

export function saveProgress(name, data) {
  if (!name) return;
  const all = readAll();
  all[normalizeName(name)] = { ...data, savedAt: Date.now() };
  writeAll(all);
}

export function clearProgress(name) {
  if (!name) return;
  const all = readAll();
  delete all[normalizeName(name)];
  writeAll(all);
}
