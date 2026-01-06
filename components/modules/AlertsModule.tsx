import React from 'react';
import { Alert } from '../../types';
import StatusCard from '../StatusCard';
import { Bell, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

interface Props {
  alerts: Alert[];
  theme: 'dark' | 'light';
}

const AlertsModule: React.FC<Props> = ({ alerts, theme }) => {
  const isDark = theme === 'dark';
  const activeAlerts = alerts.filter(a => !a.acknowledged);

  return (
    <StatusCard title="System Alerts" icon={Bell} theme={theme} accentColor="rose" footer="Monitoring Live">
      <div className="space-y-4">
        {activeAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 opacity-40 text-center">
            <CheckCircle2 size={40} className="mb-4 text-[#FCA311]" />
            <p className="text-sm font-bold uppercase tracking-widest">All Systems Nominal</p>
            <p className="text-xs mt-1">No pending notifications</p>
          </div>
        ) : (
          activeAlerts.map((alert) => (
            <div 
              key={alert.id}
              className={`p-5 rounded-3xl border flex flex-col gap-3 transition-colors ${
                isDark 
                  ? 'bg-[#000000]/20 border-[#FCA311]/20' 
                  : 'bg-[#FCA311]/5 border-[#FCA311]/20'
              }`}
            >
              {/* Header: Severity & Time */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-[#FCA311]">
                   {alert.severity === 'info' ? <Info size={16} /> : <AlertTriangle size={16} />}
                   <span className="text-[10px] font-bold uppercase tracking-widest">
                      {alert.severity}
                   </span>
                </div>
                <span className="text-[10px] tabular-nums opacity-60">
                  {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {/* Message */}
              <p className={`text-sm font-medium leading-relaxed ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>
                {alert.message}
              </p>

              {/* Actions */}
              <div className="flex gap-3 mt-2">
                <button className="flex-1 py-3 px-4 rounded-xl bg-[#FCA311] text-[#000000] text-[10px] font-bold uppercase tracking-wider hover:bg-[#FCA311]/90 transition-all shadow-lg shadow-[#FCA311]/10">
                  ACKNOWLEDGE
                </button>
                <button className={`py-3 px-6 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-colors ${
                  isDark 
                    ? 'border-[#E5E5E5]/10 hover:bg-[#E5E5E5]/5 text-[#E5E5E5]' 
                    : 'border-[#000000]/10 hover:bg-[#000000]/5 text-[#000000]'
                }`}>
                  DETAILS
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </StatusCard>
  );
};

export default AlertsModule;