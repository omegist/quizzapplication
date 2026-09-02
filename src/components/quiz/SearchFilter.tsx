import { Search, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES, DIFFICULTIES, type Category, type Difficulty } from '@/types';

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: Category | 'All';
  onCategoryChange: (category: Category | 'All') => void;
  selectedDifficulty: Difficulty | 'All';
  onDifficultyChange: (difficulty: Difficulty | 'All') => void;
  resultCount: number;
}

export function SearchFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  resultCount,
}: SearchFilterProps) {
  const hasActiveFilters = searchQuery || selectedCategory !== 'All' || selectedDifficulty !== 'All';

  function clearAll() {
    onSearchChange('');
    onCategoryChange('All');
    onDifficultyChange('All');
  }

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search quizzes by name or keyword..."
          className="input-field pl-12 pr-4 py-3 text-base"
        />
      </div>

      {/* Filters row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          {/* Category dropdown */}
          <div className="relative">
            <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value as Category | 'All')}
              className="input-field appearance-none pl-9 pr-8 py-2 text-sm font-medium cursor-pointer"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Difficulty dropdown */}
          <div className="relative">
            <select
              value={selectedDifficulty}
              onChange={(e) => onDifficultyChange(e.target.value as Difficulty | 'All')}
              className="input-field appearance-none pl-3 pr-8 py-2 text-sm font-medium cursor-pointer"
            >
              <option value="All">All Levels</option>
              {DIFFICULTIES.map((diff) => (
                <option key={diff} value={diff}>{diff}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">
            <span className="font-semibold text-slate-700">{resultCount}</span> {resultCount === 1 ? 'quiz' : 'quizzes'}
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
            >
              <X size={15} />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
