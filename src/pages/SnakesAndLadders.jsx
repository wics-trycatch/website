import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import desktopSvg from '../assets_26/images/shared/snakes-and-ladders.svg?raw';
import mobileSvg from '../assets_26/images/shared/snakes-and-ladders-mobile.svg?raw';
import { parseBoard } from '../utils/parseBoard';
import { submitEntry } from '../utils/submitEntry';
import { assignSquares } from '../utils/pickGame';
import { loadProgress, saveProgress, clearProgress } from '../utils/gameProgress';
import { POOL_BY_ID, CODE_CHALLENGES } from '../data/questions';
import ActivityCard from '../components/ActivityCard';
import McqCard from '../components/McqCard';
import CodeChallenge from '../components/CodeChallenge';
import '../snakes-and-ladders.css';

const DICE_FACES = 2; // the die only rolls 1 or 2 — keeps a full playthrough from finishing in a couple rolls
const PIPS_FOR = { 1: [2], 2: [0, 4], 3: [0, 2, 4] }; // indexes into the die's 5 pips (TL, TR, centre, BL, BR)
const HOP_MS = 320; // one square
const SLIDE_MS = 900; // ladder climb / snake slide
const ROCKET_FOOT = { x: 145.4, y: 381.2 }; // bottom-centre of the rocket artwork, in its own coordinates
const CLOSED = Symbol('closed'); // thrown to abandon a turn when the game is closed / restarted
const NAME_KEY = 'sl-player-name';

