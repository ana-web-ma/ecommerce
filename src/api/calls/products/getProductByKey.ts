import { type Product, type ClientResponse } from '@commercetools/platform-sdk';
import { apiRoot } from '../../clients/BuildClient';

export const getProductByKey = async (props: {
  key: string;
}): Promise<ClientResponse<Product>> => {
  return apiRoot.products().withKey({ key: props.key }).get().execute();
};
