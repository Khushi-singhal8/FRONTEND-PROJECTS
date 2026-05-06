import {
  useRef,
  useState,
  useMemo,
  useEffect
} from "react";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent
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

const experiences = [
  {
    role: "Frontend Developer Intern",
    company: "IIT Roorkee — Virtual Mechanical Labs",
    duration: "Sept 2023 – Present · Remote",
    description:
      "Built interactive 3D mechanical experiment simulations using Three.js. Designed responsive UIs with Bootstrap and advanced CSS. Wrote experiment theory and step-by-step procedure content to enhance student learning."
  },
  {
    role: "Frontend Developer — Freelance & Self-Directed Work",
    company: "Independent · Remote",
    duration: "2024 – 2025",
    description:
      "Worked on multiple self-directed web development projects, building fully functional frontend applications. Gained hands-on experience with React, REST API integration, responsive design, and browser-based AI using TensorFlow.js."
  },
  {
    role: "Open Source Contributor",
    company: "GitHub · Personal Repositories",
    duration: "2023 – Present",
    description:
      "Actively maintains public repositories on GitHub covering frontend projects, UI experiments, and web tools. Follows clean code practices, semantic commits, and responsive design principles across all projects."
  }
];

function ExperienceItem({
  exp,
  idx,
  start,
  end,
  scrollYProgress,
  layout
}) {
  const opacity = useTransform(
    scrollYProgress,
    [start, end],
    [0, 1]
  );

  const y = useTransform(
    scrollYProgress,
    [start, end],
    [40, 0]
  );

  if (layout === "desktop") {
    return (
      <div className="relative flex items-start">
        <motion.div
          className="absolute -left-3.5 top-2 w-3 h-3 rounded-full bg-white shadow"
          style={{ opacity }}
        />
        <motion.article
          style={{ opacity, y }}
          transition={{ duration: 0.4, delay: idx * 0.15 }}
          className="bg-gray-900/80 backdrop-blur border border-gray-700 rounded-xl p-6 shadow-lg w-125"
        >
          <h3 className="text-lg font-semibold">
            {exp.role}
          </h3>
          <p className="text-gray-400 text-sm">
            {exp.company}
          </p>
          <p className="text-gray-500 text-sm mb-2">
            {exp.duration}
          </p>
          <p className="text-gray-300 text-sm">
            {exp.description}
          </p>
        </motion.article>
      </div>
    );
  }

  return (
    <motion.article
      style={{ opacity, y }}
      transition={{ duration: 0.4 }}
      className="bg-gray-900/80 backdrop-blur border border-gray-700 rounded-xl p-5 shadow-lg"
    >
      <h3 className="text-lg font-semibold">
        {exp.role}
      </h3>
      <p className="text-gray-400 text-sm">
        {exp.company}
      </p>
      <p className="text-gray-500 text-sm mb-2">
        {exp.duration}
      </p>
      <p className="text-gray-300 text-sm">
        {exp.description}
      </p>
    </motion.article>
  );
}

export default function Experience() {
  const sceneRef = useRef(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"]
  });

  const thresholds = useMemo(
    () =>
      experiences.map(
        (_, i) => (i + 1) / experiences.length
      ),
    []
  );

  const lineSize = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  const SCENE_HEIGHT =
    isMobile
      ? 140 * experiences.length
      : 120 * experiences.length;

  return (
    <section
      id="experience"
      ref={sceneRef}
      className="relative bg-black text-white"
      style={{
        height: `${SCENE_HEIGHT}vh`
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6">

        <h2 className="text-4xl font-semibold mb-10 text-center">
          Experience
        </h2>

        {!isMobile && (
          <div className="relative w-full max-w-4xl">
            <div className="absolute left-0 top-0 bottom-0 w-0.75 bg-white/20" />
            <motion.div
              style={{ height: lineSize }}
              className="absolute left-0 top-0 w-0.75 bg-white origin-top"
            />
            <div className="flex flex-col gap-16 ml-10">
              {experiences.map((exp, idx) => (
                <ExperienceItem
                  key={idx}
                  exp={exp}
                  idx={idx}
                  start={idx === 0 ? 0 : thresholds[idx - 1]}
                  end={thresholds[idx]}
                  scrollYProgress={scrollYProgress}
                  layout="desktop"
                />
              ))}
            </div>
          </div>
        )}

        {isMobile && (
          <div className="flex flex-col gap-10 w-full max-w-md">
            {experiences.map((exp, idx) => (
              <ExperienceItem
                key={idx}
                exp={exp}
                idx={idx}
                start={idx === 0 ? 0 : thresholds[idx - 1]}
                end={thresholds[idx]}
                scrollYProgress={scrollYProgress}
                layout="mobile"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
