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
  Skeleton,
  Stack,
  Center,
  UnorderedList,
  Select,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState, useContext, useRef, Fragment } from 'react';
import { UserContext } from '../context/user';
import { auth, db } from '../lib/firebase';
import { doc, updateDoc, getDoc, onSnapshot, collection, query, where, setDoc } from 'firebase/firestore';

import useMetaMaskCustom from '../hooks/useMetaMaskCustom';

import POLYGON from '../utils/POLYGON';

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
    <Container maxW='container.xl' pt='80px'>
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
  const toast = useToast();

  const addSot = async () => {
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
      const ownerAddress = await tokenInst.methods.ownerOf(sot).call();

      if (ownerAddress.toLowerCase() !== account.toLowerCase()) {
        toast({
          title: 'SoT not added',
          description: `You don't own this token (id: ${sot})`,
          status: 'error',
          isClosable: true,
          position: 'top',
          duration: 4000,
        });
      } else {
        await setDoc(doc(db, 'nfts', sot), { owner: account.toLowerCase() });
        toast({
          title: 'Success',
          description: `Added token (id: ${sot})`,
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

  const selectCountry = (e) => {
    setSot();
    setCountry(e.target.value);
    setSots(nfts[e.target.value]);
  };

  const selecSot = (e) => {
    setSot(e.target.value);
    setDisabled(false);
  };

  const [nfts, setNfts] = useState([]);
  const [country, setCountry] = useState('');
  const [sots, setSots] = useState([]);
  const [sot, setSot] = useState();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fbNfts, setFbNfts] = useState([]);

  useEffect(() => {
    const getNfts = async () => {
      try {
        const { result } = await import('../nfts.json');
        const arr = result.map(({ metadata, token_id }) => ({ ...JSON.parse(metadata), token_id }));

        const groupedByCountry = arr.reduce((acc, cur) => {
          const { value: country } = cur.attributes[0];
          acc[country] = [...(acc[country] || []), cur];
          return acc;
        }, {});

        setNfts(groupedByCountry);
      } catch (err) {
        console.error(err);
      }
    };
    if (nfts.length === 0) {
      getNfts();
    }
  }, [nfts]);

  useEffect(() => {
    const listenToNftCollection = () => {
      const q = query(collection(db, 'nfts'), where('owner', '==', account.toLowerCase()));
      return onSnapshot(q, (docs) => {
        const nfts = [];
        docs.forEach((doc) => {
          const { owner } = doc.data();
          nfts.push({ id: doc.id, owner });
        });
        setFbNfts(nfts);
      });
    };

    let unsub = listenToNftCollection();

    return () => {
      unsub();
    };
  }, [account]);

  return (
    <Box bg='white' p='2' shadow='md' borderRadius='md'>
      <Stack>
        <Box as='strong'>Add SoT from your wallet to FingeRate App:</Box>
        <Flex sx={{ gap: 1 }} flexWrap='wrap' fontFamily='sans-serif' flexDir={{ base: 'column', sm: 'row' }}>
          <Select minW='fit-content' flex={{ base: 1, sm: 0 }} onChange={selectCountry}>
            <option value=''>-- Select Country --</option>
            {Object.keys(nfts).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
          {country && (
            <Select flex='2' minW='fit-content' onChange={selecSot}>
              <option value=''>-- Select SoT --</option>
              {sots.map(({ name, token_id }) => {
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
          {country && sots && sot && (
            <Button isDisabled={disabled} onClick={addSot} isLoading={loading} colorScheme='purple'>
              Add SoT
            </Button>
          )}
        </Flex>
        <UnorderedList>
          {fbNfts.map(({ id, owner }) => (
            <ListItem key={id}>
              {id} {owner}
            </ListItem>
          ))}
        </UnorderedList>
      </Stack>
    </Box>
  );
}
