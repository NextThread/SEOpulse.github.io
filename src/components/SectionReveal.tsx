import { motion, useScroll, useTransform, type MotionStyle } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  parallax?: boolean;
  scale?: boolean;
}

export default function SectionReveal({ children, className = "", parallax = false, scale = false }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.3, 1], [80, 0, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0.6]);
  const scaleVal = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const style: MotionStyle = { y: parallax ? parallaxY : y, opacity };
  if (scale) style.scale = scaleVal;

  return (
    <motion.div ref={ref} style={style} className={className}>
      {children}
    </motion.div>
  );
}
