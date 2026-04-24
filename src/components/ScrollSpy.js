import React, { useState, useEffect, useRef } from "react";

export default function ScrollSpy() {
  const [sections, setSections] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef(null);
  const pillRefs = useRef({});
  const pillsContainerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const container = document.querySelector("[data-scrollspy]");
      if (!container) return;

      const headings = container.querySelectorAll("h1");
      const items = [];

      headings.forEach((heading, i) => {
        if (i === 0) return; // skip project title
        if (!heading.id) heading.id = `section-${i}`;
        const text = heading.textContent.trim();
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

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  // Center active pill in horizontal scroll container (desktop)
  useEffect(() => {
    if (!activeId) return;
    const pill = pillRefs.current[activeId];
    const container = pillsContainerRef.current;
    if (!pill || !container) return;
    const containerWidth = container.offsetWidth;
    const pillLeft = pill.offsetLeft;
    const pillWidth = pill.offsetWidth;
    const targetScroll = pillLeft - containerWidth / 2 + pillWidth / 2;
    container.scrollTo({ left: targetScroll, behavior: "smooth" });
  }, [activeId]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 180; // sticky navbar (~101px) + scrollspy bar (~44px) + buffer
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
    setMobileOpen(false);
  };

  const activeLabel = sections.find((s) => s.id === activeId)?.label || "Contents";

  if (!visible || sections.length < 2) return null;

  return (
    <div data-scrollspy-bar className="fixed top-[101px] left-0 right-0 z-[45]">
      {/* Mobile/Tablet: toggle dropdown (below lg) */}
      <div className="lg:hidden">
        <button
          data-scrollspy-toggle
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between px-4 md:px-8 py-2.5 bg-pcWhite border-b border-pcBlack/10 text-pcBlack shadow-sm"
        >
          <span className="text-[12px] md:text-[14px] font-pfFont2 font-medium text-pcBlack/60 truncate">
            <span className="text-pcBlack/50">Current Section:</span> <span className="text-pcBlack font-semibold">{activeLabel}</span>
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
        <div className="flex items-center gap-4 pl-8 xl:pl-16 2xl:pl-[80px] py-3">
          <span className="text-[11px] font-pfFont2 font-bold tracking-widest text-pcBlack/50 uppercase whitespace-nowrap shrink-0">
            On this page
          </span>
          <div
            ref={pillsContainerRef}
            className="flex items-center gap-2 flex-nowrap overflow-x-auto pr-8 xl:pr-16 2xl:pr-[80px] scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style>{`
              [data-scrollspy-bar] .scrollbar-hide::-webkit-scrollbar { display: none; }
            `}</style>
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
        </div>
      </div>
    </div>
  );
}
