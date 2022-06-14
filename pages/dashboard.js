import Head from 'next/head';
import { useContext, useEffect, useState, useRef, createContext, useMemo, useReducer } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { default as NLink } from 'next/link';
import { UserContext } from '../context/user';
import { auth, db } from '../lib/firebase';
import { doc, updateDoc, getDoc, onSnapshot, collection, query, where, setDoc, getDocs } from 'firebase/firestore';

import useMetaMaskCustom from '../hooks/useMetaMaskCustom';
import POLYGON from '../utils/POLYGON';
import { CheckIcon, QuestionIcon, WarningIcon, ExternalLinkIcon, AddIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Link,
  Skeleton,
  UnorderedList,
  Container,
  Stack,
  Spinner,
  Flex,
  Button,
  Grid,
  Box,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Text,
  Icon,
  Tooltip,
  useToast,
  useDisclosure,
  Center,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  Tag,
  TagLabel,
  TagRightIcon,
  TagLeftIcon,
  Heading,
  Divider,
} from '@chakra-ui/react';

import ko from '../locales/ko/user.json';

const WalletContext = createContext();

export async function getStaticProps() {
  const { result } = await import('../utils/SOT/nfts.json');
  const nfts = result.map(({ token_id, metadata }) => {
    const { attributes, name: fullName, image } = JSON.parse(metadata);
    const [{ value: country }, { value: city }, { value: grade }] = attributes;
    const [fullSotId, name] = fullName.split(' - ');
    const sotId = fullSotId.slice(4);
    return { sotId, name, country, city, grade, token_id, image, source: POLYGON.chainName };
  });
  return { props: { nfts } };
}

export default function Dashboard({ nfts }) {
  const { user, loading, error } = useContext(UserContext);
  const { locale, push } = useRouter();
  const { status, chainId } = useMetaMaskCustom();

  const [walletAddress, setWalletAddress] = useState();
  const [loaded, setLoaded] = useState();

  useEffect(() => {
    if ((!loading && !user) || error) {
      push('/enter', '/enter', { locale });
    }
  }, [user, loading, error]);

  useEffect(() => {
    const getAddress = async () => {
      try {
        await auth.currentUser.getIdToken(true);
        const docSnap = await getDoc(doc(db, 'users', user.uid));
        const { wallet_address } = docSnap.data();
        setWalletAddress(wallet_address);
      } catch (err) {
        console.log(err);
      } finally {
        setLoaded(true);
      }
    };
    if (status === 'connected' && chainId === POLYGON.chainId && user && !walletAddress) {
      getAddress();
    }
  }, [user, status, chainId, walletAddress]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Container maxW='container.xl' pt='80px' pb='8' px='2'>
        <Stack>
          {loading ? (
            <Spinner size='lg' color='purple' alignSelf='center' />
          ) : (
            <WalletContext.Provider value={{ walletAddress, setWalletAddress, loaded }}>
              <UserSection />
              <Sots nfts={nfts} />
            </WalletContext.Provider>
          )}
        </Stack>
      </Container>
    </>
  );
}

