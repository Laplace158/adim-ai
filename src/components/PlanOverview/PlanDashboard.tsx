import React from 'react';
import { Target, CheckCircle2, Clock, Award, Flame, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { Plan, PlanTask, CheckinDifficulty, GoalCategory } from '../../types';
import { TodayTaskCard } from '../TodayTask/TodayTaskCard';
import { FocusTimerWidget } from '../FocusTimer/FocusTimerWidget';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface PlanDashboardProps {
  goalTitle: string;
  category: GoalCategory;
  plan: Plan;
  activeDayIndex: number;
  masteryScore: number;
  onCheckinTask: (difficulty: CheckinDifficulty) => void;
  onOpenEvidence: () => void;
  onOpenDiagnostic: () => void;
}

export const PlanDashboard: React.FC<PlanDashboardProps> = ({
  goalTitle,
  category,
  plan,
  activeDayIndex,
  masteryScore,
  onCheckinTask,
  onOpenEvidence,
  onOpenDiagnostic
}) => {
  const tasks = plan.tasks;
  
  // Calculate first unlocked pending task index
  let firstUnlockedPendingIdx = tasks.findIndex((t, idx) => {
    if (idx === 0) return t.status !== 'completed';
    return tasks[idx - 1].status === 'completed' && t.status !== 'completed';
  });

  if (firstUnlockedPendingIdx === -1) {
    // All completed or all pending
    firstUnlockedPendingIdx = tasks.findIndex(t => t.status !== 'completed');
    if (firstUnlockedPendingIdx === -1) firstUnlockedPendingIdx = tasks.length - 1;
  }

  const currentTaskIdx = Math.max(0, firstUnlockedPendingIdx);
  const currentTask = tasks[currentTaskIdx] || tasks[0];

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-8 animate-fade-in">
      {/* Top Banner & Stats */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="terracotta">Plan Versiyonu: v{plan.version}</Badge>
              <Badge variant="slate">{category === 'coding_project' ? 'Yazılım' : category === 'language_learning' ? 'Dil Öğrenimi' : category === 'exam_study' ? 'Sınav' : 'Özel Hedef'}</Badge>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{goalTitle}</h2>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            <Button variant="outline" size="sm" onClick={onOpenDiagnostic}>
              Seviye Testi
            </Button>
            <Button variant="secondary" size="sm" onClick={onOpenEvidence}>
              <Award className="w-4 h-4 mr-1 text-emerald-500" />
              Kanıt & CV
            </Button>
          </div>
        </div>

        {/* Progress Bar & Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-stone-50/70 p-3.5 rounded-xl border border-stone-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-600 font-medium">Genel İlerleme</span>
              <span className="font-bold text-slate-900">%{progressPercent}</span>
            </div>
            <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden">
              <div className="bg-[#C85A32] h-2 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          <div className="bg-stone-50/70 p-3.5 rounded-xl border border-stone-200 flex items-center justify-between">
            <div>
              <span className="text-slate-600 font-medium block">Ustalık Puanı</span>
              <span className="text-lg font-bold text-emerald-600 mt-0.5 block">%{masteryScore}</span>
            </div>
            <Flame className="w-6 h-6 text-[#C85A32]" />
          </div>

          <div className="bg-stone-50/70 p-3.5 rounded-xl border border-stone-200 flex items-center justify-between">
            <div>
              <span className="text-slate-600 font-medium block">Tamamlanan Görev</span>
              <span className="text-lg font-bold text-slate-900 mt-0.5 block">{completedCount} / {tasks.length} Gün</span>
            </div>
            <CheckCircle2 className="w-6 h-6 text-[#C85A32]" />
          </div>
        </div>
      </div>

      {/* Single Active Focus Today Task Component */}
      <TodayTaskCard
        task={currentTask}
        activeDayNumber={currentTask.dayNumber}
        totalDays={tasks.length}
        onCheckin={onCheckinTask}
      />

      {/* Focus Timer Widget */}
      <div className="pt-2">
        <FocusTimerWidget
          taskTitle={`${currentTask.dayNumber}. Gün: ${currentTask.title}`}
          defaultMinutes={currentTask.durationMinutes || 25}
        />
      </div>

      {/* Full 7-Day Plan Map with Sequential Locking */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Sıralı Yol Haritası (Görev Listesi)</h3>
          <span className="text-xs text-slate-500">Günler sırayla tamamlanarak açılır</span>
        </div>

        <div className="space-y-3">
          {tasks.map((t, idx) => {
            const isDone = t.status === 'completed';
            const isCurrent = idx === currentTaskIdx;
            
            // Locking logic: Day 0 is always unlocked. Day N is unlocked ONLY if Day N-1 is completed or if it is day 0.
            const isUnlocked = idx === 0 || tasks[idx - 1].status === 'completed';

            return (
              <div
                key={t.id}
                className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  isCurrent
                    ? 'border-blue-500 bg-white ring-2 ring-blue-500/20 shadow-md'
                    : isDone
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : isUnlocked
                    ? 'border-slate-200 bg-white'
                    : 'border-slate-200 bg-slate-50/60 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 ${
                    isDone 
                      ? 'bg-emerald-600 text-white' 
                      : isCurrent 
                      ? 'bg-blue-600 text-white' 
                      : isUnlocked 
                      ? 'bg-slate-200 text-slate-700' 
                      : 'bg-slate-200 text-slate-400'
                  }`}>
                    {!isUnlocked ? <Lock className="w-3.5 h-3.5" /> : `${t.dayNumber}.G`}
                  </span>

                  <div>
                    <h4 className="font-semibold text-sm text-slate-900 flex items-center gap-2">
                      {t.title}
                      {isCurrent && <Badge variant="blue">Aktif Odak Görevi</Badge>}
                      {!isUnlocked && <Badge variant="slate">🔒 Kilitli</Badge>}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">{t.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {isDone ? (
                    <Badge variant="emerald">Tamamlandı</Badge>
                  ) : isCurrent ? (
                    <Badge variant="blue">Şimdi Yap</Badge>
                  ) : isUnlocked ? (
                    <Badge variant="slate">{t.durationMinutes} Dk</Badge>
                  ) : (
                    <span className="text-[11px] text-slate-400 italic">Önceki Günü Tamamlayın</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
