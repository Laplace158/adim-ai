// AdımAI Domain & Entity TypeScript Definitions

export type GoalCategory = 'language_learning' | 'coding_project' | 'exam_study' | 'other';

export type UserLevel = 'beginner' | 'intermediate' | 'advanced' | 'A1' | 'A2' | 'B1' | 'B2';

export interface Profile {
  id: string;
  displayName: string;
  ageRange?: 'under_18' | '18_24' | '25_34' | '35_plus';
  preferredLanguage: string;
  createdAt: string;
}

export interface GoalInput {
  title: string;
  category: GoalCategory;
  targetDate?: string;
  dailyMinutes: number;
  daysPerWeek: number;
  currentLevel: UserLevel;
  desiredOutcome: string;
  previousExperience?: string;
  whyImportant?: string;
  preferFreeResources: boolean;
}

export interface RealisticAssessment {
  isOriginalGoalRealistic: boolean;
  explanation: string;
  alternativeGoal: string;
  minDays: number;
  maxDays: number;
  confidence: number; // 0.00 to 1.00
  consistencyFactor: number;
  requiredTotalMinutes: number;
}

export interface Milestone {
  day: number;
  title: string;
  successCriteria: string;
}

export type TaskType = 'learning_and_practice' | 'coding' | 'exam_quiz' | 'review';

export interface PlanTask {
  id: string;
  planId?: string;
  dayNumber: number;
  title: string;
  description: string;
  taskType: TaskType;
  durationMinutes: number;
  difficulty: number; // 1 to 5
  successCriteria: string;
  freeResourceUrl?: string;
  status: 'pending' | 'completed' | 'skipped' | 'failed';
  completedAt?: string;
}

export interface Plan {
  id: string;
  goalId: string;
  version: number;
  assumptions: string[];
  estimatedMinDays: number;
  estimatedMaxDays: number;
  tasks: PlanTask[];
  milestones: Milestone[];
  createdAt: string;
}

export type CheckinDifficulty = 'completed' | 'struggling' | 'too_easy' | 'no_time' | 'need_help';
export type CheckinMood = 'great' | 'neutral' | 'struggling';

export interface Checkin {
  id: string;
  goalId: string;
  taskId: string;
  mood?: CheckinMood;
  difficulty: CheckinDifficulty;
  note?: string;
  createdAt: string;
}

export interface DiagnosticQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  topic: string;
  explanation?: string;
}

export interface DiagnosticTest {
  id: string;
  goalId: string;
  category: GoalCategory;
  questions: DiagnosticQuestion[];
  score?: number;
  topicScores?: Record<string, number>;
  createdAt: string;
}

export interface MasteryItem {
  id: string;
  goalId: string;
  topic: string;
  masteryScore: number; // 0.00 to 1.00
  reviewCount: number;
  lastReviewedAt?: string;
  nextReviewAt?: string;
  errorCount: number;
  difficulty: number;
}

export type EvidenceType = 
  | 'speech_evaluation'
  | 'vocabulary_report'
  | 'github_link'
  | 'demo_link'
  | 'readme_md'
  | 'exam_report';

export interface Evidence {
  id: string;
  goalId: string;
  type: EvidenceType;
  title: string;
  content: string;
  url?: string;
  createdAt: string;
}

export interface GoalAnalysisResult {
  goalSummary: string;
  category: GoalCategory;
  realisticAssessment: RealisticAssessment;
  assumptions: string[];
  milestones: Milestone[];
  tasks: PlanTask[];
  finalEvidence: string[];
}
