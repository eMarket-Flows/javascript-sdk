# eMarketFlows NodeJS API client

# Initiate

Import module:
```
const client = require('@emarketflows/emf-api-client');

// Initialize the eMarketFlows API client
// Is not necessary export it. This SDK set token in cache
// and get this when is neccesary and refresh.
const emfClient = new client({
  AUTH0_CLIENT_ID: < Client ID >,
  AUTH0_CLIENT_SECRET: < Client Secret >,
  AUTH0_CLIENT_SCOPES: < Client Scopes >
});
```

// Authenticate the client
```
  emfClient.authenticate();
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