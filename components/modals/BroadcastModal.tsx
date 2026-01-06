
import React, { useState } from 'react';
import Modal from '../Modal';
import { Send, Users, AlertTriangle, Bell, CheckCircle2 } from 'lucide-react';

interface BroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
}

const TARGETS = [
  { id: 'all', label: 'All Personnel', count: 12 },
  { id: 'security', label: 'Security Detail', count: 4 },
  { id: 'house', label: 'House Staff', count: 6 },
  { id: 'grounds', label: 'Grounds Crew', count: 2 },
];

const PRIORITIES = [
  { id: 'normal', label: 'Standard', color: 'bg-blue-500' },
  { id: 'high', label: 'High Priority', color: 'bg-[#FCA311]' },
  { id: 'emergency', label: 'Emergency', color: 'bg-red-500' },
];

const BroadcastModal: React.FC<BroadcastModalProps> = ({ isOpen, onClose, theme }) => {
  const isDark = theme === 'dark';
  const [selectedTarget, setSelectedTarget] = useState('all');
  const [priority, setPriority] = useState('normal');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSend = () => {
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setMessage('');
      onClose();
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Staff Broadcast" theme={theme}>
      {isSent ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <CheckCircle2 size={64} className="text-[#FCA311]" />
          <h3 className="text-xl font-bold">Message Broadcasted</h3>
          <p className="opacity-60">Delivered to {TARGETS.find(t => t.id === selectedTarget)?.count} active devices.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Target Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest opacity-60">Target Audience</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TARGETS.map((target) => (
                <button
                  key={target.id}
                  onClick={() => setSelectedTarget(target.id)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedTarget === target.id
                      ? `border-[#FCA311] ${isDark ? 'bg-[#FCA311]/10' : 'bg-[#FCA311]/5'}`
                      : `border-transparent ${isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'}`
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`font-bold ${selectedTarget === target.id ? 'text-[#FCA311]' : ''}`}>
                      {target.label}
                    </span>
                    <Users size={16} className="opacity-40" />
                  </div>
                  <span className="text-xs opacity-50">{target.count} Active Devices</span>
                </button>
              ))}
            </div>
          </div>

          {/* Priority Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest opacity-60">Priority Level</label>
            <div className="flex gap-3">
              {PRIORITIES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPriority(p.id)}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold uppercase tracking-wide border transition-all ${
                    priority === p.id
                      ? `border-current ${isDark ? 'bg-[#E5E5E5]/10' : 'bg-[#000000]/10'}`
                      : `border-transparent opacity-40 hover:opacity-100 ${isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'}`
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full inline-block mr-2 ${p.color}`} />
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest opacity-60">Message Content</label>
            <div className={`p-4 rounded-2xl border ${
              isDark ? 'bg-black/20 border-[#E5E5E5]/10' : 'bg-[#E5E5E5]/30 border-[#000000]/5'
            }`}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={4}
                className="w-full bg-transparent border-none outline-none resize-none text-base"
              />
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-current border-opacity-10">
                 <button className="text-xs font-bold uppercase tracking-wider opacity-50 hover:opacity-100">
                   + Attach Location
                 </button>
                 <span className="text-xs opacity-40">{message.length}/160</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleSend}
            disabled={!message}
            className={`w-full py-5 rounded-2xl font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-3 transition-all ${
              !message ? 'opacity-50 cursor-not-allowed bg-gray-500/20' : 
              'bg-[#FCA311] text-[#000000] hover:bg-[#FCA311]/90 shadow-lg shadow-[#FCA311]/20'
            }`}
          >
            <Send size={20} />
            Broadcast Alert
          </button>
        </div>
      )}
    </Modal>
  );
};

export default BroadcastModal;
