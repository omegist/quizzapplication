import { useState, type FormEvent } from 'react';
import { useAuth } from '@/auth/AuthContext';
import { Mail, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface ForgotPasswordProps {
  onNavigate: (view: 'login' | 'register' | 'forgot' | 'reset') => void;
}

export function ForgotPassword({ onNavigate }: ForgotPasswordProps) {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      setSent(true);
    }
  }

  if (sent) {
    return (
      <div className="space-y-5 text-center animate-fade-in">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="text-green-600" size={32} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Check your email</h3>
          <p className="mt-1 text-sm text-slate-500">
            We've sent a password reset link to <span className="font-medium text-slate-700">{email}</span>.
          </p>
        </div>
        <button onClick={() => onNavigate('reset')} className="btn-primary w-full py-3">
          Enter reset code
        </button>
        <button
          onClick={() => onNavigate('login')}
          className="btn-ghost w-full text-sm"
        >
          <ArrowLeft size={16} /> Back to sign in
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
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

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 animate-fade-in">
          {error}
        </div>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full py-3">
        {loading ? <Loader2 className="animate-spin" size={20} /> : null}
        {loading ? 'Sending link...' : 'Send reset link'}
      </button>

      <button
        type="button"
        onClick={() => onNavigate('login')}
        className="btn-ghost w-full text-sm"
      >
        <ArrowLeft size={16} /> Back to sign in
      </button>
    </form>
  );
}
