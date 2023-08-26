import React, { useState, type ReactElement } from 'react';
import {
  ButtonBase,
  Fade,
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
  image2?: string | null;
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
            <div
              style={{ position: 'relative', width: 'auto' }}
              onMouseEnter={() => {
                setHoverEffect(true);
              }}
              onMouseLeave={() => {
                setHoverEffect(false);
              }}
            >
              <Fade
                style={{ position: 'absolute' }}
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
              <Fade
                style={{ position: 'relative' }}
                timeout={800}
                in={hoverEffect}
              >
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
              <Typography variant="subtitle2">{props.product.price}</Typography>
            </Stack>
          </Stack>
        </NavLink>
      </Paper>
    </>
  );
};

export default ProductCard;
