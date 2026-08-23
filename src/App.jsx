import { useEffect, useState } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaVuejs,
  FaPhp,
  FaLaravel,
  FaBootstrap,
  FaChevronRight,
  FaArrowRight,
  FaGithub,
} from "react-icons/fa";
import { FaBluesky, FaXTwitter } from "react-icons/fa6";
import { SiTailwindcss, SiMysql } from "react-icons/si";
import { TbBrandAdobeIllustrator } from "react-icons/tb";
import LoveCarLogo from "./images/lovecar.webp";
import ZoGenLogo from "./images/zogenealogy.png";
import C2CLogo from "./images/call2clean.jpg";
import OISLogo from "./images/logo.png";
import MovieLogo from "./images/movie.png";
import WeatherLogo from "./images/weather.png";
import AALSLogo from "./images/logo.jpg";
import { HiOutlineBriefcase } from "react-icons/hi";
import { FaGooglePlay, FaApple, FaGlobe } from "react-icons/fa";
// import Resume from "/HsuNadiKyawResume.pdf";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import laptopLottie from "./animations/Laptop.lottie?url";

function Container({ children }) {
  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

function Navbar() {
  const links = ["About", "Experience", "Projects", "Skills", "Contact"];
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      let current = "";
      links.forEach((link) => {
        const section = document.getElementById(link.toLowerCase());
        if (section && section.getBoundingClientRect().top <= 150) {
          current = link;
        }
      });
      setActive(current);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = (link) => {
    setActive(link);

    const section = document.getElementById(link.toLowerCase());
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur text-stone-300 shadow-lg">
      <Container>
        <div className="flex justify-center py-5 space-x-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => handleScroll(link)}
              className={`font-bold text-sm tracking-wide transition
              ${active === link ? "text-purple-400" : "hover:text-purple-400"}`}
            >
              {link}
            </button>
          ))}
        </div>
      </Container>
    </nav>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="py-24 text-stone-300 scroll-mt-20">
      <Container>
        {title && (
          <h2 className="text-3xl font-bold text-stone-200 text-center mb-12">
            {title}
          </h2>
        )}
        {children}
      </Container>
    </section>
  );
}