function UserSection() {
  const { user } = useContext(UserContext);

  return (
    <Flex justify='center' sx={{ gap: 2 }} fontFamily='sans-serif' flexWrap='wrap'>
      <User />
      {user?.emailVerified ? (
        <Wallet />
      ) : (
        <Flex bg='white' borderRadius='md' p='4' shadow='md' textAlign='center' alignItems='center' sx={{ gap: 4 }}>
          <Tooltip label='Verify Email to Connect Wallet!'>
            <Icon viewBox='0 0 48 48' boxSize='10' fill='gray'>
              <path d='M32.6 27.2Q33.85 27.2 34.825 26.225Q35.8 25.25 35.8 23.95Q35.8 22.7 34.825 21.75Q33.85 20.8 32.6 20.8Q31.35 20.8 30.375 21.75Q29.4 22.7 29.4 23.95Q29.4 25.25 30.375 26.225Q31.35 27.2 32.6 27.2ZM9 36.35Q9 36.35 9 37.675Q9 39 9 39Q9 39 9 39Q9 39 9 39V9Q9 9 9 9Q9 9 9 9Q9 9 9 10.35Q9 11.7 9 11.7Q9 11.7 9 13.6Q9 15.5 9 18.35V29.7Q9 32.55 9 34.45Q9 36.35 9 36.35ZM9 42Q7.85 42 6.925 41.1Q6 40.2 6 39V9Q6 7.85 6.925 6.925Q7.85 6 9 6H39Q40.2 6 41.1 6.925Q42 7.85 42 9V15.7H39V9Q39 9 39 9Q39 9 39 9H9Q9 9 9 9Q9 9 9 9V39Q9 39 9 39Q9 39 9 39H39Q39 39 39 39Q39 39 39 39V32.35H42V39Q42 40.2 41.1 41.1Q40.2 42 39 42ZM26.9 33.35Q25.2 33.35 24.2 32.35Q23.2 31.35 23.2 29.7V18.35Q23.2 16.65 24.2 15.675Q25.2 14.7 26.9 14.7H40.4Q42.1 14.7 43.1 15.675Q44.1 16.65 44.1 18.35V29.7Q44.1 31.35 43.1 32.35Q42.1 33.35 40.4 33.35ZM41.1 30.35Q41.1 30.35 41.1 30.35Q41.1 30.35 41.1 30.35V17.7Q41.1 17.7 41.1 17.7Q41.1 17.7 41.1 17.7H26.2Q26.2 17.7 26.2 17.7Q26.2 17.7 26.2 17.7V30.35Q26.2 30.35 26.2 30.35Q26.2 30.35 26.2 30.35Z' />
            </Icon>
          </Tooltip>
        </Flex>
      )}
    </Flex>
  );
}

