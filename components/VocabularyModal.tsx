
import React from 'react';
import { VOCABULARY } from '../constants';

interface VocabularyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VocabularyModal: React.FC<VocabularyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#fcfaf2] border-4 border-[#5d4037] w-full max-w-2xl rounded-lg shadow-2xl relative overflow-hidden">
        {/* Background Texture Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/papyros.png')]"></div>
        
        <div className="p-8 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-3xl text-[#5d4037] hover:scale-110 transition-transform"
          >
            ✕
          </button>
          
          <h2 className="text-3xl font-title text-[#5d4037] border-b-2 border-[#d7ccc8] pb-4 mb-6 text-center">
            《四时田园杂兴》生字本
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto pr-2">
            {VOCABULARY.map((item, idx) => (
              <div key={idx} className="bg-[#f5f5dc] p-4 rounded border border-[#d7ccc8] hover:shadow-md transition-shadow">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold text-[#3e2723]">{item.word}</span>
                  <span className="text-sm text-[#795548] italic">[{item.pinyin}]</span>
                </div>
                <p className="text-[#5d4037] mb-2"><span className="font-bold">释义：</span>{item.meaning}</p>
                <p className="text-xs text-[#8d6e63] bg-white/50 p-2 rounded italic">“{item.context}”</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center text-sm text-[#795548]">
            点击任意处或右上角关闭
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyModal;
