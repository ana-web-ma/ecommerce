import {
  type ClientResponse,
  type Category,
} from '@commercetools/platform-sdk';
import { apiRoot } from '../../clients/BuildClient';

export const getCategoryByKey = async (props: {
  key: string;
}): Promise<ClientResponse<Category>> => {
  return apiRoot.categories().withKey({ key: props.key }).get().execute();
};
