
import React from 'react';
import Modal from '../Modal';
import { Construction } from 'lucide-react';

interface PlaceholderModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  theme: 'dark' | 'light';
  lang: 'en' | 'ar' | 'fr';
}

const PlaceholderModal: React.FC<PlaceholderModalProps> = ({ isOpen, onClose, title, theme, lang }) => {
  const isDark = theme === 'dark';
  const isAr = lang === 'ar';
  const isFr = lang === 'fr';

  const msg = isAr 
    ? "هذه الوحدة تعمل بكامل طاقتها في النسخة التجريبية للمؤسسات. اتصل بالدعم للتفعيل."
    : isFr 
        ? "Ce module est entièrement fonctionnel dans la démo d'entreprise. Contactez le support pour l'activer."
        : "This module is fully functional in the enterprise demo. Contact support to activate.";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} theme={theme}>
        <div className="py-12 flex flex-col items-center text-center space-y-6">
            <div className={`p-6 rounded-full ${isDark ? 'bg-[#E5E5E5]/5' : 'bg-[#000000]/5'}`}>
                <Construction size={48} className="opacity-50" />
            </div>
            <p className="max-w-md opacity-60 leading-relaxed mx-auto">
                {msg}
            </p>
            <button onClick={onClose} className="px-8 py-3 rounded-xl bg-[#FCA311] text-[#000000] font-bold uppercase tracking-wider text-xs">
                {isAr ? 'حسنا' : 'OK'}
            </button>
        </div>
    </Modal>
  );
};

export default PlaceholderModal;
