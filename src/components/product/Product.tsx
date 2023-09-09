import {
  Box,
  Collapse,
  Grid,
  IconButton,
  Link,
  Modal,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, type ReactElement } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type TypeSwiper from 'swiper/Swiper';
import { Controller, Pagination, Zoom } from 'swiper/modules';
import { type SwiperOptions } from 'swiper/types/swiper-options';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles.css';
import { type Product as ProductType } from '@commercetools/platform-sdk';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate, useParams } from 'react-router-dom';
import Image from '../ui/Image';
import PriceComponent from '../ui/Price';
import { getProductByKey } from '../../api/calls/products/getProductByKey';
import { ButtonTogglePutProduct } from '../ui/ButtonToggleOrder';

const Product = (): ReactElement => {
  const navigation = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const [activeVariant, setActiveVariant] = React.useState<number>(0);
  const [productData, setProductData] = React.useState<ProductType | null>(
    null,
  );
  const [openModal, setOpenModal] = React.useState(false);
  const [firstSwiper, setFirstSwiper] = React.useState<TypeSwiper | null>(null);
  const [secondSwiper, setSecondSwiper] = React.useState<TypeSwiper | null>(
    null,
  );

  const swiperParams: SwiperOptions = {
    slidesPerView: 1,
    pagination: {
      clickable: true,
    },
    modules: [Pagination, Controller],
    controller: { control: secondSwiper },
  };

  const zoomedSwiperParams: SwiperOptions = {
    slidesPerView: 1,
    pagination: {
      clickable: true,
    },
    modules: [Zoom, Pagination, Controller],
    zoom: {
      maxRatio: 5,
      minRatio: 5,
    },
    controller: { control: firstSwiper },
  };

  const params = useParams();
  useEffect(() => {
    if (params.key !== undefined) {
      getProductByKey({ key: params.key })
        .then((resp) => {
          resp.body.masterData.current.variants.unshift(
            resp.body.masterData.current.masterVariant,
          );
          setProductData(resp.body);
        })
        .catch((err) => {
          navigation('/404');
          throw new Error(err);
        });
    }
  }, [params]);

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
    productData?.masterData.current.variants[activeVariant].prices !== undefined
      ? productData?.masterData.current.variants[activeVariant].prices
      : undefined;

  const keyProduct =
    productData?.masterData.current.variants[activeVariant].key !== undefined
      ? productData?.masterData.current.variants[activeVariant].key
      : undefined;

  const paperStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70vh',
    p: 0,
    '&:focus': {
      outline: 'none',
    },
  };

  return (
    <>
      <Grid
        sx={{
          flexDirection: { xs: 'column-reverse', sm: 'row' },
        }}
        container
        spacing={0}
      >
        <Grid
          item
          xs={12}
          sm={5}
          md={6}
          sx={{
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            paddingLeft: { md: '15%' },
            paddingRight: { md: '5%' },
          }}
        >
          {productData?.masterData.current.variants.map(
            (variant, variantIndex) =>
              activeVariant === variantIndex && (
                <div key={variant.id}>
                  <Swiper
                    onSwiper={setFirstSwiper}
                    className="mySwiper"
                    {...swiperParams}
                  >
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
                    <Paper variant="outlined" sx={paperStyle}>
                      <IconButton
                        onClick={handleCloseModal}
                        aria-label="close"
                        color="secondary"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: {
                            xs: '50%',
                          },
                          transform: {
                            xs: 'translate(50%, 0)',
                          },
                          zIndex: 10,
                        }}
                      >
                        <CloseRoundedIcon />
                      </IconButton>
                      <Swiper
                        onSwiper={setSecondSwiper}
                        className="mySwiper"
                        {...zoomedSwiperParams}
                      >
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
        <Grid item xs={12} sm={7} md={6} pl={3} pr={5}>
          <Typography
            mb={2}
            variant="h2"
            sx={{ fontSize: { xs: 36, sm: 36, md: 48, lg: 52, xl: 60 } }}
          >
            {productData?.masterData.current.name['en-US']}
          </Typography>
          <Typography mb={2} variant="subtitle2">
            {
              productData?.masterData.current.masterVariant.attributes?.[0]
                ?.value.label
            }
          </Typography>
          <Collapse in={expanded} timeout="auto" collapsedSize="20px">
            {productData?.masterData.current.description != null &&
              productData.masterData.current.description['en-US']}
          </Collapse>
          <Link onClick={handleExpandClick} mb={4} display="block">
            ...Read more
          </Link>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            width={{ xs: '90%', sm: '70%' }}
          >
            {prices != null ? <PriceComponent price={prices[0]} /> : null}

            {keyProduct !== undefined ? (
              <ButtonTogglePutProduct keyItem={keyProduct} />
            ) : null}
          </Stack>
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
