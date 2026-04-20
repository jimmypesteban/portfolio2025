import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import { AnimatePresence, motion } from "framer-motion";
import { allProjects as fallbackAllProjects } from "../data/fallback";

export default function Others() {
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "project" && "All Project" in categories[]->title] | order(publishedAt desc){
          "categories": categories[]->title,
          title,
          slug,
          categories[]->{
            title
          },
          mainImage{
            asset->{
              _id,
              url
            },
            alt 
          },
          publishedAt
        }`
      )
      .then((data) => setProjectData(data && data.length > 0 ? data : fallbackAllProjects))
      .catch(() => {
        setProjectData(fallbackAllProjects);
      });
  }, []);

  if (!projectData) {
    return (
      <div className="w-full h-max align-middle">
        <motion.div transition={{
          y: {
            duration: 1,
            yoyo: Infinity,  
            ease: "easeIn",
          }
        }}
        animate={{ y: ["0px", "-200px"] }}>
        <div className="flex h-screen">
          <div className="m-auto">
            <div className="h-10 w-10 rounded-full bg-blue-200 mx-auto"></div>
          </div>
        </div>
      </motion.div>
      </div>
    )
  }

  return (
    <main className="bg-gray-300 h-screen">
      <section>
        <h1>Others page!</h1>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
  <div className="md:flex">
    <div className="md:shrink-0">
      <img className="h-48 w-full object-cover md:h-full md:w-48" src="/img/store.jpg" alt="Man looking at item at a store"/>
    </div>
    <div className="p-8">
      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div>
      <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding customers for your new business</a>
      <p className="mt-2 text-slate-500">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
    </div>
  </div>
</div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
            {projectData &&
              projectData.map((project, index) => (
                
                  <motion.div key={index} 
                     whileHover={{
                      scale: 1.1,
                      textShadow: "0px 0px 4px gray"
                    }}
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1, duration: 0.5, ease: "easeInOut" }}
                  exit={{ x: "-100%", opacity: 0, duration: 0.5, ease: "easeInOut" }}>
                    <h1>{project.slug.current}</h1>
                    <Link
                      to={"/projects/" + project.slug.current}
                      key={project.slug.current}
                    >
                      <span>
                        <h1>{project.title}</h1>
                        <img
                          src={project.mainImage.asset.url}
                          alt={project.mainImage.alt}
                        />
                      </span>
                    </Link>
                  </motion.div>
                
              ))}
          </div>
      </section>
    </main>
  );
}