function User() {
  const { user, logout, sendEmail } = useContext(UserContext);
  const toast = useToast();
  return (
    <Flex bg='white' borderRadius='md' p='4' shadow='md' textAlign='center' alignItems='center' sx={{ gap: 4 }}>
      <Icon viewBox='0 0 48 48' boxSize='10' fill='purple'>
        <path d='M24 23.95Q20.7 23.95 18.6 21.85Q16.5 19.75 16.5 16.45Q16.5 13.15 18.6 11.05Q20.7 8.95 24 8.95Q27.3 8.95 29.4 11.05Q31.5 13.15 31.5 16.45Q31.5 19.75 29.4 21.85Q27.3 23.95 24 23.95ZM8 40V35.3Q8 33.4 8.95 32.05Q9.9 30.7 11.4 30Q14.75 28.5 17.825 27.75Q20.9 27 24 27Q27.1 27 30.15 27.775Q33.2 28.55 36.55 30Q38.1 30.7 39.05 32.05Q40 33.4 40 35.3V40ZM11 37H37V35.3Q37 34.5 36.525 33.775Q36.05 33.05 35.35 32.7Q32.15 31.15 29.5 30.575Q26.85 30 24 30Q21.15 30 18.45 30.575Q15.75 31.15 12.6 32.7Q11.9 33.05 11.45 33.775Q11 34.5 11 35.3ZM24 20.95Q25.95 20.95 27.225 19.675Q28.5 18.4 28.5 16.45Q28.5 14.5 27.225 13.225Q25.95 11.95 24 11.95Q22.05 11.95 20.775 13.225Q19.5 14.5 19.5 16.45Q19.5 18.4 20.775 19.675Q22.05 20.95 24 20.95ZM24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45Q24 16.45 24 16.45ZM24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Q24 37 24 37Z' />
      </Icon>
      <Stack>
        <Box as='strong' color='common.main'>
          {user?.email}
          {!user?.emailVerified && (
            <Tooltip label={ko.notVerified}>
              <WarningIcon ml='1' color='pink.600' verticalAlign='-2px' />
            </Tooltip>
          )}
        </Box>
        <Flex justify='center' sx={{ gap: 2 }}>
          {!user?.emailVerified && (
            <Button colorScheme='pink' size='sm' onClick={() => sendEmail(toast)}>
              {ko.sendEmail}
            </Button>
          )}
          <Button onClick={logout} variant='ghost' colorScheme='purple' size='sm'>
            {ko.logout}
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
}

const isSameWalletAddress = (a1, a2) => (a1 && a2 ? a1?.toLowerCase() === a2?.toLowerCase() : false);

function Wallet() {
  const { user } = useContext(UserContext);

  const { status, account, startOnboarding, switchToPolygon, connectAndSwitch, chainId } = useMetaMaskCustom();
  const { walletAddress, setWalletAddress, loaded } = useContext(WalletContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const addWalletAddress = async () => {
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        wallet_address: account.toLowerCase(),
      });
      setWalletAddress(account);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Flex
      bg='white'
      borderRadius='md'
      p='4'
      shadow='md'
      textAlign='center'
      alignItems='center'
      sx={{ gap: 4 }}
      pos='relative'
    >
      <Popover>
        <PopoverTrigger>
          <IconButton
            size='sm'
            isRound
            variant='ghost'
            colorScheme='cyan'
            aria-label='Show information about connecting crypto wallet'
            icon={<QuestionIcon boxSize='4' />}
            pos='absolute'
            top='0'
            right='0'
            transform='translate(50%, -50%)'
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader fontWeight='bold'>Crypto Wallet Address</PopoverHeader>
          <PopoverBody fontSize='md' textAlign='left'>
            By connecting your crypto wallet to the FingeRate website and linking crpyto address to your FingeRate
            account, you will be able to add SoT NFTs owned by you in particular moment and be a part of the profit
            distribution process. If you need help regarding your wallet address or you would like to change it, please
            contact us.
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Icon viewBox='0 0 48 48' boxSize='10' fill='blueviolet'>
        <path d='M32.6 27.2Q33.85 27.2 34.825 26.225Q35.8 25.25 35.8 23.95Q35.8 22.7 34.825 21.75Q33.85 20.8 32.6 20.8Q31.35 20.8 30.375 21.75Q29.4 22.7 29.4 23.95Q29.4 25.25 30.375 26.225Q31.35 27.2 32.6 27.2ZM9 36.35Q9 36.35 9 37.675Q9 39 9 39Q9 39 9 39Q9 39 9 39V9Q9 9 9 9Q9 9 9 9Q9 9 9 10.35Q9 11.7 9 11.7Q9 11.7 9 13.6Q9 15.5 9 18.35V29.7Q9 32.55 9 34.45Q9 36.35 9 36.35ZM9 42Q7.85 42 6.925 41.1Q6 40.2 6 39V9Q6 7.85 6.925 6.925Q7.85 6 9 6H39Q40.2 6 41.1 6.925Q42 7.85 42 9V15.7H39V9Q39 9 39 9Q39 9 39 9H9Q9 9 9 9Q9 9 9 9V39Q9 39 9 39Q9 39 9 39H39Q39 39 39 39Q39 39 39 39V32.35H42V39Q42 40.2 41.1 41.1Q40.2 42 39 42ZM26.9 33.35Q25.2 33.35 24.2 32.35Q23.2 31.35 23.2 29.7V18.35Q23.2 16.65 24.2 15.675Q25.2 14.7 26.9 14.7H40.4Q42.1 14.7 43.1 15.675Q44.1 16.65 44.1 18.35V29.7Q44.1 31.35 43.1 32.35Q42.1 33.35 40.4 33.35ZM41.1 30.35Q41.1 30.35 41.1 30.35Q41.1 30.35 41.1 30.35V17.7Q41.1 17.7 41.1 17.7Q41.1 17.7 41.1 17.7H26.2Q26.2 17.7 26.2 17.7Q26.2 17.7 26.2 17.7V30.35Q26.2 30.35 26.2 30.35Q26.2 30.35 26.2 30.35Z' />
      </Icon>
      {status === 'notConnected' && (
        <Button onClick={connectAndSwitch} size='sm' colorScheme='blue'>
          Connect Wallet
        </Button>
      )}
      {(status === 'initializing' || status === 'connecting') && <Spinner color='blue' size='lg' />}
      {status === 'unavailable' && (
        <Button onClick={startOnboarding} size='sm' variant='outline' colorScheme='blue'>
          Install MetaMask Wallet
        </Button>
      )}
      {status === 'connected' && (
        <>
          {chainId !== POLYGON.chainId ? (
            <Button onClick={switchToPolygon} size='sm' colorScheme='pink'>
              Switch to {POLYGON.chainName}
            </Button>
          ) : (
            <Stack alignItems='center'>
              <Text color={walletAddress && walletAddress !== account ? 'pink.600' : 'blue'} fontWeight='bold'>
                {account.slice(0, 5)}...{account.slice(-4)}
                {walletAddress && walletAddress !== account && (
                  <Tooltip
                    label={`Connected address dose not match!
                    Switch to Linked Address: ${walletAddress.slice(0, 5)}...${walletAddress.slice(-4)}`}
                  >
                    <WarningIcon ml='1' verticalAlign='-2px' />
                  </Tooltip>
                )}
              </Text>

              {loaded ? (
                walletAddress ? (
                  <Tag variant='outline' colorScheme='green'>
                    <TagLabel>Address Linked</TagLabel>
                    <TagRightIcon as={CheckIcon} />
                  </Tag>
                ) : (
                  <>
                    <Button onClick={onOpen} colorScheme='blue' size='sm'>
                      Link Wallet Address to FingeRate
                    </Button>
                    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontWeight='bold'>Link Wallet Address</AlertDialogHeader>

                          <AlertDialogBody>
                            Are you sure you want to add <Box as='strong'>{account}</Box> as SoT NFT address to your
                            account? You can only have one and need to contact us if you want to change it. <br />
                            You must hold your SoT NFTs in this address in order to recive profit.
                          </AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                              Cancel
                            </Button>

                            <Button colorScheme='blue' onClick={addWalletAddress} ml={3}>
                              Add Wallet Address
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </>
                )
              ) : (
                <Spinner color='blue.500' />
              )}
            </Stack>
          )}
        </>
      )}
    </Flex>
  );
}

