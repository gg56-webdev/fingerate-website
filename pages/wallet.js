import {
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  Icon,
  Spinner,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Heading,
  Container,
  AlertDescription,
  Text,
  Skeleton,
  Stack,
  Center,
  UnorderedList,
  Select,
  useToast,
  Divider,
  Tag,
  Link,
} from '@chakra-ui/react';
import { useEffect, useState, useContext, useRef, Fragment, useMemo } from 'react';
import Image from 'next/image';
import { UserContext } from '../context/user';
import { auth, db } from '../lib/firebase';
import { doc, updateDoc, getDoc, onSnapshot, collection, query, where, setDoc } from 'firebase/firestore';

import useMetaMaskCustom from '../hooks/useMetaMaskCustom';

import POLYGON from '../utils/POLYGON';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export default function NFT() {
  const { user, loading } = useContext(UserContext);

  const metaMaskData = useMetaMaskCustom();
  const { status, chainId, account, ethereum } = metaMaskData;

  const [walletAddress, setWalletAddress] = useState();

  const addWalletAddress = async () => {
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        wallet_address: account.toLocaleLowerCase(),
      });
      setWalletAddress(account);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getAddress = async () => {
      try {
        await auth.currentUser.getIdToken(true);
        const docSnap = await getDoc(doc(db, 'users', user.uid));
        const { wallet_address } = docSnap.data();
        setWalletAddress(wallet_address);
      } catch (err) {
        console.log(err);
      }
    };
    if (status === 'connected' && chainId === POLYGON.chainId && user && !walletAddress) {
      getAddress();
    }
  }, [user, status, chainId, walletAddress]);

  return (
    <Container maxW='container.xl' pt='80px' pb='8'>
      {loading ? (
        <Grid placeItems='center'>
          <Spinner color='purple' />
        </Grid>
      ) : user ? (
        <Stack>
          <Flex flexDir='row' sx={{ gap: 2 }} justify='center' flexWrap='wrap' fontSize={{ base: 'sm', sm: 'md' }}>
            <MetaMask metaMaskData={metaMaskData} />
            {status === 'connected' && chainId === POLYGON.chainId ? (
              <LinkAddress walletAddress={walletAddress} addWalletAddress={addWalletAddress} account={account} />
            ) : null}
          </Flex>
          {status === 'connected' && chainId === POLYGON.chainId && walletAddress === account && (
            <Sots ethereum={ethereum} account={account} />
          )}
        </Stack>
      ) : (
        <Button>Login</Button>
      )}
    </Container>
  );
}

function MetaMask({ metaMaskData }) {
  const { status, account, startOnboarding, switchToPolygon, connectAndSwitch, chainId } = metaMaskData;

  return (
    <Grid placeItems='center'>
      {(status === 'initializing' || status === 'connecting') && <Spinner color='orange' />}
      {status === 'unavailable' && (
        <Alert
          status='error'
          borderRadius='md'
          shadow='md'
          w='fit-content'
          textAlign='center'
          flexDir={{ base: 'column', md: 'row' }}
        >
          <AlertIcon />
          <AlertTitle>No MetaMask installed!</AlertTitle>
          <Button onClick={startOnboarding} colorScheme='orange'>
            Install MetaMask
          </Button>
        </Alert>
      )}
      {status === 'notConnected' && (
        <Button onClick={connectAndSwitch} colorScheme='orange'>
          Connect to MetaMask
        </Button>
      )}
      {status === 'connected' &&
        (chainId === POLYGON.chainId ? (
          <Alert
            status='success'
            borderRadius='md'
            shadow='md'
            w='fit-content'
            textAlign='center'
            // flexDir={{ base: 'column', sm: 'row' }}
          >
            <AlertIcon />
            <AlertTitle>Connected:</AlertTitle>
            <AlertDescription display={{ base: 'none', md: 'inline' }}>
              <Box as='span' fontWeight='bold'>
                {account.slice(0, 5)}...{account.slice(-4)}
              </Box>{' '}
              on{' '}
              <Box as='span' fontWeight='bold'>
                {POLYGON.chainName}
              </Box>
            </AlertDescription>
          </Alert>
        ) : (
          <Alert
            status='warning'
            borderRadius='md'
            shadow='md'
            w='fit-content'
            textAlign='center'
            flexDir={{ base: 'column', md: 'row' }}
          >
            <AlertIcon />
            <AlertTitle>You are not connected to {POLYGON.chainName}!</AlertTitle>
            <Button onClick={switchToPolygon} colorScheme='orange'>
              Switch to {POLYGON.chainName}
            </Button>
          </Alert>
        ))}
    </Grid>
  );
}

