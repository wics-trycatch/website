import { useEffect, useRef } from "react";

export default function StarNavLogo({ className = "h-[2.4rem] w-auto" }) {
  const svgRef = useRef(null);
  const eyesRef = useRef(null);

  useEffect(() => {
    const svgEl = svgRef.current;
    const eyesEl = eyesRef.current;
    if (!svgEl || !eyesEl) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;
    let isAnimating = false;

    const MAX_OFFSET_X = 14;
    const MAX_OFFSET_Y = 10;
    const MAX_DISTANCE = 350; // Distance in px at which eye offset maxes out

    const render = () => {
      // Smooth spring/ease towards target
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;

      const diff = Math.hypot(targetX - currentX, targetY - currentY);
      if (diff < 0.05) {
        currentX = targetX;
        currentY = targetY;
        eyesEl.setAttribute(
          "transform",
          `translate(${currentX.toFixed(2)} ${currentY.toFixed(2)})`
        );
        isAnimating = false;
        return;
      }

      eyesEl.setAttribute(
        "transform",
        `translate(${currentX.toFixed(2)} ${currentY.toFixed(2)})`
      );

      rafId = requestAnimationFrame(render);
    };

    const startAnimation = () => {
      if (!isAnimating) {
        isAnimating = true;
        rafId = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (e) => {
      const rect = svgEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      const dist = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);
      const intensity = Math.min(dist / MAX_DISTANCE, 1);

      targetX = Math.cos(angle) * intensity * MAX_OFFSET_X;
      targetY = Math.sin(angle) * intensity * MAX_OFFSET_Y;

      startAnimation();
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      startAnimation();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 226 226"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-transform duration-200 hover:scale-110 shrink-0`}
      aria-label="try/CATCH home"
      role="img"
    >
      {/* Star base body */}
      <path
        d="M107.71 6.32184C110.448 3.03318 115.497 3.03318 118.235 6.32184L155.688 51.3165C156.417 52.1921 157.353 52.872 158.411 53.2945L212.777 75.0108C216.751 76.5981 218.311 81.4005 216.029 85.0203L184.81 134.545C184.203 135.509 183.846 136.609 183.771 137.745L179.917 196.161C179.636 200.431 175.55 203.399 171.403 202.348L114.655 187.961C113.551 187.681 112.394 187.681 111.29 187.961L54.542 202.348C50.3944 203.399 46.3091 200.431 46.0275 196.161L42.1742 137.745C42.0992 136.609 41.7418 135.509 41.1343 134.545L9.91554 85.0203C7.63377 81.4005 9.19419 76.5981 13.1678 75.0108L67.5341 53.2945C68.592 52.872 69.5278 52.1921 70.2566 51.3165L107.71 6.32184Z"
        fill="#FFD203"
      />
      {/* Star gradient overlay */}
      <path
        d="M107.71 6.32184C110.448 3.03318 115.497 3.03318 118.235 6.32184L155.688 51.3165C156.417 52.1921 157.353 52.872 158.411 53.2945L212.777 75.0108C216.751 76.5981 218.311 81.4005 216.029 85.0203L184.81 134.545C184.203 135.509 183.846 136.609 183.771 137.745L179.917 196.161C179.636 200.431 175.55 203.399 171.403 202.348L114.655 187.961C113.551 187.681 112.394 187.681 111.29 187.961L54.542 202.348C50.3944 203.399 46.3091 200.431 46.0275 196.161L42.1742 137.745C42.0992 136.609 41.7418 135.509 41.1343 134.545L9.91554 85.0203C7.63377 81.4005 9.19419 76.5981 13.1678 75.0108L67.5341 53.2945C68.592 52.872 69.5278 52.1921 70.2566 51.3165L107.71 6.32184Z"
        fill="url(#nav_star_gradient)"
        fillOpacity="0.2"
      />

      <mask
        id="nav_star_mask"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="8"
        y="3"
        width="210"
        height="200"
      >
        <path
          d="M107.71 6.32184C110.448 3.03318 115.497 3.03318 118.235 6.32184L155.688 51.3165C156.417 52.1921 157.353 52.872 158.411 53.2945L212.777 75.0108C216.751 76.5981 218.311 81.4005 216.029 85.0203L184.81 134.545C184.203 135.509 183.846 136.609 183.771 137.745L179.917 196.161C179.636 200.431 175.55 203.399 171.403 202.348L114.655 187.961C113.551 187.681 112.394 187.681 111.29 187.961L54.542 202.348C50.3944 203.399 46.3091 200.431 46.0275 196.161L42.1742 137.745C42.0992 136.609 41.7418 135.509 41.1343 134.545L9.91554 85.0203C7.63377 81.4005 9.19419 76.5981 13.1678 75.0108L67.5341 53.2945C68.592 52.872 69.5278 52.1921 70.2566 51.3165L107.71 6.32184Z"
          fill="#FFD203"
        />
      </mask>

      <g mask="url(#nav_star_mask)">
        {/* Blush cheeks */}
        <g filter="url(#nav_star_filter0)">
          <ellipse cx="51" cy="118" rx="34" ry="16" fill="#FF0307" />
        </g>
        <g filter="url(#nav_star_filter1)">
          <ellipse cx="175" cy="118" rx="34" ry="16" fill="#FF0307" />
        </g>

        {/* Eyes following cursor */}
        <g ref={eyesRef}>
          <ellipse cx="76" cy="100" rx="10" ry="13" fill="#0C1821" />
          <ellipse cx="122" cy="100" rx="10" ry="13" fill="#0C1821" />
        </g>
      </g>

      <defs>
        <filter
          id="nav_star_filter0"
          x="-33"
          y="52"
          width="168"
          height="132"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="25" result="effect1_foregroundBlur_247_800" />
        </filter>
        <filter
          id="nav_star_filter1"
          x="91"
          y="52"
          width="168"
          height="132"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="25" result="effect1_foregroundBlur_247_800" />
        </filter>
        <linearGradient
          id="nav_star_gradient"
          x1="112.972"
          y1="0"
          x2="112.972"
          y2="225.945"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#666666" stopOpacity="0" />
          <stop offset="1" stopColor="#FF0000" />
        </linearGradient>
      </defs>
    </svg>
  );
}
