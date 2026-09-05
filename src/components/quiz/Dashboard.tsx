import { useMemo, useState } from 'react';
import type { Quiz, Category, Difficulty } from '@/types';
import { useQuizzes } from '@/hooks/useQuizzes';
import { BookOpen, Code2, GraduationCap, Loader2, SearchX, Sparkles } from 'lucide-react';
import { QuizCard } from './QuizCard';
import { SearchFilter } from './SearchFilter';

interface DashboardProps {
  onStartQuiz: (quiz: Quiz) => void;
}

export function Dashboard({ onStartQuiz }: DashboardProps) {
  const { quizzes, loading, error } = useQuizzes();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      const matchesSearch =
        !searchQuery ||
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || quiz.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || quiz.difficulty === selectedDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [quizzes, searchQuery, selectedCategory, selectedDifficulty]);

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="relative overflow-hidden rounded-[28px] bg-brand-950 px-6 py-8 text-white shadow-xl shadow-brand-950/15 sm:px-10 sm:py-10">
        <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-brand-100"><Sparkles size={14} /> BSc Computer Science</div>
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Build confidence,<br />one concept at a time.</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-brand-100/75 sm:text-base">Sharpen the foundations that matter in your degree with focused practice quizzes and clear answer explanations.</p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur"><BookOpen className="mx-auto mb-1.5 text-brand-200" size={19} /><strong className="block font-display text-lg">8</strong><span className="text-[11px] text-brand-100/65">subjects</span></div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur"><Code2 className="mx-auto mb-1.5 text-brand-200" size={19} /><strong className="block font-display text-lg">80</strong><span className="text-[11px] text-brand-100/65">questions</span></div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur"><GraduationCap className="mx-auto mb-1.5 text-brand-200" size={19} /><strong className="block font-display text-lg">100%</strong><span className="text-[11px] text-brand-100/65">CS focused</span></div>
          </div>
        </div>
      </section>

      {loading && (
        <div className="flex items-center justify-center py-20 text-slate-500">
          <Loader2 className="mr-2 animate-spin" size={22} /> Loading quizzes...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {!loading && !error && <>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">Quiz library</p><h2 className="font-display text-2xl font-bold text-slate-900">Choose a subject to practise</h2></div>
      </div>
      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        resultCount={filteredQuizzes.length}
      />

      {/* Quiz grid */}
      {filteredQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredQuizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} onStart={onStartQuiz} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <SearchX className="text-slate-400" size={28} />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-700">No quizzes found</h3>
          <p className="mt-1 text-sm text-slate-500">Try adjusting your search or filters.</p>
        </div>
      )}
      </>}
    </div>
  );
}
