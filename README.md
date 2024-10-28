# eMarketFlows NodeJS API client

# Initiate

Import module:
```
const eMarketFlowsRestApi = require('@emarketflows/emf-api-client');

// Initialize the eMarketFlows API client
const emfApiClient = new eMarketFlowsRestApi({
  AUTH0_DOMAIN: config.AUTH0_DOMAIN,
  AUTH0_CLIENT_ID: config.AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET: config.AUTH0_CLIENT_SECRET,
  AUTH0_CLIENT_SCOPES: config.AUTH0_CLIENT_SCOPES
});

// Authenticate the client
  emfApiClient.authenticate();
```

Check route permissions:
```
const { authenticateRequest } = require('@emarketflows/emf-api-client');
authenticateRequest(
        'super:contacts',
        'list:providers'
)
```
Call api:
```
const { api } = require('@emarketflows/emf-api-client');

const notifications = await api.notifications.push.list({limit: 5});
```