function LinkAddress({ walletAddress, addWalletAddress, account }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <Center>
      {!walletAddress ? (
        <>
          <Button onClick={onOpen} colorScheme='purple' size='lg'>
            Link Wallet Address to FingeRate
          </Button>
          <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontWeight='bold'>Link Wallet Address</AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure you want to add <Box as='strong'>{account}</Box> as SoT NFT address to your account? You
                  can only have one and need to contact us if you want to change it. <br />
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
      ) : (
        <>
          {walletAddress !== account ? (
            <Alert
              status='error'
              borderRadius='md'
              shadow='md'
              w='fit-content'
              textAlign='center'
              flexDir={{ base: 'column', md: 'row' }}
            >
              <AlertIcon />
              <AlertTitle>Your wallet address dosent match!</AlertTitle>
              <AlertDescription>
                Please switch to address{' '}
                <Box as='strong'>
                  {walletAddress.slice(0, 5)}...{walletAddress.slice(-4)}
                </Box>
              </AlertDescription>
            </Alert>
          ) : (
            <Alert
              status='success'
              borderRadius='md'
              shadow='md'
              w='fit-content'
              textAlign='center'
              // flexDir={{ base: 'column', sm: 'row' }}
            >
              <AlertIcon />
              <AlertTitle>Wallet Address Linked:</AlertTitle>
              <AlertDescription display={{ base: 'none', md: 'inline' }}>
                <Box as='span' fontWeight='bold'>
                  {account.slice(0, 5)}...{account.slice(-4)}
                </Box>
              </AlertDescription>
            </Alert>
          )}
        </>
      )}
    </Center>
  );
}

function Sots({ ethereum, account }) {
  const [nfts, setNfts] = useState();
  useEffect(() => {
    const getNFTs = async () => {
      const { result } = await import('../utils/SOT/nfts.json');
      setNfts(result);
    };

    if (!nfts) {
      getNFTs();
    }
  }, [nfts]);
  return (
    <Stack bg='white' p='2' shadow='md' borderRadius='md'>
      {nfts ? (
        <>
          <AddSot nfts={nfts} account={account} ethereum={ethereum} />
          <SotList nfts={nfts} account={account} />
        </>
      ) : (
        <Spinner />
      )}
    </Stack>
  );
}

