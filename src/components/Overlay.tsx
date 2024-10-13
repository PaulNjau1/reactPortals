// src/components/Overlay.tsx
import React, { useRef, useEffect, useState } from 'react';
import Portal from './Portal';

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  targetRef: React.RefObject<HTMLButtonElement>;
}

const Overlay: React.FC<OverlayProps> = ({ isOpen, onClose, children, targetRef }) => {
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      const rect = targetRef.current!.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, targetRef]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div style={{ top: coords.top, left: coords.left }} className="absolute z-50 my-2">
        <div className="bg-white border border-gray-300 shadow-lg p-4 rounded-lg">
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Overlay;

