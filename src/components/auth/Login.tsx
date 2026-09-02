import { useState, type FormEvent } from 'react';
import { useAuth } from '@/auth/AuthContext';
import { Brain, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

interface LoginProps {
  onNavigate: (view: 'login' | 'register' | 'forgot' | 'reset') => void;
}

export function Login({ onNavigate }: LoginProps) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) setError(error);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" size={18} />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="input-field pl-11"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="input-field pl-11 pr-11"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onNavigate('forgot')}
          className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
        >
          Forgot password?
        </button>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 animate-fade-in">
          {error}
        </div>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full py-3">
        {loading ? <Loader2 className="animate-spin" size={20} /> : <Brain size={20} />}
        {loading ? 'Signing in...' : 'Sign In'}
      </button>

      <p className="text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={() => onNavigate('register')}
          className="font-semibold text-brand-600 hover:text-brand-700 transition-colors"
        >
          Sign up
        </button>
      </p>
    </form>
  );
}
