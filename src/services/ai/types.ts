import { 
  GoalAnalysisResult, 
  GoalCategory, 
  GoalInput, 
  DiagnosticTest, 
  Plan, 
  CheckinDifficulty, 
  PlanTask, 
  Evidence 
} from '../../types';

export interface AIProvider {
  analyzeGoal(input: GoalInput): Promise<GoalAnalysisResult>;
  generateDiagnosticTest(goalId: string, category: GoalCategory, goalTitle?: string, currentLevel?: string): Promise<DiagnosticTest>;
  evaluateDiagnosticTest(testId: string, answers: Record<string, number>): Promise<{ score: number; topicScores: Record<string, number> }>;
  generatePlan(goalId: string, analysis: GoalAnalysisResult): Promise<Plan>;
  evaluateCheckinAndAdapt(
    goalId: string, 
    currentTask: PlanTask, 
    difficulty: CheckinDifficulty
  ): Promise<{ newPlanVersion?: number; updatedTask?: PlanTask; message: string }>;
  generateEvidence(goalId: string, category: GoalCategory, title: string): Promise<Evidence[]>;
}
