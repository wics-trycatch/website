import { POOL, shuffle } from '../data/questions';

const MAX_MCQ = 2; // keep trivia as the minority — most squares should be real in-person tasks

// Builds a fresh square -> item assignment for a board: every square gets
// something from POOL except snake squares (those get a code challenge
// instead), ladder base squares (climbed straight through — no time to do
// anything there, so the item goes to the square at the top instead), and
// the last square (always a 'finale' task). At least 2 'bold' tasks are
// guaranteed among the regular squares (pushing everyone out of their
// comfort zone a couple of times per game), at most MAX_MCQ squares are
// plain trivia, and the rest are easy/social in-person tasks.
export function assignSquares(board) {
  const regular = [];
  for (let s = 1; s <= board.last; s++) {
    if (board.snakes[s] || board.ladders[s] || s === board.last) continue;
    regular.push(s);
  }

  const bold = shuffle(POOL.filter((item) => item.tier === 'bold'));
  const mcq = shuffle(POOL.filter((item) => item.kind === 'mcq'));
  const tasks = shuffle(POOL.filter((item) => item.kind === 'task' && item.tier !== 'bold' && item.tier !== 'finale'));

  const guaranteedBold = bold.slice(0, Math.min(2, regular.length));
  const remainingAfterBold = regular.length - guaranteedBold.length;
  const cappedMcq = mcq.slice(0, Math.min(MAX_MCQ, remainingAfterBold));
  const remainingAfterMcq = remainingAfterBold - cappedMcq.length;

  // If there are more slots left than distinct easy/social tasks, repeat
  // from a re-shuffled copy rather than reusing the same handful in the
  // same order every time.
  let taskFiller = [];
  while (taskFiller.length < remainingAfterMcq) {
    taskFiller = taskFiller.concat(shuffle(tasks));
  }
  taskFiller = taskFiller.slice(0, remainingAfterMcq);

  const chosen = shuffle([...guaranteedBold, ...cappedMcq, ...taskFiller]);

  const contentIds = {};
  regular.forEach((square, i) => { contentIds[square] = chosen[i % chosen.length].id; });

  const finale = shuffle(POOL.filter((item) => item.tier === 'finale'));
  contentIds[board.last] = finale[0].id;

  return contentIds;
}