import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { type ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import {
  ClientBuilder,
  type HttpMiddlewareOptions,
  type ExistingTokenMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { tokenCache } from '../tokenCache';

const options: ExistingTokenMiddlewareOptions = {
  force: true,
};

const projectKey = 'eperfume';

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

export const apiExistingTokenRoot = createApiBuilderFromCtpClient(
  new ClientBuilder()
    .withProjectKey(projectKey)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withExistingTokenFlow(`Bearer ${tokenCache.get().token}`, options)
    .withLoggerMiddleware()
    .build(),
).withProjectKey({
  projectKey: 'eperfume',
});

export const apiRootCreateByToken = (): ByProjectKeyRequestBuilder => {
  return createApiBuilderFromCtpClient(
    new ClientBuilder()
      .withProjectKey(projectKey)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withExistingTokenFlow(`Bearer ${tokenCache.get().token}`, options)
      .withLoggerMiddleware()
      .build(),
  ).withProjectKey({
    projectKey: 'eperfume',
  });
};
