import React, { useState } from 'react';
import { Target, Clock, ArrowRight, Plus, FolderOpen, Trash2, AlertTriangle, X } from 'lucide-react';
import { Plan } from '../../types';
import { StorageGoal } from '../../services/storageService';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface MyPlansViewProps {
  goals: StorageGoal[];
  plansMap: Record<string, Plan>;
  onSelectPlan: (goal: StorageGoal, plan: Plan) => void;
  onCreateNewGoal: () => void;
  onDeletePlan?: (goalId: string) => void;
}

export const MyPlansView: React.FC<MyPlansViewProps> = ({
  goals,
  plansMap,
  onSelectPlan,
  onCreateNewGoal,
  onDeletePlan
}) => {
  const [goalToDelete, setGoalToDelete] = useState<StorageGoal | null>(null);

  const confirmDelete = () => {
    if (goalToDelete && onDeletePlan) {
      onDeletePlan(goalToDelete.id);
    }
    setGoalToDelete(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <Badge variant="blue">Kayıtlı Çalışma Paneli</Badge>
          <h2 className="font-serif text-4xl font-normal text-[#241E2B] tracking-tight mt-1">
            Kayıtlı Planlarım
          </h2>
          <p className="text-xs text-slate-500">
            Daha önce oluşturduğunuz ve takip ettiğiniz tüm AI hedefleriniz
          </p>
        </div>

        <Button onClick={onCreateNewGoal} size="md">
          <Plus className="w-4 h-4 mr-1.5" />
          Yeni Hedef Oluştur
        </Button>
      </div>

      {goals.length === 0 ? (
        <Card className="text-center py-12 space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <FolderOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Henüz Kayıtlı Planınız Yok</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              İlk hedefinizi tanımlayarak gerçekçi sürenizi öğrenebilir ve günlük adımlarınızı başlatabilirsiniz.
            </p>
          </div>
          <Button onClick={onCreateNewGoal} variant="primary">
            İlk Hedefimi Oluştur
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {goals.map((g) => {
            const plan = plansMap[g.id];
            const tasks = plan ? plan.tasks : [];
            const completedCount = tasks.filter(t => t.status === 'completed').length;
            const totalCount = tasks.length || 7;
            const progressPercent = Math.round((completedCount / totalCount) * 100);

            return (
              <Card key={g.id} className="space-y-4 relative group">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={g.category === 'coding_project' ? 'emerald' : g.category === 'language_learning' ? 'blue' : 'amber'}>
                      {g.category === 'coding_project' ? 'Yazılım Projesi' : g.category === 'language_learning' ? 'Dil Öğrenimi' : g.category === 'exam_study' ? 'Sınav Hazırlığı' : 'Özel Hedef'}
                    </Badge>
                    <span className="text-[11px] text-slate-400">
                      {new Date(g.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={g.status === 'completed' ? 'emerald' : 'blue'}>
                      {g.status === 'completed' ? 'Tamamlandı' : 'Aktif Plan'}
                    </Badge>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setGoalToDelete(g);
                      }}
                      title="Planı Sil"
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="cursor-pointer" onClick={() => plan && onSelectPlan(g, plan)}>
                  <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-[#C85A32] transition-colors">
                    {g.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                    {g.desiredOutcome || g.title}
                  </p>
                </div>

                {/* Progress bar and metrics */}
                <div className="space-y-2 pt-1 cursor-pointer" onClick={() => plan && onSelectPlan(g, plan)}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Tamamlanan İlerleme</span>
                    <span className="font-bold text-slate-900">{completedCount} / {totalCount} Gün (%{progressPercent})</span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-[#C85A32] h-2 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-[#C85A32]" />
                      Günde {g.dailyMinutes} Dk
                    </span>
                    <span>•</span>
                    <span>Tahmini {g.estimatedMinDays}-{g.estimatedMaxDays} Gün</span>
                  </div>

                  <Button size="sm" variant="outline" onClick={() => plan && onSelectPlan(g, plan)} className="text-xs">
                    Plana Git ve Devam Et
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {goalToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 relative">
            <button
              onClick={() => setGoalToDelete(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-lg text-slate-900">Planı Silmek İstediğinize Emin Misiniz?</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>"{goalToDelete.title}"</strong> adlı planınız ve tüm kayıtlı ilerlemeleriniz tamamen silinecektir. Bu işlem geri alınamaz.
            </p>

            <div className="pt-3 flex justify-end gap-2.5 border-t border-slate-100">
              <Button variant="outline" onClick={() => setGoalToDelete(null)} className="text-xs">
                Vazgeç
              </Button>
              <Button variant="danger" onClick={confirmDelete} className="text-xs font-bold bg-rose-600 text-white hover:bg-rose-700">
                Evet, Planı Sil
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

