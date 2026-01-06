
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
      <div className="space-y-5">
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
              className={`p-5 rounded-3xl border flex gap-5 ${
                alert.severity === 'critical' 
                  ? 'bg-[#FCA311]/10 border-[#FCA311]/20 text-[#FCA311]' 
                  : 'bg-[#FCA311]/5 border-[#FCA311]/10 text-[#FCA311]'
              }`}
            >
              <div className="mt-1">
                {alert.severity === 'info' ? <Info size={20} /> : <AlertTriangle size={20} />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest leading-none">
                    {alert.severity}
                  </span>
                  <span className="text-[10px] tabular-nums opacity-60">
                    {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className={`text-sm font-medium leading-relaxed ${isDark ? 'text-[#E5E5E5]' : 'text-[#000000]'}`}>
                  {alert.message}
                </p>
                <div className="mt-4 flex gap-3">
                  <button className="px-4 py-2 rounded-xl bg-current bg-opacity-10 hover:bg-opacity-20 text-[10px] font-bold uppercase tracking-wider transition-colors">
                    Acknowledge
                  </button>
                  <button className="px-4 py-2 rounded-xl bg-current bg-opacity-5 hover:bg-opacity-10 text-[10px] font-bold uppercase tracking-wider transition-colors opacity-60">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </StatusCard>
  );
};

export default AlertsModule;
