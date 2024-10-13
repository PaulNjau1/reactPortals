// src/components/Tooltip.tsx
import React, { useState, useRef, useEffect } from 'react';
import Portal from './Portal';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setCoords({ top: rect.top + window.scrollY + rect.height + 10, left: rect.left });
      setIsVisible(true);
    };

    const handleMouseOut = () => {
      setIsVisible(false);
    };

    if (ref.current) {
      ref.current.addEventListener('mouseover', handleMouseOver);
      ref.current.addEventListener('mouseout', handleMouseOut);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('mouseover', handleMouseOver);
        ref.current.removeEventListener('mouseout', handleMouseOut);
      }
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      {children}
      {isVisible && (
        <Portal>
          <div
            style={{ top: coords.top, left: coords.left }}
            className="absolute bg-black text-white text-sm rounded px-2 py-1 shadow-lg"
          >
            {text}
          </div>
        </Portal>
      )}
    </div>
  );
};

export default Tooltip;
