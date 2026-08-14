import React, { useState, useEffect } from 'react';
import { Navbar, StepType } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { GoalWizard } from './components/GoalForm/GoalWizard';
import { GoalAnalysisPreview } from './components/PlanOverview/GoalAnalysisPreview';
import { DiagnosticTestView } from './components/DiagnosticTest/DiagnosticTestView';
import { PlanDashboard } from './components/PlanOverview/PlanDashboard';
import { EvidencePage } from './components/Evidence/EvidencePage';
import { MyPlansView } from './components/MyPlans/MyPlansView';
import { PortfolioPage } from './components/Portfolio/PortfolioPage';
import { AuthModal } from './components/Auth/AuthModal';
import { GoalAnalysisResult, GoalInput, Plan, CheckinDifficulty, DiagnosticTest, Evidence, GoalCategory } from './types';
import { geminiAIProvider, getLastGenerationSource } from './services/ai/geminiProvider';
import { storageService, StorageGoal } from './services/storageService';
import { applyAdaptiveCheckinRules } from './utils/adaptiveRules';
import { calculateNextMastery } from './utils/masteryCalculator';

const LOCAL_STORAGE_USER_KEY = 'adimai_active_user_v1';

export default function App() {
  const [currentStep, setCurrentStep] = useState<StepType>('landing');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const [goalInput, setGoalInput] = useState<GoalInput | null>(null);
  const [analysisResult, setAnalysisResult] = useState<GoalAnalysisResult | null>(null);
  const [activeGoal, setActiveGoal] = useState<StorageGoal | null>(null);
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  const [activeDiagnosticTest, setActiveDiagnosticTest] = useState<DiagnosticTest | null>(null);
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
  const [masteryScore, setMasteryScore] = useState<number>(75);
  const [evidences, setEvidences] = useState<Evidence[]>([]);
  const [aiSource, setAiSource] = useState<'gemini' | 'mock'>('mock');

  const [savedGoals, setSavedGoals] = useState<StorageGoal[]>([]);
  const [plansMap, setPlansMap] = useState<Record<string, Plan>>({});

  // Restore user session & goals on mount
  useEffect(() => {
    const rawUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (rawUser) {
      try {
        setUser(JSON.parse(rawUser));
      } catch {
        setUser(null);
      }
    }

    refreshSavedPlans();
  }, []);

  const refreshSavedPlans = () => {
    const goals = storageService.getGoals();
    setSavedGoals(goals);

    const map: Record<string, Plan> = {};
    goals.forEach(g => {
      const p = storageService.getPlanByGoalId(g.id);
      if (p) map[g.id] = p;
    });
    setPlansMap(map);

    if (goals.length > 0 && !activePlan) {
      const activeG = goals[0];
      const p = map[activeG.id];
      if (p) {
        setActiveGoal(activeG);
        setActivePlan(p);
        const storedEv = storageService.getEvidence(activeG.id);
        setEvidences(storedEv);
      }
    }
  };

  const handleLoginSuccess = (userObj: { id: string; name: string; email: string }) => {
    setUser(userObj);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(userObj));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  };

  const handleStartGoal = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setCurrentStep('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartGoalWithTemplate = (
    title: string, 
    category: GoalCategory, 
    level: 'beginner' | 'intermediate' | 'advanced'
  ) => {
    const input: GoalInput = {
      title,
      category,
      currentLevel: level,
      dailyMinutes: 30,
      daysPerWeek: 5,
      desiredOutcome: title,
      preferFreeResources: true
    };

    if (!user) {
      setGoalInput(input);
      setIsAuthModalOpen(true);
      return;
    }

    handleGoalSubmit(input);
  };

  const handleGoalSubmit = async (input: GoalInput) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    setIsLoading(true);
    setGoalInput(input);
    try {
      // Analyze goal using Live Gemini AI provider (with API Key)
      const result = await geminiAIProvider.analyzeGoal(input);
      setAnalysisResult(result);
      setAiSource(getLastGenerationSource());

      const goalId = `goal-${Date.now()}`;
      const storageGoal: StorageGoal = {
        ...input,
        id: goalId,
        userId: user.id,
        status: 'active',
        estimatedMinDays: result.realisticAssessment.minDays,
        estimatedMaxDays: result.realisticAssessment.maxDays,
        confidence: result.realisticAssessment.confidence,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setActiveGoal(storageGoal);
      storageService.saveGoal(storageGoal);

      // Generate plan with all tasks initial status: 'pending'
      const plan = await geminiAIProvider.generatePlan(goalId, result);
      setActivePlan(plan);
      storageService.savePlan(plan);

      // Diagnostic test & evidence with goal-specific title and level context
      const diagTest = await geminiAIProvider.generateDiagnosticTest(goalId, input.category, input.title, input.currentLevel);
      setActiveDiagnosticTest(diagTest);

      const initialEv = await geminiAIProvider.generateEvidence(goalId, input.category, input.title);
      setEvidences(initialEv);
      initialEv.forEach(ev => storageService.saveEvidence(ev));

      refreshSavedPlans();
      setCurrentStep('preview');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Goal submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefineGoal = async (extraNotes: string) => {
    if (!goalInput || !activeGoal) return;
    setIsLoading(true);

    const refinedInput: GoalInput = {
      ...goalInput,
      title: `${goalInput.title} (Özel Not/Revizyon: ${extraNotes})`
    };

    try {
      const result = await geminiAIProvider.analyzeGoal(refinedInput);
      setAnalysisResult(result);

      const updatedStorageGoal: StorageGoal = {
        ...activeGoal,
        title: refinedInput.title,
        estimatedMinDays: result.realisticAssessment.minDays,
        estimatedMaxDays: result.realisticAssessment.maxDays,
        updatedAt: new Date().toISOString()
      };

      setActiveGoal(updatedStorageGoal);
      storageService.saveGoal(updatedStorageGoal);

      const updatedPlan = await geminiAIProvider.generatePlan(activeGoal.id, result);
      setActivePlan(updatedPlan);
      storageService.savePlan(updatedPlan);

      refreshSavedPlans();
    } catch (err) {
      console.error('Goal refinement error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePlan = (goalId: string) => {
    storageService.deleteGoal(goalId);
    if (activeGoal?.id === goalId) {
      setActiveGoal(null);
      setActivePlan(null);
    }
    refreshSavedPlans();
  };

  const handleProceedToPlan = () => {
    if (activeDiagnosticTest) {
      setCurrentStep('diagnostic');
    } else {
      setCurrentStep('dashboard');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteDiagnosticTest = (score: number) => {
    setMasteryScore(Math.max(50, score));
    setCurrentStep('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckinTask = (difficulty: CheckinDifficulty) => {
    if (!activePlan) return;

    // Find current active unlocked pending task
    const tasks = activePlan.tasks;
    let pendingIdx = tasks.findIndex((t, idx) => {
      if (idx === 0) return t.status !== 'completed';
      return tasks[idx - 1].status === 'completed' && t.status !== 'completed';
    });
    if (pendingIdx === -1) pendingIdx = 0;

    const currentTask = tasks[pendingIdx];
    if (!currentTask) return;

    const adaptiveRes = applyAdaptiveCheckinRules(currentTask, difficulty, activePlan.version);

    // Update task status in plan
    const updatedTasks = [...tasks];
    updatedTasks[pendingIdx] = adaptiveRes.updatedTask;

    const updatedPlan: Plan = {
      ...activePlan,
      version: adaptiveRes.incrementVersion ? activePlan.version + 1 : activePlan.version,
      tasks: updatedTasks
    };

    setActivePlan(updatedPlan);
    storageService.savePlan(updatedPlan);

    // Mastery Score calculation
    const isSuccess = difficulty === 'completed' || difficulty === 'too_easy';
    const masteryItem = calculateNextMastery(undefined, activePlan.goalId, currentTask.title, isSuccess, currentTask.difficulty);
    storageService.saveMasteryItem(masteryItem);
    setMasteryScore(Math.round(masteryItem.masteryScore * 100));

    refreshSavedPlans();
  };

  const handleSelectPlan = (goal: StorageGoal, plan: Plan) => {
    setActiveGoal(goal);
    setActivePlan(plan);
    const ev = storageService.getEvidence(goal.id);
    setEvidences(ev);
    setCurrentStep('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in portfolio mode, render standalone PortfolioPage full layout
  if (currentStep === 'portfolio') {
    return <PortfolioPage onOpenApp={() => setCurrentStep('landing')} />;
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#241E2B] font-sans flex flex-col selection:bg-[#C85A32] selection:text-white">
      {/* Header Navbar */}
      <Navbar
        currentStep={currentStep}
        user={user}
        onNavigate={(step) => {
          if (step === 'my_plans' && !user) {
            setIsAuthModalOpen(true);
            return;
          }
          setCurrentStep(step);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4">
        {currentStep === 'landing' && (
          <LandingPage 
            onStartGoal={handleStartGoal} 
            onStartGoalWithTemplate={handleStartGoalWithTemplate}
          />
        )}

        {currentStep === 'wizard' && (
          <GoalWizard onSubmitGoal={handleGoalSubmit} isLoading={isLoading} />
        )}

        {currentStep === 'preview' && analysisResult && (
          <GoalAnalysisPreview
            analysis={analysisResult}
            aiSource={aiSource}
            onProceedToPlan={handleProceedToPlan}
            onBackToWizard={() => setCurrentStep('wizard')}
            onRefineGoal={handleRefineGoal}
          />
        )}

        {currentStep === 'diagnostic' && activeDiagnosticTest && (
          <DiagnosticTestView
            test={activeDiagnosticTest}
            onCompleteTest={handleCompleteDiagnosticTest}
          />
        )}

        {currentStep === 'dashboard' && activePlan && (
          <PlanDashboard
            goalTitle={activeGoal?.title || analysisResult?.goalSummary || goalInput?.title || 'AdımAI Hedef Planım'}
            category={activeGoal?.category || goalInput?.category || 'coding_project'}
            plan={activePlan}
            activeDayIndex={activeDayIndex}
            masteryScore={masteryScore}
            onCheckinTask={handleCheckinTask}
            onOpenEvidence={() => setCurrentStep('evidence')}
            onOpenDiagnostic={() => setCurrentStep('diagnostic')}
          />
        )}

        {currentStep === 'evidence' && (
          <EvidencePage
            goalTitle={activeGoal?.title || analysisResult?.goalSummary || goalInput?.title || 'AdımAI Proje Planı'}
            category={activeGoal?.category || goalInput?.category || 'coding_project'}
            evidences={evidences}
            masteryScorePercentage={masteryScore}
          />
        )}

        {currentStep === 'my_plans' && (
          <MyPlansView
            goals={savedGoals}
            plansMap={plansMap}
            onSelectPlan={handleSelectPlan}
            onCreateNewGoal={handleStartGoal}
            onDeletePlan={handleDeletePlan}
          />
        )}
      </main>

      {/* Auth Login / Register Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-[#E5DFDA] py-8 text-center text-xs text-[#766F82] mt-16">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#241E2B]">AdımAI</span>
            <span>— Hedefini Yaz. Gerçekçi Yolunu Gör.</span>
          </div>
          <div className="flex items-center gap-4 text-[#766F82]">
            <button onClick={() => setCurrentStep('portfolio')} className="hover:text-[#C85A32] font-bold">
              Case Study / Portföy
            </button>
            <span>•</span>
            <span>Gemini AI Entegre</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
