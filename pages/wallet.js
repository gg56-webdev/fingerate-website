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
} from '@chakra-ui/react';
import { useEffect, useState, useContext, useRef } from 'react';
import { UserContext } from '../context/user';
import { MetaMaskProvider, useMetaMask } from 'metamask-react';
import { db } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import Web3 from 'web3';
import contractABI from '../abi.json';

export default function Wallet() {
  return (
    <MetaMaskProvider>
      <Grid pt='80px'>
        <MetaMask />
      </Grid>
    </MetaMaskProvider>
  );
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

function MetaMask() {
  const { user } = useContext(UserContext);

  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const startOnboarding = async () => new (await import('@metamask/onboarding')).default().startOnboarding();

  const swapToPoly = async () =>
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{ ...POLYGON }],
    });

  const addWallet = async () => {
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        walletAddress: account,
      });
    } catch (err) {
      console.error(err);
    } finally {
      onClose();
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <Box w='fit-content'>
      {(status === 'initializing' || status === 'connecting') && <Spinner />}
      {status === 'unavailable' && (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>No MetaMask installed!</AlertTitle>
          <Button onClick={startOnboarding}>Install MetaMask</Button>
        </Alert>
      )}
      {status === 'notConnected' && <Button onClick={connect}>Connect to MetaMask</Button>}
      {status === 'connected' && (
        <Box>
          {chainId !== POLYGON.chainId ? (
            <Alert status='warning'>
              <AlertIcon />
              <AlertTitle>You are not connected to Polygon Mainnet!</AlertTitle>
              <Button onClick={swapToPoly}>Swap to Polygon Mainnet</Button>
            </Alert>
          ) : (
            <Box>
              <Alert status='success'>
                <AlertIcon />
                <AlertTitle>
                  Connected account {account} on chain ID {chainId}
                </AlertTitle>
              </Alert>

              <Button onClick={onOpen}>Add My Wallet</Button>
              <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                      Add Wallet
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure you want to add <Box as='strong'>{account}</Box> as SoT NFT address to your account?
                      You can only have one and need to contact us if you want to change it.
                      <br />
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
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
