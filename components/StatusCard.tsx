
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
    <div className={`group transition-all duration-500 rounded-[2.5rem] p-7 lg:p-9 flex flex-col ${
      isDark ? 'glass-card shadow-2xl' : 'glass-card-light shadow-lg'
    } ${glowStyles[accentColor]}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-5">
          <div className={`p-4 rounded-2xl transition-colors ${
            isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'
          }`}>
            <Icon size={26} className={accentStyles[accentColor]} />
          </div>
          <h2 className={`text-2xl font-serif-display font-medium leading-none tracking-tight opacity-90 ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>
            {title}
          </h2>
        </div>
        <div className="w-2 h-2 rounded-full bg-current opacity-20" />
      </div>

      {/* Content */}
      <div className="flex-1">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="mt-8 pt-6 border-t border-current border-opacity-10 flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest opacity-50 font-medium">Last Synchronized</span>
          <span className="text-xs font-medium tabular-nums opacity-70">{footer}</span>
        </div>
      )}
    </div>
  );
};

export default StatusCard;
