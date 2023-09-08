import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  // ClientBuilder,
  type HttpMiddlewareOptions,
  // type AnonymousAuthMiddlewareOptions,
  ClientBuilder,
  Client,
  type AnonymousAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { type ApiRoot } from '@commercetools/platform-sdk';
import { type ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { tokenCache } from '../tokenCache';

export const apiAnonymousFlowRoot = (): ByProjectKeyRequestBuilder => {
  const projectKey = 'eperfume';
  const scopes = [
    'view_categories:eperfume manage_my_profile:eperfume manage_my_payments:eperfume view_published_products:eperfume manage_my_business_units:eperfume view_products:eperfume manage_my_shopping_lists:eperfume manage_customers:eperfume manage_my_quote_requests:eperfume manage_my_quotes:eperfume view_product_selections:eperfume manage_my_orders:eperfume create_anonymous_token:eperfume',
  ];

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: 'https://api.europe-west1.gcp.commercetools.com',
    fetch,
  };
  const options: AnonymousAuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey,
    credentials: {
      clientId: 'KJ0zTHvxPFSLQqqbhM_g_sLn',
      clientSecret: '4VyKB2P1U2lJzZMRsOI-1gXGEzlUbTkl',
      // anonymousId: process.env.CTP_ANONYMOUS_ID, // a unique id
    },
    scopes,
    // tokenCache,

    fetch,
  };

  const client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withAnonymousSessionFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey,
  });
};
