import { setupStorage } from './storage';
import { setupWin } from './win';
import { setupDiag } from './diag';
import { setupChat } from './chat';

export const setupCryptocat = (store) => {
  setupStorage(store);
  setupWin();
  setupDiag();
  setupChat();

  // Generate keys on first run.
  if (Object.keys(store.getState().cryptocat).length === 0) {
    Cryptocat.OMEMO.onAddDevice('master', 0);
  }
};
