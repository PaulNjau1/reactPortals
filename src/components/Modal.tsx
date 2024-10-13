import Portal from './Portal'; // Default import from Portal

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  // Function to close modal when clicking outside modal content
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent clicks inside modal content from closing it
    e.stopPropagation();
  };

  return (
    <Portal>
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
        onClick={onClose} // Clicking outside modal content closes the modal
      >
        <div
          className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative"
          onClick={handleBackdropClick} // Clicking inside the modal should not close it
        >
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose} // Clicking the X button closes the modal
          >
            ✖
          </button>
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
