// "Use `code` like this" -> renders the backticked parts as <code>
// Kept around because CodeChallenge.jsx (the snake-bite puzzle) still uses it.
export function Inline({ text }) {
  return <>{text.split('`').map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part))}</>;
}
