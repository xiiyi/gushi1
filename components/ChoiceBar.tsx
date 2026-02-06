
import React from 'react';
import { Choice } from '../types';

interface ChoiceBarProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
}

const ChoiceBar: React.FC<ChoiceBarProps> = ({ choices, onSelect }) => {
  return (
    <div className="flex items-center justify-center gap-6 md:gap-12 px-4">
      {choices.map((choice) => (
        <button
          key={choice.id}
          onClick={() => onSelect(choice)}
          className="group relative"
        >
          {/* Floating Wooden Plank Button */}
          <div className="relative bg-gradient-to-b from-amber-100/90 via-amber-50/90 to-amber-100/90 backdrop-blur-md px-8 py-6 rounded-xl border-2 border-amber-900/40 shadow-2xl transform group-hover:-translate-y-3 group-hover:shadow-amber-900/30 group-active:translate-y-0 transition-all duration-300">

            {/* Wood grain texture */}
            <div className="absolute inset-0 rounded-xl opacity-20 bg-gradient-to-b from-transparent via-amber-900/10 to-transparent"></div>

            {/* Vertical Text */}
            <div className="writing-vertical text-xl md:text-2xl font-bold text-amber-900 tracking-[0.4em] min-h-[120px] md:min-h-[160px] flex items-center justify-center leading-loose relative z-10">
              {choice.text}
            </div>

            {/* Bottom shine effect */}
            <div className="absolute bottom-0 left-2 right-2 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
          </div>

          {/* Glow Effect on Hover */}
          <div className="absolute inset-0 rounded-xl bg-amber-200/20 scale-100 group-hover:scale-110 transition-transform duration-500 blur-xl opacity-0 group-hover:opacity-100 -z-10"></div>

          {/* Floating Particles Effect */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-top-6 transition-all duration-500 text-2xl">
            ✨
          </div>
        </button>
      ))}
    </div>
  );
};

export default ChoiceBar;
