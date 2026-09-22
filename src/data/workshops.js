import howardPhoto from "../assets_26/images/hosts/howard.jpg";
import peterPhoto from "../assets_26/images/hosts/peter.jpg";
import yujinPhoto from "../assets_26/images/hosts/yujin.jpg";
import belindaPhoto from "../assets_26/images/hosts/belinda.jpg";
import kandisaPhoto from "../assets_26/images/hosts/kandisa.jpg";
import aniyahPhoto from "../assets_26/images/hosts/aniyah.JPG";
import larainePhoto from "../assets_26/images/hosts/laraine.jpg";
import pujaPhoto from "../assets_26/images/hosts/puja.jpg";
import stellaPhoto from "../assets_26/images/hosts/stella.jpg";
import victoriaPhoto from "../assets_26/images/hosts/victoria.jpg";

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

const aniyah = {
  name: "Aniyah",
  img: aniyahPhoto,
  bio: "Hi everyone, my name is Aniyah! I’m a 5th year Computer Science and Mathematics Major at SFU and a Software Developer at SFU Surge. I love to create and solve problems with technology. In my free time I enjoy pilates and cuddling with my pets ♡ I’m so excited to share my passion for tech and meet you all at Try/CATCH 2026!",
};

const laraine = {
  name: "Laraine",
  img: larainePhoto,
  bio: "Hi everyone! My name is Laraine, and I’m a third-year Interactive Arts and Technology student at SFU, concentrating in AI and Data Science for Human-Centered Systems and Designing Interactions. I’m passionate about UX/UI design, technology, and finding creative ways to make technology more accessible and engaging. Outside of school, I enjoy reading, watching Star Trek, designing, and exploring new creative projects. I’m excited to be part of Try/Catch 2026 and share what I’ve learned while inspiring others to explore the world of technology!",
};

const puja = {
  name: "Puja",
  img: pujaPhoto,
  bio: "Hi! I’m Puja, and I’m a final year CS student at SFU. I've spent the last 4 years exploring everything from software dev to machine learning, and somewhere along the way I stumbled across robotics and ended up loving it the most. I’m currently working on getting a robot to understand, break down, and execute natural language instructions, which is both really exciting and challenging! I hope to give you all some exposure to robotics in this workshop and show you how fun it can be 🙂 In my free time I love reading, hiking, baking, and whatever other new hobby I happen to have picked up.",
};

const stella = {
  name: "Stella",
  img: stellaPhoto,
  bio: "Hi! I’m Stella and I am a 4th year Computing Science student at SFU. I am an undergrad researcher in the Rosie Lab. Outside of academics, I am also a member of the SFU Fencing Team, and enjoy travelling, painting, and reading. I hope our workshop lets you glimpse into what’s possible with the exciting applications of robotics!",
};

const victoria = {
  name: "Victoria",
  img: victoriaPhoto,
  bio: "Hey there! My name's Victoria and I'm a 5th year SIAT student at SFU. I'm someone who is super passionate about user experience (UX) and human-centered design. What I love the most about my work is becoming almost like a detective — digging deeper into how people experience and interact with technology, digital systems, and the world around them. When not working, I love going to cute cafes, experimenting with my camera, or spending a whole weekend afternoon doing arts and crafts. I'm super excited to share some of the experiences that I've gained and hopefully spark new inspiration, curiosity, and passion for design too!",
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
    summary: GENERIC_SUMMARY,
    description: GENERIC_DESCRIPTION,
    hosts: [laraine, victoria],
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
    summary: GENERIC_SUMMARY,
    description: GENERIC_DESCRIPTION,
    hosts: [puja, stella],
  },
  {
    title: "Web Development Workshop",
    icon: "code",
    accent: "purple",
    summary: GENERIC_SUMMARY,
    description: GENERIC_DESCRIPTION,
    hosts: [aniyah, kandisa],
  },
];
