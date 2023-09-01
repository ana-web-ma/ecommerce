import {
  type QueryParam,
  type ClientResponse,
  type ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import { apiRoot } from '../../clients/BuildClient';

interface PropsType {
  text: string;
  limit?: number;
  pageNumber?: number;
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  };
}

export const searchProducts = async (
  props: PropsType,
): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> => {
  const offset =
    props.pageNumber !== undefined && props.limit !== undefined
      ? (props.pageNumber - 1) * props.limit
      : 0;

  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: props.limit === undefined ? 5 : props.limit,
        offset,
        fuzzy: true,
        sort:
          props.sort !== undefined && props.text === undefined
            ? `${props.sort.field} ${props.sort.order}`
            : 'id asc',
        markMatchingVariants: true,
        // where: `name(en-US="${props.text}")`,
        staged: true,
        // localeProjection: 'en-US',
        // text: {
        //   lang: 'en',
        //   value: `en(${props.text})`,
        // },
        'text.en-US': `${props.text}`,
        // `text=en-US%3D%22roses%22%29 `
        // `text.en=some text to search`
      },
    })
    .execute();
};

// How to use:

// getProducts({
//   limit: 100,
//   pageNumber: 0,
//   sort: {
//     field: 'id',
//     order: 'desc',
//   },
//   filter: {
//     productsByCategoryId: { id: '3af6470b-59b5-4d4e-9a7b-81133a440499' },
//     // productByKey: { key: '34 Boulevard Saint Germain' },
//     productByPrice: {
//       from: 0,
//       to: 10000,
//     },
//   },
// })
//   .then((resp) => {
//     console.log('resp', resp.body.results);
//   })
//   .catch(console.log);
