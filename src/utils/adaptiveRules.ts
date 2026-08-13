import { CheckinDifficulty, PlanTask, Plan } from '../types';

export interface AdaptiveResult {
  updatedTask: PlanTask;
  message: string;
  incrementVersion: boolean;
}

export function applyAdaptiveCheckinRules(
  currentTask: PlanTask,
  difficulty: CheckinDifficulty,
  currentPlanVersion: number
): AdaptiveResult {
  if (difficulty === 'completed') {
    return {
      updatedTask: {
        ...currentTask,
        status: 'completed',
        completedAt: new Date().toISOString()
      },
      message: 'Tebrikler! Bugünkü görevinizi tamamladınız. Ustalık puanınız güncellendi!',
      incrementVersion: false
    };
  }

  if (difficulty === 'struggling' || difficulty === 'need_help') {
    const newDuration = Math.max(15, Math.floor(currentTask.durationMinutes * 0.65));
    return {
      updatedTask: {
        ...currentTask,
        title: currentTask.title.startsWith('[Odaklı]') ? currentTask.title : `[Odaklı] ${currentTask.title}`,
        description: `Görev daha küçük parçaya bölündü: ${currentTask.description} (15 dk odaklı pratik).`,
        durationMinutes: newDuration,
        difficulty: Math.max(1, currentTask.difficulty - 1),
        status: 'pending'
      },
      message: 'Hiç sorun değil! Planınızı seviyenize göre hafiflettik ve adımları küçülttük.',
      incrementVersion: true
    };
  }

  if (difficulty === 'no_time') {
    return {
      updatedTask: {
        ...currentTask,
        title: `[10 Dk Mikro Tekrar] ${currentTask.title}`,
        durationMinutes: 10,
        description: 'Sadece 10 dakikalık hızlı özet ve temel tekrar adımı.',
        status: 'pending'
      },
      message: 'Zamanınız az olduğunda dahi devamlılığı korumak için 10 dakikalık mikro-tekrar adımı oluşturuldu.',
      incrementVersion: false
    };
  }

  if (difficulty === 'too_easy') {
    return {
      updatedTask: {
        ...currentTask,
        difficulty: Math.min(5, currentTask.difficulty + 1),
        description: `${currentTask.description} (Ekstra meydan okuma görevi eklendi).`,
        status: 'completed',
        completedAt: new Date().toISOString()
      },
      message: 'Harika bir performans! Sonraki görevlerde zorluk derecesini biraz yükseltiyoruz.',
      incrementVersion: false
    };
  }

  return {
    updatedTask: currentTask,
    message: 'Check-in kaydedildi.',
    incrementVersion: false
  };
}
