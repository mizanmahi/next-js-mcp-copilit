import { AnimatePresence, motion } from 'framer-motion';

type BootScreenProps = {
  visible: boolean;
  text: string;
  showSkip: boolean;
  onSkip: () => void;
};

export default function BootScreen({ visible, text, showSkip, onSkip }: BootScreenProps) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[70] grid content-center gap-4 overflow-hidden bg-[#030806] px-4 text-[#5dff97]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45 } }}
        >
          <motion.div
            className="pointer-events-none absolute inset-x-0 -top-full h-full bg-[linear-gradient(180deg,transparent,rgba(80,255,140,0.08),transparent)]"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.7, ease: 'linear' }}
          />
          <pre className="m-0 whitespace-pre-wrap font-mono text-[clamp(0.94rem,2.3vw,1.2rem)] leading-7">{text}</pre>
          {showSkip ? (
            <button
              type="button"
              onClick={onSkip}
              data-cursor="active"
              className="w-fit rounded-full border border-[#2aff88] bg-transparent px-3 py-1.5 font-mono text-sm text-[#7effae]"
            >
              Skip intro
            </button>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
