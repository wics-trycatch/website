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
    summary:
      "Discover the fundamentals of cybersecurity through hands-on puzzles, learning how cryptography, online privacy, and defense strategies keep our digital world safe.",
    description:
      "Curious about how hackers think and how we protect our digital world? In this workshop led by executives from SFU's Cybersecurity Club, you'll explore the basics of cybersecurity, encryption, and digital safety. Through fun, interactive challenges and code-breaking puzzles, you'll learn how security analysts detect vulnerabilities and defend systems against cyber threats. No previous coding or security experience required!",
    hosts: [belinda, yujin],
  },
  {
    title: "Figma Workshop",
    icon: "figma",
    accent: "indigo",
    summary:
      "Dive into user interface (UI) and user experience (UX) design with Figma, learning how to design and prototype your very own mobile app screens.",
    description:
      "Ever wonder how the apps we use every day are designed before they're ever coded? In this hands-on workshop, you'll learn the fundamentals of UI/UX design using Figma, the industry-standard design platform. You'll create and customize a multi-screen mobile app prototype, exploring wireframing, color theory, typography, and clickable interactions to bring your creative ideas to life.",
    hosts: [laraine, victoria],
  },
  {
    title: "Game Development Workshop",
    icon: "gamepad",
    accent: "yellow",
    summary:
      "Step into game development and discover how art, sound, and code come together to build your own playable 2D game from scratch.",
    description:
      "Ready to build your very own video game? Hosted by leaders from the SFU Game Dev Club, this workshop introduces the core building blocks of game creation. You'll learn how scenes, sprites, mechanics, and physics interact, and how to program gameplay logic to create a fun, interactive game from scratch. Beginners welcome—bring your creativity and imagination!",
    hosts: [howard, peter],
  },
  {
    title: "Robotics Workshop",
    icon: "bot",
    accent: "lavender",
    summary:
      "Get hands-on with robotics programming to see how code translates into real-world robot motion, sensor inputs, and interactive challenges.",
    description:
      "Bring hardware to life with code! In this workshop, you'll explore the fascinating intersection of software and physical computing. You'll discover how robots perceive their environment through sensors, process instructions, and execute physical tasks. Working through exciting real-world robotics challenges, you'll see your code directly steer robot behaviors and actions.",
    hosts: [puja, stella],
  },
  {
    title: "Web Development Workshop",
    icon: "code",
    accent: "purple",
    summary:
      "Learn the core building blocks of the web—HTML, CSS, and JavaScript—to design, style, and code your very own interactive webpage from scratch.",
    description:
      "Have you ever wanted to build your own website? In this beginner-friendly workshop, you'll dive into the essentials of front-end web development. You'll use HTML to structure content, CSS to style layouts with colors and fonts, and JavaScript to add fun interactive elements. By the end of the session, you'll have created a live, personalized webpage you can share with friends!",
    hosts: [aniyah, kandisa],
  },
];
