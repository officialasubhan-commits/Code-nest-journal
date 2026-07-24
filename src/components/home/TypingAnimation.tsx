"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypingAnimationProps {
  words: string[];
  className?: string;
  config?: {
    textColor?: string;
    fontWeight?: string;
    fontSize?: string;
    textTransform?: string;
    letterSpacing?: string;
    gradientEnabled?: boolean;
    gradientStart?: string;
    gradientEnd?: string;
    shadowEnabled?: boolean;
    animationEnabled?: boolean;
    fontFamily?: string;
    lineHeight?: string;
    wordSpacing?: string;
    delayBetweenWords?: number; // repurposed as show duration per phrase
  };
}

export function TypingAnimation({
  words,
  className = "",
  config
}: TypingAnimationProps) {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Memoize configuration with fallback defaults
  const resolved = useMemo(() => ({
    textColor: config?.textColor || "#F97316",
    fontWeight: config?.fontWeight || "700",
    fontSize: config?.fontSize || "inherit",
    textTransform: config?.textTransform || "none",
    letterSpacing: config?.letterSpacing || "normal",
    gradientEnabled: config?.gradientEnabled ?? false,
    gradientStart: config?.gradientStart || "#F97316",
    gradientEnd: config?.gradientEnd || "#FB7185",
    shadowEnabled: config?.shadowEnabled ?? false,
    animationEnabled: config?.animationEnabled ?? true,
    fontFamily: config?.fontFamily || "inherit",
    lineHeight: config?.lineHeight || "normal",
    wordSpacing: config?.wordSpacing || "normal",
    duration: config?.delayBetweenWords !== undefined ? Number(config.delayBetweenWords) : 3000
  }), [config]);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!mounted || prefersReducedMotion || !words?.length || !resolved.animationEnabled || words.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, resolved.duration);

    return () => clearInterval(interval);
  }, [mounted, words, prefersReducedMotion, resolved.animationEnabled, resolved.duration]);

  const textStyle: React.CSSProperties = {
    fontFamily: resolved.fontFamily !== "inherit" ? resolved.fontFamily : undefined,
    fontWeight: resolved.fontWeight,
    fontSize: resolved.fontSize !== "inherit" ? resolved.fontSize : undefined,
    textTransform: resolved.textTransform as any,
    letterSpacing: resolved.letterSpacing !== "normal" ? resolved.letterSpacing : undefined,
    wordSpacing: resolved.wordSpacing !== "normal" ? resolved.wordSpacing : undefined,
    lineHeight: resolved.lineHeight !== "normal" ? resolved.lineHeight : undefined,
    textShadow: resolved.shadowEnabled ? "2px 2px 4px rgba(0, 0, 0, 0.15)" : undefined,
    display: "inline-block",
  };

  if (resolved.gradientEnabled) {
    textStyle.backgroundImage = `linear-gradient(to right, ${resolved.gradientStart}, ${resolved.gradientEnd})`;
    textStyle.WebkitBackgroundClip = "text";
    textStyle.WebkitTextFillColor = "transparent";
  } else {
    textStyle.color = resolved.textColor;
  }

  // Prevent server layout shifts by returning first word statically during SSR
  if (!mounted || prefersReducedMotion || !resolved.animationEnabled || !words?.length) {
    return (
      <span className={className} style={textStyle}>
        {words?.[0] || ""}
      </span>
    );
  }

  const currentWord = words[index] || "";

  return (
    <div className="relative inline-block overflow-hidden align-top" style={{ height: "1.25em" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block whitespace-nowrap ${className}`}
          style={textStyle}
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
