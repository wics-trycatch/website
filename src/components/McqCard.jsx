import { useEffect, useRef, useState } from 'react';
import { shuffle } from '../data/questions';
import { Inline } from './QuestionCard';

// A normal multiple-choice trivia question — not every square is an
// in-person task. Continuing (and climbing any ladder on this square)
// doesn't depend on getting it right; it's just quick feedback either way.
export default function McqCard({ square, item, ladderTo, final, onDone }) {
  const [options] = useState(() => shuffle(item.options.map((text, i) => ({ text, ok: i === item.answer }))));
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

  const tag = final ? '🏁 Final question' : ladderTo ? `🪜 Bonus! Climb to square ${ladderTo} either way` : 'Quick question';

  return (
    <div className="sl-scrim">
      <div className="sl-card" ref={card} tabIndex={-1} onKeyDown={onKeyDown} role="group" aria-label={`Question for square ${square}`}>
        <div className="sl-tag">Square {square} · {tag}</div>
        <h2 className="sl-q"><Inline text={item.q} /></h2>

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
              <strong>{ok ? 'Correct!' : 'Not quite.'}</strong>
              {!ok && <> The answer was <Inline text={right} />.</>}
            </p>
            <button type="button" className="sl-btn sl-btn-primary" autoFocus onClick={() => onDone(options[picked].text)}>
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