function Sots({ nfts }) {
  const [cardSots, setCardSots] = useState([]);
  const [nftSots, setNftSots] = useState([]);
  const { walletAddress } = useContext(WalletContext);
  const { user } = useContext(UserContext);
  const { chainId, account } = useMetaMaskCustom();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const listenToNftCollection = () => {
      const q = query(collection(db, 'nfts'), where('owner', '==', walletAddress));
      return onSnapshot(q, ({ docs }) => {
        const owned = docs.map(({ id }) => id);
        setNftSots(nfts.filter(({ token_id }) => owned.includes(token_id)));
      });
    };
    let unsub = () => {};
    if (walletAddress) {
      unsub = listenToNftCollection();
      setLoaded(true);
    }
    return () => {
      unsub();
    };
  }, [walletAddress]);

  useEffect(() => {
    if (cardSots.length === 0) {
      (async () => {
        try {
          const q = query(collection(db, 'sots'), where('owner', '==', user.uid));
          const { docs, empty } = await getDocs(q);
          if (!empty) {
            const fbSots = docs.map((doc) => {
              const { city, country, grade, id: sotId, image, name } = doc.data();
              return { city, country, grade, sotId, image, name };
            });
            setCardSots(fbSots);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoaded(true);
        }
      })();
    }
  }, [user]);

  return (
    <Stack bg='white' borderRadius='md' shadow='md' p='2'>
      {isSameWalletAddress(account, walletAddress) && chainId === POLYGON.chainId && <AddSot nfts={nfts} />}
      <Divider />
      {loaded ? <SotList sots={[...cardSots, ...nftSots]} /> : <Spinner size='xl' />}
    </Stack>
  );
}

