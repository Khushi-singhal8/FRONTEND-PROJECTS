import React from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const socials = [
  {
    icon: FaTwitter,
    label: "Twitter",
    href: "https://x.com/Khushi_singhal8",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/khushi-singhal-1b0282306/",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/Khushi-singhal8",
  },
];

const glowVariants = {
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(59,130,246,0.9)) drop-shadow(0 0 18px rgba(139,92,246,0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95 },
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-white">

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_70%,rgba(59,130,246,0.25),transparent)]"></div>

      <motion.div
        className="relative z-10 px-6 py-16 flex flex-col items-center text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        {/* Name */}
        <h1
          className="font-bold text-white select-none"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            letterSpacing: "0.05em",
            textShadow: "0 0 20px rgba(255,255,255,0.2)",
          }}
        >
          Khushi Singhal
        </h1>

        {/* Gradient Line */}
        <div className="h-[3px] w-24 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500"></div>

        {/* Social Icons */}
        <div className="flex gap-6 text-2xl">
          {socials.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              variants={glowVariants}
              whileHover="hover"
              whileTap="tap"
              className="text-gray-300 hover:text-white transition"
            >
              <Icon />
            </motion.a>
          ))}
        </div>

        {/* Bottom Text */}
        <p className="text-gray-500 text-sm mt-4">
          © {new Date().getFullYear()} Khushi Singhal. All rights reserved.
        </p>

      </motion.div>
    </footer>
  );
}