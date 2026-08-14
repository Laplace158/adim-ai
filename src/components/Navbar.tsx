import React from 'react';
import { Target, FolderKanban, LogOut, Sparkles, BookOpen } from 'lucide-react';
import { Button } from './ui/Button';

export type StepType = 'landing' | 'wizard' | 'preview' | 'diagnostic' | 'dashboard' | 'evidence' | 'my_plans' | 'portfolio';

interface NavbarProps {
  currentStep: StepType;
  user: { id: string; name: string; email: string } | null;
  onNavigate: (step: StepType) => void;
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
    <header className="bg-[#F9F8F6]/90 border-b border-[#E5DFDA] sticky top-0 z-20 backdrop-blur-md">
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
            <span className="font-bold text-xl tracking-tight text-[#241E2B] leading-none">
              Adım<span className="text-[#C85A32]">AI</span>
            </span>
            <span className="text-[10px] font-semibold text-[#766F82] tracking-wider uppercase mt-0.5">
              Kişisel Hedef Rehberi
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onNavigate('landing')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              currentStep === 'landing' 
                ? 'bg-[#1E2338] text-white' 
                : 'text-[#766F82] hover:text-[#241E2B] hover:bg-[#F3F0EC]'
            }`}
          >
            Ana Sayfa
          </button>

          <button
            onClick={() => onNavigate('my_plans')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              currentStep === 'my_plans' 
                ? 'bg-[#1E2338] text-white' 
                : 'text-[#766F82] hover:text-[#241E2B] hover:bg-[#F3F0EC]'
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
            <div className="flex items-center gap-2 pl-2 border-l border-[#E5DFDA]">
              <span className="text-xs font-bold text-[#241E2B] hidden sm:inline">
                {user.name}
              </span>
              <button
                onClick={onLogout}
                title="Çıkış Yap"
                className="p-1.5 text-[#766F82] hover:text-rose-600 rounded-lg hover:bg-[#F3F0EC]"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={onOpenAuthModal} className="text-xs">
              Giriş Yap
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};
