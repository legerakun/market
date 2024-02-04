import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import landing from "@/assets/landing.svg";

export const Preloader = () => {
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(false);
    }, 800);
  }, []);

  return (
    <AnimatePresence>
      {loaded &&
        <motion.div 
          initial={true}
          animate={{
            opacity: 0,
            transition: { ease: "easeInOut", duration: 0.8 },
          }}
          className="preloader"
          key="preloader"
        >
          <img src={landing} alt="landing" className="preloader-img" />
        </motion.div>
      }
    </AnimatePresence>
  );
};