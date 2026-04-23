import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import sanityClient from "../client.js"; // Static data (Sanity removed)
import { AnimatePresence, motion } from "framer-motion";
import { galleryData as fallbackGallery } from "../data/fallback";

export default function Graphics() {
  const [GraphicsData, setGraphicsData] = useState(null);

  useEffect(() => {
    console.log("called!");
    // Static data (Sanity removed)
    setGraphicsData(fallbackGallery);
  }, []);

  console.log(GraphicsData);

  if (!GraphicsData) {
    return (
      <div className="w-full h-max align-middle">
        <motion.div
          transition={{
            y: {
              duration: 1,
              yoyo: Infinity,
              ease: "easeIn",
            },
          }}
          animate={{ y: ["0px", "-200px"] }}
        >
          <div className="flex h-screen">
            <div className="m-auto">
              <div className="h-10 w-10 rounded-full bg-blue-200 mx-auto"></div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <h1>Graphics page!</h1>

      {GraphicsData &&
        GraphicsData.map((graphicsgallery, index) => (
          <div key={index}>
            <a href={graphicsgallery.imageContentURL} target="_blank"> <img className="" src={graphicsgallery.imageURL} /></a>
          </div>
        ))}
    </>
  );
}