function AddSot({ nfts, account, ethereum }) {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [availableSots, setAvailableSots] = useState([]);
  const [selectedSot, setSelectedSot] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleCountrySelect = ({ target: { value } }) => {
    setSelectedSot();
    setSelectedCountry(value);
    setAvailableSots(nftsByCountry[value]);
  };

  const handleSotSelect = ({ target: { value } }) => {
    setSelectedSot(value);
    setDisabled(false);
  };

  const handleSotAdd = async () => {
    setLoading(true);
    try {
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

      if (ownerAddress.toLowerCase() !== account.toLowerCase()) {
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
      setDisabled(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const nftsByCountry = useMemo(
    () =>
      nfts
        .map(({ metadata, token_id }) => ({ ...JSON.parse(metadata), token_id }))
        .reduce((acc, cur) => {
          const { value: country } = cur.attributes[0];
          acc[country] = [...(acc[country] || []), cur];
          return acc;
        }, {}),
    [nfts]
  );

  return (
    <Box as='fieldset' border='1px solid' borderColor='purple.200' borderRadius='md' p='2'>
      <Box as='legend' px='2' fontWeight='bold' textAlign={{ base: 'center', sm: 'left' }}>
        Add your SoT NFTs to FingeRate:
      </Box>
      <Flex sx={{ gap: 1 }} flexWrap='wrap' fontFamily='sans-serif' flexDir={{ base: 'column', sm: 'row' }}>
        <Select minW='fit-content' flex={{ base: 1, sm: 0 }} onChange={handleCountrySelect} disabled={loading}>
          <option value=''>-- Select Country --</option>
          {Object.keys(nftsByCountry).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>

        {selectedCountry && (
          <Select flex='2' minW='fit-content' onChange={handleSotSelect} disabled={loading}>
            <option value=''>-- Select SoT --</option>
            {availableSots.map(({ name, token_id }) => {
              const [fullId, location] = name.split(' - ');
              const id = fullId.slice(4);
              return (
                <option key={token_id} value={token_id}>
                  {id} - {location}
                </option>
              );
            })}
          </Select>
        )}

        {selectedSot && (
          <Button isDisabled={disabled} isLoading={loading} onClick={handleSotAdd} colorScheme='purple'>
            Add SoT
          </Button>
        )}
      </Flex>
    </Box>
  );
}

function SotList({ nfts, account }) {
  const [sots, setSots] = useState([]);
  useEffect(() => {
    const parsedNfts = nfts.map(({ token_id, metadata }) => ({ ...JSON.parse(metadata), token_id }));

    const listenToNftCollection = () => {
      const q = query(collection(db, 'nfts'), where('owner', '==', account.toLowerCase()));
      return onSnapshot(q, ({ docs }) => {
        const ownedNfts = docs.map(({ id }) => id);
        setSots(
          parsedNfts
            .filter(({ token_id }) => ownedNfts.includes(token_id))
            .sort((a, b) => {
              const [, , { value: grade1 }] = a.attributes;
              const [, , { value: grade2 }] = b.attributes;
              if (grade1 === 'S') return -1;
              if (grade2 === 'S') return 1;
              return grade1.charCodeAt(0) - grade2.charCodeAt(0);
            })
        );
      });
    };
    let unsub = listenToNftCollection();
    return () => {
      unsub();
    };
  }, [account, nfts]);

  return (
    <UnorderedList
      listStyleType='none'
      display='grid'
      gridTemplateColumns='repeat(auto-fill, minmax(min(200px, 100%), 1fr))'
      gap='2'
    >
      {sots.map((sot) => (
        <SotCard key={sot.token_id} sot={sot} />
      ))}
    </UnorderedList>
  );
}

const OPENSEA_URL = 'https://opensea.io/assets/matic/0x778e62aa005f566e2379fd2cc431b23b4fec2ef5/';

const SotCard = ({ sot, t }) => {
  const [loaded, setLoaded] = useState(false);

  const [{ value: country }, { value: city }, { value: grade }] = sot.attributes;
  const [sotFullId, location] = sot.name.split(' - ');
  const sotId = sotFullId.slice(4);
  return (
    <Stack
      as='li'
      borderRadius='md'
      borderWidth='2px'
      shadow='base'
      bg='cyan.50'
      p='1'
      sx={{ '& img': { borderRadius: 'md' } }}
    >
      <Box pos={'relative'}>
        <Image
          src={sot.image}
          alt={`Thumbnail of SoT${sot.token_id}`}
          width='400'
          height='400'
          layout='responsive'
          onLoad={() => setLoaded(true)}
        />
        {!loaded && <Skeleton pos='absolute' inset='0' />}
      </Box>

      <Flex flexDir='column' flex='1' sx={{ gap: 2 }}>
        <Box
          as='strong'
          display='block'
          color='common.main'
          fontFamily='sans-serif'
          fontWeight='bold'
          fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
        >
          {location}
        </Box>

        <Box mt='auto' display={{ base: 'none', sm: 'grid' }} sx={{ gap: 1 }}>
          <Box color='blue.400' display='flex' fontFamily='mono' sx={{ gap: 1 }} flexWrap='wrap'>
            <Tag colorScheme='purple' size='sm'>
              {sotId}
            </Tag>
            <Tag colorScheme='blue' size='sm'>
              token_id: {sot.token_id}
            </Tag>
          </Box>

          <Box as='small' color='blue'>
            <Icon>
              <path
                fill='currentColor'
                fillRule='evenodd'
                d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                clipRule='evenodd'
              />
            </Icon>
            {country}, {city}
          </Box>
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
          bg={`grades.${grade}`}
          color='white'
          shadow='inner'
          textShadow='-1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5)'
        >
          {grade}
        </Grid>
        <Link isExternal href={OPENSEA_URL + sot.token_id} color='blue'>
          View on OpenSea {<ExternalLinkIcon />}
        </Link>
      </Flex>
    </Stack>
  );
};
