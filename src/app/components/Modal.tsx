import React from 'react';

interface ModalProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#202020] bg-opacity-50">
        <div className="bg-[#FCFAFF] rounded-xl p-8 max-w-lg md:max-w-md lg:max-w-xl">
          <div className="text-xl mb-4" dangerouslySetInnerHTML={{ __html: message }}></div>
          <button className="bg-blue-500 hover:bg-blue-700 text-[#FCFAFF] font-semibold py-2 px-4 rounded-lg" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;