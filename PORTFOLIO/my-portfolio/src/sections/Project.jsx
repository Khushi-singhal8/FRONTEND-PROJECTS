import {
  useRef,
  useState,
  useMemo,
  useEffect
} from "react";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence
} from "framer-motion";

import img1 from "../assets/img1.JPG";
import img2 from "../assets/img2.JPG";
import img3 from "../assets/img3.JPG";

/* -------------------- */
/* Mobile Detection Hook */
/* -------------------- */

function useIsMobile(query = "(max-width: 768px)") {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(media.matches);

    const listener = () => setIsMobile(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return isMobile;
}

/* -------------------- */
/* Projects Component   */
/* -------------------- */

export default function Projects() {
  const sceneRef = useRef(null);
  const isMobile = useIsMobile();

  const projects = useMemo(() => [
    {
      title: "NK Studio",
      link: "https://nkstudio.com",
      bgColor: "#0f172a",
      image: img1
    },
    {
      title: "Gamify",
      link: "https://gamifyapp.com",
      bgColor: "#111827",
      image: img2
    },
    {
      title: "Hungry Tiger",
      link: "https://hungrytiger.com",
      bgColor: "#1e293b",
      image: img3
    }
  ], []);

  /* Scroll tracking */
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"]
  });

  const thresholds = projects.map((_, i) =>
    (i + 1) / projects.length
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const index = thresholds.findIndex(t => v < t);
    setActiveIndex(index === -1 ? projects.length - 1 : index);
  });

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white"
      style={{
        height: `${projects.length * 100}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 0.5s ease"
      }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

        {/* Title */}
        <h2 className="absolute top-10 text-3xl font-semibold tracking-wide">
          My Work
        </h2>

        {projects.map((project, index) => (
          <div
            key={project.title}
            className={`absolute w-[85%] max-w-300 transition-all duration-700 ${
              activeIndex === index
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          >
            <AnimatePresence mode="wait">
              {activeIndex === index && (
                <motion.h3
                  key={project.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.6 }}
                  className={`text-[clamp(2rem,6vw,4rem)] font-bold ${
                    isMobile ? "text-center mb-6" : "absolute top-10 left-0"
                  }`}
                >
                  {project.title}
                </motion.h3>
              )}
            </AnimatePresence>

            {/* Image Card */}
            <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[65vh] object-cover"
                loading="lazy"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
            </div>

            {/* Visit Button */}
            <div className="mt-6 text-center">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-white text-black rounded-full font-medium hover:scale-105 transition"
              >
                Visit Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}