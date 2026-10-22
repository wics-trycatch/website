import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import desktopSvg from '../assets_26/images/shared/snakes-and-ladders.svg?raw';
import mobileSvg from '../assets_26/images/shared/snakes-and-ladders-mobile.svg?raw';
import { parseBoard } from '../utils/parseBoard';
import { submitEntry } from '../utils/submitEntry';
import { assignSquares } from '../utils/pickGame';
import { loadProgress, saveProgress, clearProgress, fetchRemoteProgress } from '../utils/gameProgress';
import { Heart, Rocket, X } from 'lucide-react';
import { POOL, POOL_BY_ID, CODE_CHALLENGES } from '../data/questions';
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
function NameGate({ onSubmit, onClose }) {
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
      <div className="sl-card sl-start" role="group" aria-label="Enter your name to play" style={{ position: 'relative' }}>
        <button type="button" className="sl-card-close" onClick={onClose} aria-label="Close game">
          <X size={18} aria-hidden="true" />
        </button>
        <h2 className="sl-q">What's your name?</h2>
        <p>
          We'll use this to know who to give the prize to if you reach the end. If you leave and come back,
          entering the same name picks up right where you left off.{' '}
          <Heart size={14} aria-hidden="true" style={{ display: 'inline', verticalAlign: '-2px' }} />
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
              Let's play <Rocket size={16} aria-hidden="true" />
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
  const pending = useRef(null); // square whose card is up but not finished yet (so closing the game can't skip it)
  const resumeSquare = useRef(null); // set when a saved game had an unfinished card to re-show
  const usedItemIds = useRef(new Set()); // items already asked/completed this game to prevent repetition
  const contentRef = useRef(null);
  useEffect(() => { contentRef.current = content; }, [content]);

  const root = useRef(null);
  const closeRef = useRef(onClose);
  useEffect(() => { closeRef.current = onClose; });
  const modalRef = useRef(null);
  useEffect(() => { modalRef.current = modal; });

  useEffect(() => {
    alive.current = true;
    const opener = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    root.current?.focus();
    // Escape shouldn't be a way to duck out of the task/question that's
    // currently up — modalRef is checked at call time (not captured here)
    // so a card open when the page mounted still blocks it.
    const onKey = (e) => e.key === 'Escape' && !modalRef.current && closeRef.current?.();
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
    let id = (contentRef.current || content)?.[square];
    if (id === 'task-workshop-question') id = 'task-dream-project';
    return id ? POOL_BY_ID.get(id) : null;
  };

  const persist = (overridePos, overrideRolls, overrideContent) => {
    if (!name || won) return;
    saveProgress(name, {
      pos: overridePos ?? pos,
      rolls: overrideRolls ?? rolls,
      contentIds: overrideContent ?? contentRef.current ?? content,
      usedItemIds: Array.from(usedItemIds.current),
      seenSnakeIds: seen.current,
      pending: pending.current,
    });
  };

  // Topics (the fact a question is about) already asked, or sitting on the
  // board waiting to be asked. Used so the regular and snake pools never show
  // two questions about the same thing in one game.
  const blockedTopics = () => {
    const topics = new Set();
    const addItem = (id) => { const t = POOL_BY_ID.get(id)?.topic; if (t) topics.add(t); };
    usedItemIds.current.forEach(addItem);
    Object.values(contentRef.current || content || {}).forEach(addItem);
    seen.current.forEach((id) => { const t = CODE_CHALLENGES.find((c) => c.id === id)?.topic; if (t) topics.add(t); });
    return topics;
  };

  // A fresh item of `kind` that hasn't been asked or assigned yet and doesn't
  // repeat a topic already covered. If the pool for that kind runs dry it
  // falls back to other unused items (e.g. a task instead of a 6th MCQ) before
  // ever repeating anything.
  const pickFreshItem = (kind) => {
    const usedIds = new Set([
      ...usedItemIds.current,
      ...Object.values(contentRef.current || content || {}),
    ]);
    const blocked = blockedTopics();
    const topicOk = (item) => !(item.topic && blocked.has(item.topic));
    const pickFrom = (list) => (list.length ? list[Math.floor(Math.random() * list.length)] : null);
    const regular = POOL.filter((item) => item.tier !== 'finale');

    return (
      pickFrom(regular.filter((i) => i.kind === kind && !usedIds.has(i.id) && topicOk(i))) ||
      pickFrom(regular.filter((i) => i.kind === kind && !usedItemIds.current.has(i.id) && topicOk(i))) ||
      pickFrom(regular.filter((i) => !usedIds.has(i.id) && topicOk(i))) ||
      pickFrom(regular.filter((i) => !usedItemIds.current.has(i.id) && topicOk(i))) ||
      pickFrom(regular.filter((i) => i.kind === kind && !usedItemIds.current.has(i.id))) ||
      pickFrom(regular.filter((i) => i.kind === kind))
    );
  };

  const setSquareItem = (square, item) => {
    const nextContent = { ...(contentRef.current || content), [square]: item.id };
    contentRef.current = nextContent;
    setContent(nextContent);
    persist(pos, rolls, nextContent);
  };

  const replaceSquareItem = (square, kind) => {
    const newItem = pickFreshItem(kind);
    if (newItem) setSquareItem(square, newItem);
  };

  const warmUp = () => {
    const item = itemFor(1);
    if (!item) return;
    usedItemIds.current.add(item.id);
    persist();
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
    let cancelled = false;

    // A saved game is only usable if it was built from the current question
    // set and fits this board (the phone and desktop boards can differ).
    const usable = (s) =>
      s?.contentIds &&
      Object.values(s.contentIds).every((id) => POOL_BY_ID.has(id)) &&
      Object.keys(s.contentIds).every((sq) => Number(sq) <= board.last) &&
      s.contentIds[board.last] &&
      (s.pos ?? 1) <= board.last;

    (async () => {
      // Check this device AND the server (so typing your name on another
      // phone/browser picks up where you left off); newest save wins.
      setToast('Looking for your saved game…');
      const local = loadProgress(name);
      const remote = await fetchRemoteProgress(name);
      if (cancelled) return;
      setToast('');
      const candidates = [local, remote].filter(usable);
      const saved = candidates.sort((a, b) => (b.savedAt ?? 0) - (a.savedAt ?? 0))[0];

      if (saved) {
        setContent(saved.contentIds);
        contentRef.current = saved.contentIds;
        setPos(saved.pos ?? 1);
        setRolls(saved.rolls ?? 0);
        if (saved.usedItemIds) usedItemIds.current = new Set(saved.usedItemIds);
        seen.current = Array.isArray(saved.seenSnakeIds) ? saved.seenSnakeIds : [];
        // They closed the game while a card was up: show that same card again
        resumeSquare.current = Number.isInteger(saved.pending) && saved.pending > 1 ? saved.pending : null;
      } else {
        const initial = assignSquares(board);
        setContent(initial);
        contentRef.current = initial;
      }
    })();

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  // Whenever a game's square assignment is (re)computed — fresh game, resumed
  // game, or restart — show the square-1 warm-up if they haven't moved yet.
  useEffect(() => {
    if (resumeSquare.current && name && content && !modal && !won) {
      const sq = resumeSquare.current;
      resumeSquare.current = null;
      takeTurn(sq);
      return;
    }
    if (name && content && !modal && pos === 1 && rolls === 0 && !won) warmUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  // Keep progress saved as the game goes, so leaving and coming back resumes.
  useEffect(() => {
    if (!name || !content || won) return;
    persist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Picks a snake question: unseen, in the requested theme if possible, and
  // about a topic that hasn't come up yet (including MCQs on the board).
  // Only if everything is exhausted does it start repeating.
  const nextChallenge = (flavor) => {
    const blocked = blockedTopics();
    const fresh = (c) => !seen.current.includes(c.id);
    const topicOk = (c) => !(c.topic && blocked.has(c.topic));
    const pickFrom = (list) => (list.length ? list[Math.floor(Math.random() * list.length)] : null);

    let pick =
      pickFrom(CODE_CHALLENGES.filter((c) => c.flavor === flavor && fresh(c) && topicOk(c))) ||
      pickFrom(CODE_CHALLENGES.filter((c) => fresh(c) && topicOk(c))) ||
      pickFrom(CODE_CHALLENGES.filter((c) => c.flavor === flavor && fresh(c))) ||
      pickFrom(CODE_CHALLENGES.filter(fresh));
    if (!pick) {
      seen.current = [];
      pick = pickFrom(CODE_CHALLENGES);
    }
    seen.current.push(pick.id);
    return pick;
  };

  const restart = () => {
    run.current += 1;
    turning.current = false;
    seen.current = [];
    pending.current = null;
    resumeSquare.current = null;
    usedItemIds.current = new Set();
    setTravel((t) => ({ mode: 'slide', n: t.n + 1 }));
    setPos(1);
    setRolls(0);
    setDie({ value: 3, rolling: false });
    setWon(false);
    setBusy(false);
    setToast('');
    setModal(null);
    const fresh = assignSquares(board);
    contentRef.current = fresh;
    setContent(fresh); // triggers the warm-up via the effect above
  };

  // `resumeAt` (a square number) re-opens an unfinished card instead of rolling.
  const takeTurn = async (resumeAt) => {
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

    const resuming = Number.isInteger(resumeAt);
    let at = resuming ? resumeAt : pos;
    let reuseAt = resuming ? resumeAt : null; // the unfinished card should come back as the SAME item

    const move = async (to, mode) => {
      at = to;
      setTravel((t) => ({ mode, n: t.n + 1 }));
      setPos(to);
      await sleep(mode === 'hop' ? HOP_MS : SLIDE_MS);
    };

    const doSquare = async (square, extra) => {
      let item = itemFor(square);
      if (!item) return null;
      // If this item was already used elsewhere this game, substitute a fresh uncompleted one
      const reusing = reuseAt === square;
      reuseAt = null;
      if (usedItemIds.current.has(item.id) && !reusing) {
        const fresh = pickFreshItem(item.kind);
        if (fresh) {
          item = fresh;
          setSquareItem(square, fresh);
        }
      }
      usedItemIds.current.add(item.id);
      persist();

      const raw = await ask({ type: item.kind, square, item, activity: item, ...extra });
      // ActivityCard hands back { text, photoDataUrl, ok: true }; McqCard hands back { text, ok }.
      const { text: answer, photoDataUrl, ok = true } =
        typeof raw === 'object' && raw !== null ? raw : { text: raw, photoDataUrl: null, ok: true };
      submitEntry({
        name,
        square,
        activity: item.title ?? item.q,
        answer,
        photoDataUrl,
        result: extra?.final ? 'WINNER' : ok ? 'done' : `incorrect - returned to square ${extra?.fromSquare ?? 'start'}`,
      });
      return { answer, ok, item };
    };

    // What happens when the rocket lands on `square`
    const land = async (square) => {
      const tail = board.snakes[square];
      if (tail) {
        // Snake: trivia challenge. Right = stay. Wrong = slide to the tail.
        const flavor = ['wics', 'event'][Math.floor(Math.random() * 2)];
        const challenge = nextChallenge(flavor);
        pending.current = square; // if they close the game now, this snake is re-shown on return
        persist();
        const ok = await ask({ type: 'code', square, tail, challenge });
        pending.current = null;
        submitEntry({
          name,
          square,
          activity: `Snake bite (${flavor})`,
          answer: challenge.prompt,
          result: ok ? 'escaped snake' : `bit by snake - slid to ${tail}`,
        });
        if (ok) {
          setToast(`The snake lets go! You stay on square ${square}.`);
          return;
        }
        setToast(`Sliding down to square ${tail}…`);
        await sleep(500);
        await move(tail, 'slide');
        setToast(`Slid down to square ${tail}!`);
        // Ask a question for the number landed on after sliding down
        return land(tail);
      }

      if (square === board.last) {
        pending.current = square;
        await doSquare(square, { final: true });
        pending.current = null;
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
        if (top === board.last) {
          pending.current = top;
          await doSquare(top, { final: true });
          pending.current = null;
          if (name) clearProgress(name);
          setWon(true);
          return;
        }
        return land(top);
      }

      const backSquare = Math.max(1, square - 1);
      pending.current = square;
      const res = await doSquare(square, { fromSquare: backSquare });
      pending.current = null;
      if (!res) return;

      if (res.ok) {
        setToast(`Square ${square} completed!`);
      } else {
        // Player got the question wrong!
        // Replace this square's question with a fresh unused question from POOL
        replaceSquareItem(square, res.item.kind);
        // Move back ONE square no matter whatever was rolled
        setToast(`Not quite! Moving back to square ${backSquare}…`);
        await sleep(600);
        await move(backSquare, 'slide');
        setToast(`Back on square ${backSquare}. Tap the dice to roll again!`);
      }
    };

    try {
      setBusy(true);
      setToast('');
      if (resuming) {
        setToast('Welcome back! Finish this one to keep going.');
        await land(at);
        return;
      }
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
        <button
          type="button"
          className="sl-icon"
          onClick={restart}
          disabled={!!modal}
          aria-label="Restart game"
          title={modal ? 'Finish the current square first' : 'Restart'}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /></svg>
        </button>
        <button
          type="button"
          className="sl-icon"
          onClick={onClose}
          disabled={!!modal}
          aria-label="Close game"
          title={modal ? 'Finish the current square first' : 'Close'}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>

      {(toast || ready) && <div className="sl-toast" role="status">{toast || 'Tap the dice to roll'}</div>}

      {!name && <NameGate onSubmit={submitName} onClose={() => closeRef.current?.()} />}
      {modal?.type === 'task' && <ActivityCard key={modal.id} {...modal} />}
      {modal?.type === 'mcq' && <McqCard key={modal.id} {...modal} />}
      {modal?.type === 'code' && <CodeChallenge key={modal.id} {...modal} />}

      {won && (
        <div className="sl-scrim">
          <div className="sl-card sl-win" role="alertdialog" aria-label="You won">
            <div className="sl-win-emoji" aria-hidden="true"><Rocket size={48} strokeWidth={1.75} /></div>
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
