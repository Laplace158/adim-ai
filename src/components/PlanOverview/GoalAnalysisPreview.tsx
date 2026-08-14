import React, { useState } from 'react';
import { CheckCircle2, Clock, ArrowRight, Award, Check, Sparkles, AlertTriangle, MessageSquarePlus, ExternalLink, HelpCircle } from 'lucide-react';
import { GoalAnalysisResult, PlanTask } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { TaskDetailModal } from './TaskDetailModal';

interface GoalAnalysisPreviewProps {
  analysis: GoalAnalysisResult;
  aiSource?: 'gemini' | 'mock';
  onProceedToPlan: () => void;
  onBackToWizard: () => void;
  onRefineGoal?: (extraNotes: string) => void;
}

export const GoalAnalysisPreview: React.FC<GoalAnalysisPreviewProps> = ({
  analysis,
  aiSource = 'mock',
  onProceedToPlan,
  onBackToWizard,
  onRefineGoal
}) => {
  const { realisticAssessment, assumptions, milestones, tasks, finalEvidence, category } = analysis;
  const [extraText, setExtraText] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [selectedTask, setSelectedTask] = useState<PlanTask | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // Reset refining state when analysis changes
  React.useEffect(() => {
    setIsRefining(false);
    setExtraText('');
  }, [analysis]);

  const handleRefineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!extraText.trim() || !onRefineGoal || isRefining) return;
    setIsRefining(true);
    await onRefineGoal(extraText.trim());
  };

  const handleTaskClick = (task: PlanTask) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-8 animate-fade-in">
      {/* AI Source Indicator */}
      {aiSource === 'gemini' ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2 text-xs text-emerald-800 font-medium">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Bu plan <strong>Gemini AI</strong> tarafından hedefinize özel olarak üretildi. Görevler jenerik değil, tam olarak yazdığınız hedefe özeldir.</span>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2 text-xs text-amber-800 font-medium">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Gemini AI bağlantısı kurulamadı. Bu plan <strong>yerleşik şablon motoru</strong> ile üretildi. AI özel görevler için geçerli bir API anahtarı gereklidir.</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-[#A4E8C2]/20 text-[#241E2B] border border-[#A4E8C2]/40 inline-flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#C85A32]" />
          Hedef Analizi ve Gerçekçi Süre Raporu Tamamlandı
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#241E2B] tracking-tight">
          {realisticAssessment.alternativeGoal}
        </h2>
        <p className="text-[#766F82] text-sm max-w-xl mx-auto">
          {analysis.goalSummary}
        </p>

        {/* Goal Refinement Input Area */}
        <div className="mt-4 p-4 bg-slate-100/80 border border-slate-200 rounded-2xl max-w-2xl mx-auto text-left shadow-2xs">
          <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
            <MessageSquarePlus className="w-4 h-4 text-[#C85A32]" />
            Hedefinizi Kesinleştirin & Özel İstek Ekleyin (İsteğe Bağlı)
          </label>
          <form onSubmit={handleRefineSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={extraText}
              onChange={(e) => setExtraText(e.target.value)}
              placeholder="Örn: Hafta sonları daha az vakit ayırabilirim / Konuşma pratiğine ağırlık ver..."
              className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-[#C85A32] focus:outline-none"
            />
            <Button 
              type="submit" 
              size="sm" 
              variant="outline"
              isLoading={isRefining}
              disabled={!extraText.trim()}
              className="border-[#C85A32] text-[#C85A32] hover:bg-[#C85A32] hover:text-white shrink-0 text-xs font-bold"
            >
              Planı Yeniden Şekillendir
            </Button>
          </form>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Planı inceledikten sonra özel şartlarınızı yazıp yapay zekanın rotanızı anında revize etmesini sağlayabilirsiniz.
          </span>
        </div>
      </div>

      {/* Realistic Assessment Card */}
      <Card className={`border-2 ${realisticAssessment.isOriginalGoalRealistic ? 'border-emerald-200 bg-emerald-50/20' : 'border-amber-200 bg-amber-50/20'}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Gerçekçilik Değerlendirmesi</span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              {realisticAssessment.isOriginalGoalRealistic ? 'Hedefiniz Gerçekçi ve Başarılabilir' : 'Hedefiniz Yeniden Ölçeklendirildi'}
            </h3>
          </div>
          <Badge variant={realisticAssessment.isOriginalGoalRealistic ? 'emerald' : 'amber'} className="text-sm px-3 py-1">
            Tahmin Güven Oranı: %{Math.round(realisticAssessment.confidence * 100)}
          </Badge>
        </div>

        <div className="py-4">
          <p className="text-sm text-slate-700 leading-relaxed">
            {realisticAssessment.explanation}
          </p>
        </div>

        {/* Timeline Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="text-[11px] text-slate-500 block">Min. Süre</span>
            <span className="text-xl font-bold text-slate-900">{realisticAssessment.minDays} Gün</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="text-[11px] text-slate-500 block">Max. Süre</span>
            <span className="text-xl font-bold text-slate-900">{realisticAssessment.maxDays} Gün</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="text-[11px] text-slate-500 block">Devamlılık Oranı</span>
            <span className="text-xl font-bold text-slate-900">%{Math.round(realisticAssessment.consistencyFactor * 100)}</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="text-[11px] text-slate-500 block">Toplam Çalışma</span>
            <span className="text-xl font-bold text-slate-900">{Math.round(realisticAssessment.requiredTotalMinutes / 60)} Saat</span>
          </div>
        </div>
      </Card>

      {/* Assumptions & Milestones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Assumptions */}
        <Card className="space-y-3">
          <h4 className="font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            Hesaplama Varsayımları
          </h4>
          <ul className="space-y-2 text-xs text-slate-600">
            {assumptions.map((asm, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{asm}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Milestones */}
        <Card className="space-y-3">
          <h4 className="font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-600" />
            Önemli Kilometre Taşları
          </h4>
          <ul className="space-y-2 text-xs text-slate-600">
            {milestones.map((ms, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  {ms.day}G
                </span>
                <div>
                  <span className="font-semibold text-slate-800">{ms.title}</span>
                  <p className="text-[11px] text-slate-500">{ms.successCriteria}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Daily Tasks Preview List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">7 Günlük İlk Görev Taslağı</h3>
            <p className="text-xs text-slate-500 mt-0.5">Detaylı video bağlantıları, site önerileri ve forum tavsiyeleri için günlere tıklayın.</p>
          </div>
          <Badge variant="blue">{tasks.length} Günlük Görev Haritası</Badge>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => handleTaskClick(task)}
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#C85A32] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#C85A32]/10 text-[#C85A32] font-bold text-xs flex items-center justify-center shrink-0 group-hover:bg-[#C85A32] group-hover:text-white transition-colors">
                  {task.dayNumber}.Gün
                </span>
                <div>
                  <h4 className="font-semibold text-sm text-slate-900 group-hover:text-[#C85A32] flex items-center gap-1.5 transition-colors">
                    {task.title}
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#C85A32]" />
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">{task.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <Badge variant="slate">{task.durationMinutes} Dk</Badge>
                <Badge variant="blue">Zorluk: {task.difficulty}/5</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final Evidence Output — Black Title & Sleek Dark Card */}
      <Card className="bg-slate-950 text-white space-y-4 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Award className="w-5 h-5 text-amber-400" />
          <h4 className="font-black text-lg text-white tracking-tight">
            Hedef Sonunda Oluşacak Somut Kanıtlar
          </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {finalEvidence.map((ev, idx) => (
            <div key={idx} className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="font-medium text-slate-200">{ev}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-200">
        <Button variant="outline" onClick={onBackToWizard} className="w-full sm:w-auto">
          Forma Geri Dön
        </Button>
        <Button variant="primary" size="lg" onClick={onProceedToPlan} className="w-full sm:w-auto font-bold bg-[#C85A32] text-white hover:bg-[#b04b27]">
          Planı Kabul Et ve Görevlerime Başla
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {/* Task Resource & Details Modal */}
      <TaskDetailModal
        task={selectedTask}
        category={category}
        goalTitle={analysis.goalSummary}
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />
    </div>
  );
};

