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
//
// Progress is ALSO mirrored to the Google Sheet's Apps Script backend (a
// hidden "State" tab) under the same normalized name, so a player can type
// their name on a different phone or browser and pick up where they left off.
import { WEBAPP_URL } from './submitEntry';

const KEY = 'sl-progress';

export const normalizeName = (name) => name.trim().replace(/\s+/g, ' ').toLowerCase();

let pushTimer = null;

function pushRemote(name, state) {
  if (!WEBAPP_URL) return;
  fetch(WEBAPP_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ type: 'saveState', name: normalizeName(name), state }),
  }).catch(() => {});
}

// Latest saved game for this name from the server, or null (none / offline / slow).
export async function fetchRemoteProgress(name, timeoutMs = 5000) {
  if (!WEBAPP_URL || !name) return null;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${WEBAPP_URL}?action=load&name=${encodeURIComponent(normalizeName(name))}`, { signal: ctrl.signal });
    const json = await res.json();
    return json?.state ?? null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

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
  const saved = { ...data, savedAt: Date.now() };
  all[normalizeName(name)] = saved;
  writeAll(all);
  clearTimeout(pushTimer);
  pushTimer = setTimeout(() => pushRemote(name, saved), 800); // debounced: moves can come in quick bursts
}

export function clearProgress(name) {
  if (!name) return;
  const all = readAll();
  delete all[normalizeName(name)];
  writeAll(all);
  clearTimeout(pushTimer);
  pushRemote(name, null);
}
