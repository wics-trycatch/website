// Public event-day schedule for the 2026 Schedule page. Edit freely.
//
// color:    "deep" | "medium" | "pink" | "yellow"  (the circle on the timeline)
// mapUrl:   link for the location. Leave it out to search Google Maps for
//           "SFU Burnaby <location>", or set it to null when the location has
//           no single place (like "Varies"); it then opens the dropdown instead.
// start:    24-hour "HH:MM" the block actually begins, on EVENT_DATE below.
//           Used only to drive the rocket in real time — the "time" field
//           above is what's actually displayed.
//
// The rocket itself is animated separately in Schedule.jsx — on the real
// event day it sits at whichever stop's start time has most recently
// passed, live, based on the visitor's clock.

// The actual event date the "start" times above are anchored to.
export const EVENT_DATE = { year: 2026, month: 10, day: 24 };

export const scheduleMeta = {
  dateLabel: "October 24, 2026",
  intro:
    "This year's Try/CATCH event will be taking place on Saturday, October 24th, 2026 at the SFU Burnaby campus.",
};

export const scheduleData = [
  {
    time: "8:30 - 9:30",
    start: "08:30",
    title: "Registration & Refreshments",
    location: "ASB Atrium",
    color: "deep",
    description:
      "Check in at the registration desk, grab some breakfast snacks, and meet fellow attendees. This is a great time to explore the venue and connect with other participants before the day begins.",
  },
  {
    time: "9:30 - 10:00",
    start: "09:30",
    title: "Opening Ceremony & Keynote Speaker",
    location: "SSB 9200",
    color: "medium",
    description:
      "Join us for an energetic start to Try/CATCH! We'll welcome you to the event, introduce the day's schedule, and share what makes this conference special.",
  },
  {
    time: "10:05 - 11:35",
    start: "10:05",
    title: "1st Workshop",
    location: "Varies",
    mapUrl: null,
    color: "pink",
    description:
      "On the back of your student attendee name tag, you'll see which workshop you're assigned to for your 1st workshop. Follow your line leader to get settled into the correct room.",
  },
  {
    time: "11:35 - 12:35",
    start: "11:35",
    title: "Lunch & Sponsor Booths",
    location: "ASB Atrium",
    color: "yellow",
    description:
      "Enjoy a complimentary lunch while connecting with other attendees, speakers, mentors, and sponsors. This is your chance to ask questions, make new friends, and discuss what you've learned so far.",
  },
  {
    time: "12:40 - 2:10",
    start: "12:40",
    title: "2nd Workshop",
    location: "Varies",
    mapUrl: null,
    color: "pink",
    description:
      "On the back of your student attendee name tag, you'll see which workshop you're assigned to for your 2nd workshop. Follow your line leader to get settled into the correct room.",
  },
  {
    time: "2:10 - 2:35",
    start: "14:10",
    title: "Snacks",
    location: "ASB Atrium",
    color: "yellow",
    description:
      "Take a break and enjoy some refreshments. This is a great time to recharge before the final sessions of the day.",
  },
  {
    time: "2:40 - 4:10",
    start: "14:40",
    title: "3rd Workshop",
    location: "Varies",
    mapUrl: null,
    color: "pink",
    description:
      "On the back of your student attendee name tag, you'll see which workshop you're assigned to for your 3rd workshop. Follow your line leader to get settled into the correct room.",
  },
  {
    time: "4:15 - 5:00",
    start: "16:15",
    title: "Panel Session & Parent Info Session",
    location: "SSB 9200, SSC 9001",
    color: "deep",
    description:
      "Listen to a group of women in computing share their experiences, challenges, and wins, and ask them anything about career paths in tech. Parents can join their own information session at the same time.",
  },
  {
    time: "5:00 - 5:30",
    start: "17:00",
    title: "Closing Ceremony & Prizes",
    location: "SSB 9200",
    color: "medium",
    description:
      "We'll wrap up the day with closing remarks and a prize draw. Stay until the end for your chance to win door prizes!",
  },
];
