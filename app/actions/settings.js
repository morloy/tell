export const INITIALIZE_PROFILE = 'INITIALIZE_PROFILE';

export const initializeProfile = (profile) => {
  return {
    type: INITIALIZE_PROFILE,
    profile
  }
}
