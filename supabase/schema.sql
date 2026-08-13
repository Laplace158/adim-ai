-- AdımAI Supabase PostgreSQL Database Schema
-- Created according to Master Prompt Specifications with Row Level Security (RLS)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  age_range TEXT CHECK (age_range IN ('under_18', '18_24', '25_34', '35_plus')),
  preferred_language TEXT DEFAULT 'tr',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. GOALS TABLE
CREATE TABLE IF NOT EXISTS public.goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('language_learning', 'coding_project', 'exam_study')),
  target_date DATE,
  daily_minutes INTEGER NOT NULL DEFAULT 30 CHECK (daily_minutes > 0),
  days_per_week INTEGER NOT NULL DEFAULT 5 CHECK (days_per_week BETWEEN 1 AND 7),
  current_level TEXT NOT NULL, -- e.g., 'beginner', 'intermediate', 'A1', 'none'
  desired_outcome TEXT,
  estimated_min_days INTEGER,
  estimated_max_days INTEGER,
  confidence NUMERIC(3, 2), -- e.g. 0.76 (76%)
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. DIAGNOSTIC TESTS TABLE
CREATE TABLE IF NOT EXISTS public.diagnostic_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  goal_id UUID NOT NULL REFERENCES public.goals(id) ON DELETE CASCADE,
  questions JSONB NOT NULL,
  answers JSONB,
  score NUMERIC(5, 2),
  topic_scores JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. PLANS TABLE (Versions supported)
CREATE TABLE IF NOT EXISTS public.plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  goal_id UUID NOT NULL REFERENCES public.goals(id) ON DELETE CASCADE,
  version INTEGER NOT NULL DEFAULT 1,
  assumptions JSONB NOT NULL, -- Array of strings
  estimated_min_days INTEGER NOT NULL,
  estimated_max_days INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. PLAN TASKS TABLE
CREATE TABLE IF NOT EXISTS public.plan_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plan_id UUID NOT NULL REFERENCES public.plans(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  task_type TEXT NOT NULL CHECK (task_type IN ('learning_and_practice', 'coding', 'exam_quiz', 'review')),
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  difficulty INTEGER DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5),
  success_criteria TEXT NOT NULL,
  free_resource_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'skipped', 'failed')),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- 6. CHECKINS TABLE
CREATE TABLE IF NOT EXISTS public.checkins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  goal_id UUID NOT NULL REFERENCES public.goals(id) ON DELETE CASCADE,
  task_id UUID NOT NULL REFERENCES public.plan_tasks(id) ON DELETE CASCADE,
  mood TEXT CHECK (mood IN ('great', 'neutral', 'struggling')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('completed', 'struggling', 'too_easy', 'no_time', 'need_help')),
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. MASTERY ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.mastery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  goal_id UUID NOT NULL REFERENCES public.goals(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  mastery_score NUMERIC(3, 2) NOT NULL DEFAULT 0.10 CHECK (mastery_score BETWEEN 0.00 AND 1.00),
  review_count INTEGER DEFAULT 0,
  last_reviewed_at TIMESTAMP WITH TIME ZONE,
  next_review_at TIMESTAMP WITH TIME ZONE,
  error_count INTEGER DEFAULT 0,
  difficulty INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. EVIDENCE TABLE
CREATE TABLE IF NOT EXISTS public.evidence (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  goal_id UUID NOT NULL REFERENCES public.goals(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('speech_evaluation', 'vocabulary_report', 'github_link', 'demo_link', 'readme_md', 'exam_report')),
  title TEXT NOT NULL,
  content TEXT,
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostic_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plan_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mastery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence ENABLE ROW LEVEL SECURITY;

-- Profiles RLS
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Goals RLS
CREATE POLICY "Users can view own goals" ON public.goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own goals" ON public.goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own goals" ON public.goals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own goals" ON public.goals FOR DELETE USING (auth.uid() = user_id);

-- Plans RLS (Joined via Goal)
CREATE POLICY "Users can view own plans" ON public.plans FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.goals WHERE goals.id = plans.goal_id AND goals.user_id = auth.uid())
);
CREATE POLICY "Users can insert own plans" ON public.plans FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.goals WHERE goals.id = plans.goal_id AND goals.user_id = auth.uid())
);

-- Plan Tasks RLS
CREATE POLICY "Users can view own plan tasks" ON public.plan_tasks FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.plans 
    JOIN public.goals ON goals.id = plans.goal_id 
    WHERE plans.id = plan_tasks.plan_id AND goals.user_id = auth.uid()
  )
);
CREATE POLICY "Users can update own plan tasks" ON public.plan_tasks FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.plans 
    JOIN public.goals ON goals.id = plans.goal_id 
    WHERE plans.id = plan_tasks.plan_id AND goals.user_id = auth.uid()
  )
);

-- Checkins RLS
CREATE POLICY "Users can view own checkins" ON public.checkins FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.goals WHERE goals.id = checkins.goal_id AND goals.user_id = auth.uid())
);
CREATE POLICY "Users can insert own checkins" ON public.checkins FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.goals WHERE goals.id = checkins.goal_id AND goals.user_id = auth.uid())
);

-- Mastery Items RLS
CREATE POLICY "Users can view own mastery items" ON public.mastery_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.goals WHERE goals.id = mastery_items.goal_id AND goals.user_id = auth.uid())
);

-- Evidence RLS
CREATE POLICY "Users can view own evidence" ON public.evidence FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.goals WHERE goals.id = evidence.goal_id AND goals.user_id = auth.uid())
);
