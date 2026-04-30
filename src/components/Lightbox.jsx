import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        {/* Close button */}
        <button
          className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors p-2"
          onClick={onClose}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Counter */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/50 text-sm font-pfFont2 z-10">
          {index + 1} / {images.length}
        </div>

        {/* Image + title */}
        <div
          className="relative z-10 flex flex-col items-center px-14"
          onClick={(e) => e.stopPropagation()}
        >
          {/\.mp4$/i.test(images[index].src) ? (
            <video
              key={index}
              src={images[index].src}
              className="max-h-[70vh] md:max-h-[80vh] max-w-full object-contain rounded-[4px]"
              autoPlay
              loop
              muted
              playsInline
              controls
            />
          ) : (
            <motion.img
              key={index}
              src={images[index].src}
              className="max-h-[70vh] md:max-h-[80vh] max-w-full object-contain rounded-[4px] select-none"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15 }}
            />
          )}
          {images[index].title && (
            <p className="mt-3 text-white/60 text-sm font-pfFont2 font-bold text-center capitalize">
              {images[index].title}
            </p>
          )}
        </div>

        {/* Prev arrow — fixed to viewport left center */}
        <button
          className={`absolute left-2 md:left-4 z-10 p-3 bg-black/40 hover:bg-black/70 rounded-full text-white/70 hover:text-white transition-colors ${!hasPrev ? "opacity-30 pointer-events-none" : ""}`}
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Next arrow — fixed to viewport right center */}
        <button
          className={`absolute right-2 md:right-4 z-10 p-3 bg-black/40 hover:bg-black/70 rounded-full text-white/70 hover:text-white transition-colors ${!hasNext ? "opacity-30 pointer-events-none" : ""}`}
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
