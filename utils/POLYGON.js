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

export default POLYGON;
