// Fire-and-forget log of a completed activity / snake result / win, sent to
// a Google Apps Script Web App that appends a row to a Google Sheet (and,
// for photo tasks, saves the photo to Drive and links it in the row). This
// runs fully automatically — no volunteer needs to check or approve
// anything live. The team reviews the Sheet whenever suits them, including
// after the event is over.
//
// TODO: this needs a real Web App URL to send to. See
// docs/snakes-and-ladders-apps-script.gs for the exact script to deploy and
// step-by-step setup instructions. Once deployed, paste its /exec URL below.
// Until then, entries are just logged to the console so nothing breaks —
// the game still plays fine without it.

const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbz9-ICkpgUd_lp6UK2zYA6w7QnTXYU8jEeo_rwQA9b8IGKB6Ulllfel5I9-pq9SSS_EQg/exec';

export function submitEntry({ name, square, activity, answer, photoDataUrl, result }) {
  // eslint-disable-next-line no-console
  console.info('[snakes-and-ladders]', { name, square, activity, answer, result, hasPhoto: !!photoDataUrl });

  if (!WEBAPP_URL) return; // not configured yet

  const body = JSON.stringify({ name, square, activity, answer, photoDataUrl, result });

  // Apps Script Web Apps don't reliably send back CORS headers a browser
  // will let us read, so this is a no-cors, fire-and-forget POST: we never
  // see a real success/failure response, but the request — and the photo,
  // if there is one — still goes through and gets logged server-side.
  fetch(WEBAPP_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' }, // avoids a CORS preflight, which no-cors POSTs can't complete
    body,
  }).catch(() => {});
}
