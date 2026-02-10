import { useEffect, useState, useRef } from "react";

const SMOOTH = 0.08;
const MAX_OFFSET = 32;

export default function LiveHeroBackground() {
  const [smoothed, setSmoothed] = useState({ x: 0.5, y: 0.5 });
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const raf = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;

    const handleMove = (e: MouseEvent) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      const mouse = mouseRef.current;
      setSmoothed((prev) => ({
        x: lerp(prev.x, mouse.x, SMOOTH),
        y: lerp(prev.y, mouse.y, SMOOTH),
      }));
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const dx = (smoothed.x - 0.5) * 2 * MAX_OFFSET;
  const dy = (smoothed.y - 0.5) * 2 * MAX_OFFSET;
  const cursorX = smoothed.x * 100;
  const cursorY = smoothed.y * 100;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-[#f1f5f9] dark:bg-slate-950"
      aria-hidden
    >
      {/* Small cursor-following darkening – minute spot that slightly darkens the live background under the mouse */}
      <div
        className="pointer-events-none absolute z-[1]"
        style={{
          left: `${cursorX}%`,
          top: `${cursorY}%`,
          width: "140px",
          height: "140px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle 55% at 50% 50%, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.06) 45%, transparent 70%)",
          filter: "blur(8px)",
          transition: "left 0.1s ease-out, top 0.1s ease-out",
        }}
      />

      {/* 2) Floating blobs – use global keyframes from index.css */}
      <div
        className="absolute -left-[5%] top-[0%] transition-transform duration-300 ease-out"
        style={{
          width: "80vmax",
          height: "80vmax",
          transform: `translate(${dx}px, ${dy}px)`,
        }}
      >
        <div
          className="h-full w-full rounded-full blur-[60px]"
          style={{
            background:
              "radial-gradient(circle 50% at 50% 50%, rgba(59,130,246,0.65) 0%, rgba(59,130,246,0.3) 40%, transparent 65%)",
            animation: "hero-blob-1 16s ease-in-out infinite",
          }}
        />
      </div>
      <div
        className="absolute -right-[5%] bottom-[0%] transition-transform duration-300 ease-out"
        style={{
          width: "70vmax",
          height: "70vmax",
          transform: `translate(${-dx * 0.8}px, ${-dy * 0.8}px)`,
        }}
      >
        <div
          className="h-full w-full rounded-full blur-[60px]"
          style={{
            background:
              "radial-gradient(circle 50% at 50% 50%, rgba(99,102,241,0.6) 0%, rgba(99,102,241,0.25) 40%, transparent 65%)",
            animation: "hero-blob-2 20s ease-in-out infinite",
          }}
        />
      </div>
      <div
        className="absolute left-1/2 top-1/2 transition-transform duration-300 ease-out"
        style={{
          width: "55vmax",
          height: "55vmax",
          transform: `translate(calc(-50% + ${dx * 0.6}px), calc(-50% + ${dy * 0.6}px))`,
        }}
      >
        <div
          className="h-full w-full rounded-full blur-[50px]"
          style={{
            background:
              "radial-gradient(circle 50% at 50% 50%, rgba(59,130,246,0.5) 0%, rgba(147,197,253,0.2) 45%, transparent 65%)",
            animation: "hero-blob-3 18s ease-in-out infinite",
          }}
        />
      </div>

      {/* 3) Moving grid – clearly visible lines */}
      <div
        className="absolute inset-0 opacity-90 dark:opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(100,116,139,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,0.35) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          animation: "hero-grid-move 22s linear infinite",
        }}
      />
      <div
        className="absolute inset-0 opacity-70 dark:opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(100,116,139,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,0.25) 1px, transparent 1px)",
          backgroundSize: "128px 128px",
          animation: "hero-grid-move 28s linear infinite reverse",
        }}
      />
    </div>
  );
}
