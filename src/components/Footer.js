import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { authorData as fallbackFooterAuthor } from "../data/fallback";

export default function Footer() {
  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "author"]{
          signature{
            asset->{
              _id,
              url
            },
            alt
          },
          email,
          name,
              title,
              bio,
        }`
      )
      .then((data) => setAuthorData(data && data[0] ? data[0] : fallbackFooterAuthor))
      .catch(() => {
        setAuthorData(fallbackFooterAuthor);
      });
  }, []);

  if (!authorData) {
    return null;
  }

  return (
    <footer className="bg-pcBlack text-center pb-12 pt-12 md:pt-16 lg:px-[320px] px-[16px] md:px-[40px]">
      <p className="text-pcWhite md:text-[20px] text-[16px] font-light text-center mb-4">
        You can find also me on<br />
        <span className="whitespace-nowrap">
          <a
            className="font-medium text-pcWhite relative duration-300 after:content-[''] after:bg-pcWhite after:h-[2px] after:w-0 after:left-0 after:bottom-[10px] after:absolute after:duration-300 hover:after:w-full"
            href="https://www.linkedin.com/in/jpesteban2/"
          >
            LinkedIn</a>
          {" "}-{" "}
          <a
            className="font-medium text-pcWhite relative duration-300 after:content-[''] after:bg-pcWhite after:h-[2px] after:w-0 after:left-0 after:bottom-[10px] after:absolute after:duration-300 hover:after:w-full"
            href="https://dribbble.com/jpesteban2"
          >
            Dribbble</a>
          {" "}-{" "}
          <a
            className="font-medium text-pcWhite relative duration-300 after:content-[''] after:bg-pcWhite after:h-[2px] after:w-0 after:left-0 after:bottom-[10px] after:absolute after:duration-300 hover:after:w-full"
            href="https://www.instagram.com/jpesteban_2/"
          >
            Instagram</a>
        </span>
        <br></br> or directly reach out at{" "}
        <a
          className="font-medium text-pcWhite relative duration-300 after:content-[''] after:bg-pcWhite after:h-[2px] after:w-0 after:left-0 after:bottom-[10px] after:absolute after:duration-300 hover:after:w-full"
          href="mailto:jimmypesteban@gmail.com"
        >
          {authorData.email}{" "}
        </a>{" "}
        or{" "}
        <a
          className="font-medium text-pcWhite relative duration-300 after:content-[''] after:bg-pcWhite after:h-[2px] after:w-0 after:left-0 after:bottom-[10px] after:absolute after:duration-300 hover:after:w-full"
          href="https://api.whatsapp.com/send?phone=+85295322433"
        >
          +852 9532 2433
        </a>
      </p>

      <p className="text-pcWhite text-[16px] font-regular text-center mb-4">
        © 2026 Jimmy Esteban
      </p>
    </footer>
  );
}
