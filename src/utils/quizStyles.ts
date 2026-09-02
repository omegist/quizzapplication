import type { Category, Difficulty } from '@/types';

export const CATEGORY_COLORS: Record<Category, { bg: string; text: string; gradient: string; icon: string }> = {
  'General Knowledge': { bg: 'bg-blue-50', text: 'text-blue-700', gradient: 'from-blue-500 to-blue-700', icon: '🌍' },
  Science: { bg: 'bg-emerald-50', text: 'text-emerald-700', gradient: 'from-emerald-500 to-teal-700', icon: '🔬' },
  Math: { bg: 'bg-violet-50', text: 'text-violet-700', gradient: 'from-violet-500 to-purple-700', icon: '📐' },
  History: { bg: 'bg-amber-50', text: 'text-amber-700', gradient: 'from-amber-500 to-orange-700', icon: '📜' },
  Geography: { bg: 'bg-cyan-50', text: 'text-cyan-700', gradient: 'from-cyan-500 to-sky-700', icon: '🗺️' },
  Technology: { bg: 'bg-slate-50', text: 'text-slate-700', gradient: 'from-slate-600 to-slate-800', icon: '💻' },
  Sports: { bg: 'bg-green-50', text: 'text-green-700', gradient: 'from-green-500 to-lime-700', icon: '⚽' },
  Entertainment: { bg: 'bg-rose-50', text: 'text-rose-700', gradient: 'from-rose-500 to-pink-700', icon: '🎬' },
};

export const DIFFICULTY_STYLES: Record<Difficulty, { bg: string; text: string; dot: string }> = {
  Easy: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  Medium: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  Hard: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
};
