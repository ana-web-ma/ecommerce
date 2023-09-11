import { type TokenStore, type TokenCache } from '@commercetools/sdk-client-v2';

let tokenStore: TokenStore = {
  expirationTime: 0,
  token: '',
};

export const tokenCache: TokenCache = {
  get: (): TokenStore => {
    const tokenStoreStr = localStorage.getItem('EPERFUME_CUSTOMER_TOKEN');
    if (tokenStore.token === '' && tokenStoreStr !== null) {
      tokenStore = JSON.parse(tokenStoreStr);
    }
    return tokenStore;
  },
  set: (newTokenStore) => {
    localStorage.setItem(
      'EPERFUME_CUSTOMER_TOKEN',
      JSON.stringify(newTokenStore),
    );
    tokenStore = newTokenStore;
  },
};
