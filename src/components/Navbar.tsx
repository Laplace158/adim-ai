import React from 'react';
import { Target, FolderKanban, User, LogOut, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';

interface NavbarProps {
  currentStep: 'landing' | 'wizard' | 'preview' | 'diagnostic' | 'dashboard' | 'evidence' | 'my_plans' | 'portfolio';
  user: { id: string; name: string; email: string } | null;
  onNavigate: (step: 'landing' | 'wizard' | 'preview' | 'diagnostic' | 'dashboard' | 'evidence' | 'my_plans' | 'portfolio') => void;
  onOpenAuthModal: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStep,
  user,
  onNavigate,
  onOpenAuthModal,
  onLogout
}) => {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Live Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <div 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <img 
              src="/logo.png" 
              alt="AdımAI Logo" 
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain group-hover:scale-105 transition-transform" 
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 leading-none">
                Adım<span className="text-[#C85A32]">AI</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 tracking-wider uppercase mt-0.5 hidden sm:inline">
                Kişisel Hedef Rehberi
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>Gemini AI (Canlı)</span>
          </div>
        </div>

        {/* Right: Clean Navigation Items */}
        <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => onNavigate('landing')}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              currentStep === 'landing' 
                ? 'bg-slate-100 text-slate-900 shadow-2xs font-bold' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Ana Sayfa
          </button>

          <button
            onClick={() => onNavigate('my_plans')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              currentStep === 'my_plans' 
                ? 'bg-stone-100 text-slate-900 font-bold shadow-2xs' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-50'
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C85A32]" />
            <span>Planlarım</span>
          </button>

          <button
            onClick={() => onNavigate('portfolio')}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              currentStep === 'portfolio' 
                ? 'bg-[#3B4274] text-white font-bold shadow-xs' 
                : 'text-[#3B4274] hover:bg-[#3B4274]/10'
            }`}
          >
            Portföy / Case Study
          </button>

          <button
            onClick={() => onNavigate('wizard')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              currentStep === 'wizard' 
                ? 'bg-[#C85A32] text-white shadow-md shadow-[#C85A32]/25' 
                : 'bg-[#C85A32] text-white hover:bg-[#b04b27] shadow-xs'
            }`}
          >
            <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Hedef Oluştur</span>
          </button>

          {/* User Auth State */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 shrink-0">
              <span className="text-xs font-bold text-slate-800 hidden md:inline">
                {user.name}
              </span>
              <button
                onClick={onLogout}
                title="Çıkış Yap"
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onOpenAuthModal} 
              className="text-xs font-semibold whitespace-nowrap border-slate-300 hover:bg-slate-50"
            >
              <User className="w-3.5 h-3.5 mr-1 text-[#C85A32]" />
              <span>Giriş Yap</span>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};
