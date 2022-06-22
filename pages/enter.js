import { useContext, useReducer } from 'react';
import {
  Box,
  Heading,
  Stack,
  Grid,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { UserContext } from '../context/user';

import ko from '../locales/ko/enter.json';
import en from '../locales/en/enter.json';

export default function Enter() {
  const { locale, back } = useRouter();
  const t = locale === 'ko' ? ko : en;

  const [state, dispatch] = useReducer(reducer, initialState);
  const { screen, email, password, error, alert, loading, disabled } = state;

  const { auth } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: FORM_ACTIONS.INPUT, payload: ['error', ''] });
    try {
      dispatch({ type: FORM_ACTIONS.TOGGLE_LOADING });
      switch (screen) {
        case 'login':
          const { signInWithEmailAndPassword } = await import('firebase/auth');
          await signInWithEmailAndPassword(auth, email, password);
          back();
          break;
        case 'signup':
          const [{ createUserWithEmailAndPassword, sendEmailVerification }, { setDoc, doc }, { db }] =
            await Promise.all([import('firebase/auth'), import('firebase/firestore'), import('../lib/firebase')]);
          const { user } = await createUserWithEmailAndPassword(auth, email, password);
          await Promise.all([sendEmailVerification(user), setDoc(doc(db, 'users', user.uid), { email: user.email })]);
          dispatch({ type: FORM_ACTIONS.INPUT, payload: ['alert', t.checkEmail] });
          dispatch({ type: FORM_ACTIONS.INPUT, payload: ['disabled', true] });
          break;
        case 'forgot':
          const { sendPasswordResetEmail } = await import('firebase/auth');
          await sendPasswordResetEmail(auth, email);
          dispatch({ type: FORM_ACTIONS.INPUT, payload: ['alert', t.checkReset] });
          dispatch({ type: FORM_ACTIONS.SWITCH_SCREEN, payload: 'login' });
          break;
      }
    } catch (err) {
      console.error(err);
      const errMsg = err?.code.split('/')[1].split('-').join(' ');
      dispatch({ type: FORM_ACTIONS.INPUT, payload: ['error', errMsg || 'Error'] });
    } finally {
      dispatch({ type: FORM_ACTIONS.TOGGLE_LOADING });
    }
  };
  return (
    <>
      <Head>
        <title>{t.title}</title>
      </Head>
      <Box mt='80px' bg='white' borderRadius='md' shadow='md' p='2' maxW='400px' mx='auto' textAlign='center'>
        <Heading>{t[screen]}</Heading>
        {screen === 'forgot' && <Text mt='2'>{t.reset}</Text>}
        <Grid as='form' onSubmit={handleSubmit} mt='4' gap='4' px='8' pb='4'>
          <FormControl isRequired>
            <FormLabel htmlFor='email'>{t.email}</FormLabel>
            <Input
              id='email'
              type='email'
              onChange={(e) => dispatch({ type: FORM_ACTIONS.INPUT, payload: ['email', e.target.value] })}
            />
          </FormControl>
          {screen !== 'forgot' && (
            <Grid gap='1'>
              <FormControl isRequired>
                <FormLabel htmlFor='password'>{t.password}</FormLabel>
                <Input
                  id='password'
                  type='password'
                  minLength={6}
                  onChange={(e) => dispatch({ type: FORM_ACTIONS.INPUT, payload: ['password', e.target.value] })}
                />
              </FormControl>
              {screen === 'login' && (
                <Button
                  size='sm'
                  variant='link'
                  justifySelf='center'
                  w='fit-content'
                  colorScheme='blue'
                  onClick={() => dispatch({ type: FORM_ACTIONS.SWITCH_SCREEN, payload: 'forgot' })}
                >
                  {t.forgot}
                </Button>
              )}
            </Grid>
          )}
          <Grid gap='3'>
            <Button type='submit' colorScheme='purple' isLoading={loading} isDisabled={disabled}>
              {t.action[screen]}
            </Button>
            {error && (
              <Alert borderRadius='md' status='error'>
                <AlertIcon />
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}
            {alert && (
              <Alert borderRadius='md' status='info'>
                <AlertIcon />
                <AlertTitle>{alert}</AlertTitle>
              </Alert>
            )}
            {screen === 'signup' ? (
              <Text>
                {t.alreadyHave}{' '}
                <Button
                  variant='link'
                  colorScheme='blue'
                  onClick={() => dispatch({ type: FORM_ACTIONS.SWITCH_SCREEN, payload: 'login' })}
                >
                  {t.login}
                </Button>
              </Text>
            ) : (
              <Button
                variant='link'
                colorScheme='blue'
                onClick={() => dispatch({ type: FORM_ACTIONS.SWITCH_SCREEN, payload: 'signup' })}
              >
                {t.signup}
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

const initialState = {
  screen: 'login',
  email: '',
  password: '',
  error: '',
  alert: '',
  loading: false,
  disabled: false,
};

const FORM_ACTIONS = Object.freeze({
  INPUT: 'input',
  SWITCH_SCREEN: 'switchScreen',
  TOGGLE_LOADING: 'toggleLoading',
  TOGGLE_DISABLED: 'toggleDisabled',
});

const reducer = (state, { type, payload }) => {
  switch (type) {
    case FORM_ACTIONS.INPUT:
      const [key, val] = payload;
      return { ...state, [key]: val };
    case FORM_ACTIONS.SWITCH_SCREEN:
      return { ...state, screen: payload, error: '', disabled: false };
    case FORM_ACTIONS.TOGGLE_LOADING:
      return { ...state, loading: !state.loading };
    case FORM_ACTIONS.TOGGLE_DISABLED:
      return { ...state, disabled: !state.disabled };
    default:
      return state;
  }
};
