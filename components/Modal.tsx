
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  theme: 'dark' | 'light';
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, theme, children }) => {
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div 
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col rounded-[2.5rem] shadow-2xl transition-all transform scale-100 ${
          isDark 
            ? 'bg-[#14213D] border border-[#E5E5E5]/10 text-[#E5E5E5]' 
            : 'bg-white border border-[#000000]/10 text-[#000000]'
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-8 border-b ${
          isDark ? 'border-[#E5E5E5]/10' : 'border-[#000000]/5'
        }`}>
          <h2 className="text-3xl font-serif-display font-medium">{title}</h2>
          <button 
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              isDark ? 'hover:bg-[#E5E5E5]/10' : 'hover:bg-[#000000]/5'
            }`}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-8 no-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
