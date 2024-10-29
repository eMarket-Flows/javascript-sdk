# eMarketFlows NodeJS API client

## Inicialice

Import module:
```js
/* Import eMarketFlows SDK client */
const client = require('@emarketflows/javascript-sdk');

/** 
* Initialize the eMarketFlows API client
* Is not necessary export it. This SDK set token in cache
* and get this when is neccesary and refresh.
**/
const emfClient = new client({
  AUTH0_CLIENT_ID: YOUR_CLIENT_ID,
  AUTH0_CLIENT_SECRET: YOUR_CLIENT_SECRET,
  AUTH0_CLIENT_SCOPES: YOUR_CLIENT_SCOPES
});

/* Authenticate the client */
emfClient.authenticate();
```

## Make calls

One of principal uses of eMarketFlows SDK is be a developer interface to code fastly integrations.

### Resources

| Resource    | Method |
| -------- | ------- |
| notifications  | GET    |
|  | POST     |
|  | PUT    |

```js
/*  */
const { v1: emfClient } = require('@emarketflows/javascript-sdk');

/** 
 * Example
 * 
 * Acces to push notifications api and get list of last five notifications.
 * */
const notifications = await emfClient.notifications.push.list({limit: 5});
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