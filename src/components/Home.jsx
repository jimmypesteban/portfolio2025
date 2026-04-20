import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import { animate, motion } from "framer-motion";
import { authorData as fallbackAuthor, homepageProjects as fallbackProjects } from "../data/fallback";

const _oldInlineProjects = [
  {
    title: "Plangora Academy",
    headline: "Some Headline 3-5 Words.",
    role: "Creative Designer",
    brief: "The education unit of Plangora Limited.",
    duration: "Nov 2022 - Dec 2022",
    projectTitleColor: "#4DB852",
    projectTagsColor: "#C2F4C2",
    projectButtonColor: "#38863B",
    extraColor1: "#FFFFFF",
    extraColor2: "#212121",
    slug: { _type: "slug", current: "plangora-academy" },
    liveSite: null,
    externalLink: "https://www.behance.net/gallery/169294123/Plangora-Academy",
    projectHomeBanner: { alt: null, asset: { url: "https://cdn.sanity.io/images/7vv89ze2/production/89e5d87b88c01ff2938d9adda064472601ff7248-3840x4320.png" } },
    projectTags: ["Brand Design", "Illustration", "Web Design", "App Design", "Motion Graphic", "Print Design", "School"],
    publishedAt: null,
  },
  {
    title: "DatagoTech",
    headline: "Some Headline 3-5 Words.",
    role: "UX/UI Designer",
    brief: "A financial news risk management with the use of AI and NLP technology.",
    duration: "October 2020 - May 2021",
    projectTitleColor: "#EDF3FF",
    projectTagsColor: "#EDF3FF",
    projectButtonColor: "#8DCAFF",
    extraColor1: "#333333",
    extraColor2: "#EDF3FF",
    slug: { _type: "slug", current: "datagotech" },
    liveSite: "https://www.datagotech.cn/portal",
    externalLink: null,
    projectHomeBanner: { alt: null, asset: { url: "https://cdn.sanity.io/images/7vv89ze2/production/f05c276129879d423e8779e4c44f2a0e1d551ebf-3840x4320.png" } },
    projectTags: ["UI Design", "UX Design", "Design System", "Risk Management"],
    publishedAt: null,
  },
  {
    title: "Hotel Group App",
    headline: "Some Headline 3-5 Words.",
    role: "UI/IxD Designer",
    brief: "A Contactless Travel app for Hotel guests.",
    duration: "January 2022",
    projectTitleColor: "#E7E4E0",
    projectTagsColor: "#F4F4F4",
    projectButtonColor: "#FBF8F4",
    extraColor1: "#252525",
    extraColor2: "#F4F4F4",
    slug: { _type: "slug", current: "hotel-group-app" },
    liveSite: null,
    externalLink: "https://www.behance.net/gallery/163100653/Hotel-Group-App-%28Proposal%29",
    projectHomeBanner: { alt: null, asset: { url: "https://cdn.sanity.io/images/7vv89ze2/production/22658e895c3c6d9e4b173da59783f1242bb7a340-3840x4320.png" } },
    projectTags: ["UI Design", "App Design", "Hotel"],
    publishedAt: null,
  },
  {
    title: "Edtech - NDA (WIP!!!) ",
    headline: "Some Headline 3-5 Words.",
    role: "UI/UX Designer",
    brief: "Making learning fun!",
    duration: "August 2023 - Present",
    projectTitleColor: "#BB104E",
    projectTagsColor: "#F4DFDF",
    projectButtonColor: "#850B37",
    extraColor1: "#FFFFFF",
    extraColor2: null,
    slug: null,
    liveSite: null,
    externalLink: "https://jpesteban.webflow.io/",
    projectHomeBanner: { alt: null, asset: { url: "https://cdn.sanity.io/images/7vv89ze2/production/c27dcb3c5b716989498a10eb8f4a4edfe5d289fd-3840x4320.png" } },
    projectTags: ["EdTech", "UX Design", "UI Design", "Amplitude"],
    publishedAt: null,
  },
  {
    title: "Neuromatics (Trials)",
    headline: "Some Headline 3-5 Words.",
    role: "UX/UI Designer",
    brief: "A place to setup medical trials to participants by doctors.",
    duration: "June 2022 - Dec 2022",
    projectTitleColor: "#842DB7",
    projectTagsColor: "#F4E9F7",
    projectButtonColor: "#44106B",
    extraColor1: "#F4E9F7",
    extraColor2: "#262626",
    slug: { _type: "slug", current: "neuromatics-trials" },
    liveSite: null,
    externalLink: "https://jimmypesteban.com/projects/neuromatics-trials",
    projectHomeBanner: { alt: null, asset: { url: "https://cdn.sanity.io/images/7vv89ze2/production/4aee96f18540d6c4cede00e9000d4121bd6376f7-3840x4320.png" } },
    projectTags: ["UI Design", "UX Design", "Design System", "Medical Trial"],
    publishedAt: null,
  },
  {
    title: "Melon Project ",
    headline: null,
    role: "UI/UX Designer, Logo Designer",
    brief: "A website for online publishing, social news aggregation, and discussions.",
    duration: "October 2020 - December 2020",
    projectTitleColor: "#E34362",
    projectTagsColor: "#FF8F94",
    projectButtonColor: "#B9364F",
    extraColor1: "#FFFFFF",
    extraColor2: "#333333",
    slug: { _type: "slug", current: "melon-project" },
    liveSite: "https://www.datagotech.cn/portal",
    externalLink: null,
    projectHomeBanner: { alt: null, asset: { url: "https://cdn.sanity.io/images/7vv89ze2/production/15dfac37e3520ba27faf56a862beb2e47a41348d-3840x4320.png" } },
    projectTags: ["UI Design", "Styleguide", "Social Platform"],
    publishedAt: null,
  },
];

