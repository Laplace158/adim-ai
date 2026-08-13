import React from 'react';
import { Target, FolderKanban, User, LogOut, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';

interface NavbarProps {
  currentStep: 'landing' | 'wizard' | 'preview' | 'diagnostic' | 'dashboard' | 'evidence' | 'my_plans';
  user: { id: string; name: string; email: string } | null;
  onNavigate: (step: 'landing' | 'wizard' | 'preview' | 'diagnostic' | 'dashboard' | 'evidence' | 'my_plans') => void;
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
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <img 
            src="/logo.png" 
            alt="AdımAI Logo" 
            className="w-9 h-9 object-contain group-hover:scale-105 transition-transform" 
          />
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight text-slate-900 leading-none">
              Adım<span className="text-[#C85A32]">AI</span>
            </span>
            <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase mt-0.5">
              Kişisel Hedef Rehberi
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Gemini AI (Canlı)</span>
          </div>

          <button
            onClick={() => onNavigate('landing')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              currentStep === 'landing' 
                ? 'bg-slate-100 text-slate-900 font-semibold' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Ana Sayfa
          </button>

          <button
            onClick={() => onNavigate('my_plans')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
              currentStep === 'my_plans' 
                ? 'bg-stone-100 text-slate-900 font-semibold' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-stone-50'
            }`}
          >
            <FolderKanban className="w-4 h-4 text-[#C85A32]" />
            <span>Planlarım</span>
          </button>

          <button
            onClick={() => onNavigate('wizard')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-bold transition-all ${
              currentStep === 'wizard' 
                ? 'bg-[#C85A32] text-white shadow-md shadow-[#C85A32]/20' 
                : 'bg-[#C85A32]/10 text-[#C85A32] hover:bg-[#C85A32]/20 border border-[#C85A32]/30'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Hedef Oluştur</span>
          </button>

          {/* User auth state button */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
              <span className="text-xs font-bold text-slate-800 hidden sm:inline">
                {user.name}
              </span>
              <button
                onClick={onLogout}
                title="Çıkış Yap"
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-stone-100"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={onOpenAuthModal} className="text-xs">
              <User className="w-3.5 h-3.5 mr-1 text-[#C85A32]" />
              Giriş Yap
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};
