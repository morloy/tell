import { HOSTNAME, PORT } from './hostname';

export const ACCOUNTS_URL = `https://${HOSTNAME}:${PORT}/accounts`;

export const lookupHash = (s) => {
  return NodeCrypto.createHash('sha256').update(s+'TVezrelQkAoHCg8L').digest('hex');
}
