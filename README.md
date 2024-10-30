# eMarketFlows JavaScript SDK

- Official website: [emarketflows.io](https://emarketflows.io)
- Developers Space: [resources](https://emarketflows.io/developers)
- License: [MIT](https://github.com/eMarket-Flows/javascript-sdk/blob/master/LICENSE.md)

## Table of Contents
- [eMarketFlows JavaScript SDK](#emarketflows-javascript-sdk)
  - [Table of Contents](#table-of-contents)
  - [Why use this SDK?](#why-use-this-sdk)
  - [Install](#install)
  - [Authentication](#authentication)
  - [Consume resources](#consume-resources)
    - [\[CRUD\] Methods reference](#crud-methods-reference)
      - [GET](#get)
      - [LIST](#list)
      - [ADD](#add)
      - [UPDATE](#update)
      - [REMOVE](#remove)
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

## Authentication

Authenticate client session with your client identifier and Secret:
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
 * After install module and autheticate client with your credential, 
 * this package create cache space where sets your temporal client token
 * and refresh it when is necessary.
 * */
emfClient.authenticate();
```
## Consume resources

One of principal uses of eMarketFlows SDK is be a developer interface to code fastly integrations.

```js
/* Import eMarketFlows SDK client */
const { v1: EmfClient } = require('@emarketflows/javascript-sdk');

/* Example 1. Access to push notifications service and list last five notifications. */
const notifications = await EmfClient.notifications.push.list({limit: 5});

/* Example 2. Access to customers service and list last ten customers. */
const customers = await EmfClient.contacts.customers.list({limit: 10});
```

### [CRUD] Methods reference

After [install](#install) and [authenticate](#authentication) your eMarket Flows client:

#### GET

```js
/* Import eMarketFlows SDK client */
const { v1: EmfClient } = require('@emarketflows/javascript-sdk');

/* Get customer by customer ID */
const customers = await EmfClient.contacts.customers.get(CUSTOMER_ID);
```

#### LIST

```js
/* Import eMarketFlows SDK client */
const { v1: EmfClient } = require('@emarketflows/javascript-sdk');

/* List customers with limit */
const customers = await EmfClient.contacts.customers.list({limit: 5});
```

#### ADD

```js
/* Import eMarketFlows SDK client */
const { v1: EmfClient } = require('@emarketflows/javascript-sdk');

/* Add customer */
const customers = await EmfClient.contacts.customers.add({
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@email.com"
});
```

#### UPDATE

```js
/* Import eMarketFlows SDK client */
const { v1: EmfClient } = require('@emarketflows/javascript-sdk');

/* Update customer */
const customers = await EmfClient.contacts.customers.update({
  id: "CUSTOMER_ID",
  firstName: "Joana",
  lastName: "Doe",
  email: "joanadoe@email.com"
});
```

#### REMOVE

```js
/* Import eMarketFlows SDK client */
const { v1: EmfClient } = require('@emarketflows/javascript-sdk');

/* Remove customer */
const customers = await EmfClient.contacts.customers.remove(CUSTOMER_ID);
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

*Copyright 2024 @ eMarket Flows. All rights reserved.*