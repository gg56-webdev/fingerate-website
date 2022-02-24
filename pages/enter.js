import {
  Button,
  Grid,
  Heading,
  Box,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Link,
  FormHelperText,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { UserContext } from '../context/user';

import { useContext } from 'react';

export default function Enter() {
  const [screen, setScreen] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const { user } = useContext(UserContext);

  const changeScreen = (s) => {
    setScreen(s);
    setError('');
  };

  const router = useRouter();
  const { locale } = router;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      if (screen === 'Login') {
        await signInWithEmailAndPassword(auth, email, password);
        router.back();
      } else if (screen === 'Sign Up') {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await sendEmailVerification(user);
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          sots: [],
        });
        router.push('/', '/', { locale });
      } else {
        await sendPasswordResetEmail(auth, email);
        setScreen('Login');
      }
    } catch (err) {
      setError(err.code.split('/')[1].split('-').join(' '));
    }
  };

  useEffect(() => {
    user && router.push('/', '/', { locale });
  }, [user, router, locale]);

  return (
    <Grid placeItems={'center'} h='calc(100vh - 70px)' pt={'70px'}>
      <Stack
        bg={'white'}
        p='2'
        borderRadius={'md'}
        maxW='500px'
        minW={'350px'}
        textAlign={'center'}
        alignItems='center'
        spacing={5}
        boxShadow='md'
      >
        <Stack>
          <Heading>{screen}</Heading>

          <Text fontSize={'md'}>
            {screen === 'Login'
              ? 'Login in to existing account'
              : screen === 'Sign Up'
              ? 'Create a new account'
              : 'Reset password for account'}
          </Text>
        </Stack>

        <Stack as={'form'} onSubmit={(e) => handleSubmit(e)} spacing='4'>
          <FormControl>
            <FormLabel htmlFor='email'>Email Address</FormLabel>
            <Input
              id='email'
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          {(screen === 'Login' || screen === 'Sign Up') && (
            <FormControl>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input
                id='password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {!screen && (
                <FormHelperText>Please choose a secure password</FormHelperText>
              )}
            </FormControl>
          )}
          <Button type='submit' colorScheme={'purple'}>
            {screen === 'Login'
              ? 'Login'
              : screen === 'Sign Up'
              ? 'Sign Up'
              : 'Send'}
          </Button>
          {error && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}
        </Stack>
        {screen === 'Login' && (
          <Link onClick={() => changeScreen('Forgot Password')}>
            Forgot password?
          </Link>
        )}

        {screen === 'Login' ? (
          <Link fontSize={'sm'} onClick={() => changeScreen('Sign Up')}>
            Create new account
          </Link>
        ) : (
          <Text fontSize={'sm'}>
            Already have an account?{' '}
            <Link onClick={() => changeScreen('Login')}>Login</Link>
          </Text>
        )}
      </Stack>
    </Grid>
  );
}
