import React, { useState, useEffect, useRef } from "react";

export default function ScrollSpy() {
  const [sections, setSections] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const observerRef = useRef(null);
  const pillRefs = useRef({});
  const pillsContainerRef = useRef(null);
  const mobileBarRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const container = document.querySelector("[data-scrollspy]");
      if (!container) return;

      const headings = container.querySelectorAll("h1");
      const items = [];

      headings.forEach((heading, i) => {
        if (i === 0) return; // skip project title
        if (!heading.id) heading.id = `section-${i}`;
        // Use only direct text nodes to exclude inline links like "View Site"
        const text = Array.from(heading.childNodes)
          .filter((n) => n.nodeType === Node.TEXT_NODE)
          .map((n) => n.textContent.trim())
          .join(" ")
          .trim();
        if (text && text.length < 60) {
          items.push({ id: heading.id, label: text });
        }
      });

      const overviewEl = container.querySelector("[data-section='overview']");
      if (overviewEl) {
        if (!overviewEl.id) overviewEl.id = "section-overview";
        items.unshift({ id: overviewEl.id, label: "Overview" });
      }

      setSections(items);

      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const visibleEntry = entries.find((e) => e.isIntersecting);
          if (visibleEntry) setActiveId(visibleEntry.target.id);
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );

      items.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observerRef.current.observe(el);
      });
    }, 2500);

    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);

    const onClickOutside = (e) => {
      if (mobileBarRef.current && !mobileBarRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("touchstart", onClickOutside);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("touchstart", onClickOutside);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  // Track scrollability of pills container
  useEffect(() => {
    const c = pillsContainerRef.current;
    if (!c) return;
    const check = () => {
      setCanScrollLeft(c.scrollLeft > 4);
      setCanScrollRight(c.scrollLeft + c.clientWidth < c.scrollWidth - 4);
    };
    const raf = requestAnimationFrame(check); // wait for paint before measuring
    c.addEventListener("scroll", check);
    window.addEventListener("resize", check);
    return () => {
      cancelAnimationFrame(raf);
      c.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [sections]);

  // Center active pill in horizontal scroll container (desktop)
  useEffect(() => {
    if (!activeId) return;
    const pill = pillRefs.current[activeId];
    const container = pillsContainerRef.current;
    if (!pill || !container) return;
    const targetScroll = pill.offsetLeft - container.offsetWidth / 2 + pill.offsetWidth / 2;
    container.scrollTo({ left: targetScroll, behavior: "smooth" });
  }, [activeId]);

  const scrollPills = (dir) => {
    pillsContainerRef.current?.scrollBy({ left: dir * 240, behavior: "smooth" });
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 180; // sticky navbar (~101px) + scrollspy bar (~44px) + buffer
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
    setMobileOpen(false);
  };

  const activeLabel = sections.find((s) => s.id === activeId)?.label || "Contents";
  const hasOverflow = canScrollLeft || canScrollRight;

  if (!visible || sections.length < 2) return null;

  return (
    <div data-scrollspy-bar className="fixed top-[101px] left-0 right-0 z-[45]">
      {/* Mobile/Tablet: toggle dropdown (below lg) */}
      <div ref={mobileBarRef} className="lg:hidden">
        <button
          data-scrollspy-toggle
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between px-4 md:px-8 py-2.5 bg-pcWhite border-b border-pcBlack/10 text-pcBlack shadow-sm"
        >
          <span className="text-[12px] md:text-[14px] font-pfFont2 font-medium text-pcBlack/60 truncate">
            <span className="text-pcBlack/50">Current Section:</span>{" "}
            <span className="text-pcBlack font-semibold">{activeLabel}</span>
          </span>
          <span className={`text-[10px] text-pcBlack/60 transition-transform duration-200 ${mobileOpen ? "rotate-180" : ""}`}>
            &#9660;
          </span>
        </button>

        {mobileOpen && (
          <ul data-scrollspy-list className="bg-pcWhite border-b border-pcBlack/10 max-h-[60vh] overflow-y-auto shadow-md">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`block w-full text-left text-[12px] md:text-[14px] font-pfFont2 font-medium py-2 px-4 md:px-8 transition-all duration-200 truncate ${
                    activeId === id
                      ? "text-pcBlack bg-pcBlack/10 font-semibold"
                      : "text-pcBlack/60 hover:text-pcBlack hover:bg-pcBlack/5"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Desktop: horizontal pill bar (lg+) */}
      <div className="hidden lg:block bg-pcWhite border-b border-pcBlack/10 shadow-sm">
        <style>{`[data-scrollspy-bar] .pills-scroll::-webkit-scrollbar { display: none; }`}</style>
        <div className={`flex items-center gap-3 py-3 ${hasOverflow ? "px-4 xl:px-8 2xl:px-[80px]" : "justify-center px-8 xl:px-16 2xl:px-[80px]"}`}>
          <span className="text-[11px] font-pfFont2 font-bold tracking-widest text-pcBlack/50 uppercase whitespace-nowrap shrink-0">
            On this page
          </span>

          {/* Left chevron */}
          <button
            onClick={() => scrollPills(-1)}
            aria-label="Scroll left"
            className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-pcBlack/15 text-pcBlack/50 hover:text-pcBlack hover:border-pcBlack/40 transition-all ${
              canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none w-0 border-0 overflow-hidden"
            }`}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.5 2L3.5 5L6.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Pills + gradient overlays */}
          <div className={`relative flex items-center min-w-0 ${hasOverflow ? "flex-1" : ""}`}>
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            )}
            <div
              ref={pillsContainerRef}
              className="pills-scroll flex items-center gap-2 flex-nowrap overflow-x-auto w-full"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {sections.map(({ id, label }) => (
                <button
                  key={id}
                  ref={(el) => { if (el) pillRefs.current[id] = el; }}
                  onClick={() => scrollTo(id)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-pfFont2 font-medium transition-all duration-200 border shrink-0 ${
                    activeId === id
                      ? "bg-pcBlack text-pcWhite border-pcBlack"
                      : "bg-pcWhite text-pcBlack/80 border-pcBlack/15 hover:border-pcBlack/40 hover:text-pcBlack"
                  }`}
                  title={label}
                >
                  {label}
                </button>
              ))}
            </div>
            {canScrollRight && (
              <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            )}
          </div>

          {/* Right chevron */}
          <button
            onClick={() => scrollPills(1)}
            aria-label="Scroll right"
            className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-pcBlack/15 text-pcBlack/50 hover:text-pcBlack hover:border-pcBlack/40 transition-all ${
              canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none w-0 border-0 overflow-hidden"
            }`}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.5 2L6.5 5L3.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
