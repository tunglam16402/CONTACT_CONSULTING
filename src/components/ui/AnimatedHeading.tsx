import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.02,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 250, damping: 50 },
  },
};

interface AnimatedHeadingProps {
  text: string;
  className?: string;
}

export default function AnimatedHeading({
  text,
  className,
}: AnimatedHeadingProps) {
  const lines = text.split("\n");

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight drop-shadow-lg ${
        className || ""
      }`}
    >
      {lines.map((line, i) => (
        <div key={i}>
          {line.split("").map((char, j) => (
            <motion.span key={`${i}-${j}`} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
          {i < lines.length - 1 && <br />}
        </div>
      ))}
    </motion.h1>
  );
}
