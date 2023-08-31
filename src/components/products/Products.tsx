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
  Checkbox,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import EuroIcon from '@mui/icons-material/Euro';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  type Category,
  type ProductProjection,
} from '@commercetools/platform-sdk';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { getProducts } from '../../api/calls/products/getProducts';
import { getCategoryById } from '../../api/calls/categories/getCategoryById';
import NavigationCatalog from './NavigationCatalog';
import { getCategoryByKey } from '../../api/calls/categories/getCategoriesByKey';
import { useSearchText } from '../../helpers/hooks/Hooks';
import { searchAPI } from '../../api/calls/products/searchProducts';

const getPageQty = (total: number): number => Math.ceil(total / 6);

const testNumber = (value: string): boolean => {
  return Number.isNaN(Number(value));
};

const returnNumber = (value: string): number | null => {
  return Number.isNaN(Number(value)) ? null : Number(value);
};

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
  const navigation = useNavigate();
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [arrayForBread, setArrayForBread] = useState<IBreadCrump[]>([]);
  const [responseCategoryByKey, setResponseCategoryByKey] = useState<
    Category | undefined
  >(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [pageQty, setPageQty] = useState(1);
  const [checkedSort, setCheckedSort] = useState(true);
  const [checkedTypeSort, setCheckedTypeSort] = useState(false);
  const [tempTextState, setTempTextState] = useState<string | null>(null);
  const tempText: string | null = useSearchText();

  useEffect(() => {
    if (category !== undefined) {
      getCategoryByKey({ key: category })
        .then((resp) => {
          setResponseCategoryByKey(resp.body);
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else setResponseCategoryByKey(undefined);
  }, [category]);

  useEffect(() => {
    setTempTextState(tempText);
    if (Object.values(params).length === 0) {
      setPage(1);
      setCategory(undefined);
    } else if (Object.values(params).length === 2) {
      if (params.id !== undefined) {
        const tempNumber = returnNumber(params.id);
        if (tempNumber !== null && tempNumber !== page) setPage(tempNumber);
      }
      if (params.category !== undefined) {
        setCategory(params.category);
      }
    } else if (Object.values(params).length === 1) {
      if (params.id !== undefined) {
        if (params.id === 'search') {
          if (tempTextState !== null) {
            searchAPI({ text: tempTextState, pageNumber: page })
              .then((resp) => {
                setProducts(resp.body.results);
                if (resp.body.total != null) {
                  setTotal(resp.body.total);
                  setPageQty(getPageQty(resp.body.total));
                }
                setTempTextState(null);
              })
              .catch((err) => {
                navigation('/404');
                throw new Error(err);
              });
          }
        } else {
          const tempNumber = returnNumber(params.id);
          if (tempNumber !== null && tempNumber !== page) setPage(tempNumber);
          else if (tempNumber === null) {
            setCategory(params.id);
            setPage(1);
          }
        }
      }
    }
  }, [page, params]);

  useEffect(() => {
    setArrayForBread([]);
    if (responseCategoryByKey !== undefined) {
      const tempArray: IBreadCrump[] = [
        {
          name: responseCategoryByKey.name['en-US'],
          path: '/catalog',
        },
      ];
      if (responseCategoryByKey.ancestors.length === 0) {
        setArrayForBread(tempArray);
      } else {
        responseCategoryByKey.ancestors.map(async (parent) => {
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
  }, [responseCategoryByKey, category, products]);

  useEffect(() => {
    getProducts({
      limit: 6,
      pageNumber: page,
      sort: {
        field: checkedTypeSort ? 'price' : 'name.en-US',
        order: checkedSort ? 'asc' : 'desc',
      },
      filter:
        responseCategoryByKey !== undefined
          ? {
              productsByCategoryId: {
                id: responseCategoryByKey.id,
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
        navigation('/404');
        throw new Error(err);
      });
  }, [responseCategoryByKey, page, checkedSort, checkedTypeSort]);

  return (
    <>
      <Stack mt={3} direction="row" gap={0.5} alignItems="end">
        <Typography variant="h2">
          {responseCategoryByKey?.name['en-US'] ?? 'All products'}
        </Typography>
        <Typography pb={0.4} sx={{ whiteSpace: 'nowrap' }} variant="body2">
          ({total} Products)
        </Typography>
      </Stack>

      <NavigationCatalog category={responseCategoryByKey?.name['en-US']} />

      <div style={{ width: '100%' }} role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <MuiLink component={Link} to="/">
            Home
          </MuiLink>
          {responseCategoryByKey !== undefined ? (
            <MuiLink component={Link} to="/catalog">
              Catalog
            </MuiLink>
          ) : (
            <Typography key="bread-catalog">Catalog</Typography>
          )}
          {arrayForBread.map((bread, ind, arr) => {
            if (ind === 0 && arr.length === 2) {
              return (
                <MuiLink
                  component={Link}
                  key={`bread-${ind}`}
                  to={`/catalog${bread.path}`}
                >
                  {bread.name}
                </MuiLink>
              );
            }
            return <Typography key={`bread-title`}>{bread.name}</Typography>;
          })}
        </Breadcrumbs>
      </div>

      <Stack direction={'row'} width={'100%'} justifyContent={'space-between'}>
        <Stack>
          <Checkbox
            sx={{
              '& .MuiSvgIcon-root': {
                color: 'black',
              },
            }}
            icon={<TuneIcon />}
          />
        </Stack>
        <Stack direction={'row'}>
          <Checkbox
            sx={{
              '& .MuiSvgIcon-root': {
                color: 'black',
              },
            }}
            icon={<SortByAlphaIcon />}
            checkedIcon={<EuroIcon />}
            checked={checkedTypeSort}
            onChange={(event): void => {
              setCheckedTypeSort(event.target.checked);
            }}
          />
          <Checkbox
            sx={{
              '& .MuiSvgIcon-root': {
                color: 'black',
              },
            }}
            icon={<ExpandMoreIcon />}
            checkedIcon={<ExpandLessIcon />}
            checked={checkedSort}
            onChange={(event): void => {
              setCheckedSort(event.target.checked);
            }}
          />
        </Stack>
      </Stack>

      <Grid container justifyContent="center" spacing={1}>
        {products.map((card, index) => {
          const cardData = {
            id: card.id,
            attribute:
              card.masterVariant.attributes !== undefined &&
              card.masterVariant.attributes.length !== 0
                ? card.masterVariant.attributes[0].value.key
                : '',
            image:
              card.masterVariant.images !== undefined
                ? card.masterVariant.images[0].url
                : '',
            image2:
              card.masterVariant.images?.[1] !== undefined
                ? card.masterVariant.images[1].url
                : null,
            name: card.key,
            keyValue: card.key !== undefined ? card.key : '',
            description:
              card.description !== undefined ? card.description['en-US'] : '',
            price: card.masterVariant.prices,
          };
          if (index <= 1) {
            return (
              <Grid key={`catalog-${index}`} item xs={10} sm={12} md={9} lg={6}>
                <ProductCard product={cardData} small={false} />
              </Grid>
            );
          }
          return (
            <Grid key={`catalog-${index}`} item xs={10} sm={6} md={4.5} lg={3}>
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
