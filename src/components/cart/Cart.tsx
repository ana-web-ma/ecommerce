import React, { useEffect, type ReactElement } from 'react';
import { Box } from '@mui/material';
import { type Cart } from '@commercetools/platform-sdk';
import CartTable from './CartTable';
import CartFooter from './CartFooter';
import CartTableToolbar from './CartTableToolbar';

export default function CartComponent(): ReactElement {
  const [cartData, setCartData] = React.useState<Cart | null>(null);

  const updateCart = (): void => {};

  useEffect((): void => {
    setCartData({
      // type: 'Cart',
      id: 'da56deaf-fd9d-42b6-8e60-5ae0cccc6356',
      version: 1,
      // versionModifiedAt: '2023-09-08T17:14:00.666Z',
      // lastMessageSequenceNumber: 1,
      createdAt: '2023-09-08T17:14:00.666Z',
      lastModifiedAt: '2023-09-08T17:14:00.666Z',
      lastModifiedBy: {
        clientId: 'AnS0UyYLnB67JnE2Q2FfiyXA',
        // isPlatformClient: false,
        anonymousId: '7e02f9e7-b9e4-452d-ab60-7f1f23bc29c2',
      },
      createdBy: {
        clientId: 'AnS0UyYLnB67JnE2Q2FfiyXA',
        // isPlatformClient: false,
        anonymousId: '7e02f9e7-b9e4-452d-ab60-7f1f23bc29c2',
      },
      anonymousId: '7e02f9e7-b9e4-452d-ab60-7f1f23bc29c2',
      lineItems: [
        {
          id: '1e83483c-a682-4382-8a89-6b795e10b3bf',
          productId: '0bb3fd68-5ef0-484a-8f27-b4be13644e51',
          productKey: '34-boulevard-saint-germain',
          name: {
            'en-US': '34 Boulevard Saint Germain',
          },
          productType: {
            typeId: 'product-type',
            id: '542759a5-a331-4817-932b-3a4e4312b8f2',
            // version: 9,
          },
          productSlug: {
            'en-US': '34-boulevard-saint-germain',
          },
          variant: {
            id: 2,
            key: 'Large 34 Boulevard Saint Germain',
            prices: [
              {
                id: '1abf6e77-9bf9-4a38-b813-baf82f766265',
                value: {
                  type: 'centPrecision',
                  currencyCode: 'EUR',
                  centAmount: 13200,
                  fractionDigits: 2,
                },
              },
            ],
            images: [
              {
                url: 'https://c43d6e8e1587d36eac6f-07e75df687bdbd1d1c053ce7b38c2aa6.ssl.cf3.rackcdn.com/diptyque-34-boulevar-qwjXRsVH.jpg',
                label: '34 Boulevard Saint Germain Medium ',
                dimensions: {
                  w: 2292,
                  h: 3055,
                },
              },
              {
                url: 'https://c43d6e8e1587d36eac6f-07e75df687bdbd1d1c053ce7b38c2aa6.ssl.cf3.rackcdn.com/diptyque-34-boulevar-_L8IWx9c.jpg',
                label: '34 Boulevard Saint Germain Medium ',
                dimensions: {
                  w: 2292,
                  h: 3055,
                },
              },
            ],
            attributes: [
              {
                name: 'olfactory',
                value: {
                  key: 'floral',
                  label: 'floral',
                },
              },
            ],
            assets: [],
          },
          price: {
            id: 'aabf6e77-9bf9-4a38-b813-baf82f766265',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 9200,
              fractionDigits: 2,
            },
          },
          quantity: 1,
          discountedPricePerQuantity: [],
          perMethodTaxRate: [],
          addedAt: '2023-09-08T17:14:00.661Z',
          lastModifiedAt: '2023-09-08T17:14:00.661Z',
          state: [
            {
              quantity: 1,
              state: {
                typeId: 'state',
                id: '22f4cc35-72ec-4b22-9c3b-1ec724cab42b',
              },
            },
          ],
          priceMode: 'Platform',
          lineItemMode: 'Standard',
          totalPrice: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 9200,
            fractionDigits: 2,
          },
          taxedPricePortions: [],
        },
        {
          id: '0e83483c-a682-4382-8a89-6b795e10b3bf',
          productId: '0bb3fd68-5ef0-484a-8f27-b4be13644e51',
          productKey: '34-boulevard-saint-germain',
          name: {
            'en-US': '34 Boulevard Saint Germain',
          },
          productType: {
            typeId: 'product-type',
            id: '542759a5-a331-4817-932b-3a4e4312b8f2',
            // version: 9,
          },
          productSlug: {
            'en-US': '34-boulevard-saint-germain',
          },
          variant: {
            id: 1,
            key: 'Medium 34 Boulevard Saint Germain',
            prices: [
              {
                id: 'aabf6e77-9bf9-4a38-b813-baf82f766265',
                value: {
                  type: 'centPrecision',
                  currencyCode: 'EUR',
                  centAmount: 9200,
                  fractionDigits: 2,
                },
              },
            ],
            images: [
              {
                url: 'https://c43d6e8e1587d36eac6f-07e75df687bdbd1d1c053ce7b38c2aa6.ssl.cf3.rackcdn.com/diptyque-34-boulevar-qwjXRsVH.jpg',
                label: '34 Boulevard Saint Germain Medium ',
                dimensions: {
                  w: 2292,
                  h: 3055,
                },
              },
              {
                url: 'https://c43d6e8e1587d36eac6f-07e75df687bdbd1d1c053ce7b38c2aa6.ssl.cf3.rackcdn.com/diptyque-34-boulevar-_L8IWx9c.jpg',
                label: '34 Boulevard Saint Germain Medium ',
                dimensions: {
                  w: 2292,
                  h: 3055,
                },
              },
            ],
            attributes: [
              {
                name: 'olfactory',
                value: {
                  key: 'floral',
                  label: 'floral',
                },
              },
            ],
            assets: [],
          },
          price: {
            id: 'aabf6e77-9bf9-4a38-b813-baf82f766265',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 9200,
              fractionDigits: 2,
            },
          },
          quantity: 10,
          discountedPricePerQuantity: [],
          perMethodTaxRate: [],
          addedAt: '2023-09-08T17:14:00.661Z',
          lastModifiedAt: '2023-09-08T17:14:00.661Z',
          state: [
            {
              quantity: 1,
              state: {
                typeId: 'state',
                id: '22f4cc35-72ec-4b22-9c3b-1ec724cab42b',
              },
            },
          ],
          priceMode: 'Platform',
          lineItemMode: 'Standard',
          totalPrice: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 9200,
            fractionDigits: 2,
          },
          taxedPricePortions: [],
        },
      ],
      cartState: 'Active',
      totalPrice: {
        type: 'centPrecision',
        currencyCode: 'EUR',
        centAmount: 9200,
        fractionDigits: 2,
      },
      shippingMode: 'Single',
      shipping: [],
      customLineItems: [],
      discountCodes: [],
      directDiscounts: [],
      inventoryMode: 'None',
      taxMode: 'Platform',
      taxRoundingMode: 'HalfEven',
      taxCalculationMode: 'LineItemLevel',
      deleteDaysAfterLastModification: 90,
      refusedGifts: [],
      origin: 'Customer',
      itemShippingAddresses: [],
      totalLineItemQuantity: 1,
    });
  }, []);
  // useEffect((): void => {
  //   updateCart();
  // }, [cartData]);
  return (
    <>
      <Box>
        <CartTableToolbar />
        <CartTable lineItems={cartData?.lineItems} />
        <CartFooter />
      </Box>
    </>
  );
}
