import {
  type Product,
  type ClientResponse,
  type ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import { apiRoot } from '../../clients/BuildClient';

export const searchAPI = async (props: {
  text: string;
  pageNumber: number;
}): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> => {
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        'text.en-US': props.text,
        limit: 6,
        offset: (props.pageNumber - 1) * 6,
      },
    })
    .execute();
};
