// "Use `code` like this" -> renders the backticked parts as <code>
// Used by McqCard.jsx and CodeChallenge.jsx to format inline code/highlights.
export function Inline({ text }) {
  return <>{text.split('`').map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part))}</>;
}
