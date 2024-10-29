# eMarketFlows NodeJS API client

## Inicialice

Import module:
```js
// Import eMarketFlows SDK client
const client = require('@emarketflows/javascript-sdk');

/** 
* Initialize the eMarketFlows API client
* Is not necessary export it. This SDK set token in cache
* and get this when is neccesary and refresh.
**/
const emfClient = new client({
  AUTH0_CLIENT_ID: < Client ID >,
  AUTH0_CLIENT_SECRET: < Client Secret >,
  AUTH0_CLIENT_SCOPES: < Client Scopes >
});

// Authenticate the client
emfClient.authenticate();
```

## Make API Call
```js
const { api } = require('@emarketflows/javascript-sdk');

const notifications = await api.notifications.push.list({limit: 5});
```

## Check route permission
Check route permissions:
```js
const { authenticateRequest } = require('@emarketflows/javascript-sdk');
authenticateRequest(
        'super:contacts',
        'list:providers'
)
```