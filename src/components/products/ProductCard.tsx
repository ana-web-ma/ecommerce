import React, { useState, type ReactElement } from 'react';
import {
  ButtonBase,
  IconButton,
  Paper,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { NavLink } from 'react-router-dom';

interface IProduct {
  id: string;
  image?: string;
  image2?: string;
  name: string | undefined;
  category: string;
  price: string;
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
          to={`/catalog/${props.product.id}`}
          key={props.product.id}
        >
          <Stack alignItems="center">
            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                textAlign="left"
                width="100%"
                variant="subtitle2"
                pl={1}
                minHeight={30}
              >
                {props.product.category !== undefined
                  ? props.product.category
                  : ''}
              </Typography>
              <IconButton
                onClick={(): void => {
                  console.log('Add in bag');
                }}
              >
                <ShoppingBagIcon />
              </IconButton>
            </Stack>
            <ButtonBase
              sx={{ width: 'auto' }}
              onMouseEnter={() => {
                setHoverEffect(true);
              }}
              onMouseLeave={() => {
                setHoverEffect(false);
              }}
            >
              <Img
                sx={{
                  height: props.small
                    ? { xs: '250px', sm: '350px' }
                    : { xs: '220px', sm: '400px', md: '500px', xl: '500px' },
                }}
                alt={props.product.name}
                src={
                  hoverEffect
                    ? props.product.image2 ?? props.product.image
                    : props.product.image
                }
              ></Img>
            </ButtonBase>
            <Stack
              direction="row"
              width="100%"
              height={70}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle2">{props.product.name}</Typography>
              <Typography variant="subtitle2">{props.product.price}</Typography>
            </Stack>
          </Stack>
        </NavLink>
      </Paper>
    </>
  );
};

export default ProductCard;
