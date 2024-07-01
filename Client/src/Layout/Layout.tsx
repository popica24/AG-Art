import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedOutlet from "../Components/AnimatedOutlet";
import Newsletter from "../Components/Newsletter";

const Layout = () => {
  const { pathname } = useLocation();
  const location = useLocation();

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.6,
        duration: 1,
      },
    },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut" },
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 600);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <AnimatePresence>
        <motion.div
          key={location.pathname}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <AnimatedOutlet />
        </motion.div>
        <Newsletter />
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default Layout;
