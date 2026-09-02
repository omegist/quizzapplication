import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { User } from '@/types';
import { supabase, supabaseConfigError } from '@/lib/supabaseClient';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  passwordRecovery: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<{ error?: string }>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  updatePassword: (newPassword: string) => Promise<{ error?: string }>;
  updateProfile: (updates: { name?: string; avatarUrl?: string | null }) => Promise<{ error?: string }>;
  uploadAvatar: (file: File) => Promise<{ avatarUrl?: string; error?: string }>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [passwordRecovery, setPasswordRecovery] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const client = supabase;

    let active = true;
    async function loadUser(authUser: SupabaseUser | null) {
      if (!authUser) {
        if (active) {
          setUser(null);
          setLoading(false);
        }
        return;
      }

      const { data } = await client
        .from('profiles')
        .select('name, email, avatar_url')
        .eq('id', authUser.id)
        .maybeSingle();

      if (active) {
        setUser({
          id: authUser.id,
          name: data?.name ?? authUser.user_metadata.name ?? '',
          email: data?.email ?? authUser.email ?? '',
          avatarUrl: data?.avatar_url ?? null,
        });
        setLoading(false);
      }
    }

    client.auth.getSession().then(({ data: { session } }) => loadUser(session?.user ?? null));
    const { data: listener } = client.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') setPasswordRecovery(true);
      void loadUser(session?.user ?? null);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  function unavailable() {
    return supabaseConfigError ?? 'Supabase is unavailable.';
  }

  const value: AuthContextValue = {
    user,
    loading,
    passwordRecovery,
    signIn: async (email, password) => {
      if (!supabase) return { error: unavailable() };
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error: error?.message };
    },
    signUp: async (name, email, password) => {
      if (!supabase) return { error: unavailable() };
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      if (error) return { error: error.message };
      if (!data.session) return { error: 'Check your email to confirm your account before signing in.' };
      return {};
    },
    signOut: async () => {
      if (!supabase) return { error: unavailable() };
      const { error } = await supabase.auth.signOut();
      return { error: error?.message };
    },
    resetPassword: async (email) => {
      if (!supabase) return { error: unavailable() };
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
      });
      return { error: error?.message };
    },
    updatePassword: async (newPassword) => {
      if (!supabase) return { error: unavailable() };
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (!error) setPasswordRecovery(false);
      return { error: error?.message };
    },
    updateProfile: async (updates) => {
      if (!supabase || !user) return { error: user ? unavailable() : 'Not signed in.' };
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...(updates.name !== undefined ? { name: updates.name } : {}),
          ...(updates.avatarUrl !== undefined ? { avatar_url: updates.avatarUrl } : {}),
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select('name, email, avatar_url')
        .single();
      if (error) return { error: error.message };
      setUser({ ...user, name: data.name, email: data.email, avatarUrl: data.avatar_url });
      return {};
    },
    uploadAvatar: async (file) => {
      if (!supabase || !user) return { error: user ? unavailable() : 'Not signed in.' };
      const path = `${user.id}/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`;
      const { error: uploadError } = await supabase.storage.from('avatars').upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });
      if (uploadError) return { error: uploadError.message };
      const { data } = supabase.storage.from('avatars').getPublicUrl(path);
      const result = await value.updateProfile({ avatarUrl: data.publicUrl });
      return result.error ? { error: result.error } : { avatarUrl: data.publicUrl };
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
