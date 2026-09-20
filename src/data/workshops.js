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
// import howardPhoto from "../assets_26/images/workshops/howard.jpg";

const howard = {
  name: "Howard",
  // img: howardPhoto,
  bio: "Hey, I'm Howard, 4th year SoSy student and a Game Dev Club exec. I like epic environment art, beautiful graphics tech, and impactful sound design; and I like teaching people how to make their games have all of that.",
};

const peter = {
  name: "Peter",
  // img: peterPhoto,
  bio: "Hi everyone! I'm Peter and I'm a 4th year SoSy student who's also been a Game Dev Club exec for just over a year. I've been spending the last couple years volunteering in various game dev events all over the lower mainland, and I'm currently working as a Unity VR developer!",
};

const yujin = {
  name: "Yujin",
  // img: yujinPhoto,
  bio: "Hi everyone, my name is Yujin! I'm a 4th-year Computing Science student at SFU. I'm also the co-founder and president of the SFU Cybersecurity Club. I started the club because I wanted to explore the field more deeply and learn about security with other students. I'm really excited to be part of Try/CATCH. I hope this workshop helps more people experience cybersecurity. Outside of school and tech, I love going to concerts!",
};

const belinda = {
  name: "Belinda",
  // img: belindaPhoto,
  bio: "Hi! My name is Belinda and I am a fourth-year Computing Science student at SFU and an executive of SFU's Cybersecurity Club. I enjoy cooking, reading and gaming in my free time and recently started long-boarding! I'm looking forward to sharing more knowledge on cybersecurity at Try/Catch 2026!",
};

const kandisa = {
  name: "Kandisa",
  // img: kandisaPhoto,
  bio: "Hey! I'm Kandisa, a 4th-year Computing Science student at SFU, Software Developer at the SFU Robot Soccer Club, and a Business Analyst Co-op at Fraser Health. I enjoy solving real-life challenges through technology. I love exploring new sports, cooking, reading, traveling, dancing, and listening to music. I'm so excited to share my experiences and hopefully pass on some of the skills I've learned along the way!",
};

export const workshopsMeta = {
  eyebrow: "Learn by building",
  intro:
    "Explore hands-on workshops designed to introduce you to different areas of technology. Each workshop is led by experienced instructors who are passionate about sharing their knowledge. Click on any workshop to learn more about what you'll build and who will be teaching!",
};

export const workshops = [
  {
    title: "Game Development Workshop",
    icon: "gamepad",
    accent: "yellow",
    summary:
      "Participants will receive an intro to Unity game development, making a fishing game inspired by Animal Crossing from scratch!",
    description:
      "An intro to Unity game development, where you'll make a cozy fishing game inspired by Animal Crossing completely from scratch. You'll learn how scenes, sprites and scripts fit together, then add your own twist to the game. No prior experience needed, just curiosity and creativity!",
    hosts: [howard, peter],
  },
  {
    title: "Cybersecurity Workshop",
    icon: "shield",
    accent: "pink",
    // TODO: swap in the real workshop write-up once we have it — this is a
    // placeholder based on the topic, not the actual activity plan.
    summary:
      "Participants will get a hands-on introduction to cybersecurity fundamentals, straight from the execs of SFU's Cybersecurity Club.",
    description:
      "Curious how hackers (and the people who stop them) actually think? In this workshop, led by the co-founders of the SFU Cybersecurity Club, you'll get a hands-on introduction to the fundamentals of cybersecurity. No prior experience needed, just curiosity about how to keep systems and data safe!",
    hosts: [yujin, belinda],
  },
  {
    title: "Robotics Workshop",
    icon: "bot",
    accent: "lavender",
    summary:
      "Participants will see how their code directly shapes a robot's behaviour, giving them a taste of both game development and robotics programming.",
    description:
      "Learn how to bring robots to life with code! Using Sony Toio robots and Unity, you'll write simple C# scripts to control real robots. Starting with the basics of moving, turning, and looping, you'll then work in teams to design fun robot challenges, from choreographed dances to obstacle courses. By the end, you'll see how your code directly shapes the robots' behaviour, giving you a taste of both game development and robotics programming.",
    hosts: [kandisa],
  },
  {
    title: "Web Development Workshop",
    icon: "code",
    accent: "purple",
    // TODO: we don't have the write-up or hosts for this one yet
    summary:
      "Participants will learn the building blocks of the web and put together their very own webpage from scratch. Details coming soon!",
    description:
      "Details for this workshop are still being finalized — check back soon for the full write-up on what you'll build and who's teaching it!",
    hosts: [],
  },
  {
    title: "Figma Workshop",
    icon: "figma",
    accent: "purple",
    // TODO: we don't have confirmed hosts for this one yet
    summary:
      "Participants will learn the basics of user interface (UI) design, explore how to make clickable prototypes, and share their creations.",
    description:
      "Ever wonder how the apps we use every day are created before they're coded? In this workshop, students will dive into Figma, an industry-standard design tool, and design their first mobile app prototype. Participants will create a set of three connected screens. Along the way, they'll learn the basics of user interface (UI) design, explore how to make clickable prototypes, and share their creations.",
    hosts: [],
  },
];