function Intro() {
  return (
    <section id="about" className="pt-60 pb-32 text-center text-stone-300">
      <Container>
        <h1 className="text-5xl sm:text-6xl font-bold text-stone-200 mt-6">
          Hey! , I am <span className="text-purple-500" >Hsu Nadi Kyaw</span>
        </h1>
        <p className="max-w-xl mx-auto text-stone-400 mt-6">
          I craft modern, responsive web applications and beautiful digital
          experiences using modern technologies.
        </p>
        <div className="flex justify-center gap-6 mt-8">
          <a
            href="https://drive.google.com/file/d/1y1mvJQGR1wR9A1HcwMv3GtF5WANiFeA-/view"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-6 py-3 bg-gradient-to-r from-purple-700 to-purple-900 rounded-full text-stone-200 hover:scale-105 transition">
              Resume
            </button>
          </a>
          <button
            onClick={() => {
              document
                .getElementById("contact")
                .scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 border border-purple-500 text-purple-400 rounded-full hover:bg-purple-600 hover:text-stone-200 transition"
          >
            Get in Touch
          </button>
        </div>
      </Container>
    </section>
  );
}

function About() {
  return (
    <Section title="About Me">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4 text-stone-400">
          <p>
            I'm a junior full-stack web developer passionate about building modern and responsive web applications. I work with React.js, Vue.js, PHP, Laravel to develop both frontend inerfaces and backend systems.
          </p>

          <p>
            I enjoy creating clean, user-friendly, and efficient websites while continuously improving my skills through real-world project. My focus is on building fast, scalable, and well-structured web applications following modern development practices.
          </p>

          {/* <p>
            As a developer, I like solving problems and building complete web soultions from frontend to backend while growing my experience in the tech industry.
          </p> */}
        </div>

        <div className="flex justify-center">
          <DotLottieReact
            src={laptopLottie}
            loop
            autoplay
            className="w-72 h-72"
          />
        </div>

      </div>
    </Section>
  );
}

// Expanded data structure with multiple roles and richer detail
const experiences = [
  {
    year: "2024 — Present",
    duration: "2024 — August",
    title: "Full-Stack Web Developer",
    company: "Ophir IT Solutions",
    type: "Full-time",
    location: "On-site / Hybrid",
    desc: "Architecting high-performance landing pages, dynamic dashboards, and full-stack web applications. Driving frontend performance optimization, API integration, and user-centric interface design.",
    points: [
      "Engineered scalable web applications using React, Vue.js, PHP, and Laravel, improving overall load efficiency and code maintainability.",
      "Designed and integrated robust RESTful APIs to ensure seamless frontend-backend data binding and dynamic state management.",
      "Developed complex, data-driven dashboards and admin management panels with real-time analytics and dynamic reporting views.",
      "Collaborated closely with cross-functional teams to translate UI/UX wireframes into responsive, pixel-perfect digital experiences.",
      "Implemented security best practices, form validation, and optimized client-side rendering for improved SEO and UX scores.",
    ],
    skills: ["React", "Vue.js", "Laravel", "PHP", "Tailwind CSS", "REST APIs", "Vite", "MySQL"],
  },
];

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Column: Section Header */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono font-semibold tracking-wider uppercase">
                <HiOutlineBriefcase className="w-4 h-4" /> Career Path
              </div>

              <h2 className="text-stone-100 text-4xl lg:text-5xl font-black tracking-tight leading-none">
                THE <br />
                <span
                  className="bg-gradient-to-r from-purple-400 via-pink-500 via-indigo-400 to-purple-400 bg-[length:200%_auto] bg-clip-text text-transparent"
                  style={{
                    animation: "moveGradient 4s linear infinite",
                  }}
                >
                  JOURNEY
                </span>
                <style>{`
    @keyframes moveGradient {
      0% { background-position: 0% center; }
      100% { background-position: 200% center; }
    }
  `}</style>
              </h2>

              <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
                A timeline of my professional roles, technical contributions, and the impact delivered across client and internal projects.
              </p>
            </div>
          </div>

          {/* Right Column: Experience Cards */}
          <div className="lg:col-span-8 space-y-8">
            {experiences.map((job, index) => (
              <div
                key={index}
                className="group relative p-px rounded-2xl bg-gradient-to-b from-purple-500/20 via-white/5 to-transparent transition-all duration-300 hover:from-purple-500/40"
              >
                <div className="bg-[#080808] rounded-2xl p-6 sm:p-8 md:p-10 border border-white/5 h-full transition-transform duration-300 group-hover:-translate-y-1">

                  {/* Top Metadata Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-white/5">
                    <div className="flex items-center gap-4">
                      {/* Logo Container */}
                      <div className="p-2.5 rounded-xl bg-stone-900 border border-white/10 w-14 h-14 flex items-center justify-center shrink-0">
                        {/* Replace with your logo variable or standard img */}
                        <img
                          src={OISLogo}
                          alt={`${job.company} Logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-stone-100 group-hover:text-purple-300 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-purple-400 font-medium text-sm sm:text-base">
                          {job.company}
                        </p>
                      </div>
                    </div>

                    {/* Date Tag */}
                    <div className="flex flex-col items-start sm:items-end">
                      <span className="text-xs font-mono font-semibold text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
                        {job.duration}
                      </span>
                      <span className="text-xs text-stone-500 font-medium mt-1">
                        {job.location} • {job.type}
                      </span>
                    </div>
                  </div>

                  {/* Summary Description */}
                  <p className="text-stone-300 text-base leading-relaxed mb-6 font-normal">
                    {job.desc}
                  </p>

                  {/* Key Achievements / Bullet Points */}
                  <div className="space-y-3 mb-8">
                    <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                      Key Responsibilities & Achievements
                    </p>
                    {job.points.map((point, i) => (
                      <div key={i} className="flex items-start gap-3 group/item">
                        <FaChevronRight className="mt-1 text-purple-500 shrink-0 group-hover/item:translate-x-1 transition-transform" size={11} />
                        <span className="text-stone-300 text-sm sm:text-base leading-snug group-hover/item:text-stone-100 transition-colors">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="pt-4 border-t border-white/5">
                    <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
                      Technologies Used
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs font-mono text-stone-300 bg-stone-900 border border-white/10 px-3 py-1 rounded-lg hover:border-purple-500/50 hover:text-purple-300 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </Section>
  );
}

// Map tag name -> icon. Add to this as your stack grows.
const tagIconMap = {
  Laravel: <FaLaravel size={12} className="text-red-500" />,
  "Vue.js": <FaVuejs size={12} className="text-green-500" />,
  "React.js": <FaReact size={12} className="text-cyan-400" />,
  Bootstrap: <FaBootstrap size={12} className="text-purple-500" />,
  Mysql: <SiMysql size={12} className="text-blue-400" />,
  MySQL: <SiMysql size={12} className="text-blue-400" />,
  Tailwind: <SiTailwindcss size={12} className="text-sky-400" />,
  PHP: <FaPhp size={12} className="text-indigo-400" />,
  HTML: <FaHtml5 size={12} className="text-orange-500" />,
  CSS: <FaCss3Alt size={12} className="text-blue-500" />,
  JavaScript: <FaJs size={12} className="text-yellow-400" />,
};

function TagBadge({ tag }) {
  const icon = tagIconMap[tag];
  return (
    <span
      title={tag}
      className="flex items-center justify-center w-6 h-6 bg-white/[0.03] border border-white/[0.06] rounded text-stone-400"
    >
      {icon ? icon : <span className="text-[9px] font-mono">{tag.slice(0, 2)}</span>}
    </span>
  );
}

function Projects() {
  const [showAll, setShowAll] = useState(false);
  const projects = [
    {
      title: "Love Car",
      image: LoveCarLogo,
      description:
        "Streamlined the vehicle browsing experience by building a custom REST API and database. Focused on high-performance UI rendering using Vue.js and ensuring cross-device compatibility with Bootstrap.",
      tags: ["Laravel", "Vue.js", "Bootstrap", "Mysql"],
      type: "mobile",
      playStore: "https://play.google.com/store/search?q=lovecar&c=apps&hl=en",
      appStore: "https://apps.apple.com/us/iphone/search?term=lovecar",
      github: "#",
    },
    {
      title: "Car Business Management System",
      image: LoveCarLogo,
      description:
        "Streamlined the vehicle browsing experience by building a custom REST API and database. Focused on high-performance UI rendering using Vue.js and ensuring cross-device compatibility with Bootstrap.",
      tags: ["Laravel", "Vue.js", "Bootstrap", "Mysql"],
      type: "mobile",
      live: "https://play.google.com/store/search?q=lovecar&c=apps&hl=en",
      github: "#",
    },
    {
      title: "Zo Genealogy",
      image: ZoGenLogo,
      description:
        "A cultural heritage platform for the Chin people, enabling users to create and search generational family chains. Developed the full-stack flow including dashboard API endpoints, search logic, and a responsive React-based interface.",
      tags: ["Laravel", "React.js", "Tailwind", "Mysql"],
      type: "web",
      live: "https://zogenealogy.org/",
      github: "#",
    },
    {
      title: "AALS",
      image: AALSLogo,
      description:
        "A professional service platform featuring a detailed UI designed to showcase comprehensive janitorial solutions. Focused on creating a structured, multi-component layout that enhances brand trust and user engagement.",
      tags: ["React.js", "Tailwind"],
      type: "web",
      live: "https://aals.aungacademylanguageschool.com/",
      github: "#",
    },
    {
      title: "Call2Clean",
      image: C2CLogo,
      description:
        "A professional service platform featuring a detailed UI designed to showcase comprehensive janitorial solutions. Focused on creating a structured, multi-component layout that enhances brand trust and user engagement.",
      tags: ["React.js", "Tailwind"],
      type: "web",
      live: "https://www.call2cleanservices.com/",
      github: "#",
    },
    {
      title: "Ophir IT Solutions",
      image: OISLogo,
      description:
        "The official digital profile for an IT solutions firm. Built with a clean and modern aesthetic, focusing on a high-performance minimalist UI to present corporate information and service offerings clearly.",
      tags: ["React.js", "Tailwind"],
      type: "web",
      live: "https://ophir-itsolutions.com/",
      github: "#",
    },
    {
      title: "Weather App",
      image: WeatherLogo,
      description:
        "The official digital profile for an IT solutions firm. Built with a clean and modern aesthetic, focusing on a high-performance minimalist UI to present corporate information and service offerings clearly.",
      tags: ["React.js", "Tailwind"],
      type: "web",
      live: "https://weatherforecastcountry.netlify.app/",
      github: "https://github.com/misu05-dev/weather",
    },
    {
      title: "MoviesSeed",
      image: MovieLogo,
      description:
        "The official digital profile for an IT solutions firm. Built with a clean and modern aesthetic, focusing on a high-performance minimalist UI to present corporate information and service offerings clearly.",
      tags: ["React.js", "Tailwind"],
      type: "web",
      live: "https://moviesseed.netlify.app/",
      github: "https://github.com/misu05-dev/movieseed",
    },
  ];

  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <section id="projects" className="py-16 bg-black scroll-mt-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-stone-200 text-4xl font-bold tracking-tight">
            Projects
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {visibleProjects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-[#09090b] border border-white/[0.06] rounded-xl p-6 transition-all duration-300 hover:border-white/[0.12] hover:bg-[#0e0e11] hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                      <img src={project.image} alt={project.title} />
                    </div>
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {project.tags.map((tag, i) => (
                        <TagBadge key={i} tag={tag} />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-stone-200 text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-stone-400 text-xs leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/[0.05] pt-4 mt-auto">
                  {/* {project.github && project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[11px] font-medium text-stone-400 hover:text-stone-200 transition-colors"
                    >
                      <FaGithub size={14} /> GitHub
                    </a>
                  )} */}

                  {project.type === "mobile" ? (
                    <div className="flex items-center gap-3 ml-auto">
                      {project.playStore && (
                        <a
                          href={project.playStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Get it on Google Play"
                          className="text-stone-400 hover:text-purple-400 transition-colors"
                        >
                          <FaGooglePlay size={16} />
                        </a>
                      )}
                      {project.appStore ? (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Get it on the App Store"
                          className="text-stone-400 hover:text-purple-400 transition-colors"
                        >
                          <FaApple size={17} />
                        </a>
                      ) : (
                        <span title="Not on the App Store" className="text-stone-700">
                          <FaApple size={17} />
                        </span>
                      )}
                    </div>
                  ) : (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[11px] font-bold text-purple-400 hover:text-purple-200 transition-colors group/link ml-auto"
                    >
                      <FaGlobe size={13} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length > 4 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2 rounded-full border border-purple-500/50 text-purple-400 text-sm font-medium hover:bg-purple-500/10 transition-all active:scale-95"
            >
              {showAll ? "Show Less" : "View All Projects"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Skills() {
  const skills = [
    { name: "HTML", icon: <FaHtml5 size={32} className="text-orange-500" /> },
    { name: "CSS", icon: <FaCss3Alt size={32} className="text-blue-500" /> },
    {
      name: "JavaScript",
      icon: <FaJs size={32} className="text-yellow-400" />,
    },
    { name: "React.js", icon: <FaReact size={32} className="text-cyan-400" /> },
    { name: "Vue.js", icon: <FaVuejs size={32} className="text-green-500" /> },
    { name: "Laravel", icon: <FaLaravel size={32} className="text-red-500" /> },
    { name: "PHP", icon: <FaPhp size={32} className="text-indigo-400" /> },
    { name: "MySQL", icon: <SiMysql size={32} className="text-blue-400" /> },
    {
      name: "Tailwind",
      icon: <SiTailwindcss size={32} className="text-sky-400" />,
    },
    {
      name: "Bootstrap",
      icon: <FaBootstrap size={32} className="text-purple-500" />,
    },
    {
      name: "Adobe Illustrator",
      icon: <TbBrandAdobeIllustrator size={32} className="text-orange-400" />,
    },
  ];

  return (
    <Section id="skills" title="Skills & Technologies">
      <div className="flex justify-center">
        <div className="relative group max-w-5xl w-full">
          <div className="grid grid-cols-5 gap-4 mb-6 px-4">
            {skills.map((skill, index) => (
              <div key={index} className="text-center">
                <span className="text-stone-400 text-xs font-bold tracking-[0.2em] pb-1 px-4">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>

          <div className="relative border border-purple-400 rounded-2xl p-10 bg-black/20 overflow-hidden">
            <div className="relative overflow-hidden w-full">
              <div
                className="flex gap-12 animate-marquee whitespace-nowrap w-max hover:[animation-play-state:paused]"
                style={{ animationDuration: "25s" }}
              >
                {[...skills, ...skills].map((skill, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center min-w-[80px] flex-shrink-0 transition-transform duration-300 hover:scale-110"
                  >
                    <div className="mb-2">{skill.icon}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" title="Get In Touch">
      <div className="mt-5 flex flex-col items-center">
        <p className="text-stone-500 text-sm tracking-widest mb-5">
          Want more about me?
        </p>

        <div className="flex items-center gap-10">
          <ContactLink
            href="https://github.com/misu05-dev"
            icon={<FaGithub size={28} />}
            label="GitHub"
          />
          <ContactLink
            href="https://x.com/Shie325"
            icon={<FaXTwitter size={28} />}
            label="X (Twitter)"
          />
          <ContactLink
            href="https://bsky.app/profile/su--e.bsky.social"
            icon={<FaBluesky size={28} />}
            label="Bluesky"
          />
        </div>
      </div>
    </Section>
  );
}

const ContactLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="relative text-zinc-400 hover:text-purple-400 transition-all duration-300 hover:scale-110"
  >
    {icon}
  </a>
);

function Footer() {
  return (
    <footer className="py-6 border-t border-white/5 text-center">
      <p className="text-zinc-600 text-sm font-mono ">
        © {new Date().getFullYear()} — Crafted by Su
      </p>
    </footer>
  );
}

export default function App() {
  return (
    <div className="bg-black min-h-screen font-sans scroll-smooth">
      <Navbar />
      <Intro />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}
