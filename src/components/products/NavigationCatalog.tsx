import React, { type ReactElement } from 'react';
import { Stack, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

interface INavLink {
  title: string;
  path: string;
}

const NavigationCatalog = (props: {
  category: string | undefined;
}): ReactElement => {
  let tempArr: INavLink[] = [];
  if (props.category === 'collections') {
    tempArr = [
      {
        title: 'Summer collection',
        path: 'catalog/collections/summer',
      },
      {
        title: 'Wedding collection',
        path: 'catalog/collections/wedding',
      },
    ];
  } else if (props.category === 'fragrances') {
    tempArr = [
      {
        title: 'Candles',
        path: 'catalog/fragrances/candles',
      },
      {
        title: 'Perfume',
        path: 'catalog/fragrances/perfume',
      },
      {
        title: 'Diffusers',
        path: 'catalog/fragrances/diffusers',
      },
    ];
  } else if (props.category === 'home decor') {
    tempArr = [
      {
        title: 'Accessories',
        path: 'catalog/home-decor/accessories',
      },
      {
        title: 'Candle holders',
        path: 'catalog/home-decor/candle-holders',
      },
      {
        title: 'Tableware',
        path: 'catalog/home-decor/tableware',
      },
      {
        title: 'Vases',
        path: 'catalog/home-decor/vases',
      },
    ];
  }
  return (
    <>
      <Stack direction="row" gap={2} justifyContent="center">
        {tempArr.map((item, ind) => {
          return (
            <MuiLink
              sx={{ fontSize: { xs: '15px', sm: '18px' } }}
              key={`nav-${ind}`}
              component={Link}
              to={item.path}
            >
              {item.title}
            </MuiLink>
          );
        })}
      </Stack>
    </>
  );
};

export default NavigationCatalog;
