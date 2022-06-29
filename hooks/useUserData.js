import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut, sendEmailVerification } from 'firebase/auth';
import { auth } from '../lib/firebase';

export function useUserData() {
  const [user, loading, error] = useAuthState(auth);

  const logout = () => signOut(auth);

  const sendEmail = async (toast) => {
    try {
      await sendEmailVerification(user);
      toast({
        title: 'Email Sent!',
        description: '이메일을 확인한 뒤에 페이지를 새로 고침하세요',
        status: 'info',
        duration: 10000,
        position: 'top',
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return { user, loading, error, logout, sendEmail };
}
