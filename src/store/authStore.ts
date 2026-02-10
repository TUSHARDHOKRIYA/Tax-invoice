import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

interface AuthStore {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,

  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (data?.user) {
      set({
        user: {
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata?.name,
        },
      });
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },

  checkSession: async () => {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        set({ user: null, loading: false });
        return;
      }

      // Fetch profile data
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.session.user.id)
        .single();

      set({
        user: {
          id: data.session.user.id,
          email: data.session.user.email || '',
          name: profile?.name,
          role: profile?.role,
        },
        loading: false,
      });
    } catch (error) {
      set({ user: null, loading: false });
    }
  },
}));
