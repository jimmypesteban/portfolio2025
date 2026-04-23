import React, { useState, useEffect } from "react";
// import sanityClient from "../client.js"; // Static data (Sanity removed)
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { authorData as fallbackNavAuthor } from "../data/fallback";

export default function NavBar() {
  const [isOpen, setOpen] = useState(false);
  const { pathname } = useLocation();
  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    // Close the navigation panel
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleNavMenuToggle = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    // Static data (Sanity removed)
    setAuthorData(fallbackNavAuthor);
  }, []);

  if (!authorData) {
    return null;
  }

  console.log(authorData);
  return (
    <header className="sticky top-0 z-50">
      <motion.div className="px-[24px] md:px-[36px] 2xl:px-[320px] lg:px-[80px] flex flex-wrap justify-between items-center mx-auto py-8 text-[18px] font-pfFont2 font-semibold bg-pcBlack">
        <div className="z-50">
          <a href="/" className="flex items-center">
            <span className="text-2xl self-center font-semibold whitespace-nowrap text-pcWhite hover:text-pcWhite transition-all ease-in-out duration-100">
              {authorData.signature !== null && (
                <div className="w-[100px] h-auto">
                  <img className="" src={authorData.signature.asset.url} />
                </div>
              )}
            </span>
          </a>
        </div>

        <button onClick={handleNavMenuToggle} className="z-50">
          <div className="text-pcWhite hover:text-myBlue text-left font-bold block md:hidden transition-all ease-in-out duration-100">
            {isOpen ? "Close" : "Menu"}
          </div>
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "-100vw", borderRadius: 0, width: "150vw" }}
              animate={{
                x: 0,
                width: "100vw",
                borderRadius: ["0", "0", "0", "0"],
                transition: { ease: "linear", duration: 0.3 },
              }}
              exit={{
                x: "-100vw",
                borderRadius: 0,
                transition: { ease: "linear", duration: 0.3 },
              }}
              className="absolute w-full bg-pcBlack right-0 h-screen top-0 block md:hidden z-40"
            >
              <motion.div
                initial={{ y: 0, scale: 0, x: -100 }}
                animate={{
                  y: 0,
                  scale: 1,
                  x: [-400, 0],
                  transition: { duration: 0.5 },
                }}
                className="absolute inset-0 text-pcWhite flex flex-col justify-center items-center"
              >
                <NavLink
                  to="/"
                  className="font-semibold text-[36px] text-pcWhite relative duration-300 after:content-[''] after:bg-pcWhite after:h-[2px] after:w-0 after:left-0 after:bottom-[24px] after:absolute after:duration-300 hover:after:w-full"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/Projects"
                  className="my-4 font-semibold text-[36px] text-pcWhite relative duration-300 after:content-[''] after:bg-pcWhite after:h-[2px] after:w-0 after:left-0 after:bottom-[24px] after:absolute after:duration-300 hover:after:w-full"
                >
                  Project Archive
                </NavLink>
                <NavLink
                  to="/AboutMe"
                  className="font-semibold text-[36px] text-pcWhite relative duration-300 after:content-[''] after:bg-pcWhite after:h-[2px] after:w-0 after:left-0 after:bottom-[24px] after:absolute after:duration-300 hover:after:w-full"
                >
                  About Me
                </NavLink>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimateSharedLayout>
          <div className="hidden md:block">
          <NavLink
              to="/"
              className="text-pcWhite relative duration-300 after:content-[''] after:bg-pcWhite after:h-[2px] after:w-0 after:left-0 after:bottom-[10px] after:absolute after:duration-300 hover:after:w-full"
            >
              Home
            </NavLink>
            <span className="whitespace-pre">        </span>
            <NavLink
              to="/Projects"
              className="text-pcWhite relative duration-300 after:content-[''] after:bg-pcWhite after:h-[2px] after:w-0 after:left-0 after:bottom-[10px] after:absolute after:duration-300 hover:after:w-full"
            >
              Project Archive
            </NavLink>
            {/* <span className="whitespace-pre">    </span>
            <NavLink
              to="/Graphics"
              className=" text-pcWhite relative duration-300 after:content-[''] after:bg-pcWhite after:h-[2px] after:w-0 after:left-0 after:bottom-[8px] after:absolute after:duration-300 hover:after:w-full"
            >
              Graphics
            </NavLink> */}
            <span className="whitespace-pre">        </span>
            {/* <NavLink
              to="/Others"
              className="p-0 md:p-4 text-white hover:text-pcBlue"
            >
              Others
            </NavLink> */}
            <NavLink
              to="/AboutMe"
              className=" text-pcWhite relative duration-300 after:content-[''] after:bg-pcWhite after:h-[2px] after:w-0 after:left-0 after:bottom-[10px] after:absolute after:duration-300 hover:after:w-full"
            >
              About Me
            </NavLink>
          </div>
        </AnimateSharedLayout>
      </motion.div>
    </header>
  );
}
