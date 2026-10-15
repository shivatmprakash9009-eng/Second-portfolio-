// All copy and assets live here so the site can be edited in one place.

export const profile = {
  name: "Anurag",
  role: "Front-End Developer.",
  heroParagraph:
    "A self-taught front-end developer with 1+ years of industry-grade experience. I build modern, responsive, and user-friendly websites & web apps. I focus on clean, optimized code and efficient design, ensuring seamless experiences that align with business operations and strategic objectives.",
  aboutParagraphs: [
    "I'm a front-end developer who started out teaching myself HTML, CSS and JavaScript, and never stopped. Over time I have gone deep on modern JavaScript architectures, and I care about modular UI patterns that stay easy to maintain as products grow.",
    "I enjoy the details: smooth motion, accessible interactions and interfaces that feel quick. Away from the keyboard you'll find me out cycling, exploring the outdoors, or listening to high-fidelity music.",
  ],
};

export const navLinks = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Contact", href: "#contact", id: "contact" },
] as const;

export const images = {
  hero: "https://i.ibb.co/xt0GdQZx/aileenweifeng-lol-2553537.jpg",
  project1: "https://i.ibb.co/zTPY8sXp/jdpereiro-office-space-1744805.jpg",
  project2: "https://i.ibb.co/m5GhB3Bs/pexels-chairs-2181951.jpg",
  project3: "https://i.ibb.co/nqw59ZcJ/pexels-chairs-2181960.jpg",
} as const;

export type Skill = { label: string; short: string; color: string };

export const skills: Skill[] = [
  { label: "HTML5", short: "H5", color: "#ff7a3d" },
  { label: "CSS3", short: "C3", color: "#3da9ff" },
  { label: "JavaScript (ES6+)", short: "JS", color: "#ffd93d" },
  { label: "React.js", short: "Re", color: "#61dafb" },
  { label: "Next.js", short: "Nx", color: "#ffffff" },
  { label: "Git / GitHub", short: "Git", color: "#ff6b57" },
  { label: "GSAP", short: "GS", color: "#88ce02" },
  { label: "Framer Motion", short: "Fm", color: "#e100ff" },
  { label: "Tailwind CSS", short: "Tw", color: "#38bdf8" },
];

export type Project = {
  title: string;
  description: string;
  stack: string[];
  image: string;
  github: string;
  live: string;
  tint?: boolean;
};

const projectDescription =
  "A premium full-stack web application designed for visualizing personalized Spotify analytics data. View your top performing artists, tracks played, recently played queue metrics, and detailed audio analysis features for every track. Create, modify, and save brand new custom playlists of recommended tracks compiled algorithmically based on your existing user playlist data.";

const projectStack = ["Next.js", "Spotify API", "Tailwind CSS", "GSAP", "Zustand"];

export const projects: Project[] = [
  {
    title: "Example Project",
    description: projectDescription,
    stack: projectStack,
    image: images.project1,
    github: "https://github.com",
    live: "#",
  },
  {
    title: "Example Project",
    description: projectDescription,
    stack: projectStack,
    image: images.project2,
    github: "https://github.com",
    live: "#",
  },
  {
    title: "Example Project",
    description: projectDescription,
    stack: projectStack,
    image: images.project3,
    github: "https://github.com",
    live: "#",
  },
  {
    title: "Example Project",
    description: projectDescription,
    stack: projectStack,
    image: images.project1,
    github: "https://github.com",
    live: "#",
    tint: true,
  },
];

export const contact = {
  heading: "Drop me a message",
  phone: "+91 9876543210",
  email: "anurag@example.com",
  location: "123 Street, City, 146001, Bihar, India",
};

export const socials = [
  { label: "GitHub", href: "https://github.com" },
  { label: "Twitter / X", href: "https://x.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
] as const;