function SotList({ sots }) {
  if (sots.length === 0) {
    return (
      <Box textAlign='center'>
        <Box fontWeight='bold' fontSize='2xl' mb='2' color='pink.800'>
          {ko.noSots} 😢
        </Box>
        <Text>
          {ko.visitMarket}{' '}
          <NLink href='/sots'>
            <Link fontWeight='bold' color='rebeccapurple'>
              {ko.sotsMarket}
            </Link>
          </NLink>
          .
        </Text>
        <Text>
          Go to{' '}
          <Link href='https://opensea.io/collection/fingeratesot' color='blue' fontWeight='bold'>
            OpenSea <ExternalLinkIcon verticalAlign='-1px' />
          </Link>
          , acquire SoT and add it to FingeRate App by linking your crypto wallet address.
        </Text>
      </Box>
    );
  }
  return (
    <Grid as='ul' gridTemplateColumns='repeat(auto-fill, minmax(min(200px, 100%), 1fr))' gap='2'>
      {sots.map((sot) => (
        <SotCard key={sot.sotId} sot={sot} />
      ))}
    </Grid>
  );
}

const OPENSEA_URL = 'https://opensea.io/assets/matic/0x778e62aa005f566e2379fd2cc431b23b4fec2ef5/';

const SotCard = ({ sot, t }) => {
  const [loaded, setLoaded] = useState(false);
  const isNft = 'source' in sot;
  return (
    <Stack
      as='li'
      borderRadius='md'
      borderWidth='2px'
      borderColor={isNft ? 'blue.200' : 'purple.200'}
      shadow='sm'
      bg='gray.50'
      p='1'
      sx={{ '& img': { borderRadius: 'base' } }}
    >
      <Box pos='relative' fontSize='0'>
        <Image
          src={sot.image}
          alt={`Thumbnail of SoT${sot.sotId}`}
          width='400'
          height='400'
          onLoad={() => setLoaded(true)}
        />
        {!loaded && <Skeleton pos='absolute' inset='0' zIndex='2' />}
      </Box>

      <Flex flexDir='column' flex='1' sx={{ gap: 2 }}>
        <Box
          as='strong'
          display='block'
          color={isNft ? 'blue' : 'common.main'}
          fontFamily='sans-serif'
          fontWeight='bold'
          fontSize={{ base: 'sm', sm: 'md' }}
        >
          {sot.name}
        </Box>

        <Box mt='auto' display={{ base: 'none', sm: 'grid' }} sx={{ gap: 1 }}>
          <Box color='blue.400' display='flex' fontFamily='mono' sx={{ gap: 1 }} flexWrap='wrap'>
            <Tag colorScheme='purple' size='sm'>
              {sot.sotId}
            </Tag>
            {isNft && (
              <Tag colorScheme='blue' size='sm'>
                token_id: {sot.token_id}
              </Tag>
            )}
          </Box>

          <Tag colorScheme='pink' size='sm' w='fit-content' fontFamily='sans-serif'>
            <Icon ml='-0.5'>
              <path
                fill='currentColor'
                fillRule='evenodd'
                d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                clipRule='evenodd'
              />
            </Icon>
            <TagLabel>
              {sot.country}, {sot.city}
            </TagLabel>
          </Tag>
        </Box>
      </Flex>
      <Flex sx={{ gap: 2 }} alignItems='center'>
        <Grid
          fontFamily={'sans-serif'}
          fontWeight={'bold'}
          textAlign='center'
          placeItems='center'
          borderRadius='md'
          h='8'
          w='8'
          bg={`grades.${sot.grade}`}
          color='white'
          shadow='inner'
          textShadow='-1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5)'
        >
          {sot.grade}
        </Grid>
        {isNft ? (
          <Link isExternal href={OPENSEA_URL + sot.token_id} color='blue' fontSize='md'>
            View on OpenSea <ExternalLinkIcon verticalAlign='-1px' />
          </Link>
        ) : (
          <NLink href={`/sots/${sot.sotId}`} passHref>
            <Link color='purple' fontSize='md'>
              View SoT
            </Link>
          </NLink>
        )}
      </Flex>
    </Stack>
  );
};

const ADD_SOT_ACTIONS = Object.freeze({
  SELECT_COUNTRY: 'selectCountry',
  SELECT_SOT: 'selcetSot',
  TOGGLE_LOADING: 'toggleLoading',
  TOGGLE_DISABLED: 'toggleDisabled',
  RESET: 'reset',
});

