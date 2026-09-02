import { useState } from 'react';
import { AuthProvider, useAuth } from '@/auth/AuthContext';
import { AuthScreen } from '@/components/auth/AuthScreen';
import { AppLayout } from '@/components/layout/AppLayout';
import { Dashboard } from '@/components/quiz/Dashboard';
import { QuizPlayer } from '@/components/quiz/QuizPlayer';
import { Profile } from '@/components/profile/Profile';
import type { Quiz } from '@/types';
import type { AppPage } from '@/components/layout/Sidebar';
import { Loader2 } from 'lucide-react';

function AppContent() {
  const { user, loading, passwordRecovery } = useAuth();
  const [page, setPage] = useState<AppPage>('dashboard');
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-brand-600" size={32} />
      </div>
    );
  }

  if (!user || passwordRecovery) {
    return <AuthScreen initialView={passwordRecovery ? 'reset' : 'login'} />;
  }

  function handleStartQuiz(quiz: Quiz) {
    setActiveQuiz(quiz);
    setPage('quiz');
  }

  function handleExitQuiz() {
    setActiveQuiz(null);
    setPage('dashboard');
  }

  return (
    <AppLayout currentPage={page} onNavigate={setPage}>
      {page === 'quiz' && activeQuiz && (
        <QuizPlayer quiz={activeQuiz} onExit={handleExitQuiz} />
      )}
      {page === 'dashboard' && (
        <Dashboard onStartQuiz={handleStartQuiz} />
      )}
      {page === 'profile' && <Profile />}
    </AppLayout>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
