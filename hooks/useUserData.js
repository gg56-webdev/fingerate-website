import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

export function useUserData() {
  const [user, loading, error] = useAuthState(auth);

  const logout = () => signOut(auth);

  return { user, loading, error, logout };
}
