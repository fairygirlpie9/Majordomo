import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatusCardProps {
  title: string;
  icon: LucideIcon;
  theme: 'dark' | 'light';
  children: React.ReactNode;
  footer?: string;
  accentColor?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, icon: Icon, theme, children, footer, accentColor = 'blue' }) => {
  const isDark = theme === 'dark';

  // Consolidated to the single Orange accent #FCA311 for visual cohesion
  const accentStyles: Record<string, string> = {
    emerald: 'text-[#FCA311]',
    sapphire: 'text-[#FCA311]',
    amber: 'text-[#FCA311]',
    rose: 'text-[#FCA311]',
    blue: 'text-[#FCA311]'
  };

  const glowStyles: Record<string, string> = {
    emerald: 'shadow-[#FCA311]/5',
    sapphire: 'shadow-[#FCA311]/5',
    amber: 'shadow-[#FCA311]/5',
    rose: 'shadow-[#FCA311]/5',
    blue: 'shadow-[#FCA311]/5'
  };

  return (
    <div className={`group transition-all duration-500 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-6 lg:p-7 flex flex-col ${
      isDark ? 'glass-card shadow-2xl' : 'glass-card-light shadow-lg'
    } ${glowStyles[accentColor]}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
          <div className={`flex-shrink-0 p-3 rounded-2xl transition-colors ${
            isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'
          }`}>
            <Icon size={20} className={`sm:w-[24px] sm:h-[24px] ${accentStyles[accentColor]}`} />
          </div>
          <h2 className={`text-lg sm:text-xl font-serif-display font-medium leading-none tracking-tight opacity-90 truncate ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>
            {title}
          </h2>
        </div>
        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-current opacity-20" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="mt-6 pt-4 border-t border-current border-opacity-10 flex items-center justify-between gap-4">
          <span className="text-[10px] sm:text-xs uppercase tracking-widest opacity-50 font-medium truncate">Last Synchronized</span>
          <span className="text-[10px] sm:text-xs font-medium tabular-nums opacity-70 whitespace-nowrap">{footer}</span>
        </div>
      )}
    </div>
  );
};

export default StatusCard;