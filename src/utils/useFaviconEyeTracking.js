import { useEffect } from "react";

export function getStarFaviconSvg(dx = 0, dy = 0) {
  const leftX = (76 + dx).toFixed(1);
  const leftY = (100 + dy).toFixed(1);
  const rightX = (122 + dx).toFixed(1);
  const rightY = (100 + dy).toFixed(1);

  return `<svg width="226" height="226" viewBox="0 0 226 226" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M107.71 6.32184C110.448 3.03318 115.497 3.03318 118.235 6.32184L155.688 51.3165C156.417 52.1921 157.353 52.872 158.411 53.2945L212.777 75.0108C216.751 76.5981 218.311 81.4005 216.029 85.0203L184.81 134.545C184.203 135.509 183.846 136.609 183.771 137.745L179.917 196.161C179.636 200.431 175.55 203.399 171.403 202.348L114.655 187.961C113.551 187.681 112.394 187.681 111.29 187.961L54.542 202.348C50.3944 203.399 46.3091 200.431 46.0275 196.161L42.1742 137.745C42.0992 136.609 41.7418 135.509 41.1343 134.545L9.91554 85.0203C7.63377 81.4005 9.19419 76.5981 13.1678 75.0108L67.5341 53.2945C68.592 52.872 69.5278 52.1921 70.2566 51.3165L107.71 6.32184Z" fill="#FFD203"/>
<path d="M107.71 6.32184C110.448 3.03318 115.497 3.03318 118.235 6.32184L155.688 51.3165C156.417 52.1921 157.353 52.872 158.411 53.2945L212.777 75.0108C216.751 76.5981 218.311 81.4005 216.029 85.0203L184.81 134.545C184.203 135.509 183.846 136.609 183.771 137.745L179.917 196.161C179.636 200.431 175.55 203.399 171.403 202.348L114.655 187.961C113.551 187.681 112.394 187.681 111.29 187.961L54.542 202.348C50.3944 203.399 46.3091 200.431 46.0275 196.161L42.1742 137.745C42.0992 136.609 41.7418 135.509 41.1343 134.545L9.91554 85.0203C7.63377 81.4005 9.19419 76.5981 13.1678 75.0108L67.5341 53.2945C68.592 52.872 69.5278 52.1921 70.2566 51.3165L107.71 6.32184Z" fill="url(#paint0_linear_247_800)" fill-opacity="0.2"/>
<mask id="mask0_247_800" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="8" y="3" width="210" height="200">
<path d="M107.71 6.32184C110.448 3.03318 115.497 3.03318 118.235 6.32184L155.688 51.3165C156.417 52.1921 157.353 52.872 158.411 53.2945L212.777 75.0108C216.751 76.5981 218.311 81.4005 216.029 85.0203L184.81 134.545C184.203 135.509 183.846 136.609 183.771 137.745L179.917 196.161C179.636 200.431 175.55 203.399 171.403 202.348L114.655 187.961C113.551 187.681 112.394 187.681 111.29 187.961L54.542 202.348C50.3944 203.399 46.3091 200.431 46.0275 196.161L42.1742 137.745C42.0992 136.609 41.7418 135.509 41.1343 134.545L9.91554 85.0203C7.63377 81.4005 9.19419 76.5981 13.1678 75.0108L67.5341 53.2945C68.592 52.872 69.5278 52.1921 70.2566 51.3165L107.71 6.32184Z" fill="#FFD203"/>
</mask>
<g mask="url(#mask0_247_800)">
<g filter="url(#filter0_f_247_800)">
<ellipse cx="51" cy="118" rx="34" ry="16" fill="#FF0307"/>
</g>
<g filter="url(#filter1_f_247_800)">
<ellipse cx="175" cy="118" rx="34" ry="16" fill="#FF0307"/>
</g>
<ellipse cx="${leftX}" cy="${leftY}" rx="10" ry="13" fill="#0C1821"/>
<ellipse cx="${rightX}" cy="${rightY}" rx="10" ry="13" fill="#0C1821"/>
</g>
<defs>
<filter id="filter0_f_247_800" x="-33" y="52" width="168" height="132" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="25" result="effect1_foregroundBlur_247_800"/>
</filter>
<filter id="filter1_f_247_800" x="91" y="52" width="168" height="132" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="25" result="effect1_foregroundBlur_247_800"/>
</filter>
<linearGradient id="paint0_linear_247_800" x1="112.972" y1="0" x2="112.972" y2="225.945" gradientUnits="userSpaceOnUse">
<stop stop-color="#666666" stop-opacity="0"/>
<stop offset="1" stop-color="#FF0000"/>
</linearGradient>
</defs>
</svg>`;
}

export function useFaviconEyeTracking() {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;

    if (prefersReducedMotion) {
      return;
    }

    let rafId = null;
    let lastDx = null;
    let lastDy = null;

    const setEyes = (dx, dy) => {
      // Quantize to 0.5 units to prevent unnecessary DOM re-renders
      const qx = Math.round(dx * 2) / 2;
      const qy = Math.round(dy * 2) / 2;

      if (qx === lastDx && qy === lastDy) {
        return;
      }
      lastDx = qx;
      lastDy = qy;

      const svg = getStarFaviconSvg(qx, qy);
      const dataUri = `data:image/svg+xml,${encodeURIComponent(svg)}`;

      const newLink = document.createElement("link");
      newLink.id = "dynamic-favicon";
      newLink.rel = "icon";
      newLink.type = "image/svg+xml";
      newLink.href = dataUri;

      const existingLink = document.querySelector("link[rel*='icon']");
      if (existingLink) {
        existingLink.replaceWith(newLink);
      } else {
        document.head.appendChild(newLink);
      }
    };

    const handleMouseMove = (e) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const relX = (e.clientX - centerX) / Math.max(centerX, 1);
        const relY = (e.clientY - centerY) / Math.max(centerY, 1);

        const dist = Math.hypot(relX, relY);
        const angle = Math.atan2(relY, relX);
        const clampedDist = Math.min(dist, 1);

        // Maximum offset in SVG units for the eyes
        const MAX_OFFSET_X = 12;
        const MAX_OFFSET_Y = 8;

        const dx = Math.cos(angle) * clampedDist * MAX_OFFSET_X;
        const dy = Math.sin(angle) * clampedDist * MAX_OFFSET_Y;

        setEyes(dx, dy);
      });
    };

    const handleMouseLeave = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      setEyes(0, 0);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        setEyes(0, 0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
}
