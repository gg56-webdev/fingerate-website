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
  const [screen, setScreen] = useState('로그인');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [alert, setAlert] = useState('');
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
      if (screen === '로그인') {
        await signInWithEmailAndPassword(auth, email, password);
        router.back();
      } else if (screen === '가입하기') {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await sendEmailVerification(user);
        setAlert(`Please check your ${email} email to verify your account!`);
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
        });
      } else {
        await sendPasswordResetEmail(auth, email);
        setScreen('로그인');
      }
    } catch (err) {
      console.error(err);
      setError(err.code.split('/')[1].split('-').join(' '));
    }
  };

  useEffect(() => {
    user && setScreen('가입하기');
  }, [user]);

  return (
    <Grid placeItems={'center'} h='calc(100vh - 70px - 117px)' pt={'70px'}>
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
            {screen === '로그인'
              ? ''
              : screen === '가입하기'
              ? ''
              : '비밀번호를 재설정하세요'}
          </Text>
        </Stack>

        <Stack as={'form'} onSubmit={(e) => handleSubmit(e)} spacing='4'>
          <FormControl>
            <FormLabel htmlFor='email'>이메일 주소</FormLabel>
            <Input
              id='email'
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          {(screen === '로그인' || screen === '가입하기') && (
            <FormControl>
              <FormLabel htmlFor='password'>비밀번호</FormLabel>
              <Input
                id='password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* {!screen && (
                <FormHelperText>Please choose a secure password</FormHelperText>
              )} */}
            </FormControl>
          )}
          <Button type='submit' colorScheme={'purple'}>
            {screen === '로그인'
              ? '로그인'
              : screen === '가입하기'
              ? '가입하기'
              : 'Send'}
          </Button>
          {error && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}
          {alert && (
            <Alert status='info'>
              <AlertIcon />
              <AlertTitle>{alert}</AlertTitle>
            </Alert>
          )}
        </Stack>
        {screen === '로그인' && (
          <Link onClick={() => changeScreen('비밀번호 찾기')}>
            비밀번호 찾기
          </Link>
        )}

        {screen === '로그인' ? (
          <Link fontSize={'sm'} onClick={() => changeScreen('가입하기')}>
            가입하기
          </Link>
        ) : (
          <Text fontSize={'sm'}>
            이미 회원이신가요?{' '}
            <Link onClick={() => changeScreen('로그인')}>로그인하기</Link>
          </Text>
        )}
      </Stack>
    </Grid>
  );
}
