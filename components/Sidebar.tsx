
import React from 'react';
import { X, Home, Settings, FileText, HelpCircle, LogOut } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, theme }) => {
  const isDark = theme === 'dark';

  return (
    <>
      <div 
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div 
        className={`fixed top-0 left-0 bottom-0 z-[70] w-80 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          isDark 
            ? 'bg-[#14213D] border-r border-[#E5E5E5]/10 text-[#E5E5E5]' 
            : 'bg-white border-r border-[#000000]/10 text-[#000000]'
        }`}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-serif-display font-medium">Menu</h2>
            <button onClick={onClose} className="p-2 opacity-60 hover:opacity-100 transition-opacity">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 space-y-4">
             <button className={`flex items-center gap-4 w-full p-3 rounded-xl transition-all bg-[#FCA311]/10 text-[#FCA311] font-bold`}>
                <Home size={20} />
                <span>Dashboard</span>
             </button>
             <button className={`flex items-center gap-4 w-full p-3 rounded-xl transition-all opacity-60 hover:opacity-100 hover:bg-current hover:bg-opacity-5`}>
                <FileText size={20} />
                <span className="font-medium">Reports</span>
             </button>
             <button className={`flex items-center gap-4 w-full p-3 rounded-xl transition-all opacity-60 hover:opacity-100 hover:bg-current hover:bg-opacity-5`}>
                <Settings size={20} />
                <span className="font-medium">Settings</span>
             </button>
             <button className={`flex items-center gap-4 w-full p-3 rounded-xl transition-all opacity-60 hover:opacity-100 hover:bg-current hover:bg-opacity-5`}>
                <HelpCircle size={20} />
                <span className="font-medium">Support</span>
             </button>
          </nav>

          <div className="pt-8 border-t border-current border-opacity-10">
            <button className="flex items-center gap-4 opacity-60 hover:opacity-100 transition-opacity w-full">
              <LogOut size={20} />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
