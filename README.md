# eMarketFlows JavaScript SDK

- Official website: [emarketflows.io](https://emarketflows.com)
- Developers Space: [Resources](https://emarketflows.com/developers)

## Table of Contents
- [eMarketFlows JavaScript SDK](#emarketflows-javascript-sdk)
  - [Table of Contents](#table-of-contents)
  - [Why use this SDK?](#why-use-this-sdk)
  - [Install](#install)
  - [Consume resources](#consume-resources)
    - [Resources reference](#resources-reference)
  - [\[Authorization\] Check client scopes](#authorization-check-client-scopes)

## Why use this SDK?

This package permits use official eMarketFlows API services in easy steps.

## Install

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
  AUTH2_CLIENT_ID: YOUR_CLIENT_ID,
  AUTH2_CLIENT_SECRET: YOUR_CLIENT_SECRET,
  AUTH2_CLIENT_SCOPES: YOUR_CLIENT_SCOPES
});

/**
 * Authenticate the client
 * 
 * After [install] module with your credential, this package create
 * cache space where sets your temporal client token and refresh it 
 * when is necessary.
 * */
emfClient.authenticate();
```
## Consume resources

One of principal uses of eMarketFlows SDK is be a developer interface to code fastly integrations.

```js
/* Import eMarketFlows SDK client */
const { v1: EmfClient } = require('@emarketflows/javascript-sdk');

/** 
 * Acces to push notifications api and get list of last five notifications.
 * */
const notifications = await emfClient.notifications.push.list({limit: 5});
```

### Resources reference

| Service | Resource | DESCRIPTION | LIST | GET | POST | PUT | DELETE |
| -------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| notifications  | push | Push notifications | ✅ | ✅ | ✅ | ✅ | ✅ |
|  | email | E-mail notifications  | ✅ | ✅ | ✅ | ✅ | ✅ |
| oauth2  | organizations | Organizations  | ✅ | ✅ | ✅ | ✅ | ❌ |
|  | clients | Account Auth2.0 clients | ✅ | ✅ | ✅ | ✅ | ✅ |
|  | members | Organization members | ✅ | ✅ | ✅ | ✅ | ✅ |
| billing  | products | Orgnization products | ✅ | ✅ | ✅ | ✅ | ✅ |
|  | catalogues | Product catalogues | ✅ | ✅ | ✅ | ✅ | ✅ |
|  | orders | Organization orders | ✅ | ✅ | ✅ | ✅ | ✅ |
|  | payments | Order payments | ✅ | ✅ | ✅ | ✅ | ✅ |
|  | invoices | Invoices | ✅ | ✅ | ✅ | ✅ | ✅ |
|  | serials | Invoice serials | ✅ | ✅ | ✅ | ✅ | ✅ |
|  | paymentMethods | Invoice payment methods | ✅ | ✅ | ✅ | ✅ | ✅ |
| contacts  | customers | Organization customers | ✅ | ✅ | ✅ | ✅ | ✅ |
|  | groups | Customer groups | ✅ | ✅ | ✅ | ✅ | ✅ |
|  | providers | Organization providers | ✅ | ✅ | ✅ | ✅ | ✅ |
|  | addresses | Contact addresses | ✅ | ✅ | ✅ | ✅ | ✅ |
|  | activities | Contact activities | ✅ | ✅ | ✅ | ✅ | ✅ |
| ubications  | stores | Organization stores | ✅ | ✅ | ✅ | ✅ | ✅ |
|  | warehouses | Organization warehouses | ✅ | ✅ | ✅ | ✅ | ✅ |
|  | corners | Organization corners | ✅ | ✅ | ✅ | ✅ | ✅ |

## [Authorization] Check client scopes

Check client permissions importing validate function:
```js
/* Import validation service */
const { validate } = require('@emarketflows/javascript-sdk');

/* Check client scopes with Auth2.0 authorization service */
const isValid = await validate('super:contacts', 'list:providers');

console.log(`Client has super:contacts and list:providers scopes? ${isValid}`);

/**
 * Output if client has scopes: 
 * Client has super:contacts and list:providers scopes? true
 * 
 * Output if client hasn't scopes:
 * Client has super:contacts and list:providers scopes? false
*/
```