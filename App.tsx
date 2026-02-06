
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
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 800);
    return () => clearTimeout(timer);
  }, [currentNodeId]);

  const handleChoice = async (choice: Choice) => {
    const nextId = choice.nextNode;

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
    <div className="h-screen w-screen flex flex-col relative overflow-hidden select-none">

      {/* Full-Screen Background Image */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${isTransitioning ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <img
          src={currentNode.image}
          alt={currentNode.title}
          className="w-full h-full object-cover"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)]"></div>
      </div>

      {/* Paper Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/papyros.png')] z-10"></div>

      {/* Floating Header */}
      <header className="relative z-30 flex items-center justify-between px-4 md:px-10 py-3 md:py-4">
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-full border border-white/10 shadow-2xl">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-title text-white tracking-wider drop-shadow-lg">《四时田园杂兴》</h1>
          <span className="text-xs md:text-base text-white/80 font-cursive hidden md:inline">—— 南宋 · 范成大</span>
        </div>
        <button
          onClick={() => setIsVocabOpen(true)}
          className="px-4 md:px-6 py-2 md:py-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-all shadow-xl border border-white/20 font-bold text-sm md:text-lg hover:scale-105"
        >
          📖 生字本
        </button>
      </header>

      {/* Main Content - Flexbox Layout */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-4 overflow-hidden">

        <div className={`w-full max-w-4xl transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>

          {/* Title Card */}
          <div className="text-center mb-4 md:mb-6">
            <div className="inline-block bg-black/50 backdrop-blur-xl px-6 md:px-10 py-3 md:py-5 rounded-2xl border border-white/20 shadow-2xl">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-widest drop-shadow-lg">
                {currentNode.title}
              </h2>
              {currentNode.poemSnippet && (
                <p className="text-lg md:text-xl lg:text-2xl font-cursive text-amber-200/90 tracking-wider mt-2">
                  「{currentNode.poemSnippet}」
                </p>
              )}
            </div>
          </div>

          {/* Scenario Text */}
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-8 border border-white/10 shadow-2xl mx-auto max-w-3xl">
            {currentNodeId === NodeId.END && isLoadingReflection ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-4">
                <div className="w-12 h-12 border-4 border-amber-200 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-amber-200 italic font-cursive text-lg md:text-xl animate-pulse">正在为您提笔作画，感悟田园...</p>
              </div>
            ) : (
              <div>
                <p className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed md:leading-loose font-serif tracking-wide">
                  {currentNodeId === NodeId.END ? reflection : currentNode.scenario}
                </p>
                {currentNodeId === NodeId.END && !isLoadingReflection && (
                  <div className="pt-4 border-t border-white/20 text-center mt-4">
                    <p className="text-sm md:text-base text-amber-200/80 italic font-cursive">—— 游戏结束，愿你心中常有此番田园意趣</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Choice Bar - Fixed at Bottom */}
      <footer className="relative z-30 py-8 md:py-12 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
        {!isLoadingReflection && (
          <div className={`transition-all duration-700 delay-200 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <ChoiceBar
              choices={currentNode.choices}
              onSelect={handleChoice}
            />
          </div>
        )}
      </footer>

      {/* Vocabulary Modal */}
      <VocabularyModal
        isOpen={isVocabOpen}
        onClose={() => setIsVocabOpen(false)}
      />

      {/* Transition Effect */}
      {isTransitioning && (
        <div className="fixed inset-0 pointer-events-none z-50 bg-black/20"></div>
      )}
    </div>
  );
};

export default App;
