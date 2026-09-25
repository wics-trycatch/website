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
import jeeminPhoto from "../assets_26/images/hosts/jeemin.png";

const howard = {
  name: "Howard Nguyen",
  img: howardPhoto,
  linkedin: "https://www.linkedin.com/in/howard-nguyen-swe/",
  bio: "Hey, I'm Howard, 4th year SoSy student and a Game Dev Club exec. I like epic environment art, beautiful graphics tech, and impactful sound design; and I like teaching people how to make their games have all of that.",
};

const peter = {
  name: "Peter Soava",
  img: peterPhoto,
  linkedin: "https://www.linkedin.com/in/peter-soava/",
  bio: "Hi everyone! I'm Peter and I'm a 4th year SoSy student who's also been a Game Dev Club exec for just over a year. I've been spending the last couple years volunteering in various game dev events all over the lower mainland, and I'm currently working as a Unity VR developer!",
};

const jeemin = {
  name: "Jeemin Lee",
  img: jeeminPhoto,
  linkedin: "https://www.linkedin.com/in/jeemin-lee-kor/",
  bio: "Hi everyone! I’m Jeemin and I’m passionate about making games that leave players with something more than just a fun experience. I am especially interested in serious games and how interactivity can be used to tell meaningful stories and create real world impact. I love exploring what makes games such a unique way to connect with people!.",
};

const yujin = {
  name: "Yujin Song",
  img: yujinPhoto,
  linkedin: "https://www.linkedin.com/in/yujin-song-527513309/",
  bio: "Hi everyone, my name is Yujin! I'm a 4th-year Computing Science student at SFU. I'm also the co-founder and president of the SFU Cybersecurity Club. I started the club because I wanted to explore the field more deeply and learn about security with other students. I'm really excited to be part of Try/CATCH. I hope this workshop helps more people experience cybersecurity. Outside of school and tech, I love going to concerts!",
};

const belinda = {
  name: "Belinda Zhu",
  img: belindaPhoto,
  linkedin: "https://www.linkedin.com/in/belinda-zhuuuuuuu/",
  bio: "Hi! My name is Belinda and I am a fourth-year Computing Science student at SFU and an executive of SFU's Cybersecurity Club. I enjoy cooking, reading and gaming in my free time and recently started long-boarding! I'm looking forward to sharing more knowledge on cybersecurity at Try/Catch 2026!",
};

const kandisa = {
  name: "Kandisa Agarwal",
  img: kandisaPhoto,
  linkedin: "https://www.linkedin.com/in/kandisa-agarwal/",
  bio: "Hey! I'm Kandisa, a 4th-year Computing Science student at SFU, Software Developer at the SFU Robot Soccer Club, and a Business Analyst Co-op at Fraser Health. I enjoy solving real-life challenges through technology. I love exploring new sports, cooking, reading, traveling, dancing, and listening to music. I'm so excited to share my experiences and hopefully pass on some of the skills I've learned along the way!",
};

const aniyah = {
  name: "Aniyah Bohnen",
  img: aniyahPhoto,
  linkedin: "https://www.linkedin.com/in/aniyah-bohnen/",
  bio: "Hi everyone, my name is Aniyah! I’m a 5th year Computer Science and Mathematics Major at SFU and a Software Developer at SFU Surge. I love to create and solve problems with technology. In my free time I enjoy pilates and cuddling with my pets ♡ I’m so excited to share my passion for tech and meet you all at Try/CATCH 2026!",
};

const laraine = {
  name: "Laraine Sim",
  img: larainePhoto,
  linkedin: "https://www.linkedin.com/in/laraine-sim/",
  bio: "Hi everyone! My name is Laraine, and I’m a third-year Interactive Arts and Technology student at SFU, concentrating in AI and Data Science for Human-Centered Systems and Designing Interactions. I’m passionate about UX/UI design, technology, and finding creative ways to make technology more accessible and engaging. Outside of school, I enjoy reading, watching Star Trek, designing, and exploring new creative projects. I’m excited to be part of Try/Catch 2026 and share what I’ve learned while inspiring others to explore the world of technology!",
};

const puja = {
  name: "Puja Shah",
  img: pujaPhoto,
  linkedin: "https://www.linkedin.com/in/puja-shah-711a79177/",
  bio: "Hi! I’m Puja, and I’m a final year CS student at SFU. I've spent the last 4 years exploring everything from software dev to machine learning, and somewhere along the way I stumbled across robotics and ended up loving it the most. I’m currently working on getting a robot to understand, break down, and execute natural language instructions, which is both really exciting and challenging! I hope to give you all some exposure to robotics in this workshop and show you how fun it can be 🙂 In my free time I love reading, hiking, baking, and whatever other new hobby I happen to have picked up.",
};

const stella = {
  name: "Stella Lin",
  img: stellaPhoto,
  linkedin: "https://www.linkedin.com/in/stellalin25/",
  bio: "Hi! I’m Stella and I am a 4th year Computing Science student at SFU. I am an undergrad researcher in the Rosie Lab. Outside of academics, I am also a member of the SFU Fencing Team, and enjoy travelling, painting, and reading. I hope our workshop lets you glimpse into what’s possible with the exciting applications of robotics!",
};

const victoria = {
  name: "Victoria Lo",
  img: victoriaPhoto,
  linkedin: "https://www.linkedin.com/in/vvictorialo/",
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
    title: "Bring Art to Life: Game Development with Godot",
    icon: "gamepad",
    accent: "yellow",
    summary:
      "Learn how to bring art to life with code using Godot, an easy-to-learn and beginner-friendly game engine.",
    description:
      "Learn how to bring art to life with code in this interactive workshop on how to make video games using Godot, an easy-to-learn and beginner-friendly game engine.",
    hosts: [howard, jeemin, peter],
  },
  {
    title: "Figma Workshop",
    icon: "figma",
    accent: "indigo",
    summary:
      "Dive into user interface (UI) and user experience (UX) design with Figma, the industry-standard design platform.",
    description:
      "Ever wonder how the apps we use every day are designed before they're ever coded? In this hands-on workshop, you'll learn the fundamentals of UI/UX design using Figma, the industry-standard design platform.",
    hosts: [laraine, victoria],
  },
  {
    title: "Hack the Basics: An Introduction to Cybersecurity",
    icon: "shield",
    accent: "pink",
    summary:
      "Learn about cybersecurity through hands-on activities, exploring digital footprints and a beginner-friendly TryHackMe challenge.",
    description:
      "Cybersecurity 101: In this interactive workshop, participants will learn about cybersecurity through hands-on activities! They'll explore digital footprints and complete a beginner-friendly TryHackMe activity to gain practical experience with cybersecurity concepts.",
    hosts: [belinda, yujin],
  },
  {
    title: "Robot Lab: Programming Robots in a 3D Simulator",
    icon: "bot",
    accent: "lavender",
    summary:
      "Program a robot to navigate an obstacle course in a real 3D simulator and learn about robotics from student researchers.",
    description:
      "Get hands-on programming a robot to navigate an obstacle course using a real 3D simulator! Learn about the frontiers of robotics from student researchers who work in university robotics labs.",
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
