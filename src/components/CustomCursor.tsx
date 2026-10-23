import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  // Smooth spring lerp for trailing aura
  useEffect(() => {
    if (!isVisible) return;
    let animationFrameId: number;

    const follow = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18,
      }));
      animationFrameId = requestAnimationFrame(follow);
    };

    animationFrameId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animationFrameId);
  }, [pos, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Cyan Infinity Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${trailingPos.x - 20}px, ${trailingPos.y - 20}px, 0) scale(${
            isHovered ? 1.6 : 1
          })`,
        }}
      >
        <div
          className={`w-10 h-10 rounded-full border transition-all duration-300 ${
            isHovered
              ? 'border-[#53E8FF] bg-[#53E8FF]/10 shadow-[0_0_20px_#53E8FF]'
              : 'border-[#53E8FF]/40 shadow-[0_0_10px_#00AFFF/20]'
          }`}
        />
      </div>

      {/* Core Six-Eyes Pupil Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50"
        style={{
          transform: `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0)`,
        }}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full transition-transform duration-150 ${
            isHovered ? 'bg-[#53E8FF] scale-150' : 'bg-[#00AFFF]'
          }`}
        />
      </div>
    </>
  );
};
