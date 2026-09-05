import type { Category, Difficulty } from '@/types';

export const CATEGORY_COLORS: Record<Category, { bg: string; text: string; gradient: string; icon: string }> = {
  'Programming Fundamentals': { bg: 'bg-violet-50', text: 'text-violet-700', gradient: 'from-violet-500 to-fuchsia-600', icon: 'CMD' },
  'Data Structures': { bg: 'bg-cyan-50', text: 'text-cyan-700', gradient: 'from-cyan-500 to-blue-700', icon: 'DS' },
  'Database Systems': { bg: 'bg-amber-50', text: 'text-amber-700', gradient: 'from-amber-400 to-orange-600', icon: 'DB' },
  'Operating Systems': { bg: 'bg-rose-50', text: 'text-rose-700', gradient: 'from-rose-500 to-pink-700', icon: 'OS' },
  'Computer Networks': { bg: 'bg-blue-50', text: 'text-blue-700', gradient: 'from-blue-500 to-indigo-700', icon: 'NET' },
  'Web Development': { bg: 'bg-emerald-50', text: 'text-emerald-700', gradient: 'from-emerald-500 to-teal-700', icon: 'WEB' },
  'Software Engineering': { bg: 'bg-orange-50', text: 'text-orange-700', gradient: 'from-orange-500 to-red-600', icon: 'SE' },
  'Theory of Computation': { bg: 'bg-indigo-50', text: 'text-indigo-700', gradient: 'from-indigo-500 to-violet-700', icon: 'TOC' },
};

export const DIFFICULTY_STYLES: Record<Difficulty, { bg: string; text: string; dot: string }> = {
  Easy: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  Medium: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  Hard: { bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-500' },
};
