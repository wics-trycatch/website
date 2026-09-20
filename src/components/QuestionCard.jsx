import { useEffect, useRef, useState } from 'react';
import { shuffle } from '../data/questions';

// "Use `code` like this" -> renders the backticked parts as <code>
export function Inline({ text }) {
  return <>{text.split('`').map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part))}</>;
}

export default function QuestionCard({ square, q, ladderTo, final, onDone }) {
  const [options] = useState(() => shuffle(q.options.map((text, i) => ({ text, ok: i === q.answer }))));
  const [picked, setPicked] = useState(null);
  const card = useRef(null);
  useEffect(() => card.current?.focus(), []);

  const answered = picked !== null;
  const ok = answered && options[picked].ok;
  const right = options.find((o) => o.ok).text;
  const pick = (i) => !answered && setPicked(i);

  // A-D or 1-4 pick an answer
  const onKeyDown = (e) => {
    if (e.key.length !== 1) return;
    const i = /[1-4]/.test(e.key) ? Number(e.key) - 1 : 'abcd'.indexOf(e.key.toLowerCase());
    if (options[i]) pick(i);
  };

  const tag = ladderTo ? `🪜 Ladder! Answer correctly to climb to ${ladderTo}` : final ? '🏁 Final question' : 'Quick question';
  let message;
  if (ok) message = ladderTo ? `Correct! Up the ladder you go, to square ${ladderTo}.` : final ? 'Correct! You made it!' : 'Correct!';
  else message = ladderTo ? 'Not quite, so no climb this time.' : final ? 'Not quite. Give it one more try.' : 'Not quite.';

  return (
    <div className="sl-scrim">
      <div className="sl-card" ref={card} tabIndex={-1} onKeyDown={onKeyDown} role="group" aria-label={`Question for square ${square}`}>
        <div className="sl-tag">Square {square} · {tag}</div>
        <h2 className="sl-q"><Inline text={q.q} /></h2>

        <div className="sl-options">
          {options.map((o, i) => {
            const state = !answered ? '' : o.ok ? 'good' : i === picked ? 'bad' : 'dim';
            return (
              <button key={i} type="button" className={`sl-option ${state}`} disabled={answered} onClick={() => pick(i)}>
                <span className="sl-letter">{'ABCD'[i]}</span>
                <span><Inline text={o.text} /></span>
              </button>
            );
          })}
        </div>

        {answered && (
          <div className={`sl-feedback ${ok ? 'good' : 'bad'}`} role="status">
            <p>
              <strong>{message}</strong>
              {!ok && <> The answer was <Inline text={right} />.</>}
            </p>
            <button type="button" className="sl-btn sl-btn-primary" autoFocus onClick={() => onDone(ok)}>
              {final ? (ok ? 'Finish 🚀' : 'Try again') : 'Continue'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}