export default function Home() {
  const [authorData, setAuthorData] = useState(null);
  const [projectData, setProjectData] = useState("Homepage");
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

  // Generate random blob SVG path
  const generateBlobPath = (size = 40) => {
    const points = 8;
    const slice = (Math.PI * 2) / points;
    let d = "";
    const pts = [];
    for (let i = 0; i < points; i++) {
      const angle = slice * i;
      const r = size * (0.7 + Math.random() * 0.6);
      pts.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
    }
    // Build smooth cubic bezier path
    for (let i = 0; i < pts.length; i++) {
      const curr = pts[i];
      const next = pts[(i + 1) % pts.length];
      const prev = pts[(i - 1 + pts.length) % pts.length];
      const cp1x = curr.x + (next.x - prev.x) * 0.25;
      const cp1y = curr.y + (next.y - prev.y) * 0.25;
      const nextPrev = pts[i];
      const nextNext = pts[(i + 2) % pts.length];
      const cp2x = next.x - (nextNext.x - nextPrev.x) * 0.25;
      const cp2y = next.y - (nextNext.y - nextPrev.y) * 0.25;
      if (i === 0) d += `M${curr.x.toFixed(1)},${curr.y.toFixed(1)} `;
      d += `C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${next.x.toFixed(1)},${next.y.toFixed(1)} `;
    }
    return d + "Z";
  };

  const generateBlobKeyframes = (count = 6, size = 40) => {
    return Array.from({ length: count }, () => generateBlobPath(size));
  };

  const blobKeyframes1 = useRef(generateBlobKeyframes(8, 40)).current;
  const blobKeyframes2 = useRef(generateBlobKeyframes(8, 38)).current;
  const blobKeyframes3 = useRef(generateBlobKeyframes(8, 42)).current;

  const ellipseBox = {
    initial: {
      maxheight: "100vh",
      maxwidth: "100vw",
      rotate: "0deg",
    },
    animate: {
      rotate: "360deg",
    },
  };

  const _ellipseVariants3_unused = {
    d: "M24.7,-35.5C31.1,-29.3,34.9,-20.9,36.6,-12.6C38.3,-4.3,38.1,4,35.9,11.9C33.6,19.8,29.4,27.3,23.1,31.5C16.8,35.7,8.4,36.6,0.2,36.3C-8,36.1,-16,34.6,-23.1,30.6C-30.2,26.7,-36.4,20.2,-38.9,12.6C-41.4,5,-40.3,-3.9,-38,-12.8C-35.7,-21.7,-32.2,-30.6,-25.7,-36.7C-19.1,-42.9,-9.6,-46.2,-0.2,-45.9C9.1,-45.6,18.2,-41.6,24.7,-35.5Z",
    animate: {
      d: [
        "M24.7,-35.5C31.1,-29.3,34.9,-20.9,36.6,-12.6C38.3,-4.3,38.1,4,35.9,11.9C33.6,19.8,29.4,27.3,23.1,31.5C16.8,35.7,8.4,36.6,0.2,36.3C-8,36.1,-16,34.6,-23.1,30.6C-30.2,26.7,-36.4,20.2,-38.9,12.6C-41.4,5,-40.3,-3.9,-38,-12.8C-35.7,-21.7,-32.2,-30.6,-25.7,-36.7C-19.1,-42.9,-9.6,-46.2,-0.2,-45.9C9.1,-45.6,18.2,-41.6,24.7,-35.5Z",
        "M22.5,-31.5C29.1,-26.1,34.6,-19.5,37.8,-11.8C41,-4.1,41.9,4.9,39.9,13.5C37.9,22.1,32.9,30.3,25.8,34.9C18.7,39.5,9.3,40.4,0,40.4C-9.2,40.3,-18.5,39.2,-25.5,34.6C-32.4,30,-37.2,21.8,-39.3,13.2C-41.5,4.7,-41.1,-4.3,-38.8,-12.9C-36.4,-21.6,-32.1,-30,-25.4,-35.4C-18.6,-40.7,-9.3,-43.1,-0.7,-42.2C7.9,-41.2,15.8,-36.9,22.5,-31.5Z",
        "M25.9,-36.5C32.5,-30.8,36.1,-21.8,38.5,-12.9C40.9,-3.9,42.1,5.1,40.3,13.9C38.5,22.6,33.7,31.2,26.5,36C19.2,40.8,9.6,42,0.2,41.7C-9.3,41.5,-18.6,39.9,-24.7,34.7C-30.8,29.5,-33.8,20.7,-35.4,12.3C-37.1,3.9,-37.4,-4.2,-35.7,-12.3C-34,-20.4,-30.3,-28.5,-24,-34.3C-17.8,-40.1,-8.9,-43.5,0.4,-44C9.6,-44.5,19.2,-42.1,25.9,-36.5Z",
        "M24.8,-34.5C31,-29.7,34,-20.9,36.4,-12.1C38.9,-3.3,40.9,5.3,38.5,12.5C36.1,19.6,29.3,25.3,22.1,29.5C15,33.7,7.5,36.5,-0.7,37.4C-8.8,38.3,-17.6,37.4,-23.7,32.8C-29.7,28.2,-33,20,-35.1,11.8C-37.3,3.6,-38.4,-4.6,-36.2,-12C-34.1,-19.3,-28.8,-25.8,-22.2,-30.4C-15.7,-35.1,-7.8,-37.8,0.8,-38.8C9.3,-39.8,18.7,-39.2,24.8,-34.5Z",
        "M26.7,-36.7C34.2,-31.4,39.3,-22.9,40.8,-14.2C42.2,-5.5,40,3.4,37,11.8C33.9,20.3,30.1,28.3,23.8,33.5C17.6,38.7,8.8,41.1,0.4,40.6C-8,40.1,-16,36.6,-23.7,31.8C-31.3,27,-38.6,21,-41.9,13.1C-45.2,5.2,-44.5,-4.5,-41.4,-13.2C-38.2,-21.9,-32.7,-29.6,-25.4,-34.9C-18.1,-40.2,-9,-43,0.3,-43.5C9.7,-43.9,19.3,-41.9,26.7,-36.7Z",
      ],
    },
  };

  const ellipseVariants2 = {
    d: "M18.9,-32.4C25.1,-29.2,31.1,-25.3,34.5,-19.8C37.9,-14.3,38.6,-7.1,39.1,0.3C39.6,7.7,39.8,15.4,36.9,21.8C34.1,28.3,28.2,33.4,21.5,36.6C14.8,39.8,7.4,41,0.4,40.4C-6.7,39.7,-13.4,37.2,-19.2,33.5C-25.1,29.9,-30.1,25.1,-34.1,19.3C-38.1,13.5,-41.1,6.8,-42,-0.5C-42.9,-7.8,-41.7,-15.6,-38.2,-22.3C-34.7,-28.9,-28.9,-34.4,-22.1,-37.3C-15.3,-40.1,-7.7,-40.4,-0.7,-39.2C6.4,-38.1,12.7,-35.6,18.9,-32.4Z",
    animate: {
      d: [
        "M18.9,-32.4C25.1,-29.2,31.1,-25.3,34.5,-19.8C37.9,-14.3,38.6,-7.1,39.1,0.3C39.6,7.7,39.8,15.4,36.9,21.8C34.1,28.3,28.2,33.4,21.5,36.6C14.8,39.8,7.4,41,0.4,40.4C-6.7,39.7,-13.4,37.2,-19.2,33.5C-25.1,29.9,-30.1,25.1,-34.1,19.3C-38.1,13.5,-41.1,6.8,-42,-0.5C-42.9,-7.8,-41.7,-15.6,-38.2,-22.3C-34.7,-28.9,-28.9,-34.4,-22.1,-37.3C-15.3,-40.1,-7.7,-40.4,-0.7,-39.2C6.4,-38.1,12.7,-35.6,18.9,-32.4Z",
        "M20.2,-34.2C27,-31,34,-27.3,37.8,-21.5C41.5,-15.8,42.1,-7.9,41.2,-0.5C40.3,6.9,38,13.7,35,20.9C32,28,28.3,35.3,22.4,38.7C16.4,42.1,8.2,41.4,0.6,40.5C-7.1,39.5,-14.2,38.2,-20.8,35.3C-27.4,32.3,-33.5,27.5,-37.6,21.4C-41.7,15.2,-43.9,7.6,-43.6,0.2C-43.3,-7.2,-40.5,-14.5,-36,-20C-31.4,-25.4,-25.2,-29.1,-18.9,-32.7C-12.6,-36.2,-6.3,-39.6,0.2,-39.9C6.7,-40.2,13.3,-37.4,20.2,-34.2Z",
        "M18.9,-33.9C24.8,-29.4,29.9,-24.8,32.9,-19.2C36,-13.5,36.8,-6.8,37.3,0.3C37.8,7.3,37.9,14.6,35.3,21C32.7,27.4,27.5,33,21.1,35.8C14.8,38.7,7.4,38.8,0.2,38.5C-7,38.1,-13.9,37.1,-19.5,33.9C-25.1,30.6,-29.3,25,-33.1,18.9C-36.9,12.9,-40.2,6.5,-41.2,-0.6C-42.3,-7.6,-41,-15.3,-37.3,-21.5C-33.7,-27.8,-27.6,-32.6,-21,-36.7C-14.4,-40.8,-7.2,-44.1,-0.3,-43.6C6.5,-43,13.1,-38.5,18.9,-33.9Z",
        "M19.7,-34.7C25.3,-31,29.4,-25.2,32.6,-19C35.8,-12.9,38,-6.5,38.8,0.5C39.6,7.4,38.9,14.7,35.5,20.4C32,26,25.8,29.9,19.4,33.5C13,37.1,6.5,40.4,0,40.4C-6.6,40.5,-13.2,37.4,-20.4,34.3C-27.5,31.1,-35.3,28,-39.1,22.3C-42.9,16.5,-42.8,8.3,-42,0.5C-41.2,-7.3,-39.7,-14.7,-35.7,-20.2C-31.8,-25.6,-25.4,-29.2,-19,-32.5C-12.6,-35.8,-6.3,-38.8,0.4,-39.5C7.1,-40.1,14.2,-38.5,19.7,-34.7Z",
        "M19.3,-32.6C26,-29.5,33.1,-26.4,36.3,-20.9C39.5,-15.5,38.6,-7.8,38,-0.4C37.3,7,36.9,14,34.4,20.6C31.9,27.3,27.4,33.5,21.4,36.7C15.3,39.9,7.6,40.1,-0.1,40.3C-7.9,40.6,-15.8,40.8,-22.7,38.1C-29.6,35.3,-35.5,29.6,-39.2,22.8C-42.9,16,-44.4,8,-43.3,0.7C-42.1,-6.7,-38.4,-13.3,-34.3,-19.5C-30.2,-25.6,-25.7,-31.3,-20,-34.9C-14.2,-38.5,-7.1,-40.1,-0.4,-39.4C6.3,-38.7,12.6,-35.7,19.3,-32.6Z",
        "M21.2,-36C27.5,-33.2,32.6,-27.5,35.2,-21C37.7,-14.5,37.7,-7.3,37,-0.4C36.3,6.5,35,13,32.4,19.3C29.7,25.5,25.8,31.6,20.1,35.5C14.5,39.4,7.3,41,-0.1,41.2C-7.4,41.4,-14.9,40,-21.5,36.7C-28.1,33.4,-33.9,28.2,-38,21.7C-42.1,15.3,-44.6,7.6,-45,-0.2C-45.4,-8.1,-43.8,-16.2,-39.7,-22.7C-35.5,-29.1,-28.9,-33.8,-21.9,-36.3C-14.9,-38.7,-7.4,-38.9,0,-38.9C7.5,-39,15,-38.9,21.2,-36Z",
        "M20.1,-33.4C26.9,-30.8,33.8,-27.2,36.8,-21.5C39.8,-15.7,38.7,-7.9,38.9,0.1C39,8.1,40.5,16.1,37.6,22C34.8,27.9,27.6,31.7,20.6,34.1C13.6,36.5,6.8,37.6,0.1,37.4C-6.5,37.1,-13.1,35.5,-18.8,32.4C-24.6,29.3,-29.6,24.7,-33.7,19C-37.7,13.3,-40.7,6.7,-41.7,-0.6C-42.7,-7.8,-41.7,-15.6,-38.1,-22.2C-34.6,-28.7,-28.6,-34,-21.9,-36.6C-15.1,-39.2,-7.6,-39.1,-0.5,-38.3C6.6,-37.5,13.2,-35.9,20.1,-33.4Z",
        "M22.6,-39.6C29.1,-35.5,33.8,-28.9,36.5,-21.8C39.3,-14.8,40.1,-7.4,39.5,-0.3C38.9,6.7,36.9,13.4,34.1,20.3C31.2,27.2,27.5,34.1,21.7,39.1C15.8,44,7.9,46.9,0.5,46.1C-7,45.2,-13.9,40.7,-21,36.5C-28,32.3,-35.2,28.4,-39.2,22.3C-43.3,16.3,-44.2,8.2,-42.9,0.8C-41.6,-6.6,-38,-13.3,-33.9,-19.1C-29.8,-25,-25,-30.1,-19.3,-34.6C-13.5,-39.1,-6.8,-43.1,0.7,-44.2C8.1,-45.4,16.2,-43.8,22.6,-39.6Z",
      ],
    },
  };

  const ellipseVariants = {
    start: {
      d: "M21.4,-37.4C27.9,-33.4,33.3,-27.9,36.5,-21.4C39.6,-14.9,40.5,-7.5,41,0.3C41.4,8,41.4,16,37.9,21.7C34.3,27.5,27.2,31.1,20.2,34.4C13.3,37.7,6.7,40.8,0.1,40.7C-6.5,40.5,-12.9,37,-18.4,32.9C-24,28.8,-28.5,23.9,-32.4,18.3C-36.3,12.7,-39.5,6.4,-40.2,-0.4C-40.9,-7.2,-39.1,-14.4,-35.4,-20.4C-31.8,-26.4,-26.3,-31.2,-20.1,-35.3C-13.9,-39.5,-6.9,-42.9,0.3,-43.4C7.5,-43.9,15,-41.4,21.4,-37.4Z",
    },
    end: {
      d: [
        "M21.4,-37.4C27.9,-33.4,33.3,-27.9,36.5,-21.4C39.6,-14.9,40.5,-7.5,41,0.3C41.4,8,41.4,16,37.9,21.7C34.3,27.5,27.2,31.1,20.2,34.4C13.3,37.7,6.7,40.8,0.1,40.7C-6.5,40.5,-12.9,37,-18.4,32.9C-24,28.8,-28.5,23.9,-32.4,18.3C-36.3,12.7,-39.5,6.4,-40.2,-0.4C-40.9,-7.2,-39.1,-14.4,-35.4,-20.4C-31.8,-26.4,-26.3,-31.2,-20.1,-35.3C-13.9,-39.5,-6.9,-42.9,0.3,-43.4C7.5,-43.9,15,-41.4,21.4,-37.4Z",
        "M22.1,-39.5C27.8,-35.1,30.8,-27.3,33.6,-20.2C36.4,-13,38.9,-6.5,40.1,0.7C41.2,7.8,41,15.7,38.1,22.7C35.3,29.8,29.9,36.1,23.1,39.1C16.3,42.1,8.2,41.8,0.4,41.2C-7.5,40.6,-14.9,39.7,-21.1,36.3C-27.2,33,-32.1,27.2,-35.6,20.7C-39.1,14.2,-41.2,7.1,-41.4,-0.1C-41.6,-7.3,-39.9,-14.7,-36.5,-21.4C-33.2,-28.1,-28.2,-34.2,-21.9,-38.2C-15.5,-42.3,-7.8,-44.2,0.2,-44.6C8.3,-45,16.5,-44,22.1,-39.5Z",
        "M21,-35.2C27.4,-32.6,33.1,-27.5,36,-21.2C38.8,-14.9,38.9,-7.5,39.1,0.1C39.2,7.6,39.5,15.3,37.1,22.4C34.7,29.6,29.7,36.2,23.1,39.5C16.5,42.9,8.2,43,0.2,42.6C-7.8,42.3,-15.7,41.5,-21.7,37.8C-27.6,34.1,-31.8,27.4,-34.4,20.6C-37.1,13.8,-38.3,6.9,-37.9,0.3C-37.5,-6.4,-35.3,-12.8,-31.9,-18.3C-28.5,-23.7,-23.7,-28.3,-18.2,-31.5C-12.7,-34.6,-6.3,-36.4,0.5,-37.2C7.3,-38,14.5,-37.8,21,-35.2Z",
        "M20.1,-33.6C26.7,-31.1,33.1,-26.9,36.1,-21C39.1,-15.2,38.9,-7.6,39.5,0.3C40.1,8.3,41.6,16.6,38.6,22.5C35.6,28.5,28.1,32.2,21,34.6C13.8,37,6.9,38.3,0.1,38.1C-6.7,38,-13.5,36.5,-19,33.1C-24.6,29.8,-28.9,24.5,-32.3,18.6C-35.6,12.8,-38,6.4,-39.1,-0.6C-40.2,-7.6,-39.9,-15.3,-36.3,-20.8C-32.8,-26.3,-25.9,-29.7,-19.3,-32.2C-12.7,-34.6,-6.4,-36.1,0.2,-36.5C6.8,-36.9,13.6,-36,20.1,-33.6Z",
        "M19.8,-32.9C26.4,-30.4,33.2,-26.7,36.4,-21C39.6,-15.4,39.2,-7.7,39.2,0C39.2,7.6,39.4,15.3,37.1,22.5C34.8,29.7,29.9,36.5,23.3,40.5C16.7,44.4,8.3,45.6,0.6,44.5C-7,43.4,-14.1,40,-21.1,36.3C-28.2,32.5,-35.2,28.4,-39.6,22.3C-44.1,16.2,-46.1,8.1,-45.2,0.5C-44.4,-7.1,-40.7,-14.3,-36.3,-20.4C-31.8,-26.6,-26.6,-31.9,-20.5,-34.6C-14.3,-37.3,-7.1,-37.6,-0.3,-37.1C6.6,-36.6,13.1,-35.3,19.8,-32.9Z",
        "M22.1,-39.3C28.3,-34.6,32.8,-28.1,35.3,-21.2C37.7,-14.4,38.1,-7.2,37.5,-0.3C36.9,6.5,35.4,13,33,20C30.6,26.9,27.3,34.3,21.7,39C16,43.7,8,45.7,0.2,45.3C-7.5,44.9,-15.1,42,-21.8,38C-28.5,33.9,-34.4,28.6,-38.8,22.1C-43.2,15.5,-46.2,7.8,-45.6,0.4C-44.9,-7,-40.8,-14.1,-36.2,-20.3C-31.6,-26.6,-26.6,-32,-20.5,-36.7C-14.4,-41.5,-7.2,-45.5,0.4,-46.1C7.9,-46.7,15.8,-44,22.1,-39.3Z",
        "M20.3,-36.4C26.5,-31.7,31.7,-26.5,35,-20.3C38.4,-14.2,39.9,-7.1,40.4,0.3C40.9,7.7,40.4,15.3,36.9,21.2C33.3,27,26.8,31,20.1,34.7C13.5,38.4,6.7,41.7,-0.3,42.2C-7.3,42.7,-14.6,40.2,-21.1,36.5C-27.6,32.7,-33.4,27.7,-37.2,21.4C-41,15.1,-42.9,7.5,-41.8,0.6C-40.7,-6.3,-36.7,-12.6,-32.5,-18.2C-28.3,-23.8,-23.8,-28.6,-18.3,-33.8C-12.9,-38.9,-6.4,-44.3,0.3,-44.9C7.1,-45.4,14.2,-41.2,20.3,-36.4Z",
        "M23,-38.9C29.7,-35.9,35.1,-29.7,38.5,-22.6C41.9,-15.6,43.3,-7.8,43.6,0.1C43.8,8.1,42.9,16.1,39.1,22.5C35.2,28.8,28.6,33.3,21.6,36.7C14.6,40.1,7.3,42.4,0.1,42.2C-7.1,42.1,-14.2,39.5,-20.1,35.4C-25.9,31.4,-30.5,25.8,-33.2,19.6C-36,13.5,-36.9,6.7,-37.6,-0.4C-38.3,-7.5,-38.6,-15,-35.9,-21.3C-33.2,-27.5,-27.4,-32.5,-20.9,-35.6C-14.4,-38.8,-7.2,-40,0.5,-40.8C8.1,-41.6,16.2,-41.9,23,-38.9Z",
      ],
    },
  };

  useEffect(() => {
    console.log("called!");

    setTimeout(() => {
      setLoading(false);
    }, 1500);

    sanityClient
      .fetch(
        `*[_type == "project" && "Homepage" in categories[]->title] | order(publishedAt desc){
          "categories": categories[]->title,
          title,
          headline,
          role,
          brief,
          duration,
          projectTitleColor,
          projectTagsColor,
          projectButtonColor,
          extraColor1,
          extraColor2,
          slug,
          liveSite,
          externalLink,
          categories[]->{
            title
          },
          projectLogo{
            asset->{
              _id,
              url
            },
            alt 
          },
          projectBanner{
            asset->{
              _id,
              url
            },
            alt 
          },
          projectHomeBanner{
            asset->{
              _id,
              url
            },
            alt 
          },
          
          publishedAt,
          projectTags
        }`
      )
      .then((data) => {
        setProjectData(data && data.length > 0 ? data : fallbackProjects);
      })
      .catch(() => {
        setProjectData(fallbackProjects);
      });

    return () => {
      clearTimeout();
    };
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "author"]{
              name,
              title,
              bio,
              homeBanner{
                asset->{
                  _id,
                  url
                },
                alt 
              },
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
            Home
          </text>
        </motion.svg>
      </motion.div>
    );
  }

  // console.log(authorData);
  console.log(projectData);
  return (
    <>
      <div className="relative">
        <div
          className="fixed inset-0 bg-repeat -z-10"
          style={{
            backgroundImage:`url(https://raw.githubusercontent.com/jimmypesteban/portfolio2023/main/src/images/Grids3.webp)`,
          }}
        />

        <div className="">
          <div className="font-pfFont2 text-pcWhite">
            <div className="relative w-full h-[calc(100vh-100px)] overflow-hidden">
              <div className="absolute w-full top-[35%] md:text-[56px] text-[32px] font-bold text-center z-10 px-[16px] md:px-[40px]">
                <span className="px-3 py-1 box-decoration-clone rounded-[8px]" style={{ boxDecorationBreak: "clone", backgroundColor: "rgba(25,25,25,1)" }}>
                  Hello I'm {authorData.name}, a UI/UX Designer
                </span>
                <p className="md:text-[24px] text-[20px] mt-4 mb-8 text-center font-medium text-pcGray3 font-pfFont">
                  <span className="px-3 py-1 box-decoration-clone rounded-[8px]" style={{ boxDecorationBreak: "clone", backgroundColor: "rgba(25,25,25,1)" }}>
                    Worked in startup industries such as{" "}
                    <strong>Fintech</strong>, <strong>Edutech</strong>, <strong>IT Consultancy</strong>, and{" "}
                    <strong>Multimedia</strong> companies.
                  </span>
                </p>
                <div>
                  <p className="text-[20px] font-pfFont z-0">
                    <span className="px-3 py-1 box-decoration-clone rounded-[8px]" style={{ boxDecorationBreak: "clone", backgroundColor: "rgba(25,25,25,1)" }}>
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
                    </span>
                  </p>
                </div>
              </div>
              {/* <motion.div
              className="w-[200px] h-[200px] border-2 border-pcWhite relative left-[50%] top-[35%] mix-blend-difference"
              animate={{
                scale: [1, 1, 1],
                rotate: [0, 36, 52],
                borderRadius: [
                  "24% 76% 35% 65%",
                  "27% 36% 64% 73%",
                  "24% 76% 35% 65%",
                ],
              }}
              transition={{
                duration: 1.5,
        ease: [0.87, 0, 0.13, 1],
                times: [0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1,
              }}
            ></motion.div> */}

              {/* viewBox="0 0 100 100" */}

              <div className="absolute inset-0 z-0">
                {/* Blob 1 - small, centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                <motion.svg
                  animate={{
                    x: [0, 80, -60, 40, 0],
                    y: [0, -50, 70, -30, 0],
                    rotate: [0, 15, -10, 5, 0],
                    scale: [1, 0.9, 0.95, 0.85, 1],
                  }}
                  transition={{
                    duration: 20,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="600"
                  height="600"
                  viewBox="-50 -50 100 100"
                  overflow="visible"
                >
                  <motion.path
                    animate={{ d: blobKeyframes1 }}
                    transition={{
                      duration: 14,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    strokeWidth="0.17"
                    stroke="white"
                  />
                </motion.svg>
                </div>

                {/* Blob 2 - medium, centered */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.svg
                  animate={{
                    x: [0, -250, 200, -180, 0],
                    y: [0, 60, -80, 50, 0],
                    rotate: [0, -20, 12, -8, 0],
                    scale: [1, 0.85, 0.9, 0.8, 1],
                  }}
                  transition={{
                    duration: 25,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="900"
                  height="900"
                  viewBox="-50 -50 100 100"
                  overflow="visible"
                >
                  <motion.path
                    animate={{ d: blobKeyframes2 }}
                    transition={{
                      duration: 18,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    strokeWidth="0.11"
                    stroke="white"
                  />
                </motion.svg>
                </div>

                {/* Blob 3 - large, centered */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.svg
                  animate={{
                    x: [0, 300, -280, 220, 0],
                    y: [0, -70, 40, -60, 0],
                    rotate: [0, 10, -15, 8, 0],
                    scale: [1, 0.8, 0.85, 0.75, 1],
                  }}
                  transition={{
                    duration: 30,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1200"
                  height="1200"
                  viewBox="-50 -50 100 100"
                  overflow="visible"
                >
                  <motion.path
                    animate={{ d: blobKeyframes3 }}
                    transition={{
                      duration: 22,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    strokeWidth="0.08"
                    stroke="white"
                  />
                </motion.svg>
                </div>
              </div>

              {/* {authorData.homeBanner !== null && (
              <div className="">
                <img
                  alt={authorData.homeBanner.asset.url}
                  className="w-full h-[calc(100vh-100px)]"
                  src={authorData.homeBanner.asset.url}
                />
              </div>
            )} */}
            </div>
          </div>
        </div>

        <div className="mt-[-240px] md:mt-0  lg:pt-12 2xl:px-[320px] lg:px-[80px] px-[16px]">
          <div className="lg:columns-2 sm:columns-1 gap-10">
            <div className="flex flex-wrap justify-center items-center min-h-[320px]  mb-10 ">
              <div className="relative mb-[-120px] md:mb-0 lg:mb-0 inline-flex lg:text-[96px] text-[64px] text-Black font-bold font-pfFont2 text-center drop-shadow-[0_0.4px_0.4px_#fff]  mix-blend-difference">
                Selected Works
              </div>
              <div className="absolute mb-[-120px] md:mb-0 lg:mb-0 inline-flex lg:text-[48px] text-[32px] font-bold text-pcWhite font-pfFont2 text-center">
                Selected Works
              </div>
            </div>

            <div className="">
              {projectData &&
                projectData.map((projectData, index) => (
                  <div
                    className="md:min-h-[640px] w-full bg-white rounded-[16px] shadow-[0_0_20px_rgba(255,255,255,0.24)] overflow-hidden mb-10 break-inside-avoid"
                    key={index}
                  >
                    <div className="relative">
                      <img
                        alt={projectData.projectHomeBanner.asset.url}
                        className="md:h-full object-cover h-[620px] w-full"
                        src={projectData.projectHomeBanner.asset.url}
                      />
                      <div className="absolute top-0 w-full md:min-h-[640px] p-6 md:p-12 rounded-[8px]">
                        {/* <img
                    className="w-[40px]"
                    src={projectData.projectLogo.asset.url}
                  /> */}

                        <p
                          className="text-[16px] font-semibold"
                          style={{ color: projectData.extraColor2 || "#333333" }}
                        >
                          {projectData.duration}
                        </p>
                        <h1
                          className="font-extrabold md:text-[36px] text-[24px] font-pfFont2"
                          style={{ color: projectData.projectTitleColor || "#333333" }}
                        >
                          {projectData.title}
                        </h1>
                        <p
                          className="text-[16px] md:text-[20px] font-semibold mb-2"
                          style={{ color: projectData.extraColor2 || "#333333" }}
                        >
                          {projectData.role}
                        </p>

                        <div className="flex flex-wrap mb-0 md:mb-1">
                          {projectData.projectTags &&
                            projectData.projectTags.map((projectTags, id) => (
                              <div
                                className="md:text-[14px] text-[12px] font-semibold rounded-[24px] px-3 py-1 mr-2 mb-3 md:mb-2"
                                style={{
                                  backgroundColor: `${projectData.projectTagsColor}`,
                                }}
                                key={id}
                              >
                                {projectTags}
                              </div>
                            ))}
                        </div>

                        <p
                          className="md:text-[16px] font-medium font-pfFont mb-2 md:mb-5"
                          style={{ color: projectData.extraColor2 || "#333333" }}
                        >
                          {projectData.brief}
                        </p>

                        {projectData.externalLink !== null && (
                          <motion.button
                            className="text-pcBlack font-pfFont font-bold py-2 px-4 rounded-full"
                            style={{
                              backgroundColor: `${projectData.projectTitleColor}`,
                            }}
                            whileHover={{
                              backgroundColor: `${projectData.projectButtonColor}`,
                              scale: 1.02,
                            }}
                            transition={{ duration: 0.4 }}
                          >
                            <a
                              style={{
                                color: `${projectData.extraColor1}`,
                              }}
                              href={projectData.externalLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {/* View in Behance */}
                              View Case Study
                            </a>
                          </motion.button>
                        )}
                        {projectData.liveSite !== null && (
                          <motion.button
                            className=" font-pfFont font-bold py-2 px-4 rounded-full"
                            style={{
                              backgroundColor: `${projectData.projectTitleColor}`,
                            }}
                            whileHover={{
                              backgroundColor: `${projectData.projectButtonColor}`,
                              scale: 1.02,
                            }}
                            transition={{ duration: 0.4 }}
                          >
                            <Link
                              style={{
                                color: `${projectData.extraColor1}`,
                              }}
                              to={"/projects/" + projectData.slug.current}
                              key={projectData.slug.current}
                            >
                              View Case Study
                            </Link>
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="pt-[80px] pb-[80px] text-center">
          <button className="h-[72px] w-[160px] bg-pcBlack border border-pcWhite hover:bg-pcWhite hover:text-pcBlack text-pcWhite font-pfFont font-bold py-2 px-4 rounded-full ">
            <Link to="/Projects" className="p-0 md:p-4">
              More Works
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
