import { useRef, type CSSProperties } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

function Char({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      {/* Invisible placeholder keeps layout stable while the absolute copy animates */}
      <span style={{ opacity: 0 }}>{char}</span>
      <motion.span style={{ opacity, position: 'absolute', left: 0, top: 0 }}>{char}</motion.span>
    </span>
  );
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let charCursor = 0;

  return (
    <p ref={paragraphRef} className={className} style={style}>
      {words.map((word, wordIndex) => {
        const wordStart = charCursor;
        charCursor += word.length + 1; // +1 for the following space

        return (
          <span key={wordIndex}>
            <span className="inline-block whitespace-nowrap">
              {word.split('').map((char, charInWord) => {
                const index = wordStart + charInWord;
                return (
                  <Char
                    key={charInWord}
                    char={char}
                    progress={scrollYProgress}
                    range={[index / totalChars, (index + 1) / totalChars]}
                  />
                );
              })}
            </span>
            {wordIndex < words.length - 1 ? ' ' : null}
          </span>
        );
      })}
    </p>
  );
}
