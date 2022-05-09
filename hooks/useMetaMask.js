import { useEffect, useState } from 'react';

const useMetaMask = () => {
  const [error, setError] = useState('');

  const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  useEffect(() => {
    if (!isMetaMaskInstalled()) {
      setError('MetaMask is not installed!');
      return;
    }
  }, []);

  return { error };
};

export default useMetaMask;
