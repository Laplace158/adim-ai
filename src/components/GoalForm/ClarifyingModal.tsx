import React, { useState } from 'react';
import { HelpCircle, X, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface ClarifyingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitAnswers: (details: { level: string; schedule: string; purpose: string }) => void;
}

export const ClarifyingModal: React.FC<ClarifyingModalProps> = ({
  isOpen,
  onClose,
  onSubmitAnswers
}) => {
  const [level, setLevel] = useState('Başlangıç seviyesindeyim');
  const [schedule, setSchedule] = useState('Günde 30 dakika, haftada 5 gün');
  const [purpose, setPurpose] = useState('CV/Portföyüm için somut bir çıktı oluşturmak');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitAnswers({ level, schedule, purpose });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Hedefinizi Netleştirelim</h3>
            <p className="text-xs text-slate-500">Doğru süre hesabı için 3 kısa soru</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              1. Şu anki seviyeniz nedir?
            </label>
            <input
              type="text"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Örn: Sıfırdan başlıyorum / A1 seviyesindeyim"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              2. Zaman planınız nasıl?
            </label>
            <input
              type="text"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Örn: Günde 45 dk, haftada 4 gün"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              3. Bu hedefi hangi amaçla gerçekleştirmek istiyorsunuz?
            </label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Örn: Yurt dışı seyahati / Staj başvurusu"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Vazgeç
            </Button>
            <Button type="submit" variant="primary">
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
              Detayları Ekle ve İlerle
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
