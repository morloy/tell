import { HOSTNAME, PORT } from './hostname';
import basex from 'base-x';

export const ACCOUNTS_URL = `https://${HOSTNAME}:${PORT}/accounts`;

export const bs58 = basex('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');

export const lookupHash = (s) => {
  return NodeCrypto.createHash('sha256').update(s+'TVezrelQkAoHCg8L').digest('hex');
}

export const getRandomId = () => {
  return bs58.encode(ProScript.crypto.random16Bytes('o0'));
}
