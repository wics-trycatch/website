import { useEffect, useRef, useState } from 'react';
import { shuffle, SNAKE_FLAVORS } from '../data/questions';
import { Inline } from './QuestionCard';

const TOKEN = /(\/\/.*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\b(let|const|var|function|return|if|else|for|while|true|false|break|continue)\b|\b(\d+)\b|\b([A-Za-z_$][\w$]*)(?=\()/g;
const KIND = ['', 'comment', 'string', 'keyword', 'number', 'func'];

// Tiny JS syntax colouring, just enough for these snippets
function Code({ text }) {
  const out = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const kind = KIND[m.slice(1).findIndex((v) => v !== undefined) + 1];
    out.push(<span key={m.index} className={`sl-t-${kind}`}>{m[0]}</span>);
    last = m.index + m[0].length;
  }
  out.push(text.slice(last));
  return <>{out}</>;
}

export default function CodeChallenge({ challenge, square, tail, onDone }) {
  const [options] = useState(() => shuffle(challenge.options.map((text, i) => ({ text, ok: i === challenge.answer }))));
  const [picked, setPicked] = useState(null); // index of the block sitting in the code window
  const [ran, setRan] = useState(false);
  const [over, setOver] = useState(false);
  const card = useRef(null);
  useEffect(() => card.current?.focus(), []);
  const flavor = SNAKE_FLAVORS[challenge.flavor] ?? { emoji: '🐍', label: 'Snake bite!' };

  const [before, after] = challenge.code.split('______');
  const ok = ran && options[picked].ok;
  const right = options.find((o) => o.ok).text;
  const place = (i) => !ran && setPicked((p) => (p === i ? null : i)); // tap again to take it back out

  const onDrop = (e) => {
    e.preventDefault();
    setOver(false);
    const i = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (options[i] && !ran) setPicked(i);
  };

  const slotState = ran ? (ok ? 'good' : 'bad') : over ? 'over' : picked !== null ? 'filled' : '';

  return (
    <div className="sl-scrim">
      <div className="sl-card" ref={card} tabIndex={-1} role="group" aria-label={`Snake bite on square ${square}`}>
        <div className="sl-tag sl-tag-snake">{flavor.emoji} {flavor.label} Fix the code to stay put</div>
        <h2 className="sl-q"><Inline text={challenge.prompt} /></h2>

        <div className="sl-window">
          <div className="sl-window-bar"><i /><i /><i /><span>snake.js</span></div>
          <pre className="sl-code">
            <code>
              <Code text={before} />
              <span
                className={`sl-slot ${slotState}`}
                onDragOver={(e) => { e.preventDefault(); setOver(true); }}
                onDragLeave={() => setOver(false)}
                onDrop={onDrop}
              >
                {picked === null ? '______' : <Code text={options[picked].text} />}
              </span>
              <Code text={after} />
            </code>
          </pre>
        </div>

        <div className="sl-blocks" role="group" aria-label="Code blocks">
          {options.map((o, i) => (
            <button
              key={i}
              type="button"
              className={`sl-block ${picked === i ? 'on' : ''}`}
              disabled={ran}
              draggable={!ran}
              onDragStart={(e) => e.dataTransfer.setData('text/plain', String(i))}
              onClick={() => place(i)}
            >
              <code><Code text={o.text} /></code>
            </button>
          ))}
        </div>

        {ran && (
          <div className={`sl-feedback ${ok ? 'good' : 'bad'}`} role="status">
            <p>
              {ok
                ? <><strong>✓ Bug squashed!</strong> The snake lets go and you stay on square {square}.</>
                : <><strong>✗ Still buggy.</strong> The right block was <code>{right}</code>. You slide down to square {tail}.</>}
            </p>
          </div>
        )}

        <div className="sl-actions">
          {!ran ? (
            <button type="button" className="sl-btn sl-btn-primary" disabled={picked === null} onClick={() => setRan(true)}>
              Run ▶
            </button>
          ) : (
            <button type="button" className="sl-btn sl-btn-primary" autoFocus onClick={() => onDone(ok)}>Continue</button>
          )}
        </div>
      </div>
    </div>
  );
}