const addSotInitialState = {
  selectedCountry: null,
  availableSots: [],
  selectedSot: null,
  disabled: false,
  loading: false,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_SOT_ACTIONS.RESET:
      return { ...state, ...addSotInitialState };
    case ADD_SOT_ACTIONS.SELECT_COUNTRY:
      let availableSots = state.nfts.filter(({ country }) => country === payload);
      return { ...state, selectedCountry: payload, availableSots, selectedSot: null };
    case ADD_SOT_ACTIONS.SELECT_SOT:
      return { ...state, selectedSot: payload, disabled: false };
    case ADD_SOT_ACTIONS.TOGGLE_LOADING:
      return { ...state, loading: !state.loading };
    case ADD_SOT_ACTIONS.TOGGLE_DISABLED:
      return { ...state, disabled: !state.disabled };
    default:
      throw new Error();
  }
};

function AddSot({ nfts }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { account, ethereum } = useMetaMaskCustom();
  const countries = useMemo(
    () =>
      nfts.reduce((acc, { country }) => {
        if (acc.includes(country)) return acc;
        return [...acc, country];
      }, []),
    [nfts]
  );
  const [state, dispatch] = useReducer(reducer, { nfts, ...addSotInitialState });
  const { availableSots, selectedCountry, selectedSot, loading, disabled } = state;

  const toast = useToast();

  const handleAddSot = async () => {
    try {
      dispatch({ type: ADD_SOT_ACTIONS.TOGGLE_LOADING });
      const [
        { default: Web3 },
        { default: contractABI },
        {
          default: { address },
        },
      ] = await Promise.all([import('web3'), import('../utils/SOT/abi.json'), import('../utils/SOT/SOT')]);
      const web3 = new Web3(ethereum);
      const tokenInst = new web3.eth.Contract(contractABI, address);
      const ownerAddress = await tokenInst.methods.ownerOf(selectedSot).call();

      if (!isSameWalletAddress(ownerAddress, account)) {
        toast({
          title: 'SoT not added',
          description: `You don't own this token (token_id: ${selectedSot})`,
          status: 'error',
          isClosable: true,
          position: 'top',
          duration: 4000,
        });
      } else {
        await setDoc(doc(db, 'nfts', selectedSot), { owner: account.toLowerCase() });
        toast({
          title: 'Success',
          description: `Added token (token_id: ${selectedSot})`,
          status: 'success',
          isClosable: true,
          position: 'top',
          duration: 4000,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: ADD_SOT_ACTIONS.TOGGLE_LOADING });
      dispatch({ type: ADD_SOT_ACTIONS.TOGGLE_DISABLED });
    }
  };

  const handleModalClose = () => {
    onClose();
    dispatch({ type: ADD_SOT_ACTIONS.RESET });
  };
  return (
    <>
      <Button onClick={onOpen} colorScheme='blue' ml='auto' leftIcon={<AddIcon />}>
        Add SoT NFT
      </Button>
      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add SoT NFT</ModalHeader>
          <ModalCloseButton />
          <ModalBody display='flex' flexDir='column' sx={{ gap: 2 }} p='4'>
            <Select
              colorScheme='blue'
              isDisabled={loading}
              minW='fit-content'
              flex={{ base: 1, sm: 0 }}
              onChange={({ target: { value } }) => dispatch({ type: ADD_SOT_ACTIONS.SELECT_COUNTRY, payload: value })}
            >
              <option value=''>-- Select Country --</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
            {selectedCountry && (
              <Select
                isDisabled={loading}
                minW='fit-content'
                flex={{ base: 1, sm: 0 }}
                onChange={({ target: { value } }) => dispatch({ type: ADD_SOT_ACTIONS.SELECT_SOT, payload: value })}
              >
                <option value=''>-- Select SoT --</option>
                {availableSots.map(({ sotId, name, token_id }) => (
                  <option key={sotId} value={token_id}>
                    {sotId} - {name}
                  </option>
                ))}
              </Select>
            )}
            {selectedSot && (
              <Button colorScheme='blue' isLoading={loading} isDisabled={disabled} onClick={handleAddSot}>
                Add SoT
              </Button>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
