import React, { useState, type ReactElement } from 'react';
import {
  Fade,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { NavLink } from 'react-router-dom';
import { type Price, type Attribute } from '@commercetools/platform-sdk';
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import PriceComponent from '../ui/Price';
import { ButtonTogglePutProduct } from '../ui/ButtonToggleOrder';

interface IProduct {
  id: string;
  keyProduct: string;
  attribute: string;
  category?: string;
  keyValue: string;
  image?: string;
  image2?: string | null;
  name: string | undefined;
  description: string;
  price: Price[] | undefined;
}

interface IProductCard {
  product: IProduct;
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
          to={`/product/${props.product.keyValue}`}
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
                {props.product.attribute}
              </Typography>
              <Tooltip title={props.product.description} placement="top">
                <Stack direction={'row'} gap={1}>
                  <HighlightAltIcon sx={{ fontSize: '20px' }} />
                  <Typography variant="body2">Description</Typography>
                </Stack>
              </Tooltip>
              <ButtonTogglePutProduct keyItem={props.product.keyProduct} />
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
                  alt={props.product.name}
                  src={props.product.image}
                />
              </Fade>
              <Fade timeout={800} in={hoverEffect}>
                <Img
                  sx={{
                    height: props.small
                      ? { xs: '250px', sm: '350px' }
                      : { xs: '220px', sm: '400px', md: '500px', xl: '500px' },
                  }}
                  alt={props.product.name}
                  src={
                    props.product.image2 !== undefined &&
                    props.product.image2 !== null
                      ? props.product.image2
                      : props.product.image
                  }
                />
              </Fade>
            </div>
            <Stack
              direction="row"
              width="100%"
              height={70}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle2">{props.product.name}</Typography>
              {props.product.price !== undefined ? (
                <PriceComponent price={props.product.price[0]} />
              ) : (
                ''
              )}
            </Stack>
          </Stack>
        </NavLink>
      </Paper>
    </>
  );
};

export default ProductCard;
