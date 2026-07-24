"use client";
import React, { useState, useEffect } from "react";
import { TypingAnimation } from "@/components/home/TypingAnimation";

export function TypingAnimationWrapper({ settings }: { settings: any }) {
  const highlightStr: string = settings?.heroHighlighted || "warm & premium";
  const highlightWords = highlightStr.split(",").map((s: string) => s.trim()).filter(Boolean);
  return (
    <div className="mt-2 min-h-[40px] md:min-h-[66px]">
      <div className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--primary)] font-heading leading-[1.1]">
        <TypingAnimation words={highlightWords} config={settings?.typingConfig as any} className="text-[var(--primary)]" />
      </div>
    </div>
  );
}
