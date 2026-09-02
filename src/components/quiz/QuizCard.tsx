import type { Quiz } from '@/types';
import { CATEGORY_COLORS, DIFFICULTY_STYLES } from '@/utils/quizStyles';
import { Clock, HelpCircle, ArrowRight } from 'lucide-react';

interface QuizCardProps {
  quiz: Quiz;
  onStart: (quiz: Quiz) => void;
}

export function QuizCard({ quiz, onStart }: QuizCardProps) {
  const catColor = CATEGORY_COLORS[quiz.category];
  const diffStyle = DIFFICULTY_STYLES[quiz.difficulty];

  return (
    <div className="card group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Cover */}
      <div className={`relative h-32 bg-gradient-to-br ${catColor.gradient} overflow-hidden`}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
          <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-black/10 blur-2xl" />
        </div>
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/20 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-white">
            {catColor.icon} {quiz.category}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 text-4xl opacity-30">
          {catColor.icon}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-900 leading-snug">{quiz.title}</h3>
        <p className="mt-1.5 text-sm text-slate-500 line-clamp-2 leading-relaxed">{quiz.description}</p>

        <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <HelpCircle size={15} className="text-slate-400" />
            {quiz.questionCount} questions
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={15} className="text-slate-400" />
            {quiz.durationMinutes} min
          </span>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium ${diffStyle.bg} ${diffStyle.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${diffStyle.dot}`} />
            {quiz.difficulty}
          </span>
        </div>

        <button
          onClick={() => onStart(quiz)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-brand-50 hover:text-brand-700 group-hover:bg-brand-600 group-hover:text-white"
        >
          Start Quiz
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
