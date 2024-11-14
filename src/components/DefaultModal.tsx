import React from 'react';

interface DefaultModalProps {
  open: boolean;
  onClose: () => void;
  onClick?: () => void;
  title?: string;
  children: React.ReactNode;
}

const DefaultModal = ({ open, onClose, onClick, title, children }: DefaultModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <div className="flex justify-between p-2">
          <h1 className='text-xl pl-4'>{title}</h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            &times;
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
        <div className="flex justify-end p-4 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            Cancelar
          </button>
          {onClick && (
            <button
              onClick={onClick}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Confirmar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DefaultModal;
