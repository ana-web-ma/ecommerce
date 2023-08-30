import {
  Box,
  Collapse,
  Grid,
  Link,
  Modal,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, type ReactElement } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Zoom } from 'swiper/modules';
import { type SwiperOptions } from 'swiper/types/swiper-options';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles.css';
import {
  type Product as ProductType,
  type ProductProjection,
} from '@commercetools/platform-sdk';
import { useNavigate, useParams } from 'react-router-dom';
import Image from '../ui/Image';
import { getProducts } from '../../api/calls/products/getProducts';
import PriceComponent from '../ui/Price';
import { getProductByKey } from '../../api/calls/products/getProductByKey';

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  pagination: {
    clickable: true,
  },
  modules: [Pagination],
};

const zoomedSwiperParams: SwiperOptions = {
  slidesPerView: 1,
  pagination: {
    clickable: true,
  },
  modules: [Zoom, Pagination],
  zoom: {
    maxRatio: 5,
    minRatio: 5,
  },
};

const Product = (): ReactElement => {
  const navigation = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const [activeVariant, setActiveVariant] = React.useState<number>(0);
  const [productData, setProductData] = React.useState<ProductType | null>(
    null,
  );
  const [openModal, setOpenModal] = React.useState(false);

  const params = useParams();
  useEffect(() => {
    if (params.key !== undefined) {
      getProductByKey({ key: params.key })
        .then((resp) => {
          console.log('Vit', resp.body);
          setProductData(resp.body);
        })
        .catch((err) => {
          navigation('/404');
          throw new Error(err);
        });
    }
  }, [params]);

  useEffect(() => {
    getProducts({
      limit: 5,
      pageNumber: 1,
      sort: {
        field: 'id',
        order: 'desc',
      },
      filter: {
        productByKey: { key: 'roses' },
      },
    })
      .then((resp) => {
        console.log('Ana', resp.body.results[0]);
        // setProductData(resp.body.results[0]);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {}, [activeVariant]);

  const handleOpenModal = (): void => {
    setOpenModal(true);
  };
  const handleCloseModal = (): void => {
    setOpenModal(false);
  };
  const handleExpandClick = (): void => {
    setExpanded(!expanded);
  };

  const prices =
    productData?.masterData.current.variants.length !== 0 &&
    productData?.masterData.current.variants[activeVariant].prices !== undefined
      ? productData?.masterData.current.variants[activeVariant].prices
      : null;

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75vh',
    boxShadow: 24,
    p: 0,
    '&:focus': {
      outline: 'none',
    },
  };

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={4}>
          {productData?.masterData.current.variants.map(
            (variant, variantIndex) =>
              activeVariant === variantIndex && (
                <div key={variant.id}>
                  <Swiper className="mySwiper" {...swiperParams}>
                    {variant.images?.map((image, index) => (
                      <SwiperSlide
                        onClick={handleOpenModal}
                        key={image.url}
                        virtualIndex={index}
                      >
                        <Image
                          name={productData.masterData.current.name['en-US']}
                          url={image.url}
                          maxWidth="100%"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                  >
                    <Paper variant="outlined" sx={style}>
                      <Swiper className="mySwiper" {...zoomedSwiperParams}>
                        {variant.images?.map((image, index) => (
                          <SwiperSlide key={image.url} virtualIndex={index}>
                            <div className="swiper-zoom-container">
                              <Image
                                name={
                                  productData.masterData.current.name['en-US']
                                }
                                url={image.url}
                                maxWidth="100%"
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>{' '}
                    </Paper>
                  </Modal>
                </div>
              ),
          )}
        </Grid>
        <Grid item xs={8} pl={3} pr={5}>
          <Typography mb={2} variant="h2">
            {productData?.masterData.current.name['en-US']}
          </Typography>
          <Collapse in={expanded} timeout="auto" collapsedSize="20px">
            {productData?.masterData.current.description != null &&
              productData.masterData.current.description['en-US']}
          </Collapse>
          <Link onClick={handleExpandClick} mb={4} display="block">
            ...Read more
          </Link>
          {prices != null ? <PriceComponent price={prices[0]} /> : null}
          <Typography variant="body2">Select a size:</Typography>
          <Grid mt={1} columnSpacing={1} container>
            {productData?.masterData.current.variants.map((e, i) => (
              <Grid
                item
                xs={2}
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
                      name={productData.masterData.current.name['en-US']}
                      url={
                        e.images?.[0].url !== undefined ? e.images?.[0].url : ''
                      }
                      maxWidth="100%"
                    />
                    <Typography variant="body2" align="center">
                      {e.key?.replace(
                        productData.masterData.current.name['en-US'],
                        '',
                      )}
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
