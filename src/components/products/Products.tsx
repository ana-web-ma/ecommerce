import React, { useState, type ReactElement, useEffect } from 'react';
import {
  Grid,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { type ProductProjection } from '@commercetools/platform-sdk';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { getProducts } from '../../api/calls/products/getProducts';

const getPageQty = (total: number): number => Math.ceil(total / 6);

const Products = (): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [query, setQuery] = useState('react');
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const [page, setPage] = useState(Number(location.search?.split('=')[1]) || 1);
  const [total, setTotal] = useState(1);
  const [pageQty, setPageQty] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    setPage(Number(location.search?.split('=')[1]) || 1);
    getProducts({
      limit: 6,
      pageNumber: page,
      sort: {
        field: 'id',
        order: 'desc',
      },
    })
      .then((resp) => {
        setProducts(resp.body.results);
        if (resp.body.total != null) {
          setTotal(resp.body.total);
          setPageQty(getPageQty(resp.body.total));
        }
      })
      .catch(console.log);
  }, [query, page, location]);

  useEffect(() => {
    if (page > pageQty && pageQty !== 0) navigate('/404');
  }, [page, pageQty, location]);

  return (
    <>
      <Stack
        mt={3}
        direction="row"
        gap={1}
        width="100%"
        justifyContent="start"
        alignItems="end"
      >
        <Typography variant="h2">All products</Typography>
        <Typography pb={0.7} variant="body1">
          ({total} Products)
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between"></Stack>

      <Grid mt={2} container justifyContent="center" spacing={1}>
        {products.map((card, index) => {
          const cardData = {
            id: card.id,
            image:
              card.masterVariant.images !== undefined
                ? card.masterVariant.images[0].url
                : '',
            image2:
              card.masterVariant.images !== undefined
                ? card.masterVariant.images[1].url
                : '',
            name: card.key,
            category: 'Unique',
            price: '23$',
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
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            to={`/catalog/?page=${item.page}`}
            {...item}
          />
        )}
      />
    </>
  );
};

export default Products;
