import { motion } from 'framer-motion';

export default function CyberGrid() {
  return (
    <motion.svg
      className="pointer-events-none fixed inset-[-15%_-10%_0] -z-10 h-[120%] w-[120%] opacity-70"
      viewBox="0 0 1200 1200"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      animate={{ x: [0, -26], y: [0, -14], scale: [1, 1.03] }}
      transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: 'reverse', duration: 18, ease: 'linear' }}
    >
      <defs>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(0,245,212,0.17)" strokeWidth="1" />
        </pattern>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(124,58,237,0.24)" />
          <stop offset="100%" stopColor="rgba(5,10,14,0)" />
        </radialGradient>
      </defs>
      <rect width="1200" height="1200" fill="url(#grid)" />
      <motion.circle
        cx="820"
        cy="260"
        r="290"
        fill="url(#glow)"
        animate={{ opacity: [0.58, 0.9, 0.58] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 9, ease: 'easeInOut' }}
      />
    </motion.svg>
  );
}
