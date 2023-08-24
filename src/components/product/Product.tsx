import {
  Box,
  Button,
  Collapse,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import React, { type ReactElement } from 'react';
import { getProducts } from '../../api/calls/products/getProducts';
import DemoComponent from '../ui/demo/DemoComponent';
import Image from '../ui/Image';

const productData = {
  id: 'd4384777-a619-4507-91b0-2fd113657c1f',
  version: 38,
  productType: {
    typeId: 'product-type',
    id: '542759a5-a331-4817-932b-3a4e4312b8f2',
  },
  name: {
    'en-US': 'FEU DE BOIS',
  },
  description: {
    'en-US':
      'A sophisticated combination of woody essences, warm as a fire in the fireplace. This scented candle with five wicks is a hymn to wintertime.\nIn its elegant terracotta vessel - designed and hand-crafted at the Virebent factory - it evokes the fragrance of logs, crackling as they are slowly consumed in flame.',
  },
  categories: [
    {
      typeId: 'category',
      id: '3af6470b-59b5-4d4e-9a7b-81133a440499',
    },
    {
      typeId: 'category',
      id: '3a86817e-dda4-42c5-9037-90a13b0f135d',
    },
    {
      typeId: 'category',
      id: '8c4a5815-b067-4f86-b565-9409d38672d3',
    },
  ],
  categoryOrderHints: {},
  slug: {
    'en-US': 'feu-de-bois',
  },
  metaTitle: {
    'en-US': '',
  },
  metaDescription: {
    'en-US': '',
  },
  variants: [
    {
      attributes: [],
      assets: [],
      images: [
        {
          url: 'https://c43d6e8e1587d36eac6f-07e75df687bdbd1d1c053ce7b38c2aa6.ssl.cf3.rackcdn.com/diptyque-feu-de-bois-9A8I_mnu.jpg',
          dimensions: {
            w: 2292,
            h: 3055,
          },
        },
        {
          url: 'https://c43d6e8e1587d36eac6f-07e75df687bdbd1d1c053ce7b38c2aa6.ssl.cf3.rackcdn.com/diptyque-feu-de-bois-AiDAxLuI.jpg',
          dimensions: {
            w: 2292,
            h: 3055,
          },
        },
      ],
      prices: [],
      key: 'Classic FEU DE BOIS',
      id: 2,
    },
    {
      attributes: [],
      assets: [],
      images: [
        {
          url: 'https://c43d6e8e1587d36eac6f-07e75df687bdbd1d1c053ce7b38c2aa6.ssl.cf3.rackcdn.com/diptyque-feu-de-bois-BC41aEHv.jpg',
          dimensions: {
            w: 2292,
            h: 3055,
          },
        },
        {
          url: 'https://c43d6e8e1587d36eac6f-07e75df687bdbd1d1c053ce7b38c2aa6.ssl.cf3.rackcdn.com/diptyque-feu-de-bois-xKOMliu0.jpg',
          dimensions: {
            w: 2292,
            h: 3055,
          },
        },
      ],
      prices: [],
      key: 'Medium FEU DE BOIS',
      id: 3,
    },
    {
      attributes: [],
      assets: [],
      images: [
        {
          url: 'https://c43d6e8e1587d36eac6f-07e75df687bdbd1d1c053ce7b38c2aa6.ssl.cf3.rackcdn.com/diptyque-feu-de-bois-DWWXlr64.jpg',
          dimensions: {
            w: 2292,
            h: 3055,
          },
        },
        {
          url: 'https://c43d6e8e1587d36eac6f-07e75df687bdbd1d1c053ce7b38c2aa6.ssl.cf3.rackcdn.com/diptyque-feu-de-bois-DSDXgRbN.jpg',
          dimensions: {
            w: 2292,
            h: 3055,
          },
        },
      ],
      prices: [],
      key: 'Large FEU DE BOIS',
      id: 4,
    },
    {
      attributes: [],
      assets: [],
      images: [
        {
          url: 'https://c43d6e8e1587d36eac6f-07e75df687bdbd1d1c053ce7b38c2aa6.ssl.cf3.rackcdn.com/diptyque-feu-de-bois-gXCrq0QO.jpg',
          dimensions: {
            w: 2292,
            h: 3055,
          },
        },
        {
          url: 'https://c43d6e8e1587d36eac6f-07e75df687bdbd1d1c053ce7b38c2aa6.ssl.cf3.rackcdn.com/diptyque-feu-de-bois-CIzaGnvH.jpg',
          dimensions: {
            w: 2292,
            h: 3055,
          },
        },
      ],
      prices: [],
      key: 'Extra large FEU DE BOIS',
      id: 5,
    },
  ],
  masterVariant: {
    attributes: [],
    assets: [],
    images: [
      {
        url: 'https://c43d6e8e1587d36eac6f-07e75df687bdbd1d1c053ce7b38c2aa6.ssl.cf3.rackcdn.com/diptyque-feu-de-bois-_w1mUkKj.jpg',
        dimensions: {
          w: 2292,
          h: 3055,
        },
      },
      {
        url: 'https://c43d6e8e1587d36eac6f-07e75df687bdbd1d1c053ce7b38c2aa6.ssl.cf3.rackcdn.com/diptyque-feu-de-bois-o4yTAMek.jpg',
        dimensions: {
          w: 2292,
          h: 3055,
        },
      },
    ],
    prices: [],
    key: 'Small FEU DE BOIS',
    id: 1,
  },
  searchKeywords: {},
  hasStagedChanges: false,
  published: true,
  key: 'FEU DE BOIS',
  priceMode: 'Embedded',
  createdAt: '2023-08-22T01:47:37.374Z',
  lastModifiedAt: '2023-08-23T03:10:17.832Z',
};
const productRequestData = getProducts({
  limit: 5,
  pageNumber: 0,
  sort: {
    field: 'id',
    order: 'desc',
  },
  filter: {
    // categoriesById: { id: '3af6470b-59b5-4d4e-9a7b-81133a440499' },
    productByKey: { key: 'FEU DE BOIS' },
  },
})
  .then((resp) => {
    console.log('resp', resp.body.results);
  })
  .catch(console.log);

console.log('productRequestData', productRequestData);

function srcset(
  image: string,
  size: number,
  rows = 1,
  cols = 1,
): {
  src: string;
  srcSet: string;
} {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const Product = (): ReactElement => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = (): void => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Image
            name={productData.name['en-US']}
            url={productData.masterVariant.images[0].url}
            maxWidth="100%"
          />
        </Grid>
        <Grid item xs={6} p={2}>
          <Typography variant="h2">{productData.name['en-US']}</Typography>
          <Collapse in={expanded} timeout="auto" collapsedSize="70px">
            {productData.description['en-US']}
          </Collapse>
          {/* <Button sx={{ width: 'fit-content' }}></Button> */}
          <Link onClick={handleExpandClick}>Read more</Link>
          <Typography variant="subtitle2">123€</Typography>
          <Typography variant="body2">Select a size:</Typography>
          <Grid columnSpacing={1} container>
            {productData.variants.map((e) => (
              <Grid
                item
                xs={3}
                key={e.id}
                sx={{
                  cursor: 'pointer',
                  img: {
                    transition: '0.3s',
                    border: '1px solid transparent',
                  },
                  ':hover': {
                    img: {
                      transition: '0.3s',
                      border: '1px solid #D9D9D9',
                    },
                  },
                }}
              >
                <Image
                  name={productData.name['en-US']}
                  url={e.images[0].url}
                  maxWidth="100%"
                />
                <Typography variant="body2" align="center">
                  {e.key.replace(productData.name['en-US'], '')}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Box>xs=4</Box>
        </Grid>
        <Grid item xs={6}>
          <Box>xs=8</Box>
        </Grid>
      </Grid>
      <DemoComponent />
    </>
  );
};

export default Product;
