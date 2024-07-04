import { useRef, useState } from "react";
import { FiLock } from "react-icons/fi";
import { motion } from "framer-motion";

interface ExampleProps {
  onClick?: () => void;
  disabled?: boolean;
  TARGET_TEXT: string;
}

// const TARGET_TEXT = "COLLAB!";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

const CHARS = "!@#$%^&*():{};|,.<>/?";

const EncryptButton = ({ onClick, disabled, TARGET_TEXT }: ExampleProps) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [text, setText] = useState(TARGET_TEXT);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);

    setText(TARGET_TEXT);
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{
        scale: 1.025,
      }}
      whileTap={{
        scale: 0.975,
      }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className="group w-full items-center justify-center flex relative overflow-hidden  hover:text-slate-700 rounded-sm border-2 border-dashed border-slate-500 dark:border-white hover:bg-white hover:dark:bg-slate-700 bg-white dark:bg-slate-700 px-3 py-1 font-semibold uppercase text-slate-500 dark:text-white transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-lg hover:shadow-[4px_4px_0px_black] hover:dark:shadow-[4px_4px_0px_white] active:translate-x-[0px] active:translate-y-[0px] active:rounded-sm active:shadow-none"
    >
      <div className="relative z-10 flex items-center gap-2">
        {/* <FiLock /> */}
        <span>{text}</span>
      </div>
      <motion.span
        initial={{
          y: "100%",
        }}
        animate={{
          y: "-100%",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
          ease: "linear",
        }}
        className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-slate-400/0 from-40% via-slate-400/100 to-slate-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
      />
    </motion.button>
  );
};

export default EncryptButton;
