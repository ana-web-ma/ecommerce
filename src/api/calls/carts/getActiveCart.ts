import { type ClientResponse, type Cart } from '@commercetools/platform-sdk';
import { apiRootCreateByToken } from '../../clients/ExistingTokenFlowClient';

export const getActiveCart = async (): Promise<ClientResponse<Cart>> => {
  return apiRootCreateByToken().me().activeCart().get().execute();
};
