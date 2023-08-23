import {
  type QueryParam,
  type ClientResponse,
  type ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import { apiRoot } from '../../clients/BuildClient';

interface QueryArgs {
  fuzzy?: boolean;
  fuzzyLevel?: number;
  markMatchingVariants?: boolean;
  filter?: string | string[];
  'filter.facets'?: string | string[];
  'filter.query'?: string | string[];
  facet?: string | string[];
  sort?: string | string[];
  limit?: number;
  offset?: number;
  withTotal?: boolean;
  staged?: boolean;
  priceCurrency?: string;
  priceCountry?: string;
  priceCustomerGroup?: string;
  priceChannel?: string;
  localeProjection?: string | string[];
  storeProjection?: string;
  expand?: string | string[];
  [key: string]: QueryParam;
}

interface PropsType {
  limit?: number;
  pageNumber?: number;
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  };
  filter?: { categoriesById?: { id: string }; productByKey?: { key: string } };
}

const createQueryArgs = (props: PropsType): QueryArgs => {
  const offset =
    props.pageNumber !== undefined && props.limit !== undefined
      ? props.pageNumber * props.limit
      : 0;

  const filterResult = [];
  if (props.filter?.categoriesById?.id !== undefined) {
    filterResult.push(
      `categories.id: subtree("${props.filter.categoriesById.id}")`,
    );
  }
  if (props.filter?.productByKey?.key !== undefined) {
    filterResult.push(`key: "${props.filter.productByKey.key}"`);
  }

  return {
    limit: props.limit === undefined ? 5 : props.limit,
    offset,
    sort:
      props.sort !== undefined
        ? `${props.sort.field} ${props.sort.order}`
        : 'id asc',
    filter: filterResult,
  };
};

export const getProducts = async (
  props: PropsType,
): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> => {
  return apiRoot
    .productProjections()
    .search()
    .get({ queryArgs: { ...createQueryArgs(props) } })
    .execute();
};

// How to use:

// getProducts({
//   limit: 5,
//   pageNumber: 3,
//   sort: {
//     field: 'id',
//     order: 'desc',
//   },
//   filter: {
//     categoriesById: { id: '3af6470b-59b5-4d4e-9a7b-81133a440499' },
//     // productByKey: { key: '34 Boulevard Saint Germain' },
//   },
// })
//   .then((resp) => {
//     console.log('resp', resp.body.results);
//   })
//   .catch(console.log);
