import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import landing from "@/assets/landing.svg";

export const Preloader = () => {
  const [loaded, setLoaded] = useState(true);
  const preloaderRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(false);
    }, 500);
  }, []);

  return (
    <CSSTransition
      nodeRef={preloaderRef}
      in={loaded}
      timeout={500}
      classNames="preloader"
      unmountOnExit
    >
      <div className="preloader" ref={preloaderRef}>
        <img src={landing} alt="landing" className="preloader-img" />
      </div>
    </CSSTransition>
  );
};