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



function useIsMobile(query = "(max-width: 768px)") {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);
    setIsMobile(media.matches);

    const listener = () => setIsMobile(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return isMobile;
}

export default function Projects() {
  const sceneRef = useRef(null);
  const isMobile = useIsMobile();

  const projects = [
  {
    title: "IIT Roorkee — Virtual Lab",
    link: "https://github.com/Khushi-singhal8/VIRTUAL-LAB-",
    bgColor: "#0f172a",
    image: "/image1.png"
  },
  {
    title: "Plant Disease Detector",
    link: "https://github.com/Khushi-singhal8/plant-disease-detector",
    bgColor: "#111827",
    image: "/image2.png"
  }
];

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
      className="relative text-white bg-black"
      style={{
        height: `${projects.length * 100}vh`
      }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

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

            <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[65vh] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <div className="mt-6 text-center">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-white text-black rounded-full font-medium hover:scale-105 transition"
              >
                {index === projects.length - 1 ? "Follow on GitHub" : "View on GitHub"}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
