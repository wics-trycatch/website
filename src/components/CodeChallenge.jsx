import { useEffect, useRef, useState } from 'react';
import { Check, X } from 'lucide-react';
import { shuffle, SNAKE_FLAVORS } from '../data/questions';
import { Inline } from './QuestionCard';

export default function CodeChallenge({ challenge, square, tail, onDone }) {
  const [options] = useState(() => shuffle(challenge.options.map((text, i) => ({ text, ok: i === challenge.answer }))));
  const [picked, setPicked] = useState(null);
  const card = useRef(null);
  useEffect(() => card.current?.focus(), []);

  const flavor = SNAKE_FLAVORS[challenge.flavor] ?? { label: 'Snake Encounter!' };
  const answered = picked !== null;
  const ok = answered && options[picked].ok;
  const right = options.find((o) => o.ok).text;

  const pick = (i) => !answered && setPicked(i);

  const onKeyDown = (e) => {
    if (answered || e.key.length !== 1) return;
    const i = /[1-4]/.test(e.key) ? Number(e.key) - 1 : 'abcd'.indexOf(e.key.toLowerCase());
    if (options[i]) pick(i);
  };

  return (
    <div className="sl-scrim">
      <div
        className="sl-card"
        ref={card}
        tabIndex={-1}
        onKeyDown={onKeyDown}
        role="group"
        aria-label={`Snake challenge on square ${square}`}
      >
        <div className="sl-tag sl-tag-snake">
          {flavor.label} · Answer correctly to stay put!
        </div>
        <h2 className="sl-q"><Inline text={challenge.prompt} /></h2>

        <div className="sl-options">
          {options.map((o, i) => {
            const state = !answered ? '' : o.ok ? 'good' : i === picked ? 'bad' : 'dim';
            return (
              <button
                key={i}
                type="button"
                className={`sl-option ${state}`}
                disabled={answered}
                onClick={() => pick(i)}
              >
                <span className="sl-letter">{'ABCD'[i]}</span>
                <span><Inline text={o.text} /></span>
              </button>
            );
          })}
        </div>

        {answered && (
          <div className={`sl-feedback ${ok ? 'good' : 'bad'}`} role="status">
            <p>
              {ok ? (
                <><strong><Check size={16} aria-hidden="true" /> Escaped!</strong> The snake lets you pass and you stay on square {square}.</>
              ) : (
                <><strong><X size={16} aria-hidden="true" /> Caught!</strong> The correct answer was <Inline text={right} />. You slide down to square {tail}.</>
              )}
            </p>
            <button
              type="button"
              className="sl-btn sl-btn-primary"
              autoFocus
              onClick={() => onDone(ok)}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}