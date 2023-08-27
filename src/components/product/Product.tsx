import { Box, Collapse, Grid, Link, Typography } from '@mui/material';
import React, { useEffect, type ReactElement } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { type SwiperOptions } from 'swiper/types/swiper-options';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles.css';
import { type ProductProjection } from '@commercetools/platform-sdk';
import Image from '../ui/Image';
import { getProducts } from '../../api/calls/products/getProducts';

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  pagination: {
    clickable: true,
  },
  modules: [Pagination],
};

const Product = (): ReactElement => {
  const [expanded, setExpanded] = React.useState(false);
  const [activeVariant, setActiveVariant] = React.useState<number>(0);
  const [productData, setProductData] =
    React.useState<ProductProjection | null>(null);

  useEffect(() => {
    getProducts({
      limit: 5,
      pageNumber: 0,
      sort: {
        field: 'id',
        order: 'desc',
      },
      filter: {
        productByKey: { key: '34 Boulevard Saint Germain' },
      },
    })
      .then((resp) => {
        setProductData(resp.body.results[0]);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {}, [activeVariant]);

  const handleExpandClick = (): void => {
    setExpanded(!expanded);
  };

  const prices =
    productData?.variants[activeVariant].prices !== undefined
      ? productData?.variants[activeVariant].prices
      : undefined;

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          {productData?.variants.map(
            (variant, variantIndex) =>
              activeVariant === variantIndex && (
                <Swiper key={variant.id} className="mySwiper" {...swiperParams}>
                  {variant.images?.map((image, index) => (
                    <SwiperSlide key={image.url} virtualIndex={index}>
                      <Image
                        name={productData.name['en-US']}
                        url={image.url}
                        maxWidth="100%"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ),
          )}
        </Grid>
        <Grid item xs={6} p={2}>
          <Typography mb={2} variant="h2">
            {productData?.name['en-US']}
          </Typography>
          <Collapse in={expanded} timeout="auto" collapsedSize="50px">
            {productData?.description != null &&
              productData.description['en-US']}
          </Collapse>
          <Link onClick={handleExpandClick}>Read more</Link>
          <Typography mt={2} mb={2} variant="subtitle2">
            {`${
              Number(prices !== undefined ? prices[0].value.centAmount : '') /
              100
            } €`}
          </Typography>
          <Typography variant="body2">Select a size:</Typography>
          <Grid mt={1} columnSpacing={1} container>
            {productData?.variants.map((e, i) => (
              <Grid
                item
                xs={3}
                key={e.id}
                sx={{
                  cursor: 'pointer',
                  img: {
                    transition: '0.3s',
                    border:
                      activeVariant === i
                        ? '1px solid #00000080'
                        : '1px solid transparent',
                  },
                  ':hover': {
                    img: {
                      transition: '0.3s',
                      border: '1px solid #D9D9D9',
                    },
                  },
                }}
              >
                <Box>
                  <div
                    onClick={() => {
                      setActiveVariant(i);
                    }}
                  >
                    <Image
                      name={productData.name['en-US']}
                      url={
                        e.images?.[0].url !== undefined ? e.images?.[0].url : ''
                      }
                      maxWidth="100%"
                    />
                    <Typography variant="body2" align="center">
                      {e.key?.replace(productData.name['en-US'], '')}
                    </Typography>
                  </div>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Product;
