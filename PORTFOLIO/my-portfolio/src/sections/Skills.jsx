import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import {
  FaJava,
  FaReact,
  FaPython,
  FaDocker,
  FaNodeJs,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFastapi,
  SiMongodb,
  SiAngular,
} from "react-icons/si";

export default function Skills() {
  const skills = [
    { icon: <FaJava />, name: "Java" },
    { icon: <FaReact />, name: "React" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiFastapi />, name: "FastAPI" },
    { icon: <FaPython />, name: "Python" },
    { icon: <FaDocker />, name: "Docker" },
    { icon: <FaNodeJs />, name: "Node.js" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiAngular />, name: "Angular" },
  ];

  const repeated = [...skills, ...skills];

  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const x = useMotionValue(0);

  const [dir, setDir] = useState(-1);
  const [active, setActive] = useState(false);

  /* 🔍 Intersection Observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* 🖱 Scroll + Touch Direction */
  useEffect(() => {
    if (!active) return;

    const onWheel = (e) => setDir(e.deltaY > 0 ? -1 : 1);

    let touchX = 0;
    const onTouchStart = (e) => (touchX = e.touches[0].clientX);
    const onTouchMove = (e) => {
      const dx = e.touches[0].clientX - touchX;
      setDir(dx > 0 ? 1 : -1);
      touchX = e.touches[0].clientX;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [active]);

  /* 🔁 Infinite Loop Animation */
  useEffect(() => {
    if (!active) return;

    let raf;
    let last = performance.now();
    const SPEED = 90;

    const loop = (now) => {
      const dt = (now - last) / 1000;
      last = now;

      let next = x.get() + SPEED * dir * dt;
      const width = trackRef.current?.scrollWidth / 2 || 0;

      if (width) {
        if (next <= -width) next += width;
        if (next >= 0) next -= width;
      }

      x.set(next);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [dir, active, x]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative h-[70vh] w-full bg-black text-white overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_60%)]" />

      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-bold mb-12 tracking-wide"
      >
        Tech I Work With
      </motion.h2>

      {/* Fade Mask */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-black to-transparent z-10" />

      <motion.div
        ref={trackRef}
        style={{ x }}
        className="flex gap-10 px-10"
      >
        {repeated.map((skill, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.15, rotateX: 8, rotateY: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group relative min-w-32.5 h-32.5 rounded-2xl 
              bg-white/5 backdrop-blur-xl border border-white/10
              flex flex-col items-center justify-center gap-3
              shadow-[0_0_30px_rgba(139,92,246,0.15)]
              hover:shadow-[0_0_60px_rgba(139,92,246,0.6)]"
          >
            <span className="text-5xl text-cyan-400 group-hover:text-blue-400 transition">
              {skill.icon}
            </span>
            <p className="text-sm text-white/80 group-hover:text-white">
              {skill.name}
            </p>

            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-violet-500/20 to-pink-500/20" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}