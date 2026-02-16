"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitTextPerWord from "./SplitTextPerWord";

export default function Hero() {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const middleRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);

  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const timeline = gsap.timeline({ paused: true });

    // Show container first
    if (contentRef.current) {
      timeline.to(contentRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power1.out",
      });
    }

    // Title
    if (titleRef.current) {
      timeline.from(titleRef.current, {
        y: 60,
        opacity: 0,
        filter: "blur(8px)",
        duration: 1,
        ease: "power3.out",
      });
    }

    // Middle
    if (middleRef.current?.children) {
      timeline.from(
        middleRef.current.children,
        {
          y: 40,
          opacity: 0,
          filter: "blur(6px)",
          stagger: 0.25,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.5",
      );
    }

    // Subtitle
    if (subtitleRef.current) {
      timeline.from(
        subtitleRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4",
      );
    }

    tl.current = timeline;
    // Fallback: auto play after 4s
    const timeout = setTimeout(() => {
      playIntro();
    }, 12000);

    return () => clearTimeout(timeout);
  }, []);

  const playIntro = useCallback(() => {
    if (tl.current && !tl.current.isActive()) {
      tl.current.play();
    }
  }, []);

  return (
    <section id="hero" className="hero-section">
      {/* Video */}
      <video
        src="/videos/hero1.mov"
        className="video-overview"
        autoPlay
        muted
        playsInline
        onEnded={playIntro}
        onError={playIntro}
      />

      {/* Overlay */}
      <div className="overlay" />

      {/* Content */}
      <div ref={contentRef} className="content opacity-0">
        {/* Title */}
        <h1 ref={titleRef} className="hero-title">
          CHASE THE{" "}
          <span className="bg-linear-to-r from-cyan-100 to-sky-300 bg-clip-text text-transparent">
            HORIZON
          </span>
        </h1>

        {/* Middle */}
        <div ref={middleRef} className="middle-content">
          <div className="thumbnail-wrapper">
            <Image
              src="/images/thumbnail.jpg"
              alt="thumbnail"
              width={420}
              height={420}
              priority
              className="thumbnail"
            />
          </div>
          <div className="text-img">
            <SplitTextPerWord
              text="From the first lift"
              className="left-text"
            />
            <SplitTextPerWord text="To the final run" className="right-text" />
          </div>
        </div>

        {/* Subtitle */}
        <p ref={subtitleRef} className="hero-subtitle">
          Experience the winter sport now
        </p>
      </div>
    </section>
  );
}
