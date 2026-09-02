import { useState } from 'react';
import { Brain } from 'lucide-react';
import { Login } from './Login';
import { Register } from './Register';
import { ForgotPassword } from './ForgotPassword';
import { ResetPassword } from './ResetPassword';

type AuthView = 'login' | 'register' | 'forgot' | 'reset';

const HEADERS: Record<AuthView, { title: string; subtitle: string }> = {
  login: { title: 'Welcome back', subtitle: 'Sign in to continue your learning journey.' },
  register: { title: 'Create your account', subtitle: 'Join Quizly and start challenging yourself.' },
  forgot: { title: 'Forgot password', subtitle: "Enter your email and we'll send you a reset link." },
  reset: { title: 'Reset password', subtitle: 'Choose a new password for your account.' },
};

export function AuthScreen({ initialView = 'login' }: { initialView?: AuthView }) {
  const [view, setView] = useState<AuthView>(initialView);
  const { title, subtitle } = HEADERS[view];

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-brand-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-accent-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
              <Brain size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">Quizly</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              Learn faster.<br />Test smarter.
            </h1>
            <p className="text-lg text-brand-100/80 max-w-md">
              Explore hundreds of quizzes across every topic. Track your progress, challenge friends, and master new skills.
            </p>
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-brand-200/70">Quizzes</div>
              </div>
              <div>
                <div className="text-3xl font-bold">8</div>
                <div className="text-sm text-brand-200/70">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold">10k+</div>
                <div className="text-sm text-brand-200/70">Learners</div>
              </div>
            </div>
          </div>

          <p className="text-sm text-brand-200/50">© 2026 Quizly. All rights reserved.</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md animate-slide-up">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2.5 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Brain size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Quizly</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
            <p className="mt-1.5 text-slate-500">{subtitle}</p>
          </div>

          {view === 'login' && <Login onNavigate={setView} />}
          {view === 'register' && <Register onNavigate={setView} />}
          {view === 'forgot' && <ForgotPassword onNavigate={setView} />}
          {view === 'reset' && <ResetPassword onNavigate={setView} />}
        </div>
      </div>
    </div>
  );
}
