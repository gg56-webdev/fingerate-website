import { useMetaMask } from 'metamask-react';
import POLYGON from '../utils/POLYGON';

export default function useMetaMaskCustom() {
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  const startOnboarding = async () => new (await import('@metamask/onboarding')).default().startOnboarding();

  const switchToPolygon = async () =>
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{ ...POLYGON }],
    });

  const connectAndSwitch = async () => {
    await connect();
    await switchToPolygon();
  };

  return { status, connect, account, chainId, ethereum, startOnboarding, switchToPolygon, connectAndSwitch };
}
