import { Plan, PlanTask, Checkin, MasteryItem, Evidence, GoalAnalysisResult, GoalInput, Profile } from '../types';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const LOCAL_STORAGE_KEY_GOALS = 'adimai_goals_v1';
const LOCAL_STORAGE_KEY_PLANS = 'adimai_plans_v1';
const LOCAL_STORAGE_KEY_TASKS = 'adimai_tasks_v1';
const LOCAL_STORAGE_KEY_CHECKINS = 'adimai_checkins_v1';
const LOCAL_STORAGE_KEY_MASTERY = 'adimai_mastery_v1';
const LOCAL_STORAGE_KEY_EVIDENCE = 'adimai_evidence_v1';
const LOCAL_STORAGE_KEY_ACTIVE_GOAL_ID = 'adimai_active_goal_id_v1';

export interface StorageGoal extends GoalInput {
  id: string;
  userId: string;
  status: 'active' | 'completed' | 'paused' | 'archived';
  estimatedMinDays: number;
  estimatedMaxDays: number;
  confidence: number;
  createdAt: string;
  updatedAt: string;
}

export class StorageService {
  // Save active goal ID
  setActiveGoalId(id: string) {
    localStorage.setItem(LOCAL_STORAGE_KEY_ACTIVE_GOAL_ID, id);
  }

  getActiveGoalId(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_KEY_ACTIVE_GOAL_ID);
  }

  // Goals
  getGoals(): StorageGoal[] {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_GOALS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  saveGoal(goal: StorageGoal): void {
    const goals = this.getGoals();
    const existingIndex = goals.findIndex(g => g.id === goal.id);
    if (existingIndex >= 0) {
      goals[existingIndex] = goal;
    } else {
      goals.unshift(goal);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY_GOALS, JSON.stringify(goals));
    this.setActiveGoalId(goal.id);
  }

  deleteGoal(goalId: string): void {
    const goals = this.getGoals().filter(g => g.id !== goalId);
    localStorage.setItem(LOCAL_STORAGE_KEY_GOALS, JSON.stringify(goals));

    const plans = this.getPlans().filter(p => p.goalId !== goalId);
    localStorage.setItem(LOCAL_STORAGE_KEY_PLANS, JSON.stringify(plans));

    if (this.getActiveGoalId() === goalId) {
      localStorage.removeItem(LOCAL_STORAGE_KEY_ACTIVE_GOAL_ID);
    }
  }

  // Plans
  getPlans(): Plan[] {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_PLANS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  getPlanByGoalId(goalId: string): Plan | null {
    const plans = this.getPlans();
    return plans.find(p => p.goalId === goalId) || null;
  }

  savePlan(plan: Plan): void {
    const plans = this.getPlans();
    const existingIndex = plans.findIndex(p => p.id === plan.id || p.goalId === plan.goalId);
    if (existingIndex >= 0) {
      plans[existingIndex] = plan;
    } else {
      plans.unshift(plan);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY_PLANS, JSON.stringify(plans));
  }

  // Checkins
  getCheckins(goalId: string): Checkin[] {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_CHECKINS);
    if (!raw) return [];
    try {
      const all: Checkin[] = JSON.parse(raw);
      return all.filter(c => c.goalId === goalId);
    } catch {
      return [];
    }
  }

  saveCheckin(checkin: Checkin): void {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_CHECKINS);
    const all: Checkin[] = raw ? JSON.parse(raw) : [];
    all.unshift(checkin);
    localStorage.setItem(LOCAL_STORAGE_KEY_CHECKINS, JSON.stringify(all));
  }

  // Mastery Items
  getMasteryItems(goalId: string): MasteryItem[] {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_MASTERY);
    if (!raw) return [];
    try {
      const all: MasteryItem[] = JSON.parse(raw);
      return all.filter(m => m.goalId === goalId);
    } catch {
      return [];
    }
  }

  saveMasteryItem(item: MasteryItem): void {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_MASTERY);
    const all: MasteryItem[] = raw ? JSON.parse(raw) : [];
    const idx = all.findIndex(m => m.id === item.id || (m.goalId === item.goalId && m.topic === item.topic));
    if (idx >= 0) {
      all[idx] = item;
    } else {
      all.push(item);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY_MASTERY, JSON.stringify(all));
  }

  // Evidence
  getEvidence(goalId: string): Evidence[] {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_EVIDENCE);
    if (!raw) return [];
    try {
      const all: Evidence[] = JSON.parse(raw);
      return all.filter(e => e.goalId === goalId);
    } catch {
      return [];
    }
  }

  saveEvidence(ev: Evidence): void {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_EVIDENCE);
    const all: Evidence[] = raw ? JSON.parse(raw) : [];
    all.unshift(ev);
    localStorage.setItem(LOCAL_STORAGE_KEY_EVIDENCE, JSON.stringify(all));
  }
}

export const storageService = new StorageService();
