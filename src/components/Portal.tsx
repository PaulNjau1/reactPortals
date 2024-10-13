// src/components/Portal.tsx
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  wrapperId?: string;
}

const Portal: React.FC<PortalProps> = ({ children, wrapperId = 'portal-root' }) => {
  let element = document.getElementById(wrapperId);
  if (!element) {
    element = document.createElement('div');
    element.setAttribute('id', wrapperId);
    document.body.appendChild(element);
  }

  return createPortal(children, element);
};

export default Portal; // Correct default export
