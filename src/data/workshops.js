import vidhi from "../assets/images/workshops/vidhi_robots.JPEG"
import xueying from "../assets/images/workshops/xueying_robots.JPG"
import sylvia from "../assets/images/workshops/sylvia_figma.jpg"
import stephanie from "../assets/images/workshops/stephanie_figma.jpg"
import rebecca from "../assets/images/workshops/rebecca_figma.png"
import mara from "../assets/images/workshops/mara_machine.jpg"
import peter from "../assets/images/workshops/peter_gamedev.jpg"
import joyce from "../assets/images/workshops/joyce_gamedev.jpg"
import horward from "../assets/images/workshops/howard_gamedev.jpg"

export const workshops = [
    {
      title: "Code in Motion: Programming Sony Toio Robots with Unity",
      description: "In this interactive workshop, students will learn how to bring robots to life with code! Using Sony Toio robots and Unity, participants will get hands-on experience writing simple C# scripts to control real robots. Starting with the basics of moving, turning, and looping, students will then work in teams to design fun robot challenges — from choreographed dances to obstacle courses. By the end, they'll see how their code directly shapes the robots' behavior, giving them a taste of both game development and robotics programming. No prior coding experience is required; just curiosity and creativity!",
      hosts: [
        {
          img: vidhi,
          name: "Vidhi Aggarwal",
          blurb: "Hi everyone! My name is Vidhi, and I'm a 3rd-year Computing Science student at SFU. My interests lie in AI, web development, and human-computer interaction (HCI), and I love working on projects that bring innovative and people-focused ideas to life. When I'm not studying, you'll probably find me playing table tennis or enjoying music on long walks. I'm really looking forward to joining Try/CATCH again this year and can't wait to meet you all 😆"
        },
        {
          img: xueying,
          name: "Xueying Zhang",
          blurb: " Xueying is a PhD student in Computing Science at SFU, where she explores how technology and design can come together to support people's everyday lives. Before her PhD, she worked as a product designer in Toronto. Now, her research in Human-Computer Interaction (HCI) focuses on tangible interfaces, inclusive design, health and wellbeing. She loves building playful, meaningful interactions with both humans and robots."
        }
      ]
    },
    {
      title: "Design Your First App in Figma Workshop",
      description: "Ever wonder how the apps we use every day are created before they're coded? In this workshop, students will dive into Figma, an industry-standard design tool, and design their first mobile app prototype. Participants will create a set of three connected screens. Along the way, they'll learn the basics of user interface (UI) design, explore how to make clickable prototypes, and share their creations. ",
      hosts: [
        {
          img: sylvia,
          name: "Sylvia Zhang",
          blurb: "Sylvia is a product and UX designer with experience leading digital design for student tech organizations. She is passionate about making design accessible to everyone and loves guiding others in transforming their ideas into engaging digital experiences."
        },
        {
          img: rebecca,
          name: "Rebecca Yeung",
          blurb: "My name is Rebecca, and I'm currently in my 3rd year majoring in Interactive Arts and Technology (SIAT). My main areas of focus are in UI/UX design, as well as interaction design. In my spare time I love to experiment with baking and I love to read. I have also recently, in the summer, picked up running as a side hobby! I am always open to talk anything related to design or just about life!"
        },
        {
          img: stephanie,
          name: "Stephanie Mok",
          blurb: "My name is Stephanie and I am currently in my 3rd year majoring in Interactive Arts and Technology. I'm most interested in graphic/UI design as well as speculative design! In my free time I enjoy baking and I try to read as much as I can… I've also been an avid blind box collector for years so if you are as well I love talking to people about it!"
        }
      ]
    },
    {
      title: "Sentiment Classifiers with Machine Learning Workshop (Intermediate)",
      description: " Can a computer really read feelings? Think about the last time you left a review on a product...what if a computer could instantly understand your mood just from the words you typed? We can tackle that challenge using the power of Machine Learning, and in this workshop, you'll learn how it works. Just like how humans learn from experience, machines learn from data. Using a dataset with real Amazon reviews, you'll train a supervised learning classifier to predict whether text is positive or negative. We'll warm up with Python basics, then dive into vectorization, model training, and testing accuracy. As one of our more advanced workshops, it pushes your skills beyond coding into real-world AI applications. By the end, you'll have built your own sentiment analysis classifier and sharpened both coding and problem-solving skills!",
      hosts: [
        {
          img: mara,
          name: "Mara Liwayway David",
          blurb: "Hey everyone! My name is Mara and I'm a 3rd-year Computing Science student at SFU. I'm excited to be one of your Co-Chairs, Web Developers, and Workshop Hosts for Try/CATCH 2025! Since 2022, I've been teaching coding with organizations like Code Ninjas and SFU Science Alive, as well as leading workshops at hackathons and outreach events on topics from robotics to web development. Last summer, I completed AI4Good Lab, a 7-week AI/ML bootcamp where I built and presented a machine learning project in Montreal. That experience opened my eyes to the endless possibilities of AI/ML and I can't wait to share this passion with you through our Machine Learning workshop! Outside of coding, I love playing guitar, engaging in multimedia, and doing anything with friends (badminton, karaoke, board/card games, ROBLOX, really anything!)."
        }
      ]
    },
    {
      title: "Game Dev Workshop",
      description: "Discover what makes apps and websites intuitive and beautiful! Learn the principles of user interface and user experience design through practical exercises. Using design tools like Figma, you'll create wireframes, prototypes, and visual designs for a mobile app. Perfect for creative thinkers who want to understand how to design technology that people love to use.",
      hosts: [
        {
          img: joyce,
          name: "Joyce Zhang",
          blurb: "Joyce is a 5th-year Computing Science student and an executive of SFU's Game Developers Club. Her love for games as a form of storytelling began in high school after playing Papers, Please and _Celeste + many other titles. She eventually began running beginner-friendly GameMaker workshops for her high school's coding club and has since continued creating her own projects in her free time. Joyce is excited to meet fellow developers and share the medium that first sparked her passion for programming."
        },
        {
          img: peter,
          name: "Peter Soava",
          blurb: "Peter is a fourth-year Software Systems student at SFU and Vice President of the Game Development Club! Ever since pre-school he's been playing games, and in high school he learned the skills to program them to life. Beyond the virtual realm, you can find him soaking in ear-ringing live music, scouring review sites for rad movies, and sipping loose leaf tea next to his two cats. Peter can't wait to have a great time meeting everyone at Try/Catch 2025!"
        },
        {
          img: horward,
          name: "Horward",
          blurb: "Hi! I'm a 4th year Software Systems student at SFU with skills in embedded programming, web development, circuit design, and audio/music production. I make robots for fun, and I spend my spare time contributing to open-source projects, improving my home theater and home automation system, and playing DoTA & LoL. I also attend many developer conferences in Vancouver. Say hi if you see me!"
        }
      ]
    }
  ];