const PORTRAIT = '(orientation: portrait)';
const subscribe = (cb) => {
  const mq = window.matchMedia(PORTRAIT);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const usePortrait = () => useSyncExternalStore(subscribe, () => window.matchMedia(PORTRAIT).matches, () => false);

// Ask for the player's name before the board is playable — this is what
// lets a finished game be tied back to a real person for the prize table,
// and lets them come back later under the same name to resume.
function NameGate({ onSubmit }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const inputRef = useRef(null);
  useEffect(() => inputRef.current?.focus(), []);

  // First + last name (not just first) so two people who happen to share a
  // first name don't collide with each other's saved progress or prize entry.
  const ready = firstName.trim() && lastName.trim();
  const submit = (e) => {
    e.preventDefault();
    if (ready) onSubmit(`${firstName.trim()} ${lastName.trim()}`);
  };

  return (
    <div className="sl-scrim">
      <div className="sl-card sl-start" role="group" aria-label="Enter your name to play">
        <h2 className="sl-q">What's your name?</h2>
        <p>
          We'll use this to know who to give the prize to if you reach the end — and if you leave and come back,
          entering the same name picks up right where you left off. 🏁
        </p>
        <form onSubmit={submit}>
          <div className="sl-name-fields">
            <input
              ref={inputRef}
              className="sl-input"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              aria-label="First name"
              maxLength={40}
            />
            <input
              className="sl-input"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              aria-label="Last name"
              maxLength={40}
            />
          </div>
          <div className="sl-actions">
            <button type="submit" className="sl-btn sl-btn-primary" disabled={!ready}>
              Let's play 🚀
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function SnakesAndLadders({ onClose }) {
  const portrait = usePortrait();
  const board = useMemo(() => parseBoard(portrait ? mobileSvg : desktopSvg), [portrait]);

  const [name, setName] = useState(() => sessionStorage.getItem(NAME_KEY) || '');
  const [pos, setPos] = useState(1);
  const [rolls, setRolls] = useState(0);
  const [content, setContent] = useState(null); // { [square]: itemId } for this game
  const [travel, setTravel] = useState({ mode: 'hop', n: 0 });
  const [die, setDie] = useState({ value: 3, rolling: false });
  const [busy, setBusy] = useState(false);
  const [won, setWon] = useState(false);
  // square 1 is never landed on, so its item is the warm-up shown once a name is entered
  const [modal, setModal] = useState(null);
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

  const itemFor = (square) => {
    const id = content?.[square];
    return id ? POOL_BY_ID.get(id) : null;
  };

  const warmUp = () => {
    const item = itemFor(1);
    if (!item) return;
    setModal({
      type: item.kind,
      square: 1,
      item,
      activity: item,
      id: ++asks.current,
      onDone: (raw) => {
        const { text: answer, photoDataUrl } = typeof raw === 'object' && raw !== null ? raw : { text: raw, photoDataUrl: null };
        submitEntry({ name, square: 1, activity: item.title ?? item.q, answer, photoDataUrl, result: 'done' });
        setModal(null);
      },
    });
  };

  // Once a name is entered: resume saved progress for that name if there is
  // any, otherwise start a fresh game (new random square assignment).
  useEffect(() => {
    if (!name || content) return;
    const saved = loadProgress(name);
    if (saved?.contentIds) {
      setContent(saved.contentIds);
      setPos(saved.pos ?? 1);
      setRolls(saved.rolls ?? 0);
    } else {
      setContent(assignSquares(board));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  // Whenever a game's square assignment is (re)computed — fresh game, resumed
  // game, or restart — show the square-1 warm-up if they haven't moved yet.
  useEffect(() => {
    if (name && content && !modal && pos === 1 && rolls === 0 && !won) warmUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  // Keep progress saved as the game goes, so leaving and coming back resumes.
  useEffect(() => {
    if (!name || !content || won) return;
    saveProgress(name, { pos, rolls, contentIds: content });
  }, [name, content, pos, rolls, won]);

  const submitName = (n) => {
    sessionStorage.setItem(NAME_KEY, n);
    setName(n);
  };

  // when a card closes, its button disappears and focus falls to <body>. Put it back in the game.
  useEffect(() => {
    if (!modal) root.current?.focus();
  }, [modal]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const nextChallenge = (flavor) => {
    let pool = CODE_CHALLENGES.filter((c) => c.flavor === flavor && !seen.current.includes(c.id));
    if (!pool.length) {
      seen.current = seen.current.filter((id) => !CODE_CHALLENGES.some((c) => c.id === id && c.flavor === flavor));
      pool = CODE_CHALLENGES.filter((c) => c.flavor === flavor);
    }
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
    setToast('');
    setModal(null);
    setContent(assignSquares(board)); // triggers the warm-up via the effect above
  };

  const takeTurn = async () => {
    if (busy || won || modal || turning.current || !content) return;
    turning.current = true;
    const id = run.current;
    const live = () => { if (!alive.current || run.current !== id) throw CLOSED; };
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)).then(live);
    // Shows a card and resolves with whatever it hands back once the player finishes it
    const ask = (props) =>
      new Promise((resolve) => {
        setModal({ ...props, id: ++asks.current, onDone: (value) => { setModal(null); resolve(value); } });
      }).then((value) => { live(); return value; });

    let at = pos;
    const move = async (to, mode) => {
      at = to;
      setTravel((t) => ({ mode, n: t.n + 1 }));
      setPos(to);
      await sleep(mode === 'hop' ? HOP_MS : SLIDE_MS);
    };

    const doSquare = async (square, extra) => {
      const item = itemFor(square);
      if (!item) return;
      const raw = await ask({ type: item.kind, square, item, activity: item, ...extra });
      // ActivityCard (kind: 'task') hands back { text, photoDataUrl }; McqCard hands back a plain string.
      const { text: answer, photoDataUrl } = typeof raw === 'object' && raw !== null ? raw : { text: raw, photoDataUrl: null };
      submitEntry({
        name,
        square,
        activity: item.title ?? item.q,
        answer,
        photoDataUrl,
        result: extra?.final ? 'WINNER' : 'done',
      });
      return answer;
    };

    // What happens when the rocket lands on `square`
    const land = async (square) => {
      const tail = board.snakes[square];
      if (tail) {
        // Snake: tiny coding problem. Right = stay and still do that square's
        // item. Wrong = slide to the tail and land there instead.
        const flavor = ['loop', 'syntax', 'bug'][Math.floor(Math.random() * 3)];
        const challenge = nextChallenge(flavor);
        const ok = await ask({ type: 'code', square, tail, challenge });
        submitEntry({
          name,
          square,
          activity: `Snake bite (${flavor})`,
          answer: challenge.prompt,
          result: ok ? 'escaped snake' : `bit by snake - slid to ${tail}`,
        });
        if (ok) {
          setToast(`The snake lets go. You stay on square ${square}.`);
          await doSquare(square);
          return;
        }
        setToast(`Sliding down to square ${tail}…`);
        await sleep(500);
        await move(tail, 'slide');
        return land(tail);
      }

      if (square === board.last) {
        await doSquare(square, { final: true });
        if (name) clearProgress(name); // they're done — a re-open should start fresh, not "resume" a finished game
        return setWon(true);
      }

      const top = board.ladders[square];
      if (top) {
        // Ladders: climb immediately, no task on the base square and no die
        // roll in between — whatever's waiting at the top square fires the
        // instant you arrive there.
        setToast(`Up the ladder to square ${top}!`);
        await sleep(450);
        await move(top, 'slide');
        if (top === board.last) { setWon(true); return; }
        return land(top);
      }

      await doSquare(square);
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

  const ready = !busy && !won && !modal && !!name && !!content;
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
        {name && <span className="sl-chip">{name}</span>}
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

      {!name && <NameGate onSubmit={submitName} />}
      {modal?.type === 'task' && <ActivityCard key={modal.id} {...modal} />}
      {modal?.type === 'mcq' && <McqCard key={modal.id} {...modal} />}
      {modal?.type === 'code' && <CodeChallenge key={modal.id} {...modal} />}

      {won && (
        <div className="sl-scrim">
          <div className="sl-card sl-win" role="alertdialog" aria-label="You won">
            <div className="sl-win-emoji" aria-hidden="true">🚀</div>
            <h2 className="sl-q">You reached square {board.last}, {name}!</h2>
            <p>Finished in {rolls} {rolls === 1 ? 'roll' : 'rolls'}. You're all set — the team will review entries after the event and reach out about your prize!</p>
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