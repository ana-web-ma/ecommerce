import type React from 'react';
import { useState, type ReactElement, useEffect } from 'react';
import {
  Breadcrumbs,
  Grid,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  type Category,
  type ProductProjection,
} from '@commercetools/platform-sdk';
import { Link, useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { getProducts } from '../../api/calls/products/getProducts';
import { getCategories } from '../../api/calls/categories/getCategories';
import { getCategoryById } from '../../api/calls/categories/getCategoryById';
import NavigationCatalog from './NavigationCatalog';

const getPageQty = (total: number): number => Math.ceil(total / 6);

const parentPath = (array: (string | undefined)[]): string => {
  if (array === undefined || array.length === 0) return '';
  let temp: string | undefined = '';
  if (Number.isNaN(Number(array[array.length - 1]))) {
    return `/${array.join('/')}`;
  }
  temp = array.pop();
  return array.length === 0 ? '' : `/${array.join('/')}`;
};
interface IBreadCrump {
  name: string;
  path: string;
}

const Products = (): ReactElement => {
  const params = useParams();
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [arrayForBread, setArrayForBread] = useState<IBreadCrump[]>([]);
  const [renderCategory, setRenderCategory] = useState<Category | undefined>(
    undefined,
  );
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [pageQty, setPageQty] = useState(0);

  useEffect(() => {
    if (Object.keys(params).length !== 0) {
      getCategories()
        .then((resp) => {
          let objectCurrentCategory;
          const renderDataQuery = (queryFunc: string): Category | undefined => {
            const result = resp.body.results.filter(
              (cat) => cat.slug['en-US'] === queryFunc,
            );
            if (result.length === 1) {
              return result[0];
            }
            return undefined;
          };
          if (Object.keys(params).length === 0) {
            objectCurrentCategory = undefined;
          } else if (
            Number.isNaN(Number(params.id)) &&
            params.id !== undefined
          ) {
            objectCurrentCategory = renderDataQuery(params.id);
          } else if (objectCurrentCategory === undefined) {
            if (params.subcategory !== undefined) {
              objectCurrentCategory = renderDataQuery(params.subcategory);
            } else if (params.category !== undefined) {
              objectCurrentCategory = renderDataQuery(params.category);
            }
          }
          setRenderCategory(objectCurrentCategory);
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else {
      setRenderCategory(undefined);
    }
  }, [params]);

  useEffect(() => {
    setArrayForBread([]);
    if (renderCategory !== undefined) {
      const tempArray: IBreadCrump[] = [
        {
          name: renderCategory.name['en-US'],
          path: '/catalog',
        },
      ];
      if (renderCategory.ancestors.length === 0) {
        setArrayForBread(tempArray);
      } else {
        renderCategory.ancestors.map(async (parent) => {
          return getCategoryById({ id: parent.id })
            .then((resp) => {
              const temp = {
                name: resp.body.name['en-US'],
                path: `/${resp.body.slug['en-US']}`,
              };
              tempArray.unshift(temp);
              setArrayForBread(tempArray);
            })
            .catch((err) => {
              throw new Error(err);
            });
        });
      }
    }
  }, [renderCategory, products]);

  useEffect(() => {
    const pageCurrent = !Number.isNaN(Number(params.id))
      ? Number(params.id)
      : 1;
    setPage(pageCurrent);
    getProducts({
      limit: 6,
      pageNumber: pageCurrent,
      sort: {
        field: 'name.en-US',
        order: 'asc',
      },
      filter:
        renderCategory !== undefined
          ? {
              productsByCategoryId: {
                id: renderCategory.id,
              },
            }
          : {},
    })
      .then((resp) => {
        setProducts(resp.body.results);
        if (resp.body.total != null) {
          setTotal(resp.body.total);
          setPageQty(getPageQty(resp.body.total));
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, [renderCategory, page]);

  return (
    <>
      <Stack mt={3} direction="row" gap={0.5} alignItems="end">
        <Typography variant="h2">
          {renderCategory?.name['en-US'] ?? 'All products'}
        </Typography>
        <Typography pb={0.4} sx={{ whiteSpace: 'nowrap' }} variant="body2">
          ({total} Products)
        </Typography>
      </Stack>

      <NavigationCatalog category={renderCategory?.name['en-US']} />

      <div style={{ width: '100%' }} role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <MuiLink component={Link} to="/">
            Home
          </MuiLink>
          {renderCategory !== undefined ? (
            <MuiLink component={Link} to="/catalog/1">
              Catalog
            </MuiLink>
          ) : (
            <Typography key="bread-catalog">Catalog</Typography>
          )}
          {arrayForBread.map((bread, ind, arr) => {
            if (ind !== arr.length - 1) {
              return (
                <MuiLink
                  component={Link}
                  key={`bread-${ind}`}
                  to={
                    ind === 0
                      ? `/catalog${bread.path}`
                      : `/catalog${arr[ind - 1].path + bread.path}`
                  }
                >
                  {bread.name}
                </MuiLink>
              );
            }
            return '';
          })}
          {arrayForBread[arrayForBread.length - 1] !== undefined ? (
            <Typography key={`bread-title`}>
              {arrayForBread[arrayForBread.length - 1].name}
            </Typography>
          ) : (
            ''
          )}
        </Breadcrumbs>
      </div>

      <Grid container justifyContent="center" spacing={1}>
        {products.map((card, index) => {
          const price =
            card.masterVariant.prices !== undefined
              ? card.masterVariant.prices[0].value.centAmount / 100
              : 0;
          const currentCode =
            card.masterVariant.prices !== undefined
              ? card.masterVariant.prices[0].value.currencyCode
              : '';
          const cardData = {
            id: card.id,
            image:
              card.masterVariant.images !== undefined
                ? card.masterVariant.images[0].url
                : '',
            image2:
              card.masterVariant.images?.[1] !== undefined
                ? card.masterVariant.images[1].url
                : null,
            name: card.name['en-US'],
            keyValue: card.key !== undefined ? card.key : '',
            price: `${price} ${currentCode}`,
          };
          if (index <= 1) {
            return (
              <Grid key={card.id} item xs={10} sm={12} md={9} lg={6}>
                <ProductCard product={cardData} small={false} />
              </Grid>
            );
          }
          return (
            <Grid key={card.id} item xs={10} sm={6} md={4.5} lg={3}>
              <ProductCard product={cardData} small={true} />
            </Grid>
          );
        })}
      </Grid>

      <Pagination
        count={pageQty}
        page={page}
        shape="rounded"
        onChange={(_, number) => {
          setPage(number);
        }}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={
              item.page !== null
                ? `/catalog${parentPath(Object.values(params))}/${item.page}`
                : `/catalog/`
            }
            {...item}
          />
        )}
      />
    </>
  );
};

export default Products;
