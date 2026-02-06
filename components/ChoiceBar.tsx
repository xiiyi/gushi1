
import React from 'react';
import { Choice } from '../types';

interface ChoiceBarProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
}

const ChoiceBar: React.FC<ChoiceBarProps> = ({ choices, onSelect }) => {
  return (
    <div className="h-full flex items-center justify-center gap-6 md:gap-10 px-4">
      {choices.map((choice) => (
        <button
          key={choice.id}
          onClick={() => onSelect(choice)}
          className="group relative flex items-center justify-center"
        >
          {/* Wooden/Bamboo Plank Look */}
          <div className="bg-gradient-to-b from-[#e8dfd0] via-[#d7ccc8] to-[#c4b5a7] border-2 border-[#5d4037] py-5 px-6 rounded-lg shadow-lg transform group-hover:-translate-y-2 group-hover:shadow-xl group-active:translate-y-0 transition-all duration-300 relative overflow-hidden">
            {/* Wood grain texture effect */}
            <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-transparent via-[#3e2723] to-transparent bg-[length:4px_100%]"></div>

            {/* Text container with proper vertical writing */}
            <div className="writing-vertical text-lg md:text-xl font-bold text-[#3e2723] tracking-[0.3em] min-h-[100px] md:min-h-[120px] flex items-center justify-center leading-loose relative z-10">
              {choice.text}
            </div>
          </div>

          {/* Ink Halo Effect */}
          <div className="absolute inset-0 rounded-full bg-[#5d4037]/10 scale-0 group-hover:scale-150 transition-transform duration-700 blur-xl opacity-0 group-hover:opacity-100"></div>

          {/* Subtle decoration */}
          <div className="absolute -top-3 opacity-0 group-hover:opacity-100 group-hover:-top-6 transition-all duration-500 text-sm text-[#795548]">
            ✦
          </div>
        </button>
      ))}
    </div>
  );
};

export default ChoiceBar;
