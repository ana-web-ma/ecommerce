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

export interface FilterPropsType {
  productsByCategoryId?: { ids: string[] };
  productByKey?: { key: string };
  productsByPrice?: { from: number; to: number };
  productsByAttributeKey?: {
    key: 'floral' | 'woody' | 'citrus' | 'amber' | 'none';
  };
}

interface PropsType {
  text?: string;
  limit?: number;
  pageNumber?: number;
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  };
  filter?: FilterPropsType;
}

const createFilters = (props: PropsType): string[] => {
  const filterResult = [];
  if (props.filter?.productsByCategoryId?.ids !== undefined) {
    props.filter?.productsByCategoryId?.ids.forEach((e) => {
      filterResult.push(`categories.id: subtree("${e}")`);
    });
  }
  if (props.filter?.productByKey?.key !== undefined) {
    filterResult.push(`key: "${props.filter.productByKey.key}"`);
  }
  if (props.filter?.productsByPrice !== undefined) {
    filterResult.push(
      `variants.price.centAmount:range (${
        Number(props.filter?.productsByPrice.from) * 100
      } to ${Number(props.filter?.productsByPrice.to) * 100})`,
    );
  }
  if (
    props.filter?.productsByAttributeKey !== undefined &&
    props.filter.productsByAttributeKey.key !== 'none'
  ) {
    filterResult.push(
      `variants.attributes.olfactory.key:"${props.filter.productsByAttributeKey.key}"`,
    );
  }

  return filterResult;
};

const createQueryArgs = (props: PropsType): QueryArgs => {
  const offset =
    props.pageNumber !== undefined && props.limit !== undefined
      ? (props.pageNumber - 1) * props.limit
      : 0;

  return {
    limit: props.limit === undefined ? 5 : props.limit,
    offset,
    sort:
      props.sort !== undefined && props.text === undefined
        ? `${props.sort.field} ${props.sort.order}`
        : 'id asc',
    filter: createFilters(props),
    // markMatchingVariants: true,
    // localeProjection: 'en-US',

    // staged: true,
    // fuzzy: true,
    // fuzzyLevel: 1,
    'text.en-US': props.text,
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
//   limit: 100,
//   pageNumber: 0,
//   sort: {
//     field: 'id',
//     order: 'desc',
//   },
//   filter: {
//     productsByCategoryId: { id: '3af6470b-59b5-4d4e-9a7b-81133a440499' },
//     // productByKey: { key: '34 Boulevard Saint Germain' },
//     productsByPrice: {
//       from: 0,
//       to: 10000,
//     },
//   },
// })
//   .then((resp) => {
//     console.log('resp', resp.body.results);
//   })
//   .catch(console.log);
