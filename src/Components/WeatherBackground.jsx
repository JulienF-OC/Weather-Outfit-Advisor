import { useMemo } from "react";

function WeatherBackground({ code, weatherLoaded, children }) {
  const particles = useMemo(() => {
    if (!weatherLoaded) return [];

    if ((code >= 45 && code <= 67) || (code >= 80 && code <= 82)) {
      return Array.from({ length: 70 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 1.5}s`,
        duration: `${0.8 + Math.random() * 0.9}s`,
        height: `${12 + Math.random() * 20}px`,
        opacity: 0.25 + Math.random() * 0.35,
      }));
    }

    if (code >= 71 && code <= 77) {
      return Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 4}s`,
        duration: `${4 + Math.random() * 4}s`,
        size: `${4 + Math.random() * 6}px`,
        opacity: 0.45 + Math.random() * 0.4,
      }));
    }

    return [];
  }, [code, weatherLoaded]);

  const theme = (() => {
    if (!weatherLoaded) {
      return {
        gradient:
          "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_35%),linear-gradient(160deg,#0f172a_0%,#1e3a8a_45%,#38bdf8_100%)]",
        overlay: "bg-black/20",
        glow: "bg-cyan-300/20",
      };
    }

    if (code === 0) {
      return {
        gradient:
          "bg-[radial-gradient(circle_at_top_right,rgba(255,220,120,0.45),transparent_25%),linear-gradient(160deg,#0f172a_0%,#1d4ed8_45%,#f59e0b_100%)]",
        overlay: "bg-black/20",
        glow: "bg-amber-300/20",
      };
    }

    if (code >= 1 && code <= 3) {
      return {
        gradient:
          "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_25%),linear-gradient(160deg,#0f172a_0%,#334155_45%,#64748b_100%)]",
        overlay: "bg-black/30",
        glow: "bg-slate-200/10",
      };
    }

    if ((code >= 45 && code <= 67) || (code >= 80 && code <= 82)) {
      return {
        gradient:
          "bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.18),transparent_20%),linear-gradient(160deg,#020617_0%,#0f172a_45%,#1d4ed8_100%)]",
        overlay: "bg-black/35",
        glow: "bg-blue-300/10",
      };
    }

    if (code >= 71 && code <= 77) {
      return {
        gradient:
          "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_20%),linear-gradient(160deg,#0f172a_0%,#1e293b_45%,#94a3b8_100%)]",
        overlay: "bg-black/30",
        glow: "bg-white/10",
      };
    }

    return {
      gradient:
        "bg-[linear-gradient(160deg,#0f172a_0%,#334155_45%,#475569_100%)]",
      overlay: "bg-black/25",
      glow: "bg-white/10",
    };
  })();

  return (
    <div className={`relative min-h-screen overflow-hidden ${theme.gradient}`}>
      <div className={`absolute inset-0 ${theme.overlay}`} />

      <div
        className={`absolute left-1/2 top-[-120px] h-[340px] w-[340px] -translate-x-1/2 rounded-full blur-3xl ${theme.glow}`}
      />

      {!weatherLoaded && (
        <>
          <div className="absolute left-[8%] top-[18%] h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-[12%] top-[28%] h-56 w-56 rounded-full bg-cyan-200/10 blur-3xl" />
        </>
      )}

      {weatherLoaded && code >= 1 && code <= 3 && (
        <>
          <div className="absolute left-[8%] top-[14%] h-24 w-52 animate-cloud rounded-full bg-white/10 blur-sm" />
          <div className="absolute left-[55%] top-[22%] h-20 w-40 animate-cloudSlow rounded-full bg-white/10 blur-sm" />
          <div className="absolute left-[22%] top-[30%] h-16 w-32 animate-cloud rounded-full bg-white/10 blur-sm" />
        </>
      )}

      {weatherLoaded &&
        ((code >= 45 && code <= 67) || (code >= 80 && code <= 82)) &&
        particles.map((drop) => (
          <span
            key={drop.id}
            className="absolute top-[-40px] w-[2px] rounded-full bg-white/40 animate-rain"
            style={{
              left: drop.left,
              height: drop.height,
              animationDelay: drop.delay,
              animationDuration: drop.duration,
              opacity: drop.opacity,
            }}
          />
        ))}

      {weatherLoaded &&
        code >= 71 &&
        code <= 77 &&
        particles.map((flake) => (
          <span
            key={flake.id}
            className="absolute top-[-20px] rounded-full bg-white animate-snow"
            style={{
              left: flake.left,
              width: flake.size,
              height: flake.size,
              animationDelay: flake.delay,
              animationDuration: flake.duration,
              opacity: flake.opacity,
            }}
          />
        ))}

      {children}
    </div>
  );
}

export default WeatherBackground;