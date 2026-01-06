
import React, { useState } from 'react';
import Modal from '../Modal';
import { Search, Filter, ChevronDown } from 'lucide-react';

interface WineInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
}

const INVENTORY_DATA = [
  { category: "High-End Spirits", name: "Louis XIII de Rémy Martin", description: "Cognac aged 40-100 years, iconic crystal decanter", price: "$3,000-5,000", qty: 3 },
  { category: "Champagne", name: "Dom Pérignon P3", description: "Prestige cuvée Champagne aged 40+ years", price: "$3,000-10,000+", qty: 12 },
  { category: "Rare Whisky", name: "The Macallan Fine & Rare", description: "Single malt Scotch from select vintages", price: "$35,000", qty: 1 },
  { category: "Rare Whisky", name: "Pappy Van Winkle's Family Reserve 23yr", description: "Kentucky bourbon with cult following", price: "$4,500", qty: 2 },
  { category: "Tequila", name: "Patrón En Lalique: Serie 2", description: "Ultra-premium tequila in handcrafted crystal", price: "$7,500", qty: 1 },
  { category: "High-End Spirits", name: "Hennessy Paradis Impérial", description: "Rare cognac blend with eaux-de-vie up to 130 years old", price: "$3,200", qty: 4 },
  { category: "Wine", name: "Screaming Eagle Cabernet 1992", description: "Cult Napa wine, first vintage", price: "$12,500", qty: 6 },
  { category: "Wine", name: "Château Pétrus 1947", description: "Legendary Pomerol vintage", price: "$32,000", qty: 1 },
  { category: "Wine", name: "Domaine de la Romanée-Conti La Tâche 1999", description: "Burgundy's finest", price: "$8,500", qty: 3 },
  { category: "Rare Whisky", name: "Yamazaki 55 Year Old", description: "Japanese whisky, only 100 bottles released", price: "$800,000", qty: 0 },
];

const WineInventoryModal: React.FC<WineInventoryModalProps> = ({ isOpen, onClose, theme }) => {
  const isDark = theme === 'dark';
  const [filter, setFilter] = useState('All');

  const filteredData = filter === 'All' ? INVENTORY_DATA : INVENTORY_DATA.filter(item => item.category === filter);
  const categories = ['All', ...Array.from(new Set(INVENTORY_DATA.map(item => item.category)))];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cellar Inventory" theme={theme}>
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className={`flex-1 flex items-center px-4 py-3 rounded-xl border ${
          isDark ? 'bg-black/20 border-[#E5E5E5]/10' : 'bg-[#E5E5E5]/30 border-[#000000]/5'
        }`}>
          <Search size={18} className="opacity-50 mr-3" />
          <input 
            type="text" 
            placeholder="Search collection..." 
            className="bg-transparent border-none outline-none w-full text-sm font-medium" 
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wide whitespace-nowrap transition-colors ${
                filter === cat 
                  ? 'bg-[#FCA311] text-[#000000]' 
                  : (isDark ? 'bg-[#E5E5E5]/5 hover:bg-[#E5E5E5]/10' : 'bg-[#000000]/5 hover:bg-[#000000]/10')
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredData.map((item, idx) => (
          <div 
            key={idx} 
            className={`p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
              isDark ? 'bg-[#E5E5E5]/5 hover:bg-[#E5E5E5]/10' : 'bg-[#000000]/5 hover:bg-[#000000]/10'
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                   isDark ? 'bg-[#FCA311]/10 text-[#FCA311]' : 'bg-[#000000]/5 text-black/60'
                }`}>
                  {item.category}
                </span>
                {item.qty === 0 && <span className="text-[10px] font-bold uppercase text-red-500">Out of Stock</span>}
              </div>
              <h3 className={`text-xl font-serif-display font-medium ${item.qty === 0 ? 'opacity-50' : ''}`}>{item.name}</h3>
              <p className="text-sm opacity-60 mt-1">{item.description}</p>
            </div>
            
            <div className="flex items-center justify-between md:justify-end gap-8 md:min-w-[200px]">
              <div className="text-right">
                <p className="text-sm font-bold tabular-nums opacity-80">{item.price}</p>
                <p className="text-[10px] uppercase font-bold opacity-40">Est. Value</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold tabular-nums border ${
                isDark ? 'border-[#E5E5E5]/10 bg-black/20' : 'border-[#000000]/10 bg-white/50'
              }`}>
                {item.qty}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default WineInventoryModal;
