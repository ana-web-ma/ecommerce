import React, { useState, type ReactElement, useEffect } from 'react';
import {
  Button,
  Fade,
  Paper,
  Stack,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { type ProductProjection } from '@commercetools/platform-sdk';
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import PriceComponent from '../ui/Price/Price';
import { ButtonAddToBag } from '../ui/ButtonAddToBag';
import { useSortDirection, useSortType } from '../../helpers/hooks/Hooks';

interface IProductCard {
  product: ProductProjection;
  small: boolean;
}

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  width: 'auto',
  objectFit: 'contain',
  transition: 'all .6s ease-in-out',
});

const ProductCard = (props: IProductCard): ReactElement => {
  const [hoverEffect, setHoverEffect] = useState(false);
  const [activeVariant, setActiveVariant] = React.useState<number>(0);
  const sortDirection = useSortDirection();
  const sortType = useSortType();
  const variants = [...props.product.variants];
  variants.push(props.product.masterVariant);
  variants.sort(
    (a, b) =>
      Number(a?.prices?.[0]?.value.centAmount) -
      Number(b?.prices?.[0]?.value.centAmount),
  );
  useEffect(() => {
    setActiveVariant(0);
    if (!sortDirection && sortType) {
      setActiveVariant(variants.length - 1);
    }
  }, [props]);

  const { prices } =
    activeVariant <= variants.length - 1
      ? variants[activeVariant]
      : variants[0];
  const { attributes } =
    activeVariant <= variants.length - 1
      ? variants[activeVariant]
      : variants[0];
  const { images } =
    activeVariant <= variants.length - 1
      ? variants[activeVariant]
      : variants[0];
  const { key } =
    activeVariant <= variants.length - 1
      ? variants[activeVariant]
      : variants[0];

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
          paddingBottom: '3px',
          '&:hover': {
            boxShadow: '0px 0px 5px',
          },
        }}
      >
        <NavLink
          style={{ textDecoration: 'none', color: 'inherit' }}
          to={`/product/${
            props.product.key !== undefined ? props.product.key : ''
          }`}
        >
          <Stack alignItems="center" sx={{ position: 'relative' }}>
            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                textAlign="left"
                variant="subtitle2"
                pl={1}
                minHeight={30}
              >
                {attributes !== undefined && attributes.length > 0
                  ? attributes[0].value.key
                  : ''}
              </Typography>
              <Tooltip
                title={
                  props.product.description !== undefined
                    ? props.product.description['en-US']
                    : ''
                }
                placement="top"
              >
                <Stack direction={'row'} gap={1}>
                  <HighlightAltIcon sx={{ fontSize: '20px' }} />
                  <Typography variant="body2">Description</Typography>
                </Stack>
              </Tooltip>
              {
                <ButtonAddToBag
                  keyItem={key !== undefined ? key : ''}
                  productId={props.product.id}
                  variantId={
                    activeVariant <= variants.length - 1 &&
                    variants[activeVariant].id !== undefined
                      ? variants[activeVariant].id
                      : 1
                  }
                />
              }
            </Stack>
            <div
              onMouseEnter={() => {
                setHoverEffect(true);
              }}
              onMouseLeave={() => {
                setHoverEffect(false);
              }}
            >
              <Fade
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
                timeout={600}
                in={!hoverEffect}
              >
                <Img
                  sx={{
                    height: props.small
                      ? { xs: '250px', sm: '350px' }
                      : { xs: '220px', sm: '400px', md: '500px', xl: '500px' },
                  }}
                  alt={props.product.name['en-US']}
                  src={images !== undefined ? images[0].url : ''}
                />
              </Fade>
              <Fade timeout={800} in={hoverEffect}>
                <Img
                  sx={{
                    height: props.small
                      ? { xs: '250px', sm: '350px' }
                      : { xs: '220px', sm: '400px', md: '500px', xl: '500px' },
                  }}
                  alt={props.product.name['en-US']}
                  src={
                    // eslint-disable-next-line no-nested-ternary
                    images?.[1] != null
                      ? images[1].url
                      : images !== undefined
                      ? images[0].url
                      : ''
                  }
                />
              </Fade>
            </div>
            <Stack
              direction="row"
              width="100%"
              height={40}
              justifyContent="space-between"
              alignItems="center"
            >
              {variants.length > 1
                ? variants.map((variant, index) => {
                    return (
                      <Button
                        key={`variant-button-${index}`}
                        variant="text"
                        disabled={activeVariant === index}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveVariant(index);
                        }}
                        sx={{
                          fontSize: props.small ? '11px' : '15px',
                          padding: '5px 2px',
                          minWidth: '50px',
                        }}
                      >
                        {variant.key?.replace(props.product.name['en-US'], '')}
                      </Button>
                    );
                  })
                : ''}
            </Stack>
            <Stack
              direction="row"
              width="100%"
              height={70}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle2">
                {props.product.name['en-US']}
              </Typography>
              {prices !== undefined ? <PriceComponent price={prices[0]} /> : ''}
            </Stack>
          </Stack>
        </NavLink>
      </Paper>
    </>
  );
};

export default ProductCard;
