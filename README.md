# eMarketFlows JavaScript SDK

- Official website: [emarketflows.io](https://emarketflows.com)
- Developers Space: [Resources](https://emarketflows.com/developers)

This package permits use eMarketFlows API services in easy steps.

1. Run this command in your project folder:
   ```js
   npm i @emarketflows/javascript-sdk
   ```
2. To use this SDK you need an account, you can [create one here](#).
3. Access your account [here](https://emarketflows.io/login) and create new [client credentials](#).
4. Inicialice client session:
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
5. Access REST resources

One of principal uses of eMarketFlows SDK is be a developer interface to code fastly integrations.

```js
/* Import eMarketFlows SDK client */
const { v1: emfClient } = require('@emarketflows/javascript-sdk');

/** 
 * Acces to push notifications api and get list of last five notifications.
 * */
const notifications = await emfClient.notifications.push.list({limit: 5});
```

### Resources

| Service | Resource | LIST | GET | POST | PUT | DELETE |
| -------- | ------- | ------- | ------- | ------- | ------- | ------- |
| notifications  | push | ✅ | ✅ | ✅ | ✅ | ❌ |
| oauth2  | organizations | ✅ | ✅ | ✅ | ✅ | ❌ |
|  | scopes | ✅ | ✅ | ❌ | ❌ | ❌ |
|  | clients | ✅ | ✅ | ✅ | ✅ | ✅ |
| billing  | products | ✅ | ✅ | ✅ | ✅ | ✅ |
|  | orders | ✅ | ✅ | ✅ | ✅ | ✅ |
|  | invoices | ✅ | ✅ | ✅ | ✅ | ✅ |
|  | catalogues | ✅ | ✅ | ✅ | ✅ | ✅ |
| contacts  | customers | ✅ | ✅ | ✅ | ✅ | ✅ |
|  | providers | ✅ | ✅ | ✅ | ✅ | ✅ |
|  | addresses | ✅ | ✅ | ✅ | ✅ | ✅ |

## Check client scopes

Check client permissions importing validate function:
```js
/* Import validation service */
const { validate } = require('@emarketflows/javascript-sdk');

const isValid = await validate(
                        'super:contacts',
                        'list:providers'
                      );

console.log("Client has super:contacts and list:providers scopes?" + isValid);

// Client has super:contacts and list:providers scopes? true
// Client has super:contacts and list:providers scopes? false
```