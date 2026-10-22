// Content for the Snakes & Ladders game.
//
// Every non-snake square draws from POOL below instead of a fixed 1:1
// mapping — each new game shuffles a fresh square -> item assignment (see
// assignSquares in utils/pickGame.js), so replaying feels different and no
// two players necessarily get the same board. When a player answers an MCQ
// wrong and is sent back a square, that square's item is swapped for a fresh
// one (see replaceSquareItem in SnakesAndLadders.jsx), so they never see the
// same question twice.
//
// Each item is one of:
//   kind: 'task' — a real, in-person thing to do at the event. Almost all of
//         them ask for a photo (and sometimes a short note) so the team can
//         verify them afterwards.
//   kind: 'mcq'  — a quick multiple-choice question about SFU WiCS or
//         Try/CATCH (no technical questions). Wrong answer = back one square.
//
// `topic` (mcq + snake questions) tags the fact being asked about; the game never
// shows two questions with the same topic in one playthrough, even across the
// regular and snake pools.
//
// tier on a task is 'easy' (self-contained, low social ask), 'social'
// (go talk to someone), or 'bold' (actually out of your comfort zone).
// assignSquares guarantees at least 2 'bold' tasks land on every board.
// 'finale' is reserved for the last square only.

export const POOL = [
  // ---- mcq: SFU WiCS & Try/CATCH ----
  {
    id: 'mcq-mascot',
    topic: 'mascot',
    kind: 'mcq',
    tier: 'easy',
    q: 'What is the name of the SFU WiCS mascot?',
    options: ['Cosmos', 'Byte', 'Sparky', 'Archie'],
    answer: 0,
  },
  {
    id: 'mcq-wics-meaning',
    topic: 'wics-name',
    kind: 'mcq',
    tier: 'easy',
    q: 'What does "WiCS" stand for?',
    options: [
      'Women in Computing Science',
      'Women in Computer Software',
      'World in Computing Systems',
      'Women in Creative Sciences',
    ],
    answer: 0,
  },
  {
    id: 'mcq-university',
    topic: 'university',
    kind: 'mcq',
    tier: 'easy',
    q: 'Which university is SFU WiCS part of?',
    options: ['Simon Fraser University', 'University of British Columbia', 'University of Victoria', 'BCIT'],
    answer: 0,
  },
  {
    id: 'mcq-audience',
    topic: 'audience',
    kind: 'mcq',
    tier: 'easy',
    q: 'Who is Try/CATCH made for?',
    options: [
      'High school girls and non-binary students',
      'University professors',
      'Industry professionals only',
      'Elementary school students',
    ],
    answer: 0,
  },
  {
    id: 'mcq-workshop-name',
    topic: 'workshop',
    kind: 'mcq',
    tier: 'easy',
    q: 'Which of these is one of the Try/CATCH 2026 workshops?',
    options: ['Robot Lab', 'Pottery Studio', 'Cooking Class', 'Yoga Flow'],
    answer: 0,
  },

  {
    id: 'mcq-events',
    topic: 'events',
    kind: 'mcq',
    tier: 'easy',
    q: 'What kind of events does SFU WiCS run?',
    options: ['Workshops, panels and networking', 'Fishing trips', 'Car races', 'Cooking competitions'],
    answer: 0,
  },
  {
    id: 'mcq-sponsor',
    topic: 'sponsor',
    kind: 'mcq',
    tier: 'easy',
    q: 'Which of these companies is a Try/CATCH 2026 sponsor?',
    options: ['Teck', 'Netflix', 'Spotify', 'Nintendo'],
    answer: 0,
  },

  // ---- task: easy (photo-verified, at the event) ----
  {
    id: 'task-doodle-mascot',
    kind: 'task',
    tier: 'easy',
    title: 'Doodle Cosmos',
    detail: 'Draw Cosmos (the SFU WiCS mascot) or your favorite part of today on paper, then snap a photo of your drawing!',
    proof: 'photo',
  },
  {
    id: 'task-banner-photo',
    kind: 'task',
    tier: 'easy',
    title: 'Photograph the banner',
    detail: 'Find a WiCS banner or Try/CATCH sign and take a photo of it.',
    proof: 'photo',
  },
  {
    id: 'task-pose-mascot',
    kind: 'task',
    tier: 'easy',
    title: 'Pose with the sign',
    detail: 'Find a Try/CATCH sign, backdrop, or Cosmos artwork and take a photo of yourself with it!',
    proof: 'photo',
  },
  {
    id: 'task-sticker-badge',
    kind: 'task',
    tier: 'easy',
    title: 'Show your badge or sticker',
    detail: 'Snap a photo of your event name badge or a sticker you picked up today.',
    proof: 'photo',
  },
  {
    id: 'task-fav-merch',
    kind: 'task',
    tier: 'easy',
    title: 'Favorite swag',
    detail: 'Take a photo of your favorite piece of Try/CATCH swag from today and tell us what it is!',
    proof: 'both',
    inputLabel: 'What swag did you get?',
  },
  {
    id: 'task-spot-sponsor',
    kind: 'task',
    tier: 'easy',
    title: 'Spot a sponsor',
    detail: 'Find a sponsor logo or booth at the event, take a photo of it, and type which sponsor it is!',
    proof: 'both',
    inputLabel: 'Which sponsor did you spot?',
  },
  {
    id: 'task-schedule-photo',
    kind: 'task',
    tier: 'easy',
    title: 'Check the schedule',
    detail: 'Find the event schedule and take a photo of it. Then tell us which session you are most excited for!',
    proof: 'both',
    inputLabel: 'Which session are you most excited for?',
  },
  {
    id: 'task-workshop-room',
    kind: 'task',
    tier: 'easy',
    title: 'Workshop room',
    detail: 'Snap a photo of the room or door where one of your workshops is happening and type the workshop name!',
    proof: 'both',
    inputLabel: 'Which workshop is it?',
  },
  {
    id: 'task-food',
    kind: 'task',
    tier: 'easy',
    title: 'Snack break',
    detail: 'Take a photo of a snack or meal you are enjoying at the event and tell us what you picked!',
    proof: 'both',
    inputLabel: 'What did you pick?',
  },

  // ---- task: social (go talk to someone) ----
  {
    id: 'task-meet-exec',
    kind: 'task',
    tier: 'social',
    title: 'Meet a WiCS exec',
    detail: 'Introduce yourself to a WiCS exec (look for the WiCS shirts!), take a photo together, and ask what their favorite thing about WiCS is.',
    proof: 'both',
    inputLabel: 'What did they say?',
  },
  {
    id: 'task-ask-organizer',
    kind: 'task',
    tier: 'social',
    title: 'Ask an organizer',
    detail: 'Ask an organizer what their favorite part of planning Try/CATCH was, and snap a photo with them.',
    proof: 'both',
    inputLabel: 'What did they say?',
  },
  {
    id: 'task-visit-sponsor',
    kind: 'task',
    tier: 'social',
    title: 'Chat with a sponsor',
    detail: 'Say hello to a sponsor representative, ask what they do, and take a photo with them!',
    proof: 'both',
    inputLabel: 'Who did you talk to and what do they do?',
  },
  {
    id: 'task-volunteer-shirt',
    kind: 'task',
    tier: 'social',
    title: 'Find a volunteer',
    detail: 'Find someone wearing a volunteer t-shirt, say hi, ask which workshop they would recommend, and take a photo with them.',
    proof: 'both',
    inputLabel: 'Which workshop did they recommend?',
  },
  {
    id: 'task-swap-tip',
    kind: 'task',
    tier: 'social',
    title: 'Swap a study tip',
    detail: 'Ask another attendee for their best high school study tip, then take a photo of the two of you.',
    proof: 'both',
    inputLabel: "What's their tip?",
  },
  {
    id: 'task-new-friend',
    kind: 'task',
    tier: 'social',
    title: 'Meet someone from another school',
    detail: 'Find someone from a different school, ask what brought them to Try/CATCH, and take a selfie together!',
    proof: 'both',
    inputLabel: 'Which school are they from?',
  },
  {
    id: 'task-favorite-moment',
    kind: 'task',
    tier: 'social',
    title: 'Compare favorite moments',
    detail: 'Ask another attendee what their favorite moment of the day has been so far, and take a photo together!',
    proof: 'both',
    inputLabel: 'What was their favorite moment?',
  },
  {
    id: 'task-compliment',
    kind: 'task',
    tier: 'social',
    title: 'Spread some kindness',
    detail: 'Give a genuine compliment to someone you have not met yet, then take a photo together!',
    proof: 'photo',
  },

  // ---- task: bold (comfort zone stretch) ----
  {
    id: 'task-meet-stranger',
    kind: 'task',
    tier: 'bold',
    title: 'Meet someone new',
    detail: 'Introduce yourself to someone you have never met, learn one fun fact about them, and take a photo together!',
    proof: 'both',
    inputLabel: "What's the fun fact?",
  },
  {
    id: 'task-ask-speaker',
    kind: 'task',
    tier: 'bold',
    title: 'Talk to a speaker',
    detail: 'After a talk or panel, go up to a speaker or panelist, ask them one question, and take a photo with them!',
    proof: 'both',
    inputLabel: "What'd you ask?",
  },
  {
    id: 'task-group-selfie',
    kind: 'task',
    tier: 'bold',
    title: 'Group selfie',
    detail: 'Gather three people you have not met before and take a group selfie together!',
    proof: 'photo',
  },

  // ---- task: finale (only ever used on the very last square) ----
  {
    id: 'task-find-chair',
    kind: 'task',
    tier: 'finale',
    title: 'Find our chair!',
    detail: 'Find Sydney Komanac (our chair) and take a picture with her!',
    proof: 'photo',
  },
];

export const POOL_BY_ID = new Map(POOL.map((item) => [item.id, item]));

// Snake encounter trivia challenges. When the player lands on a snake square,
// answering correctly lets them escape and stay put instead of sliding down.
export const SNAKE_FLAVORS = {
  wics: { emoji: '💜', label: 'SFU WiCS Trivia!' },
  event: { emoji: '✨', label: 'Try/CATCH Trivia!' },
};

export const CODE_CHALLENGES = [
  // ---- flavor: wics ----
  {
    id: 'snake-mascot',
    topic: 'mascot',
    flavor: 'wics',
    prompt: 'SFU WiCS has a beloved mascot. What is their name?',
    options: ['Cosmos', 'Byte', 'Sparky', 'Archie'],
    answer: 0,
  },
  {
    id: 'snake-acronym',
    topic: 'wics-name',
    flavor: 'wics',
    prompt: 'What does "WiCS" stand for?',
    options: [
      'Women in Computing Science',
      'Women in Computer Software',
      'World in Computing Systems',
      'Women in Creative Sciences',
    ],
    answer: 0,
  },
  {
    id: 'snake-events',
    topic: 'events',
    flavor: 'wics',
    prompt: 'What kind of events does SFU WiCS run?',
    options: ['Workshops, panels and networking', 'Fishing trips', 'Car races', 'Cooking competitions'],
    answer: 0,
  },

  // ---- flavor: event ----
  {
    id: 'snake-workshop',
    topic: 'workshop',
    flavor: 'event',
    prompt: 'Which of these is a Try/CATCH 2026 workshop?',
    options: ['Robot Lab', 'Pottery Studio', 'Cooking Class', 'Yoga Flow'],
    answer: 0,
  },
  {
    id: 'snake-workshop-hack',
    topic: 'workshop',
    flavor: 'event',
    prompt: 'Which of these is a Try/CATCH 2026 workshop?',
    options: ['Hack the Basics', 'Pottery Studio', 'Cooking Class', 'Yoga Flow'],
    answer: 0,
  },
  {
    id: 'snake-sponsor',
    topic: 'sponsor',
    flavor: 'event',
    prompt: 'Which of these companies is a Try/CATCH 2026 sponsor?',
    options: ['Teck', 'Netflix', 'Spotify', 'Nintendo'],
    answer: 0,
  },
];

export const SNAKE_CHALLENGES = CODE_CHALLENGES;

export const shuffle = (list) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
