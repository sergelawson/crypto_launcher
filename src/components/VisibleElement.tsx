import { motion, AnimatePresence } from "framer-motion";

interface VisibleElementProps {
  isVisible: boolean;
  children: React.ReactNode;
}

const VisibleElement: React.FC<VisibleElementProps> = ({
  isVisible,
  children,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="flex"
          initial={{ opacity: 0 }} // Start hidden
          animate={{ opacity: 1 }} // Fade in when visible
          exit={{ opacity: 0 }} // Fade out when hidden
          // transition={{ duration: 0.5 }} // 500ms transition time
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VisibleElement;
