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
  IconButton,
  SwipeableDrawer,
} from '@mui/material';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import EuroIcon from '@mui/icons-material/Euro';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AdjustIcon from '@mui/icons-material/Adjust';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { getProducts } from '../../api/calls/products/getProducts';
import { getCategoryById } from '../../api/calls/categories/getCategoryById';
import NavigationCatalog from './NavigationCatalog';
import { getCategoryByKey } from '../../api/calls/categories/getCategoriesByKey';
import {
  useAllProducts,
  useAppDispatch,
  useAttributeKey,
  useCategoryChecked,
  useFilterChecked,
  useOpenFilterBar,
  usePriceValue,
  useSearchText,
  useSortDirection,
  useSortType,
} from '../../helpers/hooks/Hooks';
import {
  allProducts,
  search,
  categoryRequest,
  sortDirectionChecked,
  sortTypeChecked,
  setOpenFilterBar,
} from '../../store/reducers/ProductsSlice';
import FilterIcon from '../ui/icons/FilterIcon';
import FilterBar from './FilterBar';

const returnNumberFromPath = (value: string | undefined): number => {
  // если в url path есть '=', то вернет значение с номером страницы, иначе 1.
  if (value !== undefined) {
    const split = value.split('=')[1];
    return split !== undefined ? Number(split) : 1;
  }
  return 1;
};

const parentPath = (array: (string | undefined)[]): string => {
  // Принимает значения params, вернет название категории если оно есть в строке url
  if (array === undefined || array.length === 0) return '';
  if (array[0] !== undefined) {
    return array[0].includes('=') ? '' : `/${array[0]}`;
  }
  return '';
};

interface IBreadCrump {
  name: string;
  path: string;
}

const Products = (): ReactElement => {
  const params = useParams();
  const location = useLocation();
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [arrayForBread, setArrayForBread] = useState<IBreadCrump[]>([]);
  const [titlePage, setTitlePage] = useState('All products');

  const priceValue = usePriceValue();
  const categoryFilter = useCategoryChecked();
  const attributeByKey = useAttributeKey();
  const sortDirection = useSortDirection();
  const sortType = useSortType();

  const { products } = useAllProducts();
  const { totalCount } = useAllProducts();
  const { pageQty } = useAllProducts();

  const { category } = useAllProducts();
  const searchTextFromState: string | null = useSearchText();

  const openFilterBar = useOpenFilterBar();
  const filterChecked = useFilterChecked();

  const toggleDrawer =
    (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      dispatch(setOpenFilterBar(isOpen));
    };

  useEffect(() => {
    setPageNumber(returnNumberFromPath(location.pathname));
    const categoryFromUrl = parentPath(Object.values(params)).substring(1);
    if (categoryFromUrl !== 'search' && categoryFromUrl !== '') {
      getCategoryByKey({ key: parentPath(Object.values(params)).substring(1) })
        .then((resp) => {
          dispatch(categoryRequest(resp.body));
          const temp = [
            {
              name: resp.body.name['en-US'],
              path: '/catalog',
            },
          ];
          if (resp.body.ancestors.length !== 0) {
            getCategoryById({ id: resp.body.ancestors[0].id })
              .then((response) => {
                temp.unshift({
                  name: response.body.name['en-US'],
                  path: `/${response.body.slug['en-US']}`,
                });
                setArrayForBread(temp);
              })
              .catch((err) => {
                throw new Error(err);
              });
          } else setArrayForBread(temp);
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else if (categoryFromUrl === 'search') {
      setTitlePage('Search results');
      dispatch(categoryRequest(null));
    } else {
      dispatch(categoryRequest(null));
      console.log('ku', pageNumber);
      setTitlePage('All products');
    }
  }, [location]);

  useEffect((): void => {
    setPageNumber(1);
  }, [filterChecked]);

  useEffect((): void => {
    setPageNumber(returnNumberFromPath(location.pathname));
    setArrayForBread([]);
    if (!Object.values(params).includes('search')) {
      dispatch(search(null)); // если уходим со страницы search, обнуляем поле в store, где храним значение с инпута
    } else if (
      Object.values(params).includes('search') &&
      searchTextFromState === null
    ) {
      dispatch(search(null));
      console.log('Поиск не дал результатов'); // ToDo: idk how to do it
    }
  }, [location]);

  useEffect((): void => {
    getProducts({
      limit: 6,
      pageNumber,
      sort: {
        field: sortType ? 'price' : 'name.en-US',
        order: sortDirection ? 'asc' : 'desc',
      },
      filter: {
        productsByCategoryId: {
          ids:
            category !== null
              ? [category.id, ...categoryFilter]
              : [...categoryFilter],
        },
        productsByAttributeKey: {
          key: attributeByKey,
        },
        productsByPrice: {
          from: priceValue[0],
          to: priceValue[1],
        },
      },
      text: searchTextFromState !== null ? searchTextFromState : undefined,
    })
      .then((resp) => {
        dispatch(allProducts(resp.body));
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, [
    location,
    category,
    searchTextFromState,
    sortType,
    sortDirection,
    categoryFilter,
    pageNumber,
  ]);

  return (
    <>
      <Stack mt={3} direction="row" gap={0.5} alignItems="end">
        <Typography variant="h2">
          {category?.name['en-US'] ?? titlePage}
        </Typography>
        <Typography pb={0.4} sx={{ whiteSpace: 'nowrap' }} variant="body2">
          ( {totalCount} Products)
        </Typography>
      </Stack>
      <NavigationCatalog category={category?.name['en-US']} />

      <div style={{ width: '100%' }} role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <MuiLink component={Link} to="/">
            Home
          </MuiLink>
          {category !== undefined || searchTextFromState !== null ? (
            <MuiLink component={Link} to="/catalog">
              Catalog
            </MuiLink>
          ) : (
            <Typography key="bread-catalog">Catalog</Typography>
          )}
          {searchTextFromState !== null ? (
            <Typography key="bread-catalog">Search</Typography>
          ) : null}
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

      <Stack
        sx={{ position: 'relative' }}
        direction={'row'}
        width={'100%'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Stack direction="row" alignItems={'center'}>
          <IconButton
            onClick={toggleDrawer(true)}
            color="primary"
            disabled={openFilterBar}
          >
            <FilterIcon color={openFilterBar ? 'disabled' : 'primary'} />
            <Typography pl={1} variant="subtitle2">
              Filter
            </Typography>
          </IconButton>
          <AdjustIcon
            fontSize="small"
            style={{
              display: !filterChecked ? 'none' : 'block',
              color: '#A70000',
            }}
          />
        </Stack>

        <SwipeableDrawer
          anchor={'left'}
          open={openFilterBar}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <FilterBar />
        </SwipeableDrawer>

        <Typography variant="subtitle2">
          {searchTextFromState !== null
            ? `Matched: ${searchTextFromState}`
            : ''}
        </Typography>

        <Stack direction={'row'}>
          <Checkbox
            sx={{
              '& .MuiSvgIcon-root': {
                color: 'black',
              },
            }}
            icon={<SortByAlphaIcon />}
            checkedIcon={<EuroIcon />}
            checked={sortType}
            onChange={(event): void => {
              dispatch(sortTypeChecked(event.target.checked));
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
            checked={sortDirection}
            onChange={(event): void => {
              dispatch(sortDirectionChecked(event.target.checked));
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
        page={pageNumber}
        shape="rounded"
        onChange={(_, number) => {
          setPageNumber(number);
        }}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={
              item.page !== null
                ? `/catalog${parentPath(Object.values(params))}/page=${
                    item.page
                  }`
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
