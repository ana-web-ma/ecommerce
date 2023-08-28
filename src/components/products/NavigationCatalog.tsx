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
        path: 'collections/summer',
      },
      {
        title: 'Wedding collection',
        path: 'collections/wedding',
      },
    ];
  } else if (props.category === 'wedding collection') {
    tempArr = [
      {
        title: 'Summer collection',
        path: 'collections/summer',
      },
    ];
  } else if (props.category === 'summer collection') {
    tempArr = [
      {
        title: 'Wedding collection',
        path: 'collections/wedding',
      },
    ];
  } else if (props.category === 'fragrances') {
    tempArr = [
      {
        title: 'Candles',
        path: 'fragrances/candles',
      },
      {
        title: 'Perfume',
        path: 'fragrances/perfume',
      },
      {
        title: 'Diffusers',
        path: 'fragrances/diffusers',
      },
    ];
  } else if (props.category === 'candles') {
    tempArr = [
      {
        title: 'Perfume',
        path: 'fragrances/perfume',
      },
      {
        title: 'Diffusers',
        path: 'fragrances/diffusers',
      },
    ];
  } else if (props.category === 'perfume') {
    tempArr = [
      {
        title: 'Candles',
        path: 'fragrances/candles',
      },
      {
        title: 'Diffusers',
        path: 'fragrances/diffusers',
      },
    ];
  } else if (props.category === 'diffusers') {
    tempArr = [
      {
        title: 'Candles',
        path: 'fragrances/candles',
      },
      {
        title: 'Perfume',
        path: 'fragrances/perfume',
      },
    ];
  } else if (props.category === 'home decor') {
    tempArr = [
      {
        title: 'Accessories',
        path: 'home-decor/accessories',
      },
      {
        title: 'Candle holders',
        path: 'home-decor/candle-holders',
      },
      {
        title: 'Tableware',
        path: 'home-decor/tableware',
      },
      {
        title: 'Vases',
        path: 'home-decor/vases',
      },
    ];
  } else if (props.category === 'accessories') {
    tempArr = [
      {
        title: 'Candle holders',
        path: 'home-decor/candle-holders',
      },
      {
        title: 'Tableware',
        path: 'home-decor/tableware',
      },
      {
        title: 'Vases',
        path: 'home-decor/vases',
      },
    ];
  } else if (props.category === 'candle holders') {
    tempArr = [
      {
        title: 'Accessories',
        path: 'home-decor/accessories',
      },
      {
        title: 'Tableware',
        path: 'home-decor/tableware',
      },
      {
        title: 'Vases',
        path: 'home-decor/vases',
      },
    ];
  } else if (props.category === 'tableware') {
    tempArr = [
      {
        title: 'Accessories',
        path: 'home-decor/accessories',
      },
      {
        title: 'Candle holders',
        path: 'home-decor/candle-holders',
      },
      {
        title: 'Vases',
        path: 'home-decor/vases',
      },
    ];
  } else if (props.category === 'vases') {
    tempArr = [
      {
        title: 'Accessories',
        path: 'home-decor/accessories',
      },
      {
        title: 'Candle holders',
        path: 'home-decor/candle-holders',
      },
      {
        title: 'Tableware',
        path: 'home-decor/tableware',
      },
    ];
  }
  return (
    <>
      <Stack direction="row" height="27px" gap={2} justifyContent="center">
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
