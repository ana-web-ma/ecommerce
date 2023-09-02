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
import TuneIcon from '@mui/icons-material/Tune';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import EuroIcon from '@mui/icons-material/Euro';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import {
  type FilterPropsType,
  getProducts,
} from '../../api/calls/products/getProducts';
import { getCategories } from '../../api/calls/categories/getCategories';
import { getCategoryById } from '../../api/calls/categories/getCategoryById';
import NavigationCatalog from './NavigationCatalog';
import { getCategoryByKey } from '../../api/calls/categories/getCategoriesByKey';
import {
  useAllProducts,
  useAppDispatch,
  useAttributeKey,
  useCategoryChecked,
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
  const [pageNumber, setPageNumber] = useState(
    returnNumberFromPath(location.pathname),
  );
  const [arrayForBread, setArrayForBread] = useState<IBreadCrump[]>([]);
  const [titlePage, setTitlePage] = useState('All products');

  const [checkedFilter, setCheckedFilter] = useState(false);
  const categoryFilter = useCategoryChecked();
  const attributeByKey = useAttributeKey();

  const sortDirection = useSortDirection();
  const sortType = useSortType();

  const { products } = useAllProducts();
  const { totalCount } = useAllProducts();
  const { pageQty } = useAllProducts();

  const { category } = useAllProducts();

  const searchTextFromState: string | null = useSearchText();

  const [openFilterBar, setOpenFilterBar] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedAttribute, setSelectedAttribute] = useState(
    'none' as 'none' | 'floral' | 'woody' | 'citrus' | 'amber',
  );
  const [selectedSummerCollection, setSelectedSummerCollection] =
    useState(false);
  const [selectedWeddingCollection, setSelectedWeddingCollection] =
    useState(false);
  const [selectedPrice, setSelectedPrice] = useState({
    from: 0,
    to: 2500,
  });

  const updateCatalog = (): void => {
    console.log({
      searchText,
      selectedAttribute,
      selectedSummerCollection,
      selectedWeddingCollection,
      selectedPrice,
    });
  };
  const pageCurrent = !Number.isNaN(Number(params.id)) ? Number(params.id) : 1;

  const filterObj: FilterPropsType = {
    productsByPrice: selectedPrice,
  };
  // if (
  //   selectedAttribute !== 'none' &&
  //   filterObj.productsByAttributeKey !== undefined
  // )
  //   filterObj.productsByAttributeKey.key = selectedAttribute;

  const toggleDrawer =
    (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpenFilterBar(isOpen);
    };

  // console.log({
  //   selectedFloralAttr,
  //   selectedWoodyAttr,
  //   selectedCitrusAttr,
  //   selectedAmberAttr,
  //   selectedSummerCollection,
  //   selectedWeddingCollection,
  // selectedPrice,
  // });

  useEffect(() => {
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
      setTitlePage('All products');
    }
  }, [location]);

  useEffect((): void => {
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
    setPageNumber(returnNumberFromPath(location.pathname));
  }, [location]);

  useEffect((): void => {
    getProducts({
      limit: 6,
      pageNumber,
      sort: {
        field: sortType ? 'price' : 'name.en-US',
        order: sortDirection ? 'asc' : 'desc',
      },
      filter:
        category !== null
          ? {
              productsByCategoryId: {
                id: category.id,
              },
            }
          : {},
      text: searchTextFromState !== null ? searchTextFromState : undefined,
    })
      .then((resp) => {
        dispatch(allProducts(resp.body));
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, [
    pageNumber,
    location,
    category,
    searchTextFromState,
    sortType,
    sortDirection,
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
      >
        <Stack sx={{ position: 'relative' }}>
          <Checkbox
            sx={{
              '& .MuiSvgIcon-root': {
                color: 'black',
              },
            }}
            icon={<TuneIcon />}
            checkedIcon={<ExpandLessIcon />}
            checked={checkedFilter}
            onChange={(event): void => {
              setCheckedFilter(event.target.checked);
            }}
          />
          <Stack
            rowGap={2}
            p={3}
            sx={{
              position: 'absolute',
              top: '50px',
              left: { xs: '0px', md: '-25px' },
              zIndex: '500',
              backgroundColor: 'white',
              border: '0.5px solid #D9D9D9',
              display: !checkedFilter ? 'none' : 'flex',
            }}
          ></Stack>
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

      <Stack direction="row" width="100%">
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
      </Stack>

      <SwipeableDrawer
        anchor={'left'}
        open={openFilterBar}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <FilterBar
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          selectedAttribute={selectedAttribute}
          setSelectedAttribute={setSelectedAttribute}
          selectedSummerCollection={selectedSummerCollection}
          setSelectedSummerCollection={setSelectedSummerCollection}
          selectedWeddingCollection={selectedWeddingCollection}
          setSelectedWeddingCollection={setSelectedWeddingCollection}
          updateCatalog={updateCatalog}
        />
      </SwipeableDrawer>

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
