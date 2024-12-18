import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "/home/vare/project/landings_1/portfolio/portfolio/src/styles/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tl = useRef<gsap.core.Timeline | null>(null); // Initialize as null
  const container = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      // Slide the menu down when opened
      gsap.from(".menu-link-item-holder a", {
        opacity: 0,
        y: -50,
        stagger: 0.1,
        ease: "power2.out",
        duration: 0.5,
      });
    }
  };


  useEffect(() => {
    // Check if tl.current is initialized before playing or reversing
    if (tl.current) {
      if (isMenuOpen) {
        tl.current.play();
      } else {
        tl.current.reverse();
      }
    }
  }, [isMenuOpen]);

  return (
    <nav
      className={`${
        isMenuOpen ? "h-screen overflow-hidden" : ""
      }  fixed top-0 left-0 w-full bg-strongRed font-bebas  z-10 sm:block md:static lg:static`}
    >
      <div ref={container} className="mx-auto lg:mx-0 px-5 sm:px-6 ">

        {/* Container */}
        <div className="flex justify-between m-3 md:m-10 h-16 lg:m-13">

          {/* Title */}
          <div className="md:flex flex-center items-center">
            <h1
              data-text="Dan Martin"
              className="text-white text-outline text-5xl md:text-6xl lg:text-7xl font-semibold mt-5 md:mt-6 "
            >
              Dan Martin
            </h1>
          </div>

          {/* Categories */}
          <div className="flex lg:justify-end items-center space-x-9 ">

            {/* Toggle Menu */}
            <button
              onClick={toggleMenu}
              className="text-white font-thin focus:outline-none md:hidden mr-[-40px] mb-3 p-1 z-20"
            >
              {/* Conditional rendering of Hamburger Icon or Close Icon */}
              {isMenuOpen ? (
                <h1
                  data-text="CLOSE"
                  className="text-2xl text-white font-bold text-outline mt-10"
                >
                  CLOSE
                </h1>
              ) : (
                <h1
                  data-text="MENU"
                  className="text-2xl text-white font-bold text-outline mt-10"
                >
                  MENU
                </h1>
              )}
            </button>

            {/* Menu */}
            <div>

              {/* Desktop menu */}
              <div className="flex flex-col items-center  md:text-2xl lg:text-3xl xl:text-4xl xl md:mt-10 md:pr-5 md:flex md:flex-row md:space-y-0 md:space-x-10 md:static md:bg-transparent">
                {/* MD / LG menus */}
                <Link
                  to="/portfolio/"
                  data-text="Home"
                  className="text-outline hidden md:block text-white hover:text-strongRed"
                >
                  Home
                </Link>
                <Link
                  to="/portfolio/about"
                  data-text="About"
                  className="text-outline hidden md:block text-white hover:text-strongRed"
                >
                  About
                </Link>
                <Link
                  to="/portfolio/contact/"
                  data-text="Contact"
                  className="text-outline hidden md:block  text-white text-outline  hover:text-strongRed"
                >
                  Contact
                </Link>
              </div>

              {/* Smart menu  */}
              <div
                className={`${
                  isMenuOpen
                    ? "md:hidden fixed top-0 left-0 w-screen h-screen bg-strongRed text-start justify-start pl-10 z-10 flex flex-col gap-4 "
                    : "hidden"
                }`}
              >
                <div className="menu-link-item-holder flex flex-col mt-24">
                  <Link
                    className="text-white text-7xl font-normal mt-5 text-outline cursor-pointer"
                    data-text="HOME"
                    onClick={()=>setIsMenuOpen(false)}
                    to='/portfolio/'
                  >
                    HOME
                  </Link>
                  <Link
                    to='/portfolio/about/'
                    className="text-white text-7xl  font-normal mt-5 text-outline  cursor-pointer"
                    data-text="ABOUT"
                    onClick={()=>setIsMenuOpen(false)}
                  >
                    ABOUT
                  </Link>
                  <Link
                    className="text-white text-7xl  font-bold mt-5 text-outline  cursor-pointer"
                    data-text="CONTACT"
                    to='/portfolio/contact/'
                    onClick={()=>setIsMenuOpen(false)}
                  >
                    CONTACT
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
