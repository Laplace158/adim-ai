import React, { useState } from 'react';
import { CheckCircle2, Clock, ExternalLink, HelpCircle, AlertCircle, Sparkles, RefreshCw, Flame, Award } from 'lucide-react';
import { PlanTask, CheckinDifficulty } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface TodayTaskCardProps {
  task: PlanTask;
  activeDayNumber: number;
  totalDays: number;
  onCheckin: (difficulty: CheckinDifficulty) => void;
}

export const TodayTaskCard: React.FC<TodayTaskCardProps> = ({
  task,
  activeDayNumber,
  totalDays,
  onCheckin
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<CheckinDifficulty | null>(null);
  const [showHelpNote, setShowHelpNote] = useState<boolean>(false);

  const handleAction = (diff: CheckinDifficulty) => {
    setSelectedDifficulty(diff);
    onCheckin(diff);
  };

  const isCompleted = task.status === 'completed';

  return (
    <div className="space-y-6">
      {/* Active Day Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C85A32] text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
            {activeDayNumber}
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Bugünün Görevi</span>
            <h3 className="text-base font-bold text-slate-900 leading-tight">
              {activeDayNumber}. Gün Adımı ({activeDayNumber} / {totalDays})
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isCompleted ? (
            <Badge variant="emerald" className="px-3 py-1 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              Tamamlandı
            </Badge>
          ) : (
            <Badge variant="terracotta" className="px-3 py-1 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 mr-1 text-[#C85A32]" />
              {task.durationMinutes} Dakika Odak
            </Badge>
          )}
        </div>
      </div>

      {/* Main Focus Task Card */}
      <Card className={`border-2 transition-all ${isCompleted ? 'border-emerald-200 bg-emerald-50/20' : 'border-[#C85A32]/30 bg-white'}`}>
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Badge variant={isCompleted ? 'emerald' : 'terracotta'} className="mb-2 font-semibold">
                {task.taskType === 'coding' ? 'Yazılım Görevi' : task.taskType === 'exam_quiz' ? 'Sınav & Test' : 'Öğrenme & Pratik'}
              </Badge>
              <h2 className="font-serif text-3xl font-normal text-[#241E2B] tracking-tight">{task.title}</h2>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[11px] text-stone-400 block font-medium">Zorluk Seviyesi</span>
              <div className="flex items-center gap-1 mt-0.5 justify-end">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`w-2.5 h-2.5 rounded-full ${
                      star <= task.difficulty ? 'bg-[#C85A32]' : 'bg-stone-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <p className="text-slate-700 text-sm leading-relaxed border-l-3 border-[#C85A32] pl-3.5 py-0.5 bg-stone-50/80 rounded-r-lg">
            {task.description}
          </p>

          {/* Success Criteria Box */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-600" />
              Bugünkü Başarı Kriteri:
            </span>
            <p className="text-xs text-slate-600 pl-5">{task.successCriteria}</p>
          </div>

          {/* Free Resource Link */}
          {task.freeResourceUrl && (
            <div className="pt-1">
              <a
                href={task.freeResourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Önerilen Ücretsiz Eğitim Kaynağını Aç
              </a>
            </div>
          )}

          {/* Check-in Action Bar */}
          <div className="pt-4 border-t border-slate-200/80 space-y-3">
            <span className="text-xs font-bold text-slate-800 block">
              Bugünkü Görev Durumunuzu İşaretleyin (Check-in):
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleAction('completed')}
                className={`p-2.5 rounded-xl border font-semibold flex flex-col items-center gap-1 transition-all ${
                  isCompleted
                    ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                    : 'border-slate-200 bg-white text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Tamamladım</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction('struggling')}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-amber-700 hover:border-amber-300 hover:bg-amber-50 font-semibold flex flex-col items-center gap-1 transition-all"
              >
                <AlertCircle className="w-4 h-4" />
                <span>Zorlandım</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction('too_easy')}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-blue-700 hover:border-blue-300 hover:bg-blue-50 font-semibold flex flex-col items-center gap-1 transition-all"
              >
                <Flame className="w-4 h-4" />
                <span>Çok Kolaydı</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction('no_time')}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-purple-700 hover:border-purple-300 hover:bg-purple-50 font-semibold flex flex-col items-center gap-1 transition-all"
              >
                <Clock className="w-4 h-4" />
                <span>Vaktim Yoktu</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction('need_help')}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-rose-700 hover:border-rose-300 hover:bg-rose-50 font-semibold flex flex-col items-center gap-1 transition-all col-span-2 sm:col-span-1"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Yardım İste</span>
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
