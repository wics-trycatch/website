// Workshop content for the 2026 event.
//
// icon:    "figma" | "shield" | "gamepad" | "bot" | "code"  (the round icon on the card)
// accent:  "purple" | "pink" | "yellow" | "lavender"        (the card's border and glow color)
// summary: the short blurb shown on the closed card
// description: the longer text shown once the card is opened
// hosts:   one entry per host. Add a photo by importing it at the top of this
//          file and setting img: myPhoto. Without an img, their initial is shown.
//          The "Hosted by ..." line on the card is built from the hosts' first names.
//
// TODO: none of the workshops have their real write-up yet — every
// summary/description below is a generic placeholder. Swap each one out
// once the actual activity plan is ready.

import howardPhoto from "../assets_26/images/hosts/howard.jpg";
import peterPhoto from "../assets_26/images/hosts/peter.jpg";
import yujinPhoto from "../assets_26/images/hosts/yujin.jpg";
import belindaPhoto from "../assets_26/images/hosts/belinda.jpg";
import kandisaPhoto from "../assets_26/images/hosts/kandisa.jpg";

const howard = {
  name: "Howard",
  img: howardPhoto,
  bio: "Hey, I'm Howard, 4th year SoSy student and a Game Dev Club exec. I like epic environment art, beautiful graphics tech, and impactful sound design; and I like teaching people how to make their games have all of that.",
};

const peter = {
  name: "Peter",
  img: peterPhoto,
  bio: "Hi everyone! I'm Peter and I'm a 4th year SoSy student who's also been a Game Dev Club exec for just over a year. I've been spending the last couple years volunteering in various game dev events all over the lower mainland, and I'm currently working as a Unity VR developer!",
};

const yujin = {
  name: "Yujin",
  img: yujinPhoto,
  bio: "Hi everyone, my name is Yujin! I'm a 4th-year Computing Science student at SFU. I'm also the co-founder and president of the SFU Cybersecurity Club. I started the club because I wanted to explore the field more deeply and learn about security with other students. I'm really excited to be part of Try/CATCH. I hope this workshop helps more people experience cybersecurity. Outside of school and tech, I love going to concerts!",
};

const belinda = {
  name: "Belinda",
  img: belindaPhoto,
  bio: "Hi! My name is Belinda and I am a fourth-year Computing Science student at SFU and an executive of SFU's Cybersecurity Club. I enjoy cooking, reading and gaming in my free time and recently started long-boarding! I'm looking forward to sharing more knowledge on cybersecurity at Try/Catch 2026!",
};

const kandisa = {
  name: "Kandisa",
  img: kandisaPhoto,
  bio: "Hey! I'm Kandisa, a 4th-year Computing Science student at SFU, Software Developer at the SFU Robot Soccer Club, and a Business Analyst Co-op at Fraser Health. I enjoy solving real-life challenges through technology. I love exploring new sports, cooking, reading, traveling, dancing, and listening to music. I'm so excited to share my experiences and hopefully pass on some of the skills I've learned along the way!",
};

const GENERIC_SUMMARY = "Details for this workshop are still being finalized — check back soon to learn what you'll be building!";
const GENERIC_DESCRIPTION =
  "We're putting the finishing touches on this workshop's activities, so the full write-up is coming soon. In the meantime, come ready to learn something new, get hands-on, and have fun with our wonderful hosts!";

export const workshopsMeta = {
  eyebrow: "Learn by building",
  intro:
    "Explore hands-on workshops designed to introduce you to different areas of technology. Each workshop is led by experienced instructors who are passionate about sharing their knowledge. Click on any workshop to learn more about what you'll build and who will be teaching!",
};

// Alphabetical by title.
export const workshops = [
  {
    title: "Cybersecurity Workshop",
    icon: "shield",
    accent: "pink",
    summary: GENERIC_SUMMARY,
    description: GENERIC_DESCRIPTION,
    hosts: [belinda, yujin],
  },
  {
    title: "Figma Workshop",
    icon: "figma",
    accent: "indigo",
    // TODO: no host confirmed for this one yet
    summary: GENERIC_SUMMARY,
    description: GENERIC_DESCRIPTION,
    hosts: [],
  },
  {
    title: "Game Development Workshop",
    icon: "gamepad",
    accent: "yellow",
    summary: GENERIC_SUMMARY,
    description: GENERIC_DESCRIPTION,
    hosts: [howard, peter],
  },
  {
    title: "Robotics Workshop",
    icon: "bot",
    accent: "lavender",
    // TODO: no host confirmed for this one yet
    summary: GENERIC_SUMMARY,
    description: GENERIC_DESCRIPTION,
    hosts: [],
  },
  {
    title: "Web Development Workshop",
    icon: "code",
    accent: "purple",
    summary: GENERIC_SUMMARY,
    description: GENERIC_DESCRIPTION,
    hosts: [kandisa],
  },
];
