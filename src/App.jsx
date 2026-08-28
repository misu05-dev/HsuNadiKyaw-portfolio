import { useEffect, useRef, useState } from "react";
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
  FaFigma,
  FaEnvelope, FaPaperPlane, FaSpinner, FaCheckCircle, FaExclamationCircle, FaGooglePlay, FaApple, FaGlobe, FaAppStoreIos, FaDocker
} from "react-icons/fa";
import { FaBluesky, FaXTwitter } from "react-icons/fa6";
import { SiTailwindcss, SiMysql, SiPostgresql, SiPostman, SiBruno, SiSocketdotio, SiMongodb } from "react-icons/si";
import { TbBrandAdobeIllustrator } from "react-icons/tb";
import LoveCarLogo from "./images/lovecar.webp";
import ZoGenLogo from "./images/zogenealogy.png";
import C2CLogo from "./images/call2clean.jpg";
import OISLogo from "./images/logo.png";
import MovieLogo from "./images/movie.png";
import WeatherLogo from "./images/weather.png";
import AALSLogo from "./images/logo.jpg";
import { HiOutlineBriefcase } from "react-icons/hi"
import Lottie from "lottie-react";
import girlSitting from "./animations/girl-sitting.json";
import ParticleText from "./animations/ParticleText";

function Container({ children }) {
  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

function Navbar() {
  const links = ["About", "Skills", "Experience", "Projects", "Contact"];
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
        <div className="flex justify-center overflow-x-auto no-scrollbar py-3 sm:py-5 gap-3 sm:gap-0 sm:space-x-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => handleScroll(link)}
              className={`shrink-0 whitespace-nowrap font-bold text-xs sm:text-sm tracking-wide transition
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
    <section id={id} className="py-16 md:py-24 text-stone-300 scroll-mt-20">
      <Container>
        {title && (
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-200 text-center mb-8 md:mb-12">
            {title}
          </h2>
        )}
        {children}
      </Container>
    </section>
  );
}

function Intro() {
  const aboutRef = useRef(null);
  const [showSpotlight, setShowSpotlight] = useState(false);

  useEffect(() => {
    const section = aboutRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset animation
          setShowSpotlight(false);

          // Start animation again
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setShowSpotlight(true);
            });
          });
        } else {
          // Reset when leaving the section
          setShowSpotlight(false);
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={aboutRef}
      id="about"
      className="relative pt-32 pb-20 md:pt-60 md:pb-32 text-center text-stone-300 overflow-hidden"
    >
      {/* Spotlight */}
      {/* <div
        className={`pointer-events-none absolute -top-40 left-3/5 -translate-x-1/2 w-[500px] h-[500px] spotlight-beam ${
          showSpotlight ? "show" : ""
        }`}
      /> */}

      <Container>
        <h1 className="relative z-10 text-3xl sm:text-5xl md:text-6xl font-bold text-stone-200 mt-6 flex flex-wrap items-center justify-center gap-2">
          Hey! I am

          <ParticleText
            text="Hsu Nadi Kyaw"
            particleColor="#c084fc"
            fontSizes={{ base: 38, sm: 48, md: 60 }}
            className=""
          />
        </h1>

        <p className="relative z-10 max-w-xl mx-auto text-stone-400 mt-6 px-2 text-sm sm:text-base">
          I craft modern, responsive web applications and beautiful digital
          experiences using modern technologies.
        </p>

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 px-4">
          <a
            href="https://drive.google.com/file/d/1_CJlfbBoIb-TIMc5IdsQDDl3UuOPg9br/view"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-700 to-purple-900 rounded-full text-stone-200 hover:scale-105 transition">
              Resume
            </button>
          </a>

          <button
            onClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto px-6 py-3 border border-purple-500 text-purple-400 rounded-full hover:bg-purple-600 hover:text-stone-200 transition"
          >
            Get in Touch
          </button>
        </div>
      </Container>
    </section>
  );
}

function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setInView(true));
          });
        } else {
          setInView(false);
        }
      },
      { threshold, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function Reveal({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
    >
      {children}
    </div>
  );
}

function About() {
  return (
    <Section id="about">
      {/* Section Heading */}
      <div className="flex flex-col items-center mb-8 md:mb-10">
        <h2 className="text-stone-200 text-3xl sm:text-4xl font-bold tracking-tight">
          About Me
        </h2>
        {/* <div className="mt-4 w-12 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" /> */}
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Background Glow */}
        <div className="pointer-events-none absolute -top-20 left-1/4 w-70 h-72 rounded-full bg-purple-500/10 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-pink-500/10 blur-[100px]" />

        <div className="relative grid lg:grid-cols-2 gap-6 md:gap-8 items-center">

          {/* LEFT — Visual */}
          <Reveal delay={150}>
            <div className="relative">
              <div className="relative rounded-3xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-xl p-5 sm:p-6 md:p-8 overflow-hidden">

                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-purple-500/[0.08] to-transparent pointer-events-none" />

                {/* Decorative circles */}
                <div className="absolute top-6 left-6 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
                <div className="absolute top-6 left-10 w-2 h-2 rounded-full bg-pink-400 shadow-[0_0_12px_rgba(236,72,153,0.7)]" />

                {/* Smaller Lottie */}
                <div className="flex justify-center items-center min-h-[220px] sm:min-h-[280px] md:min-h-[340px]">
                  <Lottie
                    animationData={girlSitting}
                    loop
                    autoplay
                    className="w-[220px] sm:w-[260px] md:w-[320px] lg:w-[360px]"
                  />
                </div>

                {/* Bottom label */}
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500">
                    Full-Stack Developer
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT — Content */}
          <div className="space-y-5 md:space-y-7">

            <Reveal delay={300}>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-stone-100 leading-tight">
                  Full-stack developer focused on building
                  <span className="text-purple-400">
                    {" "}modern and reliable web applications.
                  </span>
                </h3>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="space-y-4 text-stone-400 text-sm sm:text-base leading-relaxed">
                <p>
                  I’m a full-stack web developer with a strong focus on
                  building responsive interfaces, robust backend systems, and
                  seamless user experiences. I enjoy working across the
                  application stack, from designing intuitive interfaces to
                  developing reliable server-side functionality.
                </p>

                <p>
                  I approach each project with an emphasis on clean
                  architecture, maintainable code, and practical solutions.
                  I’m continuously improving my skills and exploring better
                  ways to build scalable, efficient, and user-focused
                  applications.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}

// Expanded data structure with multiple roles and richer detail
const experiences = [
  {
    year: "March 2024 — August 2026",
    duration: "March 2024 — August 2026",
    title: "Full-Stack Web Developer",
    company: "Ophir IT Solutions",
    type: "Full-time",
    location: "On-site / Hybrid",
    desc: "Architecting high-performance landing pages, dynamic dashboards, and full-stack web applications.  Developing responsive and user-friendly web applications with a focus on frontend performance, API integration, and seamless user experiences.",
    points: [
      "Engineered scalable web applications using React, Vue.js, PHP, and Laravel, improving overall load efficiency and code maintainability.",
      "Designed and integrated robust RESTful APIs to ensure seamless frontend-backend data binding and dynamic state management.",
      "Developed complex, data-driven dashboards and admin management panels with real-time analytics and dynamic reporting views.",
      "Collaborated closely with cross-functional teams to translate UI/UX wireframes into responsive, pixel-perfect digital experiences.",
      "Implemented security best practices and form validation while optimizing frontend performance to improve application speed and user experience.",
    ],
    skills: ["React", "Vue.js", "Laravel", "PHP", "Tailwind CSS", "REST APIs", "Vite", "MySQL"],
  },
];

export function Experience() {
  return (
    <Section id="experience">
      <div className="flex flex-col items-center mb-8 md:mb-10">
        <h2 className="text-stone-200 text-3xl sm:text-4xl font-bold tracking-tight">
          Experience
        </h2>
      </div>
      <div className="max-w-6xl mx-auto px-0 sm:px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">

          {/* Left Column: Section Header */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono font-semibold tracking-wider uppercase">
                <HiOutlineBriefcase className="w-4 h-4" /> Career Path
              </div>

              <h2 className="text-stone-100 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none">
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
                <div className="bg-[#080808] rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10 border border-white/5 h-full transition-transform duration-300 group-hover:-translate-y-1">

                  {/* Top Metadata Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-white/5">
                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* Logo Container */}
                      <div className="p-2 sm:p-2.5 rounded-xl bg-stone-900 border border-white/10 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shrink-0">
                        {/* Replace with your logo variable or standard img */}
                        <img
                          src={OISLogo}
                          alt={`${job.company} Logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-stone-100 group-hover:text-purple-300 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-purple-400 font-medium text-xs sm:text-sm md:text-base">
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
                  <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
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
  Laravel: <FaLaravel size={18} className="text-red-500" />,
  "Vue.js": <FaVuejs size={18} className="text-green-500" />,
  "React.js": <FaReact size={18} className="text-cyan-400" />,
  Bootstrap: <FaBootstrap size={18} className="text-purple-500" />,
  Mysql: <SiMysql size={18} className="text-blue-400" />,
  Tailwind: <SiTailwindcss size={18} className="text-sky-400" />,
  PHP: <FaPhp size={18} className="text-indigo-400" />,
  HTML: <FaHtml5 size={18} className="text-orange-500" />,
  CSS: <FaCss3Alt size={18} className="text-blue-500" />,
  JavaScript: <FaJs size={18} className="text-yellow-400" />,
};

function TagBadge({ tag }) {
  const icon = tagIconMap[tag];
  return (
    <span
      title={tag}
      className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-white/[0.03] border border-white/[0.06] rounded text-stone-400"
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
      appStore: "https://apps.apple.com/us/app/love-car/id6739915707",
      github: "#",
    },
    {
      title: "Car Business Management System",
      image: LoveCarLogo,
      description:
        "Streamlined the vehicle browsing experience by building a custom REST API and database. Focused on high-performance UI rendering using Vue.js and ensuring cross-device compatibility with Bootstrap.",
      tags: ["Laravel", "Vue.js", "Bootstrap", "Mysql"],
      // type: "mobile",
      // live: "#",
      // github: "#",
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
    <section id="projects" className="py-16 md:py-24 bg-black scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center mb-8 md:mb-10">
          <h2 className="text-stone-200 text-3xl sm:text-4xl font-bold tracking-tight">
            Projects
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {visibleProjects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-[#09090b] border border-white/[0.06] rounded-xl p-5 sm:p-6 transition-all duration-300 hover:border-white/[0.12] hover:bg-[#0e0e11] hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden shrink-0">
                      <img src={project.image} alt={project.title} />
                    </div>
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {project.tags.map((tag, i) => (
                        <TagBadge key={i} tag={tag} />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg text-stone-200 font-semibold mb-2 group-hover:text-purple-400 transition-colors">
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
                          href={project.appStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Get it on the App Store"
                          className="text-stone-400 hover:text-purple-400 transition-colors"
                        >
                          <FaAppStoreIos size={17} />
                        </a>
                      ) : (
                        <span title="Not on the App Store" className="text-stone-700">
                          <FaAppStoreIos size={17} />
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
          <div className="mt-10 md:mt-12 flex justify-center">
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

function useBackdropStars(count = 55) {
  const [stars] = useState(() =>
    Array.from({ length: count }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.6 + 0.5,
      delay: Math.random() * 6,
      dur: 3 + Math.random() * 4,
    }))
  );
  return stars;
}

function Skills() {
  const [ref, inView] = useInView(0.15);
  const stars = useBackdropStars();

  const CLUSTERS = [
    {
      id: "frontend",
      label: "frontend",
      color: "#a78bfa",
      glow: "rgba(167,139,250,0.55)",
      hub: { x: 150, y: 120 },
      skills: [
        {
          name: "HTML",
          icon: <FaHtml5 size={20} className="text-orange-500" />,
          pos: { x: 255, y: 55 },
        },
        {
          name: "CSS",
          icon: <FaCss3Alt size={20} className="text-blue-500" />,
          pos: { x: 320, y: 105 },
        },
        {
          name: "JavaScript",
          icon: <FaJs size={20} className="text-yellow-400" />,
          pos: { x: 300, y: 190 },
        },
        {
          name: "React.js",
          icon: <FaReact size={20} className="text-cyan-400" />,
          pos: { x: 195, y: 225 },
        },
        {
          name: "Vue.js",
          icon: <FaVuejs size={20} className="text-green-500" />,
          pos: { x: 75, y: 210 },
        },
        {
          name: "Tailwind",
          icon: <SiTailwindcss size={20} className="text-sky-400" />,
          pos: { x: 30, y: 145 },
        },
        {
          name: "Bootstrap",
          icon: <FaBootstrap size={20} className="text-purple-400" />,
          pos: { x: 100, y: 55 },
        },
      ],
    },

    {
      id: "backend",
      label: "backend",
      color: "#f472b6",
      glow: "rgba(244,114,182,0.55)",
      hub: { x: 550, y: 245 },
      skills: [
        {
          name: "PHP",
          icon: <FaPhp size={20} className="text-pink-400" />,
          pos: { x: 625, y: 195 },
        },
        {
          name: "Laravel",
          icon: <FaLaravel size={20} className="text-red-500" />,
          pos: { x: 650, y: 275 },
        },
        {
          name: "MySQL",
          icon: <SiMysql size={20} className="text-pink-300" />,
          pos: { x: 595, y: 350 },
        },
        {
          name: "PostgreSQL",
          icon: <SiPostgresql size={20} className="text-fuchsia-300" />,
          pos: { x: 520, y: 340 },
        },
        {
          name: "Socket.io",
          icon: <SiSocketdotio size={20} className="text-rose-300" />,
          pos: { x: 465, y: 285 },
        },
        {
          name: "MongoDB",
          icon: <SiMongodb size={20} className="text-pink-200" />,
          pos: { x: 520, y: 195 },
        },
      ],
    },
    {
      id: "tools",
      label: "tools & design",
      color: "#fbbf24",
      glow: "rgba(251,191,36,0.55)",

      hub: { x: 310, y: 360 },

      skills: [
        {
          name: "Adobe Illustrator",
          icon: (
            <TbBrandAdobeIllustrator
              size={20}
              className="text-amber-400"
            />
          ),
          pos: { x: 375, y: 295 },
        },
        {
          name: "GitHub",
          icon: <FaGithub size={20} className="text-zinc-200" />,
          pos: { x: 445, y: 355 },
        },
        {
          name: "Docker",
          icon: <FaDocker size={20} className="text-sky-400" />,
          pos: { x: 420, y: 425 },
        },
        {
          name: "Bruno",
          icon: <SiBruno size={20} className="text-yellow-300" />,
          pos: { x: 275, y: 455 },
        },
        {
          name: "Postman",
          icon: <SiPostman size={20} className="text-orange-400" />,
          pos: { x: 190, y: 410 },
        },
        {
          name: "Figma",
          icon: <FaFigma size={20} className="text-pink-400" />,
          pos: { x: 200, y: 310 },
        },
      ],
    },
  ];

  const HUB_LINKS = [
    [CLUSTERS[0].hub, CLUSTERS[1].hub],
    [CLUSTERS[1].hub, CLUSTERS[2].hub],
  ];

  let clock = 0;
  const timeline = CLUSTERS.map((cluster) => {
    const hubDelay = clock;
    clock += 260;
    const skillDelays = cluster.skills.map(() => {
      const d = clock;
      clock += 170;
      return d;
    });
    return { hubDelay, skillDelays };
  });
  const totalDuration = clock;

  return (
    <Section id="skills">
      <div className="flex flex-col items-center mb-8 md:mb-10">
        <h2 className="text-stone-200 text-3xl sm:text-4xl font-bold tracking-tight">
          Skills
        </h2>
      </div>
      <style>{`
        @keyframes gx-twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.9; }
        }
        @keyframes gx-drift {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(6px, -8px) rotate(0.4deg); }
          100% { transform: translate(0px, 0px) rotate(0deg); }
        }
        @keyframes gx-pulse {
          0%, 100% { box-shadow: 0 0 0 0 var(--gx-glow); }
          50% { box-shadow: 0 0 16px 4px var(--gx-glow); }
        }
        @media (prefers-reduced-motion: reduce) {
          .gx-drift, .gx-star { animation: none !important; }
        }
        .gx-drift { animation: gx-drift 22s ease-in-out infinite; }
        .gx-star { animation: gx-twinkle 4s ease-in-out infinite; }
      `}</style>

      <div className="relative max-w-4xl mx-auto -mt-4 md:-mt-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-pink-500/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full bg-amber-500/5 blur-3xl" />
        </div>

        <div
          ref={ref}
          className="relative w-full gx-drift"
          style={{ aspectRatio: "700 / 460" }}
        >
          <svg viewBox="0 0 700 460" className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
            {stars.map((s, i) => (
              <circle
                key={`bg-${i}`}
                cx={`${s.x}%`}
                cy={`${s.y}%`}
                r={s.size}
                fill="#ffffff"
                className="gx-star"
                style={{ animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s` }}
              />
            ))}

            {HUB_LINKS.map(([a, b], i) => (
              <line
                key={`hublink-${i}`}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke="#ffffff"
                strokeOpacity={inView ? 0.12 : 0}
                strokeWidth={1}
                strokeDasharray="2 6"
                style={{ transition: `stroke-opacity 900ms ease ${totalDuration}ms` }}
              />
            ))}

            {CLUSTERS.map((cluster, ci) =>
              cluster.skills.map((skill, si) => {
                const delay = timeline[ci].skillDelays[si];
                const length = Math.hypot(cluster.hub.x - skill.pos.x, cluster.hub.y - skill.pos.y);
                return (
                  <line
                    key={`${cluster.id}-line-${si}`}
                    x1={cluster.hub.x} y1={cluster.hub.y}
                    x2={skill.pos.x} y2={skill.pos.y}
                    stroke={cluster.color}
                    strokeWidth={1}
                    strokeDasharray={length}
                    strokeDashoffset={inView ? 0 : length}
                    strokeOpacity={0.5}
                    style={{ transition: `stroke-dashoffset 650ms ease ${delay}ms` }}
                  />
                );
              })
            )}

            {CLUSTERS.map((cluster, ci) => (
              <circle key={`comet-${cluster.id}`} r="2.5" fill={cluster.color} opacity={inView ? 0.9 : 0}>
                <animateMotion
                  dur="3.4s"
                  begin={`${(totalDuration + ci * 400) / 1000}s`}
                  repeatCount="indefinite"
                  path={`M${cluster.hub.x},${cluster.hub.y} L${cluster.skills[0].pos.x},${cluster.skills[0].pos.y}`}
                />
              </circle>
            ))}
          </svg>

          {CLUSTERS.map((cluster, ci) => {
            const delay = timeline[ci].hubDelay;
            return (
              <div
                key={cluster.id}
                className="absolute flex items-center gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border backdrop-blur-sm transition-all duration-500 ease-out"
                style={{
                  left: `${(cluster.hub.x / 700) * 100}%`,
                  top: `${(cluster.hub.y / 460) * 100}%`,
                  background: "rgba(255,255,255,0.06)",
                  borderColor: `${cluster.color}55`,
                  opacity: inView ? 1 : 0,
                  transform: `translate(-50%, -50%) scale(${inView ? 1 : 0.6})`,
                  transitionDelay: `${delay}ms`,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: cluster.color, boxShadow: `0 0 8px ${cluster.color}` }} />
                <span className="text-[9px] sm:text-[11px] font-mono tracking-wide text-stone-100 whitespace-nowrap">
                  {cluster.label}
                </span>
              </div>
            );
          })}

          {CLUSTERS.map((cluster, ci) =>
            cluster.skills.map((skill, si) => {
              const delay = timeline[ci].skillDelays[si];
              return (
                <div
                  key={`${cluster.id}-node-${si}`}
                  className="absolute group"
                  style={{
                    left: `${(skill.pos.x / 700) * 100}%`,
                    top: `${(skill.pos.y / 460) * 100}%`,
                    opacity: inView ? 1 : 0,
                    transform: `translate(-50%, -50%) scale(${inView ? 1 : 0.3})`,
                    transition: `opacity 450ms ease ${delay}ms, transform 450ms cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-full bg-stone-900 border w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-125 cursor-default"
                    style={{
                      borderColor: `${cluster.color}66`,
                      ["--gx-glow"]: cluster.glow,
                      animation: inView ? "gx-pulse 3.2s ease-in-out infinite" : "none",
                      animationDelay: `${delay + 300}ms`,
                    }}
                  >
                    {skill.icon}
                  </div>
                  <span className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 text-[10px] font-medium text-stone-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {skill.name}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Section>
  );
}

const CONTACT_EMAIL = "hsunadikyaw.hndk@gmail.com";

function GlassCard({ children, className = "" }) {
  return (
    <div
      className={
        "relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl " +
        "shadow-[0_8px_32px_rgba(0,0,0,0.35)] overflow-hidden " +
        className
      }
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.06] to-transparent" />

      <div className="relative">{children}</div>
    </div>
  );
}

function Field({ as = "input", ...props }) {
  const Tag = as;

  return (
    <Tag
      {...props}
      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3
                 text-sm text-stone-200 placeholder:text-stone-500
                 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.06]
                 transition"
    />
  );
}

function SpotlightCard({ children, className = "" }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ref.current.style.setProperty("--spot-x", `${x}px`);
    ref.current.style.setProperty("--spot-y", `${y}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(220px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255,255,255,0.12), transparent 70%)",
        }}
      />

      {children}
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  // idle | sending | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((f) => ({
      ...f,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.message.trim()
    ) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${CONTACT_EMAIL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            message: form.message,
            _subject: `New portfolio message from ${form.name}`,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <Section id="contact">
      <div className="flex flex-col items-center mb-8 md:mb-10">
        <h2 className="text-stone-200 text-3xl sm:text-4xl font-bold tracking-tight">
          Get In Touch
        </h2>
      </div>

      <p className="text-center text-stone-500 text-xs sm:text-sm tracking-widest mb-10 md:mb-12 px-4">
        Want to know more about me?
      </p>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">

        <SpotlightCard>
          <GlassCard className="p-6 sm:p-8 h-full flex flex-col">

            <h3 className="text-xl sm:text-2xl font-bold text-stone-100 mb-3">
              Let's build something great
            </h3>

            <p className="text-stone-400 text-sm leading-relaxed mb-8">
              Feel free to reach out. I'm always interested in discussing
              new ideas and opportunities.
            </p>

            <div className="space-y-6 mt-auto">

              {/* Email */}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-3 text-stone-300 hover:text-purple-400 transition text-xs sm:text-sm break-all"
              >
                <span
                  className="flex items-center justify-center w-9 h-9 shrink-0
                             rounded-lg bg-white/[0.05] border border-white/10"
                >
                  <FaEnvelope size={15} />
                </span>

                {CONTACT_EMAIL}
              </a>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-6 sm:gap-10 pt-2">

                <ContactLink
                  href="https://github.com/misu05-dev"
                  icon={<FaGithub size={22} />}
                  label="GitHub"
                />

                <ContactLink
                  href="https://x.com/Shie325"
                  icon={<FaXTwitter size={22} />}
                  label="X (Twitter)"
                />

                <ContactLink
                  href="https://bsky.app/profile/su--e.bsky.social"
                  icon={<FaBluesky size={22} />}
                  label="Bluesky"
                />

              </div>
            </div>
          </GlassCard>
        </SpotlightCard>

        <SpotlightCard>
          <GlassCard className="p-6 sm:p-8 h-full">

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* Name */}
              <Field
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
              />

              {/* Email */}
              <Field
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />

              {/* Message */}
              <Field
                as="textarea"
                name="message"
                rows={4}
                placeholder="Write your message..."
                value={form.message}
                onChange={handleChange}
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-6
                  py-3
                  rounded-xl
                  bg-gradient-to-r
                  from-purple-700
                  to-purple-900
                  text-stone-100
                  font-medium
                  hover:scale-[1.02]
                  active:scale-95
                  transition
                  disabled:opacity-60
                  disabled:hover:scale-100
                "
              >
                {status === "sending" ? (
                  <>
                    <FaSpinner
                      size={14}
                      className="animate-spin"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane size={13} />
                    Send Message
                  </>
                )}
              </button>

              {/* Success Message */}
              {status === "success" && (
                <p
                  className="
                    flex
                    items-center
                    gap-2
                    text-emerald-400
                    text-xs
                    pt-1
                  "
                >
                  <FaCheckCircle size={13} />

                  Message sent — thanks for reaching out!
                </p>
              )}

              {/* Error Message */}
              {status === "error" && (
                <p
                  className="
                    flex
                    items-center
                    gap-2
                    text-red-400
                    text-xs
                    pt-1
                  "
                >
                  <FaExclamationCircle size={13} />

                  Fill out every field, or try again in a moment.
                </p>
              )}

            </form>
          </GlassCard>
        </SpotlightCard>

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
    <footer className="py-6 border-t border-white/5 text-center px-4">
      <p className="text-zinc-600 text-xs sm:text-sm font-mono ">
        © {new Date().getFullYear()} — Crafted by Su
      </p>
    </footer>
  );
}

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const moveDot = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    let raf;
    const animateRing = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      raf = requestAnimationFrame(animateRing);
    };

    const growCursor = () => ringRef.current?.classList.add("scale-150", "border-purple-400");
    const shrinkCursor = () => ringRef.current?.classList.remove("scale-150", "border-purple-400");

    // Delegated listeners on document instead of querySelectorAll-once: this way
    // new links/buttons added later (e.g. "View All Projects" expanding the grid)
    // are picked up automatically, and we never lose track of an element that
    // unmounts mid-hover.
    const handleOver = (e) => {
      if (e.target instanceof Element && e.target.closest("a, button")) {
        growCursor();
      }
    };
    const handleOut = (e) => {
      const related = e.relatedTarget;
      const stillOnInteractive =
        related instanceof Element && related.closest("a, button");
      if (!stillOnInteractive) shrinkCursor();
    };

    window.addEventListener("mousemove", moveDot);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    animateRing();

    return () => {
      window.removeEventListener("mousemove", moveDot);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-purple-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-purple-500/50 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[transform,border-color] duration-200 ease-out hidden md:block"
      />
    </>
  );
}

export default function App() {
  return (
    <div className="bg-black min-h-screen font-sans scroll-smooth overflow-x-hidden">
      {/* <div className="bg-black min-h-screen font-sans scroll-smooth cursor-none md:cursor-none"> */}
      {/* <CustomCursor /> */}
      <Navbar />
      <Intro />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}