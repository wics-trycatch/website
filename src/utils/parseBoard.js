// Reads the exported board SVGs and pulls out everything the game needs, so the
// artwork stays the single source of truth: square positions, snakes, ladders, the die.
// Re-export the SVGs from your design tool and the game follows - no coordinates to edit.
const DEF_TAGS = new Set(['linearGradient', 'radialGradient', 'pattern', 'clipPath', 'mask', 'filter']);
const cache = new Map();
const num = (el, attr) => parseFloat(el.getAttribute(attr));

export function parseBoard(raw) {
  if (cache.has(raw)) return cache.get(raw);

  const svg = new DOMParser().parseFromString(raw, 'image/svg+xml').documentElement;
  if (svg.localName !== 'svg') throw new Error('Could not parse the board SVG');
  const [, , width, height] = svg.getAttribute('viewBox').trim().split(/[\s,]+/).map(Number);

  // Squares: centre + radius of each numbered circle
  const steps = {};
  const stepGroups = svg.querySelectorAll('g[id^="step-"]');
  stepGroups.forEach((g) => {
    // design tools rename repeated ids (circle, circle_2, ...), so match on the start of the id
    const c = g.querySelector('circle[id^="circle"]');
    if (!c) throw new Error(`Board SVG: ${g.getAttribute('id')} has no circle whose id starts with "circle"`);
    steps[parseInt(g.getAttribute('id').slice(5), 10)] = { x: num(c, 'cx'), y: num(c, 'cy'), r: num(c, 'r') };
  });

  // <g id="snake-8-to-4"> -> { 8: 4 },  <g id="ladder-2-to-9"> -> { 2: 9 }
  const links = (kind) => {
    const out = {};
    svg.querySelectorAll(`g[id^="${kind}-"]`).forEach((g) => {
      const m = /^\w+-(\d+)-to-(\d+)/.exec(g.getAttribute('id'));
      if (m) out[+m[1]] = +m[2];
    });
    return out;
  };

  const snakes = links('snake');
  const ladders = links('ladder');

  // The die and the rocket are re-drawn by React so they can move / show new faces
  const dieG = svg.querySelector('g[id^="die"]');
  const rocketG = svg.querySelector('g[id^="rocket-token"]');
  const glow = svg.querySelector('circle[id^="dice-glow"]');
  const orbit = svg.querySelector('circle[id^="dice-orbit"]');
  if (!dieG || !rocketG || !glow || !orbit) {
    throw new Error('Board SVG needs layers named: die, rocket-token, dice-glow, dice-orbit');
  }
  const pipEls = [...dieG.querySelectorAll('circle[id^="pip-"]')];
  const pips = pipEls.map((c) => ({ cx: num(c, 'cx'), cy: num(c, 'cy'), r: num(c, 'r'), fill: c.getAttribute('fill') }));
  pipEls.forEach((c) => c.remove());

  // Keep gradient ids (prefixed so they can't clash with the host page), drop all other ids
  svg.querySelectorAll('[id]').forEach((el) => {
    if (DEF_TAGS.has(el.localName)) el.setAttribute('id', `sl-${el.getAttribute('id')}`);
    else el.removeAttribute('id');
  });

  const serializer = new XMLSerializer();
  const toMarkup = (nodes) =>
    [...nodes]
      .map((n) => serializer.serializeToString(n))
      .join('')
      .replace(/ xmlns="[^"]*"/g, '')
      .replace(/url\(#/g, 'url(#sl-');

  const dieMarkup = toMarkup(dieG.childNodes);
  const rocketMarkup = toMarkup(rocketG.childNodes);
  const rocketScale = parseFloat(/scale\(([\d.]+)/.exec(rocketG.getAttribute('transform'))[1]);
  const dieTransform = dieG.getAttribute('transform') || '';
  dieG.remove();
  rocketG.remove();
  svg.querySelectorAll('metadata').forEach((m) => m.remove()); // drops the c2pa blob too

  const board = {
    width,
    height,
    markup: toMarkup(svg.childNodes),
    steps,
    last: stepGroups.length,
    snakes,
    ladders,
    die: { cx: num(glow, 'cx'), cy: num(glow, 'cy'), orbitR: num(orbit, 'r'), transform: dieTransform, markup: dieMarkup, pips },
    rocket: { markup: rocketMarkup, scale: rocketScale },
  };
  cache.set(raw, board);
  return board;
}