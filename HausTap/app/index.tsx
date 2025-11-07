import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';

// Entrypoint: decide where to route the user based on auth state.
export default function Index() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    // Small timeout to avoid navigating during initial mount.
    const t = setTimeout(() => {
      if (!user) {
        router.replace('/Log-in');
        return;
      }

      // Route based on role
      if (user.role === 'client') router.replace('/client-side');
      else router.replace('/service-provider');
    }, 50);

    return () => clearTimeout(t);
  }, [user, loading]);

  return null;
}
