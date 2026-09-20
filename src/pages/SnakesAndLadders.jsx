import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import desktopSvg from '../assets_26/images/shared/snakes-and-ladders.svg?raw';
import mobileSvg from '../assets_26/images/shared/snakes-and-ladders-mobile.svg?raw';
import { parseBoard } from '../utils/parseBoard';
import { CODE_CHALLENGES, MCQS } from '../data/questions';
import QuestionCard from '../components/QuestionCard';
import CodeChallenge from '../components/CodeChallenge';
import '../snakes-and-ladders.css';

const DICE_FACES = 3; // the die only rolls 1, 2 or 3
const PIPS_FOR = { 1: [2], 2: [0, 4], 3: [0, 2, 4] }; // indexes into the die's 5 pips (TL, TR, centre, BL, BR)
const HOP_MS = 320; // one square
const SLIDE_MS = 900; // ladder climb / snake slide
const ROCKET_FOOT = { x: 145.4, y: 381.2 }; // bottom-centre of the rocket artwork, in its own coordinates
const CLOSED = Symbol('closed'); // thrown to abandon a turn when the game is closed / restarted

const PORTRAIT = '(orientation: portrait)';
const subscribe = (cb) => {
  const mq = window.matchMedia(PORTRAIT);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const usePortrait = () => useSyncExternalStore(subscribe, () => window.matchMedia(PORTRAIT).matches, () => false);

export default function SnakesAndLadders({ onClose }) {
  const portrait = usePortrait();
  const board = useMemo(() => parseBoard(portrait ? mobileSvg : desktopSvg), [portrait]);

  const [pos, setPos] = useState(1);
  const [travel, setTravel] = useState({ mode: 'hop', n: 0 });
  const [die, setDie] = useState({ value: 3, rolling: false });
  const [rolls, setRolls] = useState(0);
  const [busy, setBusy] = useState(false);
  const [won, setWon] = useState(false);
  // square 1 is never landed on, so its question is the warm-up shown when the game opens
  const [modal, setModal] = useState(() => ({ type: 'mcq', square: 1, q: MCQS[1], id: 0, onDone: () => setModal(null) }));
  const [toast, setToast] = useState('');

  const run = useRef(0); // bumped on restart so an in-flight turn stops
  const alive = useRef(true);
  const asks = useRef(0);
  const turning = useRef(false); // synchronous guard: state updates can lag behind a fast double tap
  const seen = useRef([]); // snake challenges already shown this game
  const root = useRef(null);
  const closeRef = useRef(onClose);
  useEffect(() => { closeRef.current = onClose; });

  useEffect(() => {
    alive.current = true;
    const opener = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    root.current?.focus();
    const onKey = (e) => e.key === 'Escape' && closeRef.current?.();
    document.addEventListener('keydown', onKey);
    const app = document.getElementById('root');
    app?.setAttribute('inert', ''); // the page behind can't be tabbed into or clicked
    return () => {
      alive.current = false;
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
      app?.removeAttribute('inert');
      opener?.focus?.();
    };
  }, []);

  // when a question card closes, its button disappears and focus falls to <body>. Put it back in the game.
  useEffect(() => {
    if (!modal) root.current?.focus();
  }, [modal]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const nextChallenge = () => {
    let pool = CODE_CHALLENGES.filter((c) => !seen.current.includes(c.id));
    if (!pool.length) { seen.current = []; pool = CODE_CHALLENGES; }
    const pick = pool[Math.floor(Math.random() * pool.length)];
    seen.current.push(pick.id);
    return pick;
  };

  const restart = () => {
    run.current += 1;
    turning.current = false;
    seen.current = [];
    setTravel((t) => ({ mode: 'slide', n: t.n + 1 }));
    setPos(1);
    setRolls(0);
    setDie({ value: 3, rolling: false });
    setWon(false);
    setBusy(false);
    setModal({ type: 'mcq', square: 1, q: MCQS[1], id: ++asks.current, onDone: () => setModal(null) });
    setToast('');
  };

  const takeTurn = async () => {
    if (busy || won || modal || turning.current) return;
    turning.current = true;
    const id = run.current;
    const live = () => { if (!alive.current || run.current !== id) throw CLOSED; };
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)).then(live);
    // Shows a card and resolves with true/false once the player has answered it
    const ask = (props) =>
      new Promise((resolve) => {
        setModal({ ...props, id: ++asks.current, onDone: (ok) => { setModal(null); resolve(ok); } });
      }).then((ok) => { live(); return ok; });

    let at = pos;
    const move = async (to, mode) => {
      at = to;
      setTravel((t) => ({ mode, n: t.n + 1 }));
      setPos(to);
      await sleep(mode === 'hop' ? HOP_MS : SLIDE_MS);
    };

    // What happens when the rocket lands on `square`
    const land = async (square) => {
      const tail = board.snakes[square];
      if (tail) {
        // Snake: tiny coding problem. Right = stay, wrong = slide to the tail and get that square's MCQ.
        const ok = await ask({ type: 'code', square, tail, challenge: nextChallenge() });
        if (ok) {
          setToast(`The snake lets go. You stay on square ${square}.`);
          await ask({ type: 'mcq', square, q: MCQS[square] });
          return;
        }
        setToast(`Sliding down to square ${tail}…`);
        await sleep(500);
        await move(tail, 'slide');
        return land(tail);
      }
      if (square === board.last) {
        let ok = false;
        while (!ok) ok = await ask({ type: 'mcq', square, q: MCQS[square], final: true });
        return setWon(true);
      }
      const top = board.ladders[square];
      const ok = await ask({ type: 'mcq', square, q: MCQS[square], ladderTo: top });
      if (top && ok) {
        setToast(`Up the ladder to square ${top}!`);
        await sleep(450);
        await move(top, 'slide');
        if (top === board.last) setWon(true);
      }
    };

    try {
      setBusy(true);
      setToast('');
      setRolls((n) => n + 1);

      let value = 1;
      for (let i = 0; i < 7; i++) {
        value = 1 + Math.floor(Math.random() * DICE_FACES);
        setDie({ value, rolling: true });
        await sleep(90);
      }
      setDie({ value, rolling: false });
      setToast(`You rolled a ${value}`);
      await sleep(400);

      const target = Math.min(at + value, board.last); // reaching or passing the last square counts as arriving
      for (let s = at + 1; s <= target; s++) await move(s, 'hop');
      await land(at);
    } catch (err) {
      if (err !== CLOSED) throw err;
    } finally {
      if (run.current === id) turning.current = false;
      if (alive.current && run.current === id) setBusy(false);
    }
  };

  const ready = !busy && !won && !modal;
  const here = board.steps[pos];
  const scale = board.rocket.scale;
  const tokenX = here.x - ROCKET_FOOT.x * scale;
  const tokenY = here.y - here.r + 2 - ROCKET_FOOT.y * scale; // feet on top of the square
  const d = board.die;

  const onDieKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); takeTurn(); }
  };

  return createPortal(
    <div className="sl-overlay" role="dialog" aria-modal="true" aria-label="Snakes and Ladders" tabIndex={-1} ref={root}>
      <svg className="sl-board" viewBox={`0 0 ${board.width} ${board.height}`} preserveAspectRatio="xMidYMid meet" fill="none">
        <g dangerouslySetInnerHTML={{ __html: board.markup }} />

        {/* rocket */}
        <g
          className="sl-token"
          style={{ transform: `translate(${tokenX}px, ${tokenY}px)`, transition: `transform ${travel.mode === 'hop' ? HOP_MS : SLIDE_MS}ms ease-in-out` }}
        >
          <g
            key={travel.n}
            className={travel.mode === 'hop' && travel.n ? 'sl-hop' : ''}
            style={{ '--sl-hop': `${-Math.round(here.r * 0.45)}px`, '--sl-hop-ms': `${HOP_MS}ms` }}
          >
            <g transform={`scale(${scale})`} dangerouslySetInnerHTML={{ __html: board.rocket.markup }} />
          </g>
        </g>

        {/* die */}
        <g
          className={`sl-die ${ready ? 'ready' : ''}`}
          role="button"
          tabIndex={ready ? 0 : -1}
          aria-label="Roll the dice"
          aria-disabled={!ready}
          onClick={takeTurn}
          onKeyDown={onDieKey}
        >
          <circle cx={d.cx} cy={d.cy} r={d.orbitR + 16} fill="transparent" />
          {ready && <circle className="sl-die-pulse" cx={d.cx} cy={d.cy} r={d.orbitR} fill="none" stroke="#FFC27B" strokeWidth="3" />}
          <g className={die.rolling ? 'sl-shake' : ''} style={{ transformOrigin: `${d.cx}px ${d.cy}px`, transformBox: 'view-box' }}>
            <g transform={d.transform}>
              <g dangerouslySetInnerHTML={{ __html: d.markup }} />
              {PIPS_FOR[die.value].map((i) => (
                <circle key={i} cx={d.pips[i].cx} cy={d.pips[i].cy} r={d.pips[i].r} fill={d.pips[i].fill} />
              ))}
            </g>
          </g>
        </g>
      </svg>

      <div className="sl-hud">
        <span className="sl-chip">Square <b>{pos}</b> / {board.last}</span>
        <span className="sl-chip">Rolls <b>{rolls}</b></span>
        <span className="sl-spacer" />
        <button type="button" className="sl-icon" onClick={restart} aria-label="Restart game" title="Restart">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /></svg>
        </button>
        <button type="button" className="sl-icon" onClick={onClose} aria-label="Close game" title="Close">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>

      {(toast || ready) && <div className="sl-toast" role="status">{toast || 'Tap the dice to roll'}</div>}

      {modal?.type === 'mcq' && <QuestionCard key={modal.id} {...modal} />}
      {modal?.type === 'code' && <CodeChallenge key={modal.id} {...modal} />}

      {won && (
        <div className="sl-scrim">
          <div className="sl-card sl-win" role="alertdialog" aria-label="You won">
            <div className="sl-win-emoji" aria-hidden="true">🚀</div>
            <h2 className="sl-q">You reached square {board.last}!</h2>
            <p>Finished in {rolls} {rolls === 1 ? 'roll' : 'rolls'}. Nice debugging.</p>
            <div className="sl-actions">
              <button type="button" className="sl-btn sl-btn-primary" autoFocus onClick={restart}>Play again</button>
              <button type="button" className="sl-btn" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body,
  );
}