import "./styles.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { resolveImage } from "../utils/resolveImage";
import { getImageTitle, getTitleFromUrl } from "../utils/imageTitles";
import { useParams } from "react-router-dom";
// import sanityClient from "../client.js"; // Static data (Sanity removed)
import BlockContent from "@sanity/block-content-to-react";
import {
  motion,
  useScroll,
  useViewportScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import projectDetails from "../data/projectDetails";
import ScrollSpy from "./ScrollSpy";
import Lightbox from "./Lightbox";

export default function SingleProject() {
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.72]);
  const [singleProjectData, setSingleProjectData] = useState(null);
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null);
  const [lightbox, setLightbox] = useState({ open: false, images: [], index: 0 });

  const closeLightbox = useCallback(() => setLightbox((lb) => ({ ...lb, open: false })), []);
  const prevImage = useCallback(() => setLightbox((lb) => ({ ...lb, index: Math.max(0, lb.index - 1) })), []);
  const nextImage = useCallback(() => setLightbox((lb) => ({ ...lb, index: Math.min(lb.images.length - 1, lb.index + 1) })), []);

  // const transition = { duration: 0.5, ease: "easeInOut" };
  // const { scrollYProgress } = useScroll();
  var testing = "100";

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
    //console.log("sadasda", scrollYProgress)
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Static data (Sanity removed)
    setSingleProjectData(projectDetails[slug]);
  }, [slug]);

  useEffect(() => {
    if (!singleProjectData || loading) return;
    const cards = Array.from(document.querySelectorAll(".scroll-fade-up"));
    cards.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out";
    });
    const revealed = new Set();
    const checkCards = () => {
      cards.forEach((el) => {
        if (revealed.has(el)) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.92 && rect.bottom >= 0) {
          const siblings = Array.from(el.parentElement.children).filter((c) =>
            c.classList.contains("scroll-fade-up")
          );
          const idx = siblings.indexOf(el);
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, idx * 80);
          revealed.add(el);
        }
      });
    };
    window.addEventListener("scroll", checkCards, { passive: true });
    const raf = requestAnimationFrame(checkCards);
    return () => { window.removeEventListener("scroll", checkCards); cancelAnimationFrame(raf); };
  }, [singleProjectData, loading]);

  useEffect(() => {
    if (!contentRef.current || !singleProjectData) return;
    const container = contentRef.current;
    const handleClick = (e) => {
      const img = e.target.closest("img");
      if (!img) return;
      e.preventDefault();
      const allImgs = Array.from(container.querySelectorAll("img"));
      const index = allImgs.indexOf(img);
      if (index === -1) return;
      setLightbox({
        open: true,
        images: allImgs.map((el) => ({ src: el.src, title: getImageTitle(el) })),
        index,
      });
    };
    container.addEventListener("click", handleClick);
    return () => container.removeEventListener("click", handleClick);
  }, [singleProjectData, loading]);

  if (!singleProjectData || loading === true) {
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
            jimmypesteban
          </text>
        </motion.svg>
      </motion.div>
    );
  }

  return (
    <>
      {/* <motion.div
        className="left-0"
        //  initial={{ scaleX: 0, x: 0 }}
        //  animate={{ scaleX: 50 }}
        //  transition={{ duration: 3 }}
      > */}
      {/* {`{${primaryColor} ${a11yColor}}`} */}

      {/* h-20 w-20 bg-red-800 */}

      {/* <div>
          <div className={`h-20 bg-red-800 w-[${testing}vw]`}></div>
        </div>
      </motion.div> */}

      <div className="w-full h-max ">
        {/* initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }} */}
      </div>

      <ScrollSpy />
      <div
        data-scrollspy
        className="px-[24px] 2xl:px-[240px] md:px-[24px] lg:px-[80px] text-pfFont bg-repeat"
        style={{
          backgroundImage: `url(https://raw.githubusercontent.com/jimmypesteban/portfolio2023/main/src/images/Grids3.webp)`,
        }}
      >
        {/* <motion.div style={{ scaleX: scrollYProgress }} />   */}

        {/* <h1 className="text-pcWhite text-2xl font-bold">
          This is layout {singleProjectData.layout}
        </h1> */}
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
          <h1
            className="flex justify-center items-center text-pcWhite font-pfFont2 font-bold lg:text-[40px] text-[28px] pt-6 md:pt-10 lg:pt-16 mb-4"
            style={{
              color: `${singleProjectData.extraColor3}`
                ? `${singleProjectData.extraColor3}`
                : "#FFFFFF",
            }}
          >
            {singleProjectData.title}
          </h1>

          <div className="flex justify-center flex-wrap lg:mb-12 mb-6">
            {singleProjectData.projectTags &&
              singleProjectData.projectTags.map((projectTags, id) => (
                <div
                  // className=" text-[14px] text-pcBlack2 bg-pcBlack2/20 font-semibold rounded-[24px] px-3 py-1 mr-2 mb-2"
                  className="text-[12px] md:text-[14px] text-pcBlack2 bg-pcWhite font-semibold rounded-[24px] px-3 py-1 mr-2 mb-2"
                  style={{
                    backgroundColor: `${singleProjectData.projectTagsColor}`,
                  }}
                  key={id}
                >
                  {projectTags}
                </div>
              ))}
          </div>
        </motion.div>

        <div className="overflow-hidden rounded-[8px] max-h-[720px]">
          <motion.img
            style={{ scale: scale }}
            initial={{ scale: 1.0, y: "10%" }}
            animate={{ y: 0, duration: 0.5, ease: "easeInOut" }}
            className="object-center"
            src={resolveImage(singleProjectData.projectBanner.asset.url)}
            alt={singleProjectData.name}
          />
        </div>
        <div data-section="overview" id="section-overview" className="mt-6 lg:mt-12 mb-6 lg:mb-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
          <div className="text-pcWhite">
            <p className="mb-2 font-bold text-[12px] font-pfFont2">OVERVIEW</p>
            <div className="font-pfFont md:text-[18px] text-[16px]">
              <BlockContent
                blocks={singleProjectData.overview}
                projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                dataset="production"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-16 mt-6">
              <div>
                <p className="mb-1 md:mb-2 font-bold text-[12px] font-pfFont2">
                  TIMELINE
                </p>
                <p className="text-[14px] md:text-[16px]">
                  {singleProjectData.duration}
                </p>
              </div>
              {singleProjectData.role && (
                <div>
                  <p className="mb-1 md:mb-2 font-bold text-[12px] font-pfFont2">
                    MY ROLE
                  </p>
                  <p className="text-[14px] md:text-[16px]">
                    {singleProjectData.role}
                  </p>
                </div>
              )}
              {singleProjectData.teamMembers && (
                <div>
                  <p className="mb-1 md:mb-2 font-bold text-[12px] font-pfFont2">
                    THE TEAM
                  </p>
                  <p className="text-[14px] md:text-[16px]">
                    {singleProjectData.teamMembers}
                  </p>
                </div>
              )}
              <div>
                <p className="mb-1 md:mb-2 font-bold text-[12px] font-pfFont2">
                  TOOLS USED
                </p>
                <p className="text-[14px] md:text-[16px]">
                  {singleProjectData.tools}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div ref={contentRef} className="cursor-zoom-in">
        {singleProjectData.layout === "1" ? (
          <div>
            <div className="mt-6 lg:mt-12 mb-6 lg:mb-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                The Breakdown
              </h1>
              <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                <BlockContent
                  className=""
                  blocks={singleProjectData.goal}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
                {singleProjectData &&
                  singleProjectData.designSystemGallery.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>

              <div>
                <img
                  className=""
                  src={resolveImage(singleProjectData.extraImage2.asset.url)}
                  alt={singleProjectData.name}
                />
                <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.extraImage2.asset.url)}</p>
              </div>
            </div>

            <div className="mt-6 lg:mt-12 mb-6 lg:mb-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.processTitle}
              </h1>
              <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite mb-4">
                <BlockContent
                  className=""
                  blocks={singleProjectData.process}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>



              {/* <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite mb-4">
                <BlockContent
                  className=""
                  blocks={singleProjectData.extraBlock1}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div> */}

<div>
                <img
                  className=""
                  src={resolveImage(singleProjectData.extraImage3.asset.url)}
                  alt={singleProjectData.name}
                />
                <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.extraImage3.asset.url)}</p>
              </div>

              <div>
                <img
                  className="pt-8"
                  src={resolveImage(singleProjectData.extraImage1.asset.url)}
                  alt={singleProjectData.name}
                />
                <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.extraImage1.asset.url)}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:gap-8 pt-8">
                {singleProjectData &&
                  singleProjectData.extraGallery1.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>
            </div>

            

            <div className="mt-6 lg:mt-12 mb-6 lg:mb-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.designSystemTitle}
              </h1>
              <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                <BlockContent
                  className=""
                  blocks={singleProjectData.designSystem}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div>
                <img
                  className="mt-4"
                  src={resolveImage(singleProjectData.designSystemImage.asset.url)}
                  alt={singleProjectData.name}
                />
                <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.designSystemImage.asset.url)}</p>
              </div>
            </div>

            <div className="mt-6 lg:mt-12 mb-6 lg:mb-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2 text-center"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                Prototype
              </h1>
              
              <div className="prose max-w-none prose-a:text-pcWhite prose-a:font-semibold prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite text-center">
                <BlockContent
                  className=""
                  blocks={singleProjectData.extraBlock10}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 md:mt-8">
                {singleProjectData &&
                  singleProjectData.extraGallery7.map((graphicsgallery, index) => (
                    <div key={index}>
                      <a href={graphicsgallery.asset.url} target="_blank">
                        <img className="w-full" src={resolveImage(graphicsgallery.asset.url)} />
                      </a>
                      <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                    </div>
                  ))}
              </div>
              </div>

            {/* <div className="mt-6 lg:mt-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.prototypeTitle}
              </h1>
              <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                <BlockContent
                  className=""
                  blocks={singleProjectData.prototypeBlock}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
            </div> */}

            <div className="mt-6 lg:mt-12 mb-6 lg:mb-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2 text-center"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.gifTitle}
              </h1>
              
              <div className="prose max-w-none prose-a:text-pcWhite prose-a:font-semibold prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite text-center">
                <BlockContent
                  className=""
                  blocks={singleProjectData.gifBlock}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>


              <h1 className="text-[24px] md:text-[28px] mt-4 md:mt-12 mb-4 font-bold text-pcWhite font-pfFont2 text-center">
                Trials Page
              </h1>

              <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite text-center">
                <BlockContent
                  className=""
                  blocks={singleProjectData.extraBlock4}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 md:mt-8">
                {singleProjectData &&
                  singleProjectData.gifGallery.map((graphicsgallery, index) => (
                    <div key={index}>
                      <a href={graphicsgallery.asset.url} target="_blank">
                        <img className="w-full" src={resolveImage(graphicsgallery.asset.url)} />
                      </a>
                      <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                    </div>
                  ))}
              </div>

              <h1 className="text-[24px] md:text-[28px] mt-4 md:mt-12 mb-4 font-bold text-pcWhite font-pfFont2 text-center">
                Templates Page
              </h1>

              <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite text-center">
                <BlockContent
                  className=""
                  blocks={singleProjectData.extraBlock5}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 md:mt-8">
                {singleProjectData &&
                  singleProjectData.extraGallery2.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>

              <h1 className="text-[24px] md:text-[28px] mt-4 md:mt-12 mb-4 font-bold text-pcWhite font-pfFont2 text-center">
                User Management Page
              </h1>

              <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite text-center">
                <BlockContent
                  className=""
                  blocks={singleProjectData.extraBlock6}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 md:mt-8">
                {singleProjectData &&
                  singleProjectData.extraGallery3.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>

              <h1 className="text-[24px] md:text-[28px] mt-4 md:mt-12 mb-4 font-bold text-pcWhite font-pfFont2 text-center">
                Audit
              </h1>

              <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite text-center">
                <BlockContent
                  className=""
                  blocks={singleProjectData.extraBlock7}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 md:mt-8">
                {singleProjectData &&
                  singleProjectData.extraGallery4.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>
            </div>

            <div className="mt-6 lg:mt-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2 text-center"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.extraTitle1}
              </h1>

              <h1 className="text-[24px] md:text-[28px] mt-4 md:mt-12 mb-4 font-bold text-pcWhite font-pfFont2 text-center">
                Dashboard and Calendar Page
              </h1>
              <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite text-center">
                <BlockContent
                  className=""
                  blocks={singleProjectData.extraBlock8}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 md:mt-8">
                {singleProjectData &&
                  singleProjectData.extraGallery5.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>

              <h1 className="text-[24px] md:text-[28px] mt-4 md:mt-12 mb-4 font-bold text-pcWhite font-pfFont2 text-center">
                Messenger Page
              </h1>

              <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite text-center">
                <BlockContent
                  className=""
                  blocks={singleProjectData.extraBlock9}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 md:mt-8">
                {singleProjectData &&
                  singleProjectData.extraGallery6.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>

              <h1 className="text-[24px] md:text-[28px] mt-4 md:mt-12 mb-4 font-bold text-pcWhite font-pfFont2 text-center">
                Support / Tickets
              </h1>
                      
              <iframe
                  className="w-full aspect-video mt-4 md:mt-8"
                  src={singleProjectData.extraTitle6}
                ></iframe>

            </div>

            

            <div className="mt-6 lg:mt-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.result}
              </h1>
              <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                <BlockContent
                  className=""
                  blocks={singleProjectData.resultContent}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
            </div>
          </div>
        ) : singleProjectData.layout === "2" ? (
          <div>
            <div className="mt-6 lg:mt-12 mb-6 lg:mb-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px]  mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                The Goal
              </h1>
              <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                <BlockContent
                  className=""
                  blocks={singleProjectData.goal}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 text-pcWhite my-6">
                <div className="prose max-w-none prose-strong:text-[#2084E5] prose-strong:font-pfFont2 font-pfFont text-pcWhite font-medium prose-p:text-[14px] prose-p:leading-[22px] md:prose-p:text-base md:prose-p:leading-7 p-4 md:p-6 rounded-[8px] bg-pcWhite/10 scroll-fade-up">
                  <BlockContent
                    className=""
                    blocks={singleProjectData.extraBlock1}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>
                <div className="prose max-w-none prose-strong:text-[#2084E5] prose-strong:font-pfFont2 font-pfFont text-pcWhite font-medium prose-p:text-[14px] prose-p:leading-[22px] md:prose-p:text-base md:prose-p:leading-7 p-4 md:p-6 rounded-[8px] bg-pcWhite/10 scroll-fade-up">
                  <BlockContent
                    className=""
                    blocks={singleProjectData.extraBlock2}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>
                <div className="prose max-w-none prose-strong:text-[#2084E5] prose-strong:font-pfFont2 font-pfFont text-pcWhite font-medium prose-p:text-[14px] prose-p:leading-[22px] md:prose-p:text-base md:prose-p:leading-7 p-4 md:p-6 rounded-[8px] bg-pcWhite/10 scroll-fade-up">
                  <BlockContent
                    className=""
                    blocks={singleProjectData.extraBlock3}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {singleProjectData &&
                  singleProjectData.extraGallery1.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img className="w-full" src={resolveImage(graphicsgallery.asset.url)} />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>
            </div>

            <div className="mt-6 lg:mt-12 mb-6 lg:mb-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                Process
              </h1>
              <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                <BlockContent
                  className=""
                  blocks={singleProjectData.process}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
              <iframe
                className="w-full aspect-video"
                src={singleProjectData.processContent}
              ></iframe>
            </div>

            <div className="flex flex-col mt-6 lg:mt-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <div>
                <h1
                  className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                  style={{ color: `${singleProjectData.extraColor3}` }}
                >
                  Design System
                </h1>
                <div
                  className="prose max-w-none prose-a:text-pcWhite prose-a:font-semibold prose-strong:text-pcWhite font-pfFont text-pcWhite mb-4 
                prose-a:relative prose-a:duration-300 after:prose-a:content-[''] after:prose-a:bg-pcWhite after:prose-a:h-[2px] after:prose-a:w-0 after:prose-a:left-0 after:prose-a:bottom-[8px] after:prose-a:absolute after:prose-a:duration-300 hover:after:prose-a:w-full hover:prose-a:no-underline"
                >
                  <BlockContent
                    className=""
                    blocks={singleProjectData.designSystem}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>
              </div>

              <div>
                <img
                  className=""
                  src={resolveImage(singleProjectData.designSystemImage.asset.url)}
                  alt={singleProjectData.name}
                />
                <p className="mb-4 md:mb-8 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.designSystemImage.asset.url)}</p>
              </div>

              <div>
                <img
                  className=""
                  src={resolveImage(singleProjectData.designSystemImage2.asset.url)}
                  alt={singleProjectData.name}
                />
                <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.designSystemImage2.asset.url)}</p>
              </div>
            </div>

            <div className="mt-6 lg:mt-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
            <div>
                <h1
                  className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                  style={{ color: `${singleProjectData.extraColor3}` }}
                >
                  Sprints and Testing
                </h1>
                <div
                  className="prose max-w-none prose-a:text-pcWhite prose-a:font-semibold prose-strong:text-pcWhite font-pfFont text-pcWhite mb-4 
                prose-a:relative prose-a:duration-300 after:prose-a:content-[''] after:prose-a:bg-pcWhite after:prose-a:h-[2px] after:prose-a:w-0 after:prose-a:left-0 after:prose-a:bottom-[8px] after:prose-a:absolute after:prose-a:duration-300 hover:after:prose-a:w-full hover:prose-a:no-underline"
                >
                  <BlockContent
                    className=""
                    blocks={singleProjectData.gifBlock}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>
              </div>
              

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {singleProjectData &&
                  singleProjectData.gifGallery.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img className="w-full" src={resolveImage(graphicsgallery.asset.url)} />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>

              {singleProjectData.extraImage1 && (
                <div>
                  <img
                    className="mt-4"
                    src={resolveImage(singleProjectData.extraImage1.asset.url)}
                    alt={singleProjectData.name}
                  />
                  <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.extraImage1.asset.url)}</p>
                </div>
              )}

              <div
                  className="mt-4 prose max-w-none prose-a:text-pcWhite prose-a:font-semibold prose-strong:text-pcWhite font-pfFont text-pcWhite mb-4
                prose-a:relative prose-a:duration-300 after:prose-a:content-[''] after:prose-a:bg-pcWhite after:prose-a:h-[2px] after:prose-a:w-0 after:prose-a:left-0 after:prose-a:bottom-[8px] after:prose-a:absolute after:prose-a:duration-300 hover:after:prose-a:w-full hover:prose-a:no-underline"
                >
                  <BlockContent
                    className=""
                    blocks={singleProjectData.extraBlock4}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {singleProjectData &&
                  singleProjectData.extraGallery2.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img className="w-full" src={resolveImage(graphicsgallery.asset.url)} />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>

              


              
            </div>

            <div className="mt-6 lg:mt-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                Prototype/Staging
              </h1>

              <div
                  className="mt-4 prose max-w-none prose-a:text-pcWhite prose-a:font-semibold prose-strong:text-pcWhite font-pfFont text-pcWhite mb-4 
                prose-a:relative prose-a:duration-300 after:prose-a:content-[''] after:prose-a:bg-pcWhite after:prose-a:h-[2px] after:prose-a:w-0 after:prose-a:left-0 after:prose-a:bottom-[8px] after:prose-a:absolute after:prose-a:duration-300 hover:after:prose-a:w-full hover:prose-a:no-underline"
                >
                  <BlockContent
                    className=""
                    blocks={singleProjectData.prototypeBlock}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>
              <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4 md:gap-8">
                <iframe
                  className="w-full aspect-video"
                  src={singleProjectData.prototypeVideosUrl}
                ></iframe>
                <iframe
                  className="w-full aspect-video"
                  src={singleProjectData.prototypeVideosUrl2}
                ></iframe>
              </div>
            </div>

            <div className="mt-6 lg:mt-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.result}
              </h1>
              <div className="text-pcWhite">
                <BlockContent
                  className=""
                  blocks={singleProjectData.resultContent}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
            </div>
          </div>
        ) : singleProjectData.layout === "3" ? (
          <div className="">
            <h1>Layout 3</h1>

            {/* <div className="flex flex-wrap w-full bg-yellow-200 p-4">
              {singleProjectData &&
                singleProjectData.designSystemGallery.map(
                  (graphicsgallery, index) => (
                    <div>
                      <a href={graphicsgallery.asset.url} target="_blank">
                        {" "}
                        <h1>{index + 1}</h1>
                        <img
                          className={`${
                            (index + 1) % 2 == 0 ? "w-1/2" : "w-full"
                          }`}
                          src={resolveImage(graphicsgallery.asset.url)}
                        />
                      </a>
                    </div>
                  )
                )}
            </div> */}

            <div className="flex flex-wrap w-full p-4">
              {singleProjectData &&
                singleProjectData.designSystemGallery.map(
                  (graphicsgallery, index) => (
                    <div
                      className={`${
                        (index + 0) % 3 === 0 ? "w-full" : "w-1/2"
                      } text-pcWhite`}
                    >
                      <img
                        className="rounded-[24px] p-6"
                        src={resolveImage(graphicsgallery.asset.url)}
                        alt={graphicsgallery.alt}
                      />
                    </div>
                  )
                )}
            </div>

            {/* ${(index + 1) % 2 == 0 ? "grid-cols-2" : "grid-cols-1"} */}

            <div>
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                Project Details
              </h1>
              <div className="mb-24 text-pcWhite">
                <BlockContent
                  className="mb-24 prose prose-a:text-green-300 text-pcWhite"
                  blocks={singleProjectData.overview}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
            </div>

            <div>
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                The Goal
              </h1>
              <div className="mb-24">
                <BlockContent
                  className="mb-24 prose prose-a:text-green-300 text-pcWhite"
                  blocks={singleProjectData.goal}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
            </div>

            <div>
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                Process
              </h1>
              <div className="mb-24 text-pcWhite">
                <BlockContent
                  className="mb-24 prose prose-a:text-green-300 text-pcWhite"
                  blocks={singleProjectData.process}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <div>
                <h1
                  className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                  style={{ color: `${singleProjectData.extraColor3}` }}
                >
                  Design System
                </h1>
                <div className="mb-24 prose prose-a:text-green-300 text-pcWhite">
                  <BlockContent
                    className=""
                    blocks={singleProjectData.designSystem}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>
              </div>

              {singleProjectData &&
                singleProjectData.designSystemGallery.map(
                  (graphicsgallery, index) => (
                    <div
                      className="flex flex-row w-full bg-orange-200"
                      key={index}
                    >
                      <div className="flex flex-row w-1/2">
                        <a href={graphicsgallery.asset.url} target="_blank">
                          {" "}
                          <img
                            className="w-[50px]"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                      </div>
                    </div>
                  )
                )}
            </div>

            <div>
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                Prototype/Staging
              </h1>
              <div className="mb-24 prose prose-a:text-green-300 text-pcWhite">
                {singleProjectData.prototypeVideosUrl}
              </div>
            </div>

            <div>
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                Results and Takeaway
              </h1>

              <div className="mb-24 w-full">
                <BlockContent
                  className="mb-24 prose prose-a:text-green-300 text-pcWhite"
                  blocks={singleProjectData.result}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
            </div>
          </div>
        ) : singleProjectData.layout === "4" ? (
          <div className="">
            <h1>Layout 4</h1>

            {/* <div className="flex flex-wrap w-full bg-yellow-200 p-4">
                {singleProjectData &&
                  singleProjectData.designSystemGallery.map(
                    (graphicsgallery, index) => (
                      <div>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          {" "}
                          <h1>{index + 1}</h1>
                          <img
                            className={`${
                              (index + 1) % 2 == 0 ? "w-1/2" : "w-full"
                            }`}
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                      </div>
                    )
                  )}
              </div> */}

            <div className="flex flex-wrap w-full p-4">
              {singleProjectData &&
                singleProjectData.designSystemGallery.map(
                  (graphicsgallery, index) => (
                    <div
                      className={`${
                        (index + 0) % 3 === 0 ? "w-full" : "w-1/2"
                      } text-pcWhite`}
                    >
                      <img
                        className="rounded-[24px] p-6"
                        src={resolveImage(graphicsgallery.asset.url)}
                        alt={graphicsgallery.alt}
                      />
                    </div>
                  )
                )}
            </div>

            {/* ${(index + 1) % 2 == 0 ? "grid-cols-2" : "grid-cols-1"} */}

            <div>
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                Project Details
              </h1>
              <div className="mb-24 text-pcWhite">
                <BlockContent
                  className="mb-24 prose prose-a:text-green-300 text-pcWhite"
                  blocks={singleProjectData.overview}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
            </div>

            <div>
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                The Goal
              </h1>
              <div className="mb-24">
                <BlockContent
                  className="mb-24 prose prose-a:text-green-300 text-pcWhite"
                  blocks={singleProjectData.goal}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
            </div>

            <div>
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                Process
              </h1>
              <div className="mb-24 text-pcWhite">
                <BlockContent
                  className="mb-24 prose prose-a:text-green-300 text-pcWhite"
                  blocks={singleProjectData.process}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <div>
                <h1
                  className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                  style={{ color: `${singleProjectData.extraColor3}` }}
                >
                  Design System
                </h1>
                <div className="mb-24 prose prose-a:text-green-300 text-pcWhite">
                  <BlockContent
                    className=""
                    blocks={singleProjectData.designSystem}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>
              </div>

              {singleProjectData &&
                singleProjectData.designSystemGallery.map(
                  (graphicsgallery, index) => (
                    <div
                      className="flex flex-row w-full bg-orange-200"
                      key={index}
                    >
                      <div className="flex flex-row w-1/2">
                        <a href={graphicsgallery.asset.url} target="_blank">
                          {" "}
                          <img
                            className="w-[50px]"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                      </div>
                    </div>
                  )
                )}
            </div>

            <div>
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                Prototype/Staging
              </h1>
              <div className="mb-24 prose prose-a:text-green-300 text-pcWhite">
                {singleProjectData.prototypeVideosUrl}
              </div>
            </div>

            <div>
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                Results and Takeaway
              </h1>

              <div className="mb-24 w-full">
                <BlockContent
                  className="mb-24 prose prose-a:text-green-300 text-pcWhite"
                  blocks={singleProjectData.extraBlock1}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
            </div>
          </div>
        ) : singleProjectData.layout === "5" ? (
          <div className="">
            <div className="mt-6 lg:mt-12 mb-6 lg:mb-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <div className="text-pcWhite">
                <p className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2">
                  {singleProjectData.processTitle}
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 text-pcWhite mt-4">
                  <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite font-medium prose-p:text-[14px] prose-p:leading-[22px] md:prose-p:text-base md:prose-p:leading-7 p-4 md:p-6 rounded-[8px] bg-pcWhite/10 scroll-fade-up">
                    <BlockContent
                      className=""
                      blocks={singleProjectData.extraBlock1}
                      projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                      dataset="production"
                    />
                  </div>
                  <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite font-medium prose-p:text-[14px] prose-p:leading-[22px] md:prose-p:text-base md:prose-p:leading-7 p-4 md:p-6 rounded-[8px] bg-pcWhite/10 scroll-fade-up">
                    <BlockContent
                      className=""
                      blocks={singleProjectData.extraBlock2}
                      projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                      dataset="production"
                    />
                  </div>
                  <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite font-medium prose-p:text-[14px] prose-p:leading-[22px] md:prose-p:text-base md:prose-p:leading-7 p-4 md:p-6 rounded-[8px] bg-pcWhite/10 scroll-fade-up">
                    <BlockContent
                      className=""
                      blocks={singleProjectData.extraBlock3}
                      projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                      dataset="production"
                    />
                  </div>
                  <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite font-medium prose-p:text-[14px] prose-p:leading-[22px] md:prose-p:text-base md:prose-p:leading-7 p-4 md:p-6 rounded-[8px] bg-pcWhite/10 scroll-fade-up">
                    <BlockContent
                      className=""
                      blocks={singleProjectData.extraBlock4}
                      projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                      dataset="production"
                    />
                  </div>
                  <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite font-medium prose-p:text-[14px] prose-p:leading-[22px] md:prose-p:text-base md:prose-p:leading-7 p-4 md:p-6 rounded-[8px] bg-pcWhite/10 scroll-fade-up">
                    <BlockContent
                      className=""
                      blocks={singleProjectData.extraBlock5}
                      projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                      dataset="production"
                    />
                  </div>
                  <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite font-medium prose-p:text-[14px] prose-p:leading-[22px] md:prose-p:text-base md:prose-p:leading-7 p-4 md:p-6 rounded-[8px] bg-pcWhite/10 scroll-fade-up">
                    <BlockContent
                      className=""
                      blocks={singleProjectData.extraBlock6}
                      projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                      dataset="production"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-6 lg:mt-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <div>
                <h1
                  className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                  style={{ color: `${singleProjectData.extraColor3}` }}
                >
                  {singleProjectData.designSystemTitle}
                </h1>
                <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                  <BlockContent
                    className=""
                    blocks={singleProjectData.designSystem}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>
              </div>
              <div>
                <img
                  className=""
                  src={resolveImage(singleProjectData.extraImage1.asset.url)}
                  alt={singleProjectData.name}
                />
                <p className="mt-1 mb-4 md:mb-8 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.extraImage1.asset.url)}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-8 pb-4 md:pb-8">
                {singleProjectData &&
                  singleProjectData.designSystemGallery.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>
              <div className="">
                <img
                  className=""
                  src={resolveImage(singleProjectData.extraImage2.asset.url)}
                  alt={singleProjectData.name}
                />
                <p className="mt-1 mb-4 md:mb-8 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.extraImage2.asset.url)}</p>
                <img
                  className=""
                  src={resolveImage(singleProjectData.extraImage3.asset.url)}
                  alt={singleProjectData.name}
                />
                <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.extraImage3.asset.url)}</p>
              </div>
            </div>
          </div>
        ) : singleProjectData.layout === "6" ? (
          <div className="">
            <div className="mt-6 lg:mt-12 mb-6 lg:mb-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.designSystemTitle}
              </h1>
              <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                <BlockContent
                  className=""
                  blocks={singleProjectData.designSystem}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {singleProjectData.designSystemGallery &&
                  singleProjectData.designSystemGallery.map((img, index) => (
                    <div key={index}>
                      <a href={img.asset.url} target="_blank">
                        <img className="w-full" src={resolveImage(img.asset.url)} />
                      </a>
                      <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(img.asset.url)}</p>
                    </div>
                  ))}
              </div>
            </div>
            <div className="mt-6 lg:mt-12 mb-6 lg:mb-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <div>
                <h1
                  className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2 text-center"
                  style={{ color: `${singleProjectData.extraColor3}` }}
                >
                  {singleProjectData.processTitle}
                </h1>
                <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite text-center mb-4">
                  <BlockContent
                    className=""
                    blocks={singleProjectData.process}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite font-semibold prose-p:text-[14px] prose-p:leading-[22px] md:prose-p:text-base md:prose-p:leading-7 p-4 md:p-6 rounded-[8px] bg-pcWhite/10 scroll-fade-up">
                    <BlockContent
                      className=""
                      blocks={singleProjectData.extraBlock1}
                      projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                      dataset="production"
                    />
                  </div>
                  <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite font-semibold prose-p:text-[14px] prose-p:leading-[22px] md:prose-p:text-base md:prose-p:leading-7 p-4 md:p-6 rounded-[8px] bg-pcWhite/10 scroll-fade-up">
                    <BlockContent
                      className=""
                      blocks={singleProjectData.extraBlock2}
                      projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                      dataset="production"
                    />
                  </div>
                  <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite font-semibold prose-p:text-[14px] prose-p:leading-[22px] md:prose-p:text-base md:prose-p:leading-7 p-4 md:p-6 rounded-[8px] bg-pcWhite/10 scroll-fade-up">
                    <BlockContent
                      className=""
                      blocks={singleProjectData.extraBlock3}
                      projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                      dataset="production"
                    />
                  </div>
                  <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite font-semibold prose-p:text-[14px] prose-p:leading-[22px] md:prose-p:text-base md:prose-p:leading-7 p-4 md:p-6 rounded-[8px] bg-pcWhite/10 scroll-fade-up">
                    <BlockContent
                      className=""
                      blocks={singleProjectData.extraBlock4}
                      projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                      dataset="production"
                    />
                  </div>
                </div>

                <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite text-center mt-4 mb-8">
                  <BlockContent
                    className=""
                    blocks={singleProjectData.extraBlock5}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>
              </div>

              <div>
                <h1
                  className="text-[28px] mb-4 font-bold text-pcWhite font-pfFont2 text-center"
                  style={{ color: `${singleProjectData.extraColor3}` }}
                >
                  {singleProjectData.extraTitle1}
                </h1>
                <div className="grid grid-cols-2 gap-4 md:gap-8 pb-8">
                  {singleProjectData &&
                    singleProjectData.extraGallery1.map(
                      (graphicsgallery, index) => (
                        <div key={index}>
                          <a href={graphicsgallery.asset.url} target="_blank">
                            <img
                              className="w-full"
                              src={resolveImage(graphicsgallery.asset.url)}
                            />
                          </a>
                          <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                        </div>
                      )
                    )}
                </div>
              </div>

              <div>
                <h1
                  className="text-[28px] mb-4 font-bold text-pcWhite font-pfFont2 text-center"
                  style={{ color: `${singleProjectData.extraColor3}` }}
                >
                  {singleProjectData.extraTitle2}
                </h1>
                <div className="grid grid-cols-2 gap-4 md:gap-8 pb-8">
                  {singleProjectData &&
                    singleProjectData.extraGallery2.map(
                      (graphicsgallery, index) => (
                        <div key={index}>
                          <a href={graphicsgallery.asset.url} target="_blank">
                            <img
                              className="w-full"
                              src={resolveImage(graphicsgallery.asset.url)}
                            />
                          </a>
                          <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                        </div>
                      )
                    )}
                </div>
              </div>

              <div>
                <h1
                  className="text-[28px] mb-4 font-bold text-pcWhite font-pfFont2 text-center"
                  style={{ color: `${singleProjectData.extraColor3}` }}
                >
                  {singleProjectData.extraTitle3}
                </h1>
                <div className="grid grid-cols-2 gap-4 md:gap-8 pb-8">
                  {singleProjectData &&
                    singleProjectData.extraGallery3.map(
                      (graphicsgallery, index) => (
                        <div key={index}>
                          <a href={graphicsgallery.asset.url} target="_blank">
                            <img
                              className="w-full"
                              src={resolveImage(graphicsgallery.asset.url)}
                            />
                          </a>
                          <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                        </div>
                      )
                    )}
                </div>
              </div>

              <div>
                <h1
                  className="text-[28px] mb-4 font-bold text-pcWhite font-pfFont2 text-center"
                  style={{ color: `${singleProjectData.extraColor3}` }}
                >
                  {singleProjectData.extraTitle4}
                </h1>
                <div className="grid grid-cols-2 gap-4 md:gap-8 pb-8">
                  {singleProjectData &&
                    singleProjectData.extraGallery4.map(
                      (graphicsgallery, index) => (
                        <div key={index}>
                          <a href={graphicsgallery.asset.url} target="_blank">
                            <img
                              className="w-full"
                              src={resolveImage(graphicsgallery.asset.url)}
                            />
                          </a>
                          <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                        </div>
                      )
                    )}
                </div>
              </div>

              <div>
                <h1
                  className="text-[28px] mb-4 font-bold text-pcWhite font-pfFont2 text-center"
                  style={{ color: `${singleProjectData.extraColor3}` }}
                >
                  {singleProjectData.extraTitle5}
                </h1>
                <div className="grid grid-cols-2 gap-4 md:gap-8 pb-8">
                  {singleProjectData &&
                    singleProjectData.extraGallery5.map(
                      (graphicsgallery, index) => (
                        <div key={index}>
                          <a href={graphicsgallery.asset.url} target="_blank">
                            <img
                              className="w-full"
                              src={resolveImage(graphicsgallery.asset.url)}
                            />
                          </a>
                          <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                        </div>
                      )
                    )}
                </div>
              </div>

              <div>
                <h1
                  className="text-[28px] mb-4 font-bold text-pcWhite font-pfFont2 text-center"
                  style={{ color: `${singleProjectData.extraColor3}` }}
                >
                  {singleProjectData.extraTitle6}
                </h1>
                <div className="grid grid-cols-2 gap-4 md:gap-8 pb-8">
                  {singleProjectData &&
                    singleProjectData.extraGallery6.map(
                      (graphicsgallery, index) => (
                        <div key={index}>
                          <a href={graphicsgallery.asset.url} target="_blank">
                            <img
                              className="w-full"
                              src={resolveImage(graphicsgallery.asset.url)}
                            />
                          </a>
                          <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                        </div>
                      )
                    )}
                </div>
              </div>
              <div>
                <h1
                  className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                  style={{ color: `${singleProjectData.extraColor3}` }}
                >
                  {singleProjectData.prototypeTitle}
                </h1>
                <iframe
                  className="w-full aspect-video"
                  src={singleProjectData.prototypeVideosUrl}
                ></iframe>
              </div>
            </div>
            <div className="mt-6 lg:mt-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.result}
              </h1>
              <div className="text-pcWhite">
                <BlockContent
                  className=""
                  blocks={singleProjectData.resultContent}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
            </div>
          </div>
        ) : singleProjectData.layout === "7" ? (
          <div className="">
            <div className="flex flex-col p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <div>
                <h1
                  className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                  style={{ color: `${singleProjectData.extraColor3}` }}
                >
                  {singleProjectData.processTitle}
                </h1>
                <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                  <BlockContent
                    className=""
                    blocks={singleProjectData.goal}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <img
                    className="py-4 md:py-8"
                    src={resolveImage(singleProjectData.extraImage1.asset.url)}
                    alt={singleProjectData.name}
                  />
                  <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.extraImage1.asset.url)}</p>
                </div>

                <div className=" prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                  <BlockContent
                    className=""
                    blocks={singleProjectData.process}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col mt-6 lg:mt-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <div>
                <h1
                  className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                  style={{ color: `${singleProjectData.extraColor3}` }}
                >
                  {singleProjectData.designSystemTitle}
                </h1>
                <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                  <BlockContent
                    className=""
                    blocks={singleProjectData.designSystem}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 pb-8">
                {singleProjectData &&
                  singleProjectData.designSystemGallery.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>
              <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                <BlockContent
                  className=""
                  blocks={singleProjectData.extraBlock1}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="flex flex-col items-center">
                <img
                  className="py-4 md:py-8"
                  src={resolveImage(singleProjectData.extraImage2.asset.url)}
                  alt={singleProjectData.name}
                />
                <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.extraImage2.asset.url)}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {singleProjectData &&
                  singleProjectData.extraGallery1.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank" className="bg-white rounded-[8px] p-6 flex items-center justify-center">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>

              {singleProjectData.extraBlock3 && (
                <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite mt-6">
                  <BlockContent
                    className=""
                    blocks={singleProjectData.extraBlock3}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>
              )}
              {singleProjectData.extraImage4 && (
                <div className="flex flex-col items-center mt-4">
                  <img
                    className=""
                    src={resolveImage(singleProjectData.extraImage4.asset.url)}
                    alt={singleProjectData.name}
                  />
                  <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.extraImage4.asset.url)}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col mt-6 lg:mt-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.extraTitle1}
              </h1>
              <div className="flex flex-col">
                <img
                  className=""
                  src={resolveImage(singleProjectData.extraImage3.asset.url)}
                  alt={singleProjectData.name}
                />
                <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.extraImage3.asset.url)}</p>
              </div>
            </div>

            <div className="flex flex-col mt-6 lg:mt-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <div className="mb-4">
                <h1
                  className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                  style={{ color: `${singleProjectData.extraColor3}` }}
                >
                  {singleProjectData.extraTitle2}
                </h1>
                <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                  <BlockContent
                    className=""
                    blocks={singleProjectData.extraBlock2}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {singleProjectData &&
                  singleProjectData.extraGallery2.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>
            </div>

            <div className="mt-6 lg:mt-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                Prototype/Staging
              </h1>
              <div className="mb-6">
                <iframe
                  className="w-full aspect-video"
                  src={singleProjectData.prototypeVideosUrl}
                ></iframe>
              </div>
              <div>
                <iframe
                  className="w-full aspect-video"
                  src={singleProjectData.prototypeVideosUrl2}
                ></iframe>
              </div>
            </div>
          </div>
        ) : singleProjectData.layout === "8" ? (
          <div className="">
            <div className="flex flex-col p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <div>
                <h1
                  className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                  style={{ color: `${singleProjectData.extraColor3}` }}
                >
                  {singleProjectData.processTitle}
                </h1>
                <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                  <BlockContent
                    className=""
                    blocks={singleProjectData.goal}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>

                <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                  <BlockContent
                    className=""
                    blocks={singleProjectData.process}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6  mt-4">
                  {singleProjectData.processContent &&
                    singleProjectData.processContent.map(
                      (processContent, id) => (
                        <div
                          className="text-pcWhite font-semibold p-4 md:p-6 rounded-[8px] bg-pcWhite/10"
                          key={id}
                        >
                          {processContent}
                        </div>
                      )
                    )}
                </div>

                <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite mt-4">
                  <BlockContent
                    className=""
                    blocks={singleProjectData.extraBlock1}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col p-6 md:p-10 lg:p-16 mt-6 lg:mt-12 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <div>
                <h1
                  className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                  style={{ color: `${singleProjectData.extraColor3}` }}
                >
                  {singleProjectData.gifTitle || singleProjectData.processTitle}
                </h1>
                <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                  <BlockContent
                    className=""
                    blocks={singleProjectData.process}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>
                <div className="flex flex-col">
                  <img
                    className="pt-4"
                    src={resolveImage(singleProjectData.processImage.asset.url)}
                    alt={singleProjectData.name}
                  />
                  <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.processImage.asset.url)}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col p-6 md:p-10 lg:p-16 mt-6 lg:mt-12 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <div>
                <h1
                  className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                  style={{ color: `${singleProjectData.extraColor3}` }}
                >
                  {singleProjectData.designSystemTitle}
                </h1>
                <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                  <BlockContent
                    className=""
                    blocks={singleProjectData.designSystem}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>

                <div className="flex flex-col">
                  <img
                    className="pt-4 mb-8"
                    src={resolveImage(singleProjectData.designSystemImage.asset.url)}
                    alt={singleProjectData.name}
                  />
                  <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.designSystemImage.asset.url)}</p>
                </div>

                <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                  <BlockContent
                    className=""
                    blocks={singleProjectData.designSystem2}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>

                <div className="flex flex-col">
                  <img
                    className="pt-4"
                    src={resolveImage(singleProjectData.designSystemImage2.asset.url)}
                    alt={singleProjectData.name}
                  />
                  <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.designSystemImage2.asset.url)}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 lg:mt-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.extraTitle1}
              </h1>
              <div className="text-pcWhite">
                <BlockContent
                  className=""
                  blocks={singleProjectData.extraBlock2}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 text-pcWhite mt-4">
                <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite font-medium prose-p:text-[14px] prose-p:leading-[22px] md:prose-p:text-base md:prose-p:leading-7 p-4 md:p-6 rounded-[8px] bg-pcWhite/10 scroll-fade-up">
                  <BlockContent
                    className=""
                    blocks={singleProjectData.extraBlock3}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>
                <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite font-medium prose-p:text-[14px] prose-p:leading-[22px] md:prose-p:text-base md:prose-p:leading-7 p-4 md:p-6 rounded-[8px] bg-pcWhite/10 scroll-fade-up">
                  <BlockContent
                    className=""
                    blocks={singleProjectData.extraBlock4}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 lg:mt-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.extraTitle2}
              </h1>
              <div className="text-pcWhite mb-4">
                <BlockContent
                  className=""
                  blocks={singleProjectData.extraBlock5}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 pb-8">
                {singleProjectData &&
                  singleProjectData.extraGallery1.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>

              <div className="text-pcWhite mb-4">
                <BlockContent
                  className=""
                  blocks={singleProjectData.extraBlock6}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:gap-8 pb-8">
                {singleProjectData &&
                  singleProjectData.extraGallery2.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>

              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.extraTitle3}
              </h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {singleProjectData &&
                  singleProjectData.extraGallery3.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>

              {singleProjectData.extraGallery4 && (
                <div className="grid grid-cols-1 gap-4 md:gap-8 mt-4 md:mt-8">
                  {singleProjectData.extraGallery4.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 lg:mt-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.result}
              </h1>
              <div className="text-pcWhite">
                <BlockContent
                  className=""
                  blocks={singleProjectData.resultContent}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
            </div>
          </div>
        ) : singleProjectData.layout === "9" ? (
          <div className="">
            <div className="flex flex-col p-6 md:p-10 lg:p-16 mt-6 lg:mt-12 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.processTitle}
              </h1>
              <div className="text-pcWhite">
                <BlockContent
                  className=""
                  blocks={singleProjectData.process}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
              <div className="flex flex-col">
                <img
                  className="pt-4 w-full"
                  src={resolveImage(singleProjectData.processImage.asset.url)}
                  alt={singleProjectData.name}
                />
                <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.processImage.asset.url)}</p>
              </div>
            </div>

            <div className="flex flex-col p-6 md:p-10 lg:p-16 mt-6 lg:mt-12 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.designSystemTitle}
              </h1>
              <div className="text-pcWhite mb-4">
                <BlockContent
                  className=""
                  blocks={singleProjectData.designSystem}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {singleProjectData &&
                  singleProjectData.designSystemGallery.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>
            </div>

            <div className="flex flex-col p-6 md:p-10 lg:p-16 mt-6 lg:mt-12 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.gifTitle}
              </h1>
              <div className="text-pcWhite mb-4">
                <BlockContent
                  className=""
                  blocks={singleProjectData.gifBlock}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:gap-8">
                {singleProjectData &&
                  singleProjectData.gifGallery.map((graphicsgallery, index) => (
                    <div key={index}>
                      <a href={graphicsgallery.asset.url} target="_blank">
                        <img className="w-full" src={resolveImage(graphicsgallery.asset.url)} />
                      </a>
                      <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex flex-col p-6 md:p-10 lg:p-16 mt-6 lg:mt-12 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.prototypeTitle}
              </h1>
              <div className="text-pcWhite mb-4">
                <BlockContent
                  className=""
                  blocks={singleProjectData.prototypeBlock}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:gap-8">
                {singleProjectData &&
                  singleProjectData.extraGallery1.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>
            </div>

            <div className="flex flex-col p-6 md:p-10 lg:p-16 mt-6 lg:mt-12 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.extraTitle1}
              </h1>
              <div className="text-pcWhite mb-4">
                <BlockContent
                  className=""
                  blocks={singleProjectData.extraBlock1}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
              <div className="flex flex-col">
                <img
                  className="pt-4"
                  src={resolveImage(singleProjectData.extraImage1.asset.url)}
                  alt={singleProjectData.name}
                />
                <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.extraImage1.asset.url)}</p>
              </div>
            </div>

            <div className="flex flex-col p-6 md:p-10 lg:p-16 mt-6 lg:mt-12 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.extraTitle2}
              </h1>
              <div className="text-pcWhite mb-4">
                <BlockContent
                  className=""
                  blocks={singleProjectData.extraBlock2}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
              <div className="flex flex-col items-center">
                <img
                  className="md:pt-4 md:w-1/2 w-full"
                  src={resolveImage(singleProjectData.extraImage2.asset.url)}
                  alt={singleProjectData.name}
                />
                <p className="mt-1 w-full text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.extraImage2.asset.url)}</p>
              </div>
              <div className="text-pcWhite my-4">
                <BlockContent
                  className=""
                  blocks={singleProjectData.extraBlock3}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="flex flex-col">
                <img
                  className=""
                  src={resolveImage(singleProjectData.extraImage3.asset.url)}
                  alt={singleProjectData.name}
                />
                <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.extraImage3.asset.url)}</p>
              </div>

              <div className="text-pcWhite my-4">
                <BlockContent
                  className=""
                  blocks={singleProjectData.extraBlock4}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:gap-8">
                {singleProjectData &&
                  singleProjectData.extraGallery2.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>

              <div className="text-pcWhite my-4">
                <BlockContent
                  className=""
                  blocks={singleProjectData.extraBlock5}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {singleProjectData &&
                  singleProjectData.extraGallery3.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>
            </div>

            <div className="flex flex-col p-6 md:p-10 lg:p-16 mt-6 lg:mt-12 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.extraTitle3}
              </h1>
              <div className="text-pcWhite mb-4">
                <BlockContent
                  className=""
                  blocks={singleProjectData.extraBlock6}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {singleProjectData &&
                  singleProjectData.extraGallery4.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>

              <div className="flex flex-col">
                <img
                  className="pt-4"
                  src={resolveImage(singleProjectData.extraImage4.asset.url)}
                  alt={singleProjectData.name}
                />
                <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.extraImage4.asset.url)}</p>
              </div>
            </div>

            <div className="flex flex-col p-6 md:p-10 lg:p-16 mt-6 lg:mt-12 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.extraTitle4}
              </h1>
              <div className="text-pcWhite mb-4">
                <BlockContent
                  className=""
                  blocks={singleProjectData.extraBlock7}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="flex flex-col">
                <img
                  className="pt-4"
                  src={resolveImage(singleProjectData.extraImage5.asset.url)}
                  alt={singleProjectData.name}
                />
                <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.extraImage5.asset.url)}</p>
              </div>
            </div>

            <div className="flex flex-col p-6 md:p-10 lg:p-16 mt-6 lg:mt-12 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.extraTitle5}
              </h1>
              <div className="text-pcWhite mb-4">
                <BlockContent
                  className=""
                  blocks={singleProjectData.extraBlock8}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {singleProjectData &&
                  singleProjectData.extraGallery5.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>

              <div className="text-pcWhite my-4">
                <BlockContent
                  className=""
                  blocks={singleProjectData.extraBlock9}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="flex flex-col">
                <img
                  className=""
                  src={resolveImage(singleProjectData.extraImage6.asset.url)}
                  alt={singleProjectData.name}
                />
                <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.extraImage6.asset.url)}</p>
              </div>
            </div>

            <div className="mt-6 lg:mt-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.result}
              </h1>
              <div className="text-pcWhite">
                <BlockContent
                  className=""
                  blocks={singleProjectData.resultContent}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
            </div>
          </div>
        ) : singleProjectData.layout === "10" ? (
          <div>
            <div className="mt-6 lg:mt-12 mb-6 lg:mb-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2 "
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.processTitle}
                <a
                  href="https://www.plangora.com/"
                  className="ml-2 text-[14px] text-pcWhite font-semibold rounded-[24px] px-3 py-1 mr-2 mb-2 bg-white/20 inline-block align-middle hover:bg-white/40 mt-2"
                >
                  View Site
                </a>
              </h1>

              <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                <BlockContent
                  className=""
                  blocks={singleProjectData.process}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex flex-col">
                  <img
                    className=""
                    src={resolveImage(singleProjectData.processImage.asset.url)}
                    alt={singleProjectData.name}
                  />
                  <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.processImage.asset.url)}</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {singleProjectData &&
                    singleProjectData.extraGallery2.map(
                      (graphicsgallery, index) => (
                        <div key={index}>
                          <a href={graphicsgallery.asset.url} target="_blank">
                            <img
                              className="w-full"
                              src={resolveImage(graphicsgallery.asset.url)}
                            />
                          </a>
                          <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                        </div>
                      )
                    )}
                </div>
              </div>

              <div className="mt-4">
                <iframe
                  className="w-full aspect-video"
                  src={singleProjectData.extraTitle4}
                ></iframe>
              </div>
            </div>

            <div className="mt-6 lg:mt-12 mb-6 lg:mb-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2 "
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.designSystemTitle}
                <a
                  href="https://flyinghighwithflutter.com/"
                  className="ml-2 text-[14px] text-pcWhite font-semibold rounded-[24px] px-3 py-1 mr-2 mb-2 bg-white/20 inline-block align-middle hover:bg-white/40 mt-2"
                >
                  View Site
                </a>
              </h1>
              <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                <BlockContent
                  className=""
                  blocks={singleProjectData.designSystem}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:gap-8 mt-4">
                {singleProjectData &&
                  singleProjectData.designSystemGallery.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>

              <div className="mt-4">
                <iframe
                  className="w-full aspect-video"
                  src={singleProjectData.extraTitle5}
                ></iframe>
              </div>
            </div>

            <div className="mt-6 lg:mt-12 mb-6 lg:mb-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2 "
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.gifTitle}
                <a
                  href="https://rustacean-station.org/"
                  className="ml-2 text-[14px] text-pcWhite font-semibold rounded-[24px] px-3 py-1 mr-2 mb-2 bg-white/20 inline-block align-middle hover:bg-white/40 mt-2"
                >
                  View Site
                </a>
              </h1>

              <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                <BlockContent
                  className=""
                  blocks={singleProjectData.gifBlock}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:gap-8 mt-4">
                {singleProjectData &&
                  singleProjectData.gifGallery.map((graphicsgallery, index) => (
                    <div key={index}>
                      <a href={graphicsgallery.asset.url} target="_blank">
                        <img className="w-full" src={resolveImage(graphicsgallery.asset.url)} />
                      </a>
                      <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="mt-6 lg:mt-12 mb-6 lg:mb-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2 "
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.prototypeTitle}
                <a
                  href="https://www.rustwithflutter.com/"
                  className="ml-2 text-[14px] text-pcWhite font-semibold rounded-[24px] px-3 py-1 mr-2 mb-2 bg-white/20 inline-block align-middle hover:bg-white/40 mt-2"
                >
                  View Site
                </a>
              </h1>

              <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                <BlockContent
                  className=""
                  blocks={singleProjectData.prototypeBlock}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="flex flex-col mt-4">
                <img
                  className=""
                  src={resolveImage(singleProjectData.extraImage2.asset.url)}
                  alt={singleProjectData.name}
                />
                <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.extraImage2.asset.url)}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {singleProjectData &&
                  singleProjectData.extraGallery1.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>
            </div>

            <div className="mt-6 lg:mt-12 mb-6 lg:mb-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2 "
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.extraTitle2}
                <a
                  href="https://www.instagram.com/teachmecode.hk/"
                  className="ml-2 text-[14px] text-pcWhite font-semibold rounded-[24px] px-3 py-1 mr-2 mb-2 bg-white/20 inline-block align-middle hover:bg-white/40 mt-2"
                >
                  View Site
                </a>
              </h1>

              <div className="prose max-w-none prose-a:text-pcWhite prose-a:font-semibold prose-strong:text-pcWhite font-pfFont text-pcWhite mb-4
                prose-a:relative prose-a:duration-300 after:prose-a:content-[''] after:prose-a:bg-pcWhite after:prose-a:h-[2px] after:prose-a:w-0 after:prose-a:left-0 after:prose-a:bottom-[8px] after:prose-a:absolute after:prose-a:duration-300 hover:after:prose-a:w-full hover:prose-a:no-underline"
                >
                <BlockContent
                  className=""
                  blocks={singleProjectData.extraBlock2}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="flex flex-col mt-4">
                <img
                  className=""
                  src={resolveImage(singleProjectData.extraImage3.asset.url)}
                  alt={singleProjectData.name}
                />
                <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.extraImage3.asset.url)}</p>
              </div>
            </div>

            <div className="mt-6 lg:mt-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2 "
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.extraTitle1}
                <a
                  href="https://www.thepetalstack.com/"
                  className="ml-2 text-[14px] text-pcWhite font-semibold rounded-[24px] px-3 py-1 mr-2 mb-2 bg-white/20 inline-block align-middle hover:bg-white/40 mt-2"
                >
                  View Site
                </a>
              </h1>
              <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                <BlockContent
                  className=""
                  blocks={singleProjectData.extraBlock1}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
              <div className="flex flex-col mt-4">
                <img
                  className=""
                  src={resolveImage(singleProjectData.extraImage4.asset.url)}
                  alt={singleProjectData.name}
                />
                <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.extraImage4.asset.url)}</p>
              </div>

              <div className="mt-4">
                <iframe
                  className="w-full aspect-video"
                  src={singleProjectData.extraTitle3}
                ></iframe>
              </div>
            </div>
          </div>
        ) : singleProjectData.layout === "11" ? (
          <div>
            <div className="mt-6 lg:mt-12 mb-6 lg:mb-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.designSystemTitle}
                <a
                  href="https://plsigo.app/apply-now/"
                  className="ml-2 text-[12px] md:text-[14px] text-pcWhite font-semibold rounded-[24px] px-3 py-1 mb-2 bg-white/20 inline-block align-middle hover:bg-white/40 mt-2"
                >
                  View Old Form
                </a>

                <a
                  href="https://plsigo.app/apply-now/2"
                  className="ml-2 text-[12px] md:text-[14px] text-pcWhite font-semibold rounded-[24px] px-3 py-1 mr-2 mb-2 bg-white/20 inline-block align-middle hover:bg-white/40 mt-2"
                >
                  View New Form
                </a>
              </h1>
              <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                <BlockContent
                  className=""
                  blocks={singleProjectData.designSystem}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {singleProjectData &&
                  singleProjectData.designSystemGallery.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>

              <iframe
                className="w-full aspect-video mt-4"
                src={singleProjectData.extraTitle1}
              ></iframe>
            </div>

            <div className="mt-6 lg:mt-12 mb-6 lg:mb-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.gifTitle}
              </h1>
              <div className="md:flex flex-row items-center mt-4">
                <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite basis-1/2">
                  <BlockContent
                    className=""
                    blocks={singleProjectData.gifBlock}
                    projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                    dataset="production"
                  />
                </div>
                <div className="flex flex-col items-center mt-4 basis-1/2">
                  <img
                    className="md:w-2/3 w-full"
                    src={resolveImage(singleProjectData.extraImage1.asset.url)}
                    alt={singleProjectData.name}
                  />
                  <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(singleProjectData.extraImage1.asset.url)}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {singleProjectData &&
                  singleProjectData.gifGallery.map((graphicsgallery, index) => (
                    <div key={index}>
                      <a href={graphicsgallery.asset.url} target="_blank">
                        <img className="w-full" src={resolveImage(graphicsgallery.asset.url)} />
                      </a>
                      <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                    </div>
                  ))}
              </div>

              <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite mt-4">
                <BlockContent
                  className=""
                  blocks={singleProjectData.extraBlock1}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {singleProjectData &&
                  singleProjectData.extraGallery1.map(
                    (graphicsgallery, index) => (
                      <div key={index}>
                        <a href={graphicsgallery.asset.url} target="_blank">
                          <img
                            className="w-full"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                        <p className="mt-1 text-xs italic text-pcWhite/50 font-pfFont">{getTitleFromUrl(graphicsgallery.asset.url)}</p>
                      </div>
                    )
                  )}
              </div>
            </div>

            <div className="mt-6 lg:mt-12 p-6 md:p-10 lg:p-16 bg-pcBlack2 rounded-[8px] shadow-[0_0_8px_rgba(255,255,255,0.08)] scroll-fade-up">
              <h1
                className="text-[20px] md:text-[28px] mb-4 font-bold text-pcWhite font-pfFont2"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.result}
              </h1>
              <div className="prose max-w-none prose-strong:text-pcWhite prose-strong:font-pfFont2 font-pfFont text-pcWhite">
                <BlockContent
                  className=""
                  blocks={singleProjectData.resultContent}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
            </div>
          </div>
        ) : singleProjectData.layout === "12" ? (
          <div></div>
        ) : (
          <div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {singleProjectData &&
                singleProjectData.designSystemGallery.map(
                  (graphicsgallery, index) => (
                    <div className="" key={index}>
                      <div className="">
                        <a href={graphicsgallery.asset.url} target="_blank">
                          {" "}
                          <img
                            className="rounded-[8px]"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                      </div>
                    </div>
                  )
                )}
            </div>

            <div>
              <div
                className="lg:text-[40px] text-[28px] text-pcWhite font-pfFont2 font-bold text-center mb-2 py-6 lg:py-12"
                style={{ color: `${singleProjectData.extraColor3}` }}
              >
                {singleProjectData.gifTitle}
              </div>

              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {singleProjectData &&
                  singleProjectData.gifGallery.map((graphicsgallery, index) => (
                    <div className="" key={index}>
                      <div className="">
                        <a href={graphicsgallery.asset.url} target="_blank">
                          {" "}
                          <img
                            className="rounded-[8px]"
                            src={resolveImage(graphicsgallery.asset.url)}
                          />
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
      {lightbox.open && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
}
