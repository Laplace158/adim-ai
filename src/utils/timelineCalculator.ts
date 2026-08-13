import { GoalCategory, GoalInput, RealisticAssessment, UserLevel } from '../types';

/**
 * Benchmark required learning minutes per category & target level
 */
const CATEGORY_REQUIRED_MINUTES: Record<GoalCategory, Record<string, number>> = {
  language_learning: {
    'A1': 2800,  // ~46 hours of study & practice for Travel English
    'A2': 5400,
    'B1': 11000,
    'beginner': 2800,
    'intermediate': 6000,
    'advanced': 12000
  },
  coding_project: {
    'beginner': 3600, // ~60 hours for first functional CRUD project / PWA
    'intermediate': 7200,
    'advanced': 14000,
    'A1': 3600,
    'A2': 5000,
    'B1': 8000,
    'B2': 12000
  },
  exam_study: {
    'beginner': 4500, // ~75 hours for exam topic review & mock tests
    'intermediate': 7500,
    'advanced': 12000,
    'A1': 4500,
    'A2': 6000,
    'B1': 9000,
    'B2': 14000
  },
  other: {
    'beginner': 3000,
    'intermediate': 6000,
    'advanced': 10000,
    'A1': 3000,
    'A2': 5000,
    'B1': 8000,
    'B2': 12000
  }
};

/**
 * Consistency factor based on weekly commitment
 */
function getConsistencyFactor(daysPerWeek: number): number {
  if (daysPerWeek >= 6) return 0.85; // High commitment, but potential burnout risk
  if (daysPerWeek === 5) return 0.80; // Optimal consistency
  if (daysPerWeek === 4) return 0.72;
  if (daysPerWeek === 3) return 0.60;
  return 0.50; // 1-2 days per week has lower retention
}

/**
 * Calculate deterministic realistic timeline for a goal
 */
export function calculateTimeline(input: GoalInput): RealisticAssessment {
  const { category, currentLevel, dailyMinutes, daysPerWeek } = input;
  
  // 1. Determine benchmark required minutes
  const categoryBenchmarks = CATEGORY_REQUIRED_MINUTES[category] || CATEGORY_REQUIRED_MINUTES.language_learning;
  const requiredTotalMinutes = categoryBenchmarks[currentLevel] || 3200;

  // 2. Compute effective daily minutes
  const consistencyFactor = getConsistencyFactor(daysPerWeek);
  const effectiveDailyMinutes = dailyMinutes * consistencyFactor;

  // 3. Compute study days, review days, and buffer days
  const estimatedStudyDays = Math.ceil(requiredTotalMinutes / Math.max(effectiveDailyMinutes, 10));
  const reviewDays = Math.ceil(estimatedStudyDays * 0.15); // 15% dedicated to review & spaced repetition
  const bufferDays = Math.ceil(estimatedStudyDays * 0.10); // 10% life/schedule recovery buffer

  const estimatedTotalDays = estimatedStudyDays + reviewDays + bufferDays;

  // 4. Min / Max range
  const minDays = Math.max(7, Math.floor(estimatedTotalDays * 0.85));
  const maxDays = Math.max(minDays + 3, Math.ceil(estimatedTotalDays * 1.20));

  // 5. Confidence score (0.50 to 0.92)
  let confidence = 0.76;
  if (daysPerWeek >= 4 && dailyMinutes >= 25 && dailyMinutes <= 90) {
    confidence += 0.10;
  } else if (dailyMinutes < 20 || daysPerWeek <= 2) {
    confidence -= 0.15;
  }

  // 6. Realistic check
  let isOriginalGoalRealistic = true;
  let explanation = `Günde ${dailyMinutes} dakika ve haftada ${daysPerWeek} gün çalışma temposuyla hedefinize ${minDays}-${maxDays} gün arasında ulaşmanız öngörülmektedir.`;
  let alternativeGoal = input.title;

  // If user has unreasonable expectations (e.g. 2 months for fluent C2)
  if (minDays > 90 && input.targetDate) {
    const targetDays = Math.ceil((new Date(input.targetDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    if (targetDays > 0 && targetDays < minDays * 0.6) {
      isOriginalGoalRealistic = false;
      explanation = `${targetDays} günde bu kapsama sıfırdan ulaşmak gerçekçi değildir. Ancak odaklanmış bir alt hedefle (örn. temel seyahat/proje seviyesi) bu sürede harika bir ilerleme kaydedebilirsiniz.`;
      alternativeGoal = `${targetDays} Günde Temel Uygulamalı ${category === 'language_learning' ? 'Konuşma' : category === 'coding_project' ? 'Proje' : 'Sınav'} Hazırlığı`;
    }
  }

  return {
    isOriginalGoalRealistic,
    explanation,
    alternativeGoal,
    minDays,
    maxDays,
    confidence: Number(confidence.toFixed(2)),
    consistencyFactor,
    requiredTotalMinutes
  };
}
