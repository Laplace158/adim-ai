import { MasteryItem } from '../types';

/**
 * Calculates new mastery score (0.00 to 1.00) and spaced repetition dates
 */
export function calculateNextMastery(
  existingItem: MasteryItem | undefined,
  goalId: string,
  topic: string,
  isSuccess: boolean,
  difficultyLevel: number = 1
): MasteryItem {
  const currentScore = existingItem ? Number(existingItem.masteryScore) : 0.10;
  const currentReviews = existingItem ? existingItem.reviewCount : 0;
  const currentErrors = existingItem ? existingItem.errorCount : 0;

  let newScore = currentScore;
  let newErrors = currentErrors;

  if (isSuccess) {
    // Increase mastery progressively
    if (currentScore < 0.30) newScore = 0.35;
    else if (currentScore < 0.60) newScore = 0.65;
    else if (currentScore < 0.85) newScore = 0.88;
    else newScore = 0.98;
  } else {
    // Decrease slightly on error
    newScore = Math.max(0.10, currentScore - 0.20);
    newErrors += 1;
  }

  // Spaced repetition interval (Days until next review)
  let intervalDays = 1;
  if (newScore > 0.85) intervalDays = 7;
  else if (newScore > 0.60) intervalDays = 3;
  else if (newScore > 0.35) intervalDays = 2;

  const now = new Date();
  const nextReview = new Date(now.getTime() + intervalDays * 24 * 3600 * 1000);

  return {
    id: existingItem ? existingItem.id : `mastery-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    goalId,
    topic,
    masteryScore: Number(newScore.toFixed(2)),
    reviewCount: currentReviews + 1,
    lastReviewedAt: now.toISOString(),
    nextReviewAt: nextReview.toISOString(),
    errorCount: newErrors,
    difficulty: difficultyLevel
  };
}
