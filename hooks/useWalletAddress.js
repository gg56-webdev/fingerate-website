import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import POLYGON from '../utils/POLYGON';

export default function useWalletAddress(user, { status, chainId }) {
  const [address, setAddress] = useState();

  useEffect(() => {
    const getAddress = async () => {
      try {
        const userDocSnap = await getDoc(doc(db, 'users', user.id));
        const { wallet_address } = userDocSnap.data();
        setAddress(wallet_address);
      } catch (err) {
        console.error(err);
      }
    };
    if (status === 'connected' && user && chainId === POLYGON.chainId) {
      getAddress();
    }
  }, [user, status]);

  return { address };
}
