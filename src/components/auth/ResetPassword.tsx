import { useState, type FormEvent } from 'react';
import { useAuth } from '@/auth/AuthContext';
import { Lock, Eye, EyeOff, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface ResetPasswordProps {
  onNavigate: (view: 'login' | 'register' | 'forgot' | 'reset') => void;
}

export function ResetPassword({ onNavigate }: ResetPasswordProps) {
  const { updatePassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    const { error } = await updatePassword(password);
    setLoading(false);
    if (error) setError(error);
    else setSuccess(true);
  }

  if (success) {
    return (
      <div className="space-y-5 text-center animate-fade-in">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="text-green-600" size={32} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Password updated</h3>
          <p className="mt-1 text-sm text-slate-500">Your password has been changed successfully.</p>
        </div>
        <button onClick={() => onNavigate('login')} className="btn-primary w-full py-3">
          Continue to sign in
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">New Password</label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
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

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Confirm New Password</label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
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
        {loading ? 'Updating...' : 'Reset password'}
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
