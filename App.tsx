
import React, { useState, useEffect } from 'react';
import { NodeId, Choice, ChoiceHistory } from './types';
import { SCENES } from './constants';
import { generateFinalReflection } from './services/gemini';
import VocabularyModal from './components/VocabularyModal';
import ChoiceBar from './components/ChoiceBar';

const App: React.FC = () => {
  const [currentNodeId, setCurrentNodeId] = useState<NodeId>(NodeId.START);
  const [history, setHistory] = useState<ChoiceHistory>({});
  const [isVocabOpen, setIsVocabOpen] = useState(false);
  const [reflection, setReflection] = useState<string | null>(null);
  const [isLoadingReflection, setIsLoadingReflection] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentNode = SCENES[currentNodeId];

  useEffect(() => {
    // Reset transition effect when node changes
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 500);
    return () => clearTimeout(timer);
  }, [currentNodeId]);

  const handleChoice = async (choice: Choice) => {
    const nextId = choice.nextNode;
    
    // Store history
    const newHistory = { ...history, [currentNodeId]: choice.id };
    setHistory(newHistory);

    if (nextId === NodeId.END) {
      setCurrentNodeId(NodeId.END);
      setIsLoadingReflection(true);
      try {
        const text = await generateFinalReflection(newHistory);
        setReflection(text);
      } catch (err) {
        setReflection("田园生活虽有波折，勤劳致富是不变的真理。");
      } finally {
        setIsLoadingReflection(false);
      }
    } else if (nextId === NodeId.START) {
      setHistory({});
      setReflection(null);
      setCurrentNodeId(NodeId.START);
    } else {
      setCurrentNodeId(nextId);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#f4f1ea] relative select-none">
      {/* Texture Overlay for Paper Feel */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/papyros.png')] z-10"></div>

      {/* Header */}
      <header className="h-[10%] bg-[#e0d8c3] border-b border-[#5d4037]/20 flex items-center justify-between px-8 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-title text-[#3e2723] tracking-wider">《四时田园杂兴》</h1>
          <span className="text-sm text-[#795548] font-cursive mt-2 hidden md:inline">—— 南宋 · 范成大</span>
        </div>
        <button 
          onClick={() => setIsVocabOpen(true)}
          className="px-6 py-2 bg-[#5d4037] text-[#f4f1ea] rounded-full hover:bg-[#3e2723] transition-colors shadow-lg font-bold"
        >
          生字本
        </button>
      </header>

      {/* Main Scene Area */}
      <main className="h-[70%] relative flex flex-col items-center justify-center p-6 overflow-hidden">
        <div className={`w-full max-w-5xl h-full flex flex-col items-center transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          
          {/* Image Container with Ink Frame */}
          <div className="relative w-full h-[65%] rounded-lg overflow-hidden border-8 border-white shadow-2xl mb-6">
            <img 
              src={currentNode.image} 
              alt={currentNode.title}
              className="w-full h-full object-cover grayscale-[0.2] sepia-[0.2] hover:scale-105 transition-transform duration-[10s] ease-linear"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            
            {/* Title Overlay */}
            <div className="absolute top-6 left-6 bg-white/90 px-4 py-2 border-l-4 border-[#5d4037]">
              <h2 className="text-2xl font-bold text-[#3e2723]">{currentNode.title}</h2>
            </div>

            {/* Poem Snippet Overlay */}
            {currentNode.poemSnippet && (
              <div className="absolute bottom-6 right-6 writing-vertical bg-white/80 p-4 border border-[#5d4037]/20 shadow-lg">
                <p className="text-xl font-cursive leading-relaxed tracking-widest text-[#3e2723]">
                  {currentNode.poemSnippet}
                </p>
              </div>
            )}
          </div>

          {/* Scenario Text */}
          <div className="w-full bg-white/40 p-6 rounded-lg backdrop-blur-sm border border-[#5d4037]/10 flex-1 overflow-y-auto">
            {currentNodeId === NodeId.END && isLoadingReflection ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="w-12 h-12 border-4 border-[#5d4037] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[#5d4037] italic font-cursive text-xl animate-pulse">正在为您提笔作画，感悟田园...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xl text-[#3e2723] leading-relaxed font-serif indent-8">
                  {currentNodeId === NodeId.END ? reflection : currentNode.scenario}
                </p>
                {currentNodeId === NodeId.END && !isLoadingReflection && (
                  <div className="pt-4 border-t border-[#5d4037]/10 text-center">
                    <p className="text-sm text-[#795548] italic">—— 游戏结束，愿你心中常有此番田园意趣</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Choice Bar */}
      <footer className="h-[20%] bg-[#e0d8c3]/50 border-t border-[#5d4037]/10 z-20">
        {!isLoadingReflection && (
          <ChoiceBar 
            choices={currentNode.choices} 
            onSelect={handleChoice} 
          />
        )}
      </footer>

      {/* Vocabulary Modal */}
      <VocabularyModal 
        isOpen={isVocabOpen} 
        onClose={() => setIsVocabOpen(false)} 
      />

      {/* Global Ink Animation Layer */}
      {isTransitioning && (
        <div className="fixed inset-0 pointer-events-none z-50 bg-black ink-fade-in opacity-0"></div>
      )}
    </div>
  );
};

export default App;
