// Sample content for the 2026 workshops page. Edit freely.
//
// icon:    "figma" | "brain" | "gamepad" | "bot"      (the round icon on the card)
// accent:  "purple" | "pink" | "yellow" | "lavender"  (the card's border and glow color)
// summary: the short blurb shown on the closed card
// description: the longer text shown once the card is opened
// hosts:   one entry per host. Add a photo by importing it at the top of this
//          file and setting img: myPhoto. Without an img, their initial is shown.
//          The "Hosted by ..." line on the card is built from the hosts' first names.
//
// import manjariPhoto from "../assets_26/images/workshops/manjari.jpg";

export const workshopsMeta = {
  eyebrow: "Learn by building",
  intro:
    "Explore hands-on workshops designed to introduce you to different areas of technology. Each workshop is led by experienced instructors who are passionate about sharing their knowledge. Click on any workshop to learn more about what you'll build and who will be teaching!",
};

const manjari = {
  name: "Manjari Prasad",
  // img: manjariPhoto,
  bio: "Manjari is a third year student at SFU, working towards a BSc in Computing Science and a minor in Statistics. During her spare time, she loves playing the piano and reading books.",
};

const tina = {
  name: "Tina Kaur",
  // img: tinaPhoto,
  bio: "Tina is a second year student at SFU, working towards a BSc in Computing Science.",
};

export const workshops = [
  {
    title: "Figma Workshop",
    icon: "figma",
    accent: "purple",
    summary:
      "Participants will learn the basics of user interface (UI) design, explore how to make clickable prototypes, and share their creations.",
    description:
      "Ever wonder how the apps we use every day are created before they're coded? In this workshop, students will dive into Figma, an industry-standard design tool, and design their first mobile app prototype. Participants will create a set of three connected screens. Along the way, they'll learn the basics of user interface (UI) design, explore how to make clickable prototypes, and share their creations.",
    hosts: [manjari, tina],
  },
  {
    title: "Machine Learning Workshop",
    icon: "brain",
    accent: "pink",
    summary:
      "Participants will build their own sentiment analysis classifier and sharpen both coding and problem-solving skills!",
    description:
      "Can a computer really read feelings? Think about the last time you left a review on a product. What if a computer could instantly understand your mood just from the words you typed? In this workshop, you'll use real Amazon reviews to train a supervised learning classifier that predicts whether text is positive or negative. We'll warm up with Python basics, then dive into vectorization, model training, and testing accuracy. By the end, you'll have built your own sentiment analysis classifier and sharpened both coding and problem-solving skills!",
    hosts: [manjari, tina],
  },
  {
    title: "Game Dev Workshop",
    icon: "gamepad",
    accent: "yellow",
    summary:
      "Participants will receive an intro to Unity game development workshop making a fishing game inspired by Animal Crossing from scratch!",
    description:
      "An intro to Unity game development, where you'll make a cozy fishing game inspired by Animal Crossing completely from scratch. You'll learn how scenes, sprites and scripts fit together, then add your own twist to the game. No prior experience needed, just curiosity and creativity!",
    hosts: [manjari, tina],
  },
  {
    title: "Sony Toio Robots",
    icon: "bot",
    accent: "lavender",
    summary:
      "Participants will see how their code directly shapes the robots' behaviour, giving them a taste of both game development and robotics programming.",
    description:
      "Learn how to bring robots to life with code! Using Sony Toio robots and Unity, you'll write simple C# scripts to control real robots. Starting with the basics of moving, turning, and looping, you'll then work in teams to design fun robot challenges, from choreographed dances to obstacle courses. By the end, you'll see how your code directly shapes the robots' behaviour, giving you a taste of both game development and robotics programming.",
    hosts: [manjari, tina],
  },
];