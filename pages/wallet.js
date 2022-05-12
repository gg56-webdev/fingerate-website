import {
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
} from '@chakra-ui/react';
import { useEffect, useState, useContext, useRef } from 'react';
import { UserContext } from '../context/user';
import { useMetaMask } from 'metamask-react';
import { db } from '../lib/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import Web3 from 'web3';
import contractABI from '../abi.json';

export default function Wallet() {
  const { user, loading } = useContext(UserContext);

  return <Grid pt='80px'>{loading ? <Spinner /> : user ? <MetaMask user={user} /> : <Button>Login</Button>}</Grid>;
}

const convertToHex = (num) => `0x${Number(num).toString(16)}`;

const POLYGON = Object.freeze({
  chainId: convertToHex(137),
  chainName: 'Polygon Mainnet',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: ['https://polygon-rpc.com/'],
  blockExplorerUrls: ['https://polygonscan.com/'],
});

function MetaMask({ user }) {
  const [fbAddress, setFbAddress] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const startOnboarding = async () => new (await import('@metamask/onboarding')).default().startOnboarding();

  const swapToPoly = async () =>
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{ ...POLYGON }],
    });

  const addWallet = async () => {
    setIsLoaded(false);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        wallet_address: account,
      });
      setFbAddress(account);
    } catch (err) {
      console.error(err);
    } finally {
      onClose();
      setIsLoaded(true);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    const getAddress = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'users', user.uid));
        const { wallet_address } = docSnap.data();
        setFbAddress(wallet_address);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoaded(true);
      }
    };
    if (status === 'connected' && chainId === POLYGON.chainId && user) {
      getAddress();
    }
  }, [status, chainId, user]);

  if (status === 'initializing' || status === 'connecting') return <Spinner />;

  if (status === 'unavailable')
    return (
      <Alert status='error'>
        <AlertIcon />
        <AlertTitle>No MetaMask installed!</AlertTitle>
        <Button onClick={startOnboarding}>Install MetaMask</Button>
      </Alert>
    );
  if (status === 'notConnected') return <Button onClick={connect}>Connect to MetaMask</Button>;

  if (status === 'connected')
    return (
      <>
        {chainId === POLYGON.chainId ? (
          <>
            {isLoaded ? (
              <>
                {fbAddress === account ? (
                  <Heading>List of sots</Heading>
                ) : fbAddress ? (
                  <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Your saved wallet address dosent match! switch to wallet {fbAddress}</AlertTitle>
                  </Alert>
                ) : (
                  <>
                    <Button onClick={onOpen}>Add My Wallet</Button>

                    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Add Wallet
                          </AlertDialogHeader>

                          <AlertDialogBody>
                            Are you sure you want to add <Box as='strong'>{account}</Box> as SoT NFT address to your
                            account? You can only have one and need to contact us if you want to change it. <br />
                            You must hold your SoT NFTs in this address in order to recive profit.
                          </AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                              Cancel
                            </Button>

                            <Button colorScheme='blue' onClick={addWallet} ml={3}>
                              Add Address
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </>
                )}
              </>
            ) : (
              <Spinner />
            )}
          </>
        ) : (
          <Alert status='warning'>
            <AlertIcon />
            <AlertTitle>You are not connected to Polygon Mainnet!</AlertTitle>
            <Button onClick={swapToPoly}>Swap to Polygon Mainnet</Button>
          </Alert>
        )}
      </>
    );
}
