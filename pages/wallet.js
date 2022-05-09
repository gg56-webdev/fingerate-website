import { Alert, AlertIcon, AlertTitle, Box, Button, Grid, List, ListItem } from '@chakra-ui/react';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/user';
import useMetaMask from '../hooks/useMetaMask';
import Web3 from 'web3';
import contractABI from '../abi.json';

export default function Wallet() {
  const { user } = useContext(UserContext);
  const { error } = useMetaMask();

  const handleClick = () => console.log('click');
  return (
    <Grid pt='80px'>
      {error && (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}

      <Button w={'fit-content'} onClick={handleClick} disabled={Boolean(error)}>
        Connect
      </Button>
    </Grid>
  );
}
