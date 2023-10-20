import {
  type ClientResponse,
  type Category,
} from '@commercetools/platform-sdk';
import { apiRoot } from '../../clients/BuildClient';

export const getCategoryById = async (props: {
  id: string;
}): Promise<ClientResponse<Category>> => {
  return apiRoot.categories().withId({ ID: props.id }).get().execute();
};
