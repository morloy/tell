export const ACCOUNTS_URL = `https://${Cryptocat.Hostname}:${Cryptocat.Port}/accounts`;

export const lookupHash = (s) => {
  return NodeCrypto.createHash('sha256').update(s+'TVezrelQkAoHCg8L').digest('hex');
}
