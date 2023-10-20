import {
  type ClientResponse,
  type CategoryPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { apiRoot } from '../../clients/BuildClient';

export const getCategories = async (): Promise<
  ClientResponse<CategoryPagedQueryResponse>
> => {
  return apiRoot.categories().get().execute();
};
