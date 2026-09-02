import { useMemo, useState } from 'react';
import type { Quiz, Category, Difficulty } from '@/types';
import { useQuizzes } from '@/hooks/useQuizzes';
import { Loader2 } from 'lucide-react';
import { QuizCard } from './QuizCard';
import { SearchFilter } from './SearchFilter';
import { SearchX } from 'lucide-react';

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
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-slate-500">Browse and start quizzes from our collection.</p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20 text-slate-500">
          <Loader2 className="mr-2 animate-spin" size={22} /> Loading quizzes...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {!loading && !error && <>
      {/* Search + Filters */}
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
