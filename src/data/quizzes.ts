import type { Category, Difficulty, Question, Quiz } from '@/types';
import { supabase, supabaseConfigError } from '@/lib/supabaseClient';

interface QuizRow {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  question_count: number;
  duration_minutes: number;
  image: string | null;
  questions: Question[];
}

function toQuiz(row: QuizRow): Quiz {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category as Category,
    questionCount: row.question_count,
    difficulty: row.difficulty as Difficulty,
    durationMinutes: row.duration_minutes,
    image: row.image ?? '',
    questions: row.questions ?? [],
  };
}

export async function fetchQuizzes(): Promise<{ quizzes: Quiz[]; error?: string }> {
  if (!supabase) return { quizzes: [], error: supabaseConfigError ?? 'Supabase is unavailable.' };

  const { data, error } = await supabase
    .from('quizzes')
    .select('id, title, description, category, difficulty, question_count, duration_minutes, image, questions')
    .order('created_at', { ascending: false });

  if (error) return { quizzes: [], error: error.message };
  return { quizzes: (data as QuizRow[]).map(toQuiz) };
}
