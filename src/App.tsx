// src/App.tsx
import React, { useState, useRef } from 'react';
import Modal from './components/Modal';
import Tooltip from './components/Tooltip';
import Overlay from './components/Overlay';

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-8">
      {/* Modal */}
      <button
        onClick={() => setModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Open Modal
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-semibold">This is a Modal</h2>
        <p className="mt-2">Click outside or the "✖" button to close.</p>
      </Modal>

      {/* Tooltip */}
      <Tooltip text="This is a tooltip!">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
          Hover for Tooltip
        </button>
      </Tooltip>

      {/* Overlay */}
      <button
        ref={buttonRef}
        onClick={() => setOverlayOpen(!isOverlayOpen)}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg mb-4"
      >
        Toggle Overlay
      </button>

      <Overlay
        isOpen={isOverlayOpen}
        onClose={() => setOverlayOpen(false)}
        targetRef={buttonRef}
      >
        <div className="p-2">This is an Overlay content.</div>
      </Overlay>
    </div>
  );
};

export default App;
