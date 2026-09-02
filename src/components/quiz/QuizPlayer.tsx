import { useState, useMemo } from 'react';
import type { Quiz } from '@/types';
import { CATEGORY_COLORS, DIFFICULTY_STYLES } from '@/utils/quizStyles';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  HelpCircle,
  Trophy,
  RotateCcw,
  ChevronLeft,
} from 'lucide-react';

interface QuizPlayerProps {
  quiz: Quiz;
  onExit: () => void;
}

export function QuizPlayer({ quiz, onExit }: QuizPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array(quiz.questions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);

  const catColor = CATEGORY_COLORS[quiz.category];
  const diffStyle = DIFFICULTY_STYLES[quiz.difficulty];
  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[currentIndex];
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const answeredCount = answers.filter((a) => a !== null).length;

  function selectAnswer(optionIndex: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = optionIndex;
      return next;
    });
  }

  function goNext() {
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  function goPrev() {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }

  function restart() {
    setAnswers(Array(quiz.questions.length).fill(null));
    setCurrentIndex(0);
    setShowResults(false);
  }

  const score = useMemo(() => {
    return answers.reduce<number>((acc, answer, i) => {
      if (answer !== null && answer === quiz.questions[i].correctIndex) return acc + 1;
      return acc;
    }, 0);
  }, [answers, quiz.questions]);

  const progress = (answeredCount / totalQuestions) * 100;

  if (showResults) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 70;
    const grade = percentage >= 90 ? 'Excellent' : percentage >= 70 ? 'Good' : percentage >= 50 ? 'Fair' : 'Keep Practicing';

    return (
      <div className="space-y-6 animate-fade-in">
        {/* Back button */}
        <button
          onClick={onExit}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
        >
          <ChevronLeft size={18} /> Back to Dashboard
        </button>

        {/* Results hero */}
        <div className="card overflow-hidden">
          <div className={`relative bg-gradient-to-br ${catColor.gradient} px-6 py-10 text-center text-white`}>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-8 -right-8 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
            </div>
            <div className="relative z-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm mb-4">
                <Trophy size={40} />
              </div>
              <h2 className="text-2xl font-bold">{grade}</h2>
              <p className="mt-1 text-white/80">{quiz.title}</p>
            </div>
          </div>

          <div className="p-6">
            {/* Score */}
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className={`text-4xl font-bold ${passed ? 'text-green-600' : 'text-amber-600'}`}>
                  {percentage}%
                </div>
                <div className="mt-1 text-sm text-slate-500">Score</div>
              </div>
              <div className="h-12 w-px bg-slate-200" />
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-900">{score}/{totalQuestions}</div>
                <div className="mt-1 text-sm text-slate-500">Correct</div>
              </div>
            </div>

            {/* Answer review */}
            <div className="mt-8 space-y-3">
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Answer Review</h3>
              {quiz.questions.map((q, i) => {
                const userAnswer = answers[i];
                const correct = userAnswer === q.correctIndex;
                return (
                  <div key={q.id} className="rounded-xl border border-slate-200 p-4">
                    <div className="flex items-start gap-3">
                      {correct ? (
                        <CheckCircle2 className="mt-0.5 shrink-0 text-green-500" size={20} />
                      ) : (
                        <XCircle className="mt-0.5 shrink-0 text-red-500" size={20} />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-900">{q.text}</p>
                        <div className="mt-1.5 space-y-0.5 text-sm">
                          <p className="text-green-700">
                            Correct: <span className="font-medium">{q.options[q.correctIndex]}</span>
                          </p>
                          {!correct && userAnswer !== null && (
                            <p className="text-red-600">
                              Your answer: <span className="font-medium">{q.options[userAnswer]}</span>
                            </p>
                          )}
                          {userAnswer === null && (
                            <p className="text-slate-400">Your answer: Not answered</p>
                          )}
                        </div>
                        {q.explanation && (
                          <p className="mt-2 text-xs text-slate-500 bg-slate-50 rounded-lg px-3 py-2">
                            {q.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button onClick={restart} className="btn-secondary flex-1">
                <RotateCcw size={18} /> Retake Quiz
              </button>
              <button onClick={onExit} className="btn-primary flex-1">
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top bar: exit + quiz info */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onExit}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
        >
          <ArrowLeft size={18} /> Exit Quiz
        </button>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium ${diffStyle.bg} ${diffStyle.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${diffStyle.dot}`} />
            {quiz.difficulty}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} className="text-slate-400" />
            {quiz.durationMinutes} min
          </span>
        </div>
      </div>

      {/* Quiz header */}
      <div className="flex items-center gap-3">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${catColor.gradient} text-2xl`}>
          {catColor.icon}
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">{quiz.title}</h1>
          <p className="text-sm text-slate-500">{quiz.category}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="font-medium text-slate-700">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span className="text-slate-500">{answeredCount} answered</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-brand-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="card p-6 animate-scale-in" key={currentIndex}>
        <div className="flex items-start gap-3 mb-6">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <HelpCircle size={18} />
          </div>
          <h2 className="text-lg font-semibold text-slate-900 leading-snug pt-0.5">
            {currentQuestion.text}
          </h2>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, optIdx) => {
            const isSelected = answers[currentIndex] === optIdx;
            return (
              <button
                key={optIdx}
                onClick={() => selectAnswer(optIdx)}
                className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50 text-slate-900'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                    isSelected
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <span className="text-sm font-medium">{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={18} /> Previous
        </button>

        {/* Question dots */}
        <div className="hidden sm:flex items-center gap-1.5">
          {quiz.questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-200 ${
                i === currentIndex
                  ? 'w-6 bg-brand-600'
                  : answers[i] !== null
                    ? 'w-2.5 bg-brand-300'
                    : 'w-2.5 bg-slate-200'
              }`}
              title={`Question ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={answers[currentIndex] === null}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isLastQuestion ? 'Finish' : 'Next'}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
