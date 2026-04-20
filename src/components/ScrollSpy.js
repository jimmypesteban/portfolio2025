import React, { useState, useEffect, useRef } from "react";

export default function ScrollSpy() {
  const [sections, setSections] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const container = document.querySelector("[data-scrollspy]");
      if (!container) return;

      const headings = container.querySelectorAll("h1");
      const items = [];

      headings.forEach((heading, i) => {
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

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  const activeLabel = sections.find((s) => s.id === activeId)?.label || "Contents";

  if (!visible || sections.length < 2) return null;

  return (
    <>
      {/* Desktop: fixed sidebar */}
      <nav className="fixed top-1/2 -translate-y-1/2 right-4 z-40 hidden xl:block">
        <ul className="flex flex-col gap-1 bg-pcBlack2/90 backdrop-blur-sm rounded-lg p-3 border border-white/10 max-w-[180px]">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                className={`block text-[11px] font-pfFont2 font-medium py-1 px-2 rounded transition-all duration-200 truncate ${
                  activeId === id
                    ? "text-pcWhite bg-white/15"
                    : "text-white/40 hover:text-white/80"
                }`}
                title={label}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile/Tablet: sticky bar below navbar */}
      <div data-scrollspy-bar className="fixed top-[101px] left-0 right-0 z-[45] xl:hidden">
        {/* Toggle bar */}
        <button
          data-scrollspy-toggle
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-pcBlack2 backdrop-blur-sm border-b border-white/10 text-pcWhite"
        >
          <span className="text-[12px] font-pfFont2 font-medium text-white/50 truncate">
            {activeLabel}
          </span>
          <span className={`text-[10px] text-white/50 transition-transform duration-200 ${mobileOpen ? "rotate-180" : ""}`}>
            &#9660;
          </span>
        </button>

        {/* Expandable list */}
        {mobileOpen && (
          <ul data-scrollspy-list className="bg-pcBlack2 backdrop-blur-sm border-b border-white/10 max-h-[50vh] overflow-y-auto">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`block w-full text-left text-[12px] font-pfFont2 font-medium py-2 px-4 transition-all duration-200 truncate ${
                    activeId === id
                      ? "text-pcWhite bg-white/10"
                      : "text-white/40 hover:text-white/80 hover:bg-white/5"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
