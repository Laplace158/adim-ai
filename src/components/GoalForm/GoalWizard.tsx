import React, { useState } from 'react';
import { Target, Clock, Calendar, Sparkles, Languages, Code, GraduationCap, ShieldAlert, ArrowRight, HelpCircle } from 'lucide-react';
import { GoalCategory, GoalInput, UserLevel } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ClarifyingModal } from './ClarifyingModal';

interface GoalWizardProps {
  onSubmitGoal: (input: GoalInput) => void;
  isLoading?: boolean;
}

export const GoalWizard: React.FC<GoalWizardProps> = ({ onSubmitGoal, isLoading = false }) => {
  const [category, setCategory] = useState<GoalCategory>('language_learning');
  const [title, setTitle] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [dailyMinutes, setDailyMinutes] = useState<number>(30);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  const [currentLevel, setCurrentLevel] = useState<UserLevel>('beginner');
  const [desiredOutcome, setDesiredOutcome] = useState('');
  const [preferFreeResources, setPreferFreeResources] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [safetyWarning, setSafetyWarning] = useState<string | null>(null);

  // Safety trigger words check
  const checkSafetyWarnings = (text: string) => {
    const prohibitedKeywords = ['diyet', 'kilo', 'hastalık', 'tedavi', 'ilaç', 'borsa', 'kripto', 'yatırım', 'boşanma', 'dava', 'depresyon'];
    const found = prohibitedKeywords.find(word => text.toLowerCase().includes(word));
    if (found) {
      setSafetyWarning(`Tıbbi, hukuki veya finansal konularda ("${found}") AdımAI doğrudan teşhis veya uzman tavsiyesi vermez. Lütfen eğitim, yazılım veya dil öğrenim hedeflerine odaklanın.`);
    } else {
      setSafetyWarning(null);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setTitle(val);
    checkSafetyWarnings(val);
  };

  const handleClarifyingAnswers = (details: { level: string; schedule: string; purpose: string }) => {
    setTitle(prev => `${prev.trim()} (${details.purpose})`);
    setDesiredOutcome(details.purpose);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Check if vague
    if (title.trim().length < 12) {
      setIsModalOpen(true);
      return;
    }

    const payload: GoalInput = {
      title: title.trim(),
      category,
      targetDate: targetDate || undefined,
      dailyMinutes,
      daysPerWeek,
      currentLevel,
      desiredOutcome: desiredOutcome || title,
      preferFreeResources
    };

    onSubmitGoal(payload);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-12 px-4 space-y-6">
      {/* Editorial Header */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-[#C85A32]/10 border border-[#C85A32]/30 text-[#C85A32] text-xs font-bold uppercase tracking-wider inline-block">
          ADIMAI PLAN SİHİRBAZI
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#241E2B] tracking-tight">
          Hedef Yol Haritanızı Oluşturun
        </h2>
        <p className="text-sm text-[#766F82]">
          Doğal cümlenizi yazın, yapay zeka saniyeler içinde 7 günlük eylem planınızı çıkarsın.
        </p>
      </div>

      <Card className="p-6 sm:p-8 space-y-6 border-[#E5DFDA] bg-white rounded-2xl shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selector */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              1. Hedef Kategorisi Seçin
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => setCategory('language_learning')}
                className={`p-3 rounded-xl border text-left flex flex-col items-center sm:items-start gap-2 transition-all ${
                  category === 'language_learning'
                    ? 'border-[#C85A32] bg-[#C85A32]/10 text-slate-900 font-bold ring-2 ring-[#C85A32]'
                    : 'border-stone-200 bg-white text-slate-700 hover:border-stone-300'
                }`}
              >
                <Languages className="w-5 h-5 text-[#C85A32]" />
                <span className="text-xs sm:text-sm">Dil Öğrenimi</span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('coding_project')}
                className={`p-3 rounded-xl border text-left flex flex-col items-center sm:items-start gap-2 transition-all ${
                  category === 'coding_project'
                    ? 'border-[#C85A32] bg-[#C85A32]/10 text-slate-900 font-bold ring-2 ring-[#C85A32]'
                    : 'border-stone-200 bg-white text-slate-700 hover:border-stone-300'
                }`}
              >
                <Code className="w-5 h-5 text-[#C85A32]" />
                <span className="text-xs sm:text-sm">Yazılım Projesi</span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('exam_study')}
                className={`p-3 rounded-xl border text-left flex flex-col items-center sm:items-start gap-2 transition-all ${
                  category === 'exam_study'
                    ? 'border-[#C85A32] bg-[#C85A32]/10 text-slate-900 font-bold ring-2 ring-[#C85A32]'
                    : 'border-stone-200 bg-white text-slate-700 hover:border-stone-300'
                }`}
              >
                <GraduationCap className="w-5 h-5 text-[#C85A32]" />
                <span className="text-xs sm:text-sm">Sınav / Ders</span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('other')}
                className={`p-3 rounded-xl border text-left flex flex-col items-center sm:items-start gap-2 transition-all ${
                  category === 'other'
                    ? 'border-[#C85A32] bg-[#C85A32]/10 text-slate-900 font-bold ring-2 ring-[#C85A32]'
                    : 'border-stone-200 bg-white text-slate-700 hover:border-stone-300'
                }`}
              >
                <Sparkles className="w-5 h-5 text-[#C85A32]" />
                <span className="text-xs sm:text-sm">Diğer / Özel Hedef</span>
              </button>
            </div>
          </div>

          {/* Goal Title Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-semibold text-slate-800">
                2. Hedefinizi Detaylandırın *
              </label>
              {title.length > 0 && title.length < 12 && (
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  Hedefi Netleştir
                </button>
              )}
            </div>
            <textarea
              rows={3}
              value={title}
              onChange={handleTitleChange}
              required
              placeholder={
                category === 'language_learning'
                  ? 'Örn: A1 seviyesindeyim. 2 ay sonra yurtdışına çıkacağım, temel seyahat İngilizcesi konuşmak istiyorum.'
                  : category === 'coding_project'
                  ? 'Örn: Sıfırdan React öğrenip CV’me ekleyebileceğim hava durumu web uygulaması yapmak istiyorum.'
                  : category === 'exam_study'
                  ? 'Örn: 3 ay sonraki sınava hazırlanmak için matematik konularını sıfırdan tamamlayıp deneme çözmek istiyorum.'
                  : 'Örn: Photoshop ile sosyal medya görselleri tasarlamayı veya 30 günde gitar çalmanın temellerini öğrenmek istiyorum.'
              }
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Safety Warning if triggered */}
          {safetyWarning && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>{safetyWarning}</div>
            </div>
          )}

          {/* Level Selector */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              3. Şu Anki Seviyeniz
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-xs">
              {[
                { id: 'beginner', label: 'Başlangıç' },
                { id: 'A1', label: 'A1 Temel' },
                { id: 'A2', label: 'A2 Giriş' },
                { id: 'intermediate', label: 'Orta Seviye' },
                { id: 'advanced', label: 'İleri Seviye' }
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setCurrentLevel(lvl.id as UserLevel)}
                  className={`py-2 px-2 rounded-xl border font-bold text-center transition-all ${
                    currentLevel === lvl.id
                      ? 'border-[#C85A32] bg-[#C85A32] text-white shadow-md shadow-[#C85A32]/20'
                      : 'border-stone-200 bg-white text-slate-700 hover:bg-stone-50'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Time Commitment Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" />
                Günde Kaç Dakika?
              </label>
              <select
                value={dailyMinutes}
                onChange={(e) => setDailyMinutes(Number(e.target.value))}
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value={15}>15 Dakika (Mikro Tempo)</option>
                <option value={30}>30 Dakika (Önerilen)</option>
                <option value={45}>45 Dakika (Yoğun Tempo)</option>
                <option value={60}>60 Dakika (Gelişmiş Odak)</option>
                <option value={90}>90+ Dakika (Tam Odak)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600" />
                Haftada Kaç Gün?
              </label>
              <select
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value={3}>Haftada 3 Gün</option>
                <option value={4}>Haftada 4 Gün</option>
                <option value={5}>Haftada 5 Gün (Dengeli)</option>
                <option value={6}>Haftada 6 Gün</option>
                <option value={7}>Haftada 7 Gün (Her gün)</option>
              </select>
            </div>
          </div>

          {/* Target Date (Optional) */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1">
              Hedef Tarih (İsteğe Bağlı)
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full sm:w-1/2 px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Belirtilmezse sürenizi otomatik matematiksel modelimiz hesaplar.
            </p>
          </div>

          {/* Free Resources Checkbox */}
          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
              <input
                type="checkbox"
                checked={preferFreeResources}
                onChange={(e) => setPreferFreeResources(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span>Yalnızca doğrulanmış <strong>ücretsiz kaynaklar</strong> (BTK, MDN, YouTube) önerilsin.</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 flex flex-col items-end gap-2">
            {isLoading && (
              <div className="w-full bg-blue-50 border border-blue-200 p-3 rounded-xl flex items-center justify-between text-xs text-blue-900 animate-pulse">
                <span className="font-semibold">⚡ Gemini AI hedefinizi analiz ediyor ve 7 günlük özel rotanızı oluşturuyor...</span>
                <span className="text-[11px] text-blue-600 font-bold">Lütfen bekleyin (~3 sn)</span>
              </div>
            )}
            <Button
              type="submit"
              size="lg"
              isLoading={isLoading}
              className="w-full sm:w-auto font-bold bg-[#C85A32] text-white hover:bg-[#b04b27]"
            >
              Hedefimi Analiz Et ve Planı Çıkar
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </form>
      </Card>

      <ClarifyingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitAnswers={handleClarifyingAnswers}
      />
    </div>
  );
};
