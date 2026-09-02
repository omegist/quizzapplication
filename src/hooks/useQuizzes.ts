import { useEffect, useState } from 'react';
import type { Quiz } from '@/types';
import { fetchQuizzes } from '@/data/quizzes';

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    fetchQuizzes().then((result) => {
      if (!active) return;
      setQuizzes(result.quizzes);
      setError(result.error ?? '');
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  return { quizzes, loading, error };
}
