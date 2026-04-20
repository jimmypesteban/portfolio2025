import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import { motion } from "framer-motion";
import { authorData as fallbackAuthor } from "../data/fallback";

export default function AboutMe() {
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);

  const InitialTransition = () => {};

  const blackBox = {
    initial: {
      height: "100vh",
      bottom: 0,
    },
    animate: {
      height: 100,
      transition: {
        when: "afterChildren",
        duration: 1.5,
        ease: [0.87, 0, 0.13, 1],
      },
    },
  };

  const textContainer = {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 0,
      transition: {
        duration: 0.25,
        when: "afterChildren",
      },
    },
  };

  const text = {
    initial: {
      y: 40,
    },
    animate: {
      y: 80,
      transition: {
        duration: 1.5,
        ease: [0.87, 0, 0.13, 1],
      },
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    sanityClient
      .fetch(
        `*[_type == "author"]{
              experience, education, bio, email,
              skillsContent,
              resume{
                asset->{
                  _id,
                  url
                }
              },
              recommendationLetter{
                asset->{
                  _id,
                  url
                }
              },
        }`
      )
      .then((data) => setAuthorData(data && data[0] ? data[0] : fallbackAuthor))
      .catch(() => {
        setAuthorData(fallbackAuthor);
      });
  }, []);

  if (!authorData || loading === true) {
    return (
      <motion.div
        className="absolute z-50 flex items-center justify-center w-full bg-black"
        initial="initial"
        animate="animate"
        variants={blackBox}
      >
        <motion.svg variants={textContainer} className="absolute z-50 flex">
          <pattern
            id="pattern"
            patternUnits="userSpaceOnUse"
            width={750}
            height={800}
            className="text-white"
          >
            <rect className="w-full h-full fill-current" />
            <motion.rect
              variants={text}
              className="w-full h-full text-pcBlack2 fill-current"
            />
          </pattern>
          <text
            className="text-4xl font-bold font-pfFont2"
            text-anchor="middle"
            x="50%"
            y="50%"
            style={{ fill: "url(#pattern)" }}
          >
            About Me
          </text>
        </motion.svg>
      </motion.div>
    );
  }

  console.log(authorData);

  return (
    <>
      <div
        className="bg-repeat"
        style={{
          backgroundImage: `url(https://raw.githubusercontent.com/jimmypesteban/portfolio2023/main/src/images/Grids3.webp)`,
        }}
      >
        <motion.div
          initial={{ y: "10%", opacity: 0 }}
          animate={{ y: 0, opacity: 1, duration: 0.5, ease: "easeInOut" }}
          exit={{
            x: "-100%",
            opacity: 0,
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <div className="px-8 lg:px-[160px] md:px-[24px] sm:px-[24px]  flex flex-wrap justify-between items-center mx-auto py-8 font-pfFont">
            <div className="lg:px-[160px] md:px-[24px] sm:px-[24px] mt-16 mx-auto">
              <div className="text-pcWhite text-[20px] font-normal text-center mb-4">
                {authorData.bio !== null && (
                  <BlockContent
                    className=""
                    blocks={authorData.bio}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                )}
              </div>
              <br></br>
              <div className="text-[24px] mb-8 text-center font-medium text-pcGray3 font-pfFont">
                <p className="text-[20px] font-pfFont">
                  {authorData.resume !== null && (
                    <a
                      className="font-normal text-pcWhite relative underline duration-300 after:content-[''] after:bg-pcWhite after:h-[2px] after:w-0 after:left-0 after:bottom-[8px] after:absolute after:duration-300 hover:after:w-full hover:no-underline"
                      href={`${authorData.resume.asset.url}?dl=`}
                    >
                      Résumé
                    </a>
                  )}
                  <span className="whitespace-pre font-pfFont2 font-semi-bold">
                    {" "}
                    /{" "}
                  </span>
                  {authorData.resume !== null && (
                    <a
                      className="font-normal text-pcWhite relative underline duration-300 after:content-[''] after:bg-pcWhite after:h-[2px] after:w-0 after:left-0 after:bottom-[8px] after:absolute after:duration-300 hover:after:w-full hover:no-underline"
                      href={`${authorData.recommendationLetter.asset.url}?dl=`}
                    >
                      Recommendation Letter
                    </a>
                  )}
                </p>
              </div>
              {/* <p className="text-pcWhite text-[20px] font-light text-center mb-4">
            You can find me on <a className="font-semibold hover:text-pcBlue" href="https://dribbble.com/jpesteban2">Dribbble</a>, <a className="font-semibold hover:text-pcBlue" href="https://www.linkedin.com/in/jpesteban2/">LinkedIn</a>,{" "}
            <a className="font-semibold hover:text-pcBlue" href="https://www.instagram.com/jpesteban_2/">Instagram</a>,<br></br> or directly reach out at   
            <a href="mailto:jimmypesteban@gmail.com">{authorData.email} </a> or <a href="https://api.whatsapp.com/send?phone=+85295322433">+852 95322433</a>
          </p> */}
            </div>

            <div className="w-full lg:px-[160px] md:px-[24px] sm:px-[24px]  mt-8">
              <div className="text-[28px] md:text-[40px] mb-4 font-bold text-pcWhite font-pfFont2">
                Skills
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 grid-cols-center justify-center gap-4 md:gap-6 mt-4 text-[14px] md:text-[16px]">
                {authorData.skillsContent &&
                  authorData.skillsContent.map((skillsContent, id) => (
                    <div
                      className="text-pcWhite font-semibold px-2 md:px-4 py-4 rounded-[8px] border-2 border-pcWhite text-center hover:shadow-[0_0_16px_rgba(255,255,255,0.56)] shadow-[0_0_16px_rgba(255,255,255,0.24)] hover:bg-pcWhite/10 flex items-center justify-center"
                      key={id}
                    >
                      {skillsContent}
                    </div>
                  ))}
              </div>
            </div>

            <div className="w-full lg:px-[160px] md:px-[24px] sm:px-[24px] mt-16">
              <div className="text-[28px] md:text-[40px] mb-4 font-bold text-pcWhite font-pfFont2">
                Experience
              </div>

              <ol className="relative border-l border-white dark:border-gray-700">
                {authorData.experience &&
                  authorData.experience.map((experience, index) => (
                    <div className="p- pf-4" key={index}>
                      <li className="mb-10 ml-6">
                        <div className="absolute w-3 h-3 bg-pcWhite rounded-full mt-1.5 left-[-6.5px] shadow-[0px_0px_2px_5px_rgba(255,255,255,0.15)]"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-pcGray3 font-pfFont ">
                          {experience.date}
                        </time>

                        <h3 className="text-lg text-pcGray font-pfFont2 text-[32px] font-medium pt-4">
                          {experience.roleTitle},{" "}
                          {experience.titleLink ? (
                            <span className="text-pcWhite underline font-bold relative duration-300 after:content-[''] after:bg-pcWhite after:h-[2px] after:w-0 after:left-0 after:bottom-[10px] after:absolute after:duration-300 hover:after:w-full hover:no-underline">
                              <a href={experience.titleLink}>
                                {experience.title}
                              </a>
                            </span>
                          ) : (
                            <span className="text-pcWhite font-bold">
                              {experience.title}
                            </span>
                          )}
                        </h3>
                        <div className="mt-4 mb-4 text-pcGray2 font-pfFont list-disc pl-5 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-2">
                          <BlockContent
                            className=""
                            blocks={experience.experience}
                            projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                            dataset="production"
                          />
                        </div>
                      </li>
                    </div>
                  ))}
              </ol>
            </div>

            <div className="w-full lg:px-[160px] md:px-[24px] sm:px-[24px]  mt-8 mx-auto">
              <div className="text-[28px] md:text-[40px] mb-4 font-bold text-pcWhite font-pfFont2">
                Education
              </div>

              <ol className="relative border-l border-white dark:border-gray-700">
                {authorData.education &&
                  authorData.education.map((education, index) => (
                    <div className="p- pf-4" key={index}>
                      <li className="mb-10 ml-6">
                        <div className="absolute w-3 h-3 bg-pcWhite rounded-full mt-1.5 -left-1.5 shadow-[0px_0px_2px_5px_rgba(255,255,255,0.15)]"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-pcGray3 font-pfFont ">
                          {education.date}
                        </time>

                        <h3 className="text-lg text-pcGray font-pfFont2 text-[24px] font-semibold pt-4">
                          {education.degreeProgramme}{" "}
                        </h3>
                        <h3 className="text-lg text-pcGray font-pfFont2 text-[16px] pt-2">
                          {education.schoolName}{" "}
                        </h3>
                      </li>
                    </div>
                  ))}
              </ol>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
