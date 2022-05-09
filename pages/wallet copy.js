import { Box, Button, Grid, List, ListItem } from '@chakra-ui/react';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/user';
import Web3 from 'web3';
import contractABI from '../abi.json';

export default function Wallet() {
  const { user } = useContext(UserContext);
  const [error, setError] = useState('');
  const [accounts, setAccounts] = useState();
  const [balance, setBalance] = useState();
  const handleClick = async () => {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      // const chainId = await ethereum.request({ method: 'eth_chainId' });
      // console.log(chainId);
      await ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x89' }] });
      setAccounts(accounts[0]);
      const web3 = new Web3(ethereum);
      const SOT = { address: '0x778E62AA005F566E2379FD2cC431B23B4Fec2ef5', token: 'SOT' };
      const tokenInst = new web3.eth.Contract(contractABI, SOT.address);
      const balance = await tokenInst.methods.balanceOf(accounts[0]).call();
      setBalance(balance);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(async () => {}, []);

  return (
    <Grid pt='80px'>
      <Box>{accounts}</Box>
      <Box>{balance}</Box>
      <Button w={'fit-content'} onClick={handleClick}>
        Connect
      </Button>
    </Grid>
  );
}
