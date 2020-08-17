# Fulfillment.com

- API version: 2.0
- Package version: 2.0

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

```shell
npm install fulfillment --save
```

#### git
#
If the library is hosted at a git repository, e.g.
https://github.com/fulfillment/fdc-skd-js
then install it via:

```shell
    npm install fulfillment/fdc-skd-js --save
```

### For browser

Install browserify with `npm install -g browserify`

```shell
browserify index.js > bundle.js
```

Then include *bundle.js* in the HTML pages.

### Webpack Configuration

Using Webpack you may encounter the following error: "Module not found: Error:
Cannot resolve module", most certainly you should disable AMD loader. Add/merge
the following section to your webpack config:

```javascript
module: {
  rules: [
    {
      parser: {
        amd: false
      }
    }
  ]
}
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
var fulfillmentApiV2 = require('fulfillment');

var api = new fulfillmentApiV2.AuthApi()
var body = new fulfillmentApiV2.AccessTokenRequestV2(); // {AccessTokenRequestV2} Get an access token

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.postOauthAccessToken(body, callback);
```

## Documentation for API Endpoints

All URIs are relative to *https://api.fulfillment.com/v2*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*fulfillmentApiV2.AuthApi* | [**postOauthAccessToken**](docs/AuthApi.md#postOauthAccessToken) | **POST** /oauth/access_token | Generate an Access Token
*fulfillmentApiV2.InventoryApi* | [**getInventory**](docs/InventoryApi.md#getInventory) | **GET** /inventory | List of Item Inventories
*fulfillmentApiV2.OrdersApi* | [**deleteOrdersId**](docs/OrdersApi.md#deleteOrdersId) | **DELETE** /orders/{id} | Cancel an Order
*fulfillmentApiV2.OrdersApi* | [**getOrder**](docs/OrdersApi.md#getOrder) | **GET** /orders/{id} | Order Details
*fulfillmentApiV2.OrdersApi* | [**getOrders**](docs/OrdersApi.md#getOrders) | **GET** /orders | List of Orders
*fulfillmentApiV2.OrdersApi* | [**postOrders**](docs/OrdersApi.md#postOrders) | **POST** /orders | New Order
*fulfillmentApiV2.PartnersApi* | [**putOrdersIdShip**](docs/PartnersApi.md#putOrdersIdShip) | **PUT** /orders/{id}/ship | Ship an Order
*fulfillmentApiV2.PartnersApi* | [**putOrdersIdStatus**](docs/PartnersApi.md#putOrdersIdStatus) | **PUT** /orders/{id}/status | Update Order Status
*fulfillmentApiV2.ReturnsApi* | [**getReturns**](docs/ReturnsApi.md#getReturns) | **GET** /returns | List Returns
*fulfillmentApiV2.ReturnsApi* | [**putReturns**](docs/ReturnsApi.md#putReturns) | **PUT** /returns | Inform us of an RMA
*fulfillmentApiV2.TrackingApi* | [**getTrack**](docs/TrackingApi.md#getTrack) | **GET** /track | Tracking
*fulfillmentApiV2.UsersApi* | [**getUsersMe**](docs/UsersApi.md#getUsersMe) | **GET** /users/me | About Me

## Documentation for Models

 - [fulfillmentApiV2.AccessTokenRequestV2](docs/AccessTokenRequestV2.md)
 - [fulfillmentApiV2.AccessTokenResponseV2](docs/AccessTokenResponseV2.md)
 - [fulfillmentApiV2.ConsigneeNewV2](docs/ConsigneeNewV2.md)
 - [fulfillmentApiV2.ConsigneeV2](docs/ConsigneeV2.md)
 - [fulfillmentApiV2.ConsigneeV21](docs/ConsigneeV21.md)
 - [fulfillmentApiV2.ErrorStandardV2](docs/ErrorStandardV2.md)
 - [fulfillmentApiV2.ErrorStandardWithContextV2](docs/ErrorStandardWithContextV2.md)
 - [fulfillmentApiV2.Feature](docs/Feature.md)
 - [fulfillmentApiV2.FeatureProperties](docs/FeatureProperties.md)
 - [fulfillmentApiV2.Geometry](docs/Geometry.md)
 - [fulfillmentApiV2.IsoCountryV2](docs/IsoCountryV2.md)
 - [fulfillmentApiV2.ItemInventoryArrayV2](docs/ItemInventoryArrayV2.md)
 - [fulfillmentApiV2.ItemInventoryArrayV2Item](docs/ItemInventoryArrayV2Item.md)
 - [fulfillmentApiV2.ItemInventoryArrayV2Merchant](docs/ItemInventoryArrayV2Merchant.md)
 - [fulfillmentApiV2.ItemInventoryArrayV2Meta](docs/ItemInventoryArrayV2Meta.md)
 - [fulfillmentApiV2.ItemInventoryArrayV2Quantity](docs/ItemInventoryArrayV2Quantity.md)
 - [fulfillmentApiV2.ItemInventoryArrayV2QuantityTotal](docs/ItemInventoryArrayV2QuantityTotal.md)
 - [fulfillmentApiV2.ItemInventoryV2](docs/ItemInventoryV2.md)
 - [fulfillmentApiV2.MerchantV2](docs/MerchantV2.md)
 - [fulfillmentApiV2.OneOfAccessTokenRequestV2](docs/OneOfAccessTokenRequestV2.md)
 - [fulfillmentApiV2.OneOfGeometryCoordinates](docs/OneOfGeometryCoordinates.md)
 - [fulfillmentApiV2.OneOfOrderResponseOneOfV2](docs/OneOfOrderResponseOneOfV2.md)
 - [fulfillmentApiV2.OrderRequestV2](docs/OrderRequestV2.md)
 - [fulfillmentApiV2.OrderResponseOneOfV2](docs/OrderResponseOneOfV2.md)
 - [fulfillmentApiV2.OrderResponseV2](docs/OrderResponseV2.md)
 - [fulfillmentApiV2.OrderResponseV2ParentOrder](docs/OrderResponseV2ParentOrder.md)
 - [fulfillmentApiV2.OrderShipV2](docs/OrderShipV2.md)
 - [fulfillmentApiV2.OrdersItems](docs/OrdersItems.md)
 - [fulfillmentApiV2.OrdersWarehouse](docs/OrdersWarehouse.md)
 - [fulfillmentApiV2.OrdersidstatusStatus](docs/OrdersidstatusStatus.md)
 - [fulfillmentApiV2.PaginationV2](docs/PaginationV2.md)
 - [fulfillmentApiV2.ReturnV2](docs/ReturnV2.md)
 - [fulfillmentApiV2.ReturnsArrayV2](docs/ReturnsArrayV2.md)
 - [fulfillmentApiV2.ReturnsArrayV2Item](docs/ReturnsArrayV2Item.md)
 - [fulfillmentApiV2.ReturnsArrayV2Meta](docs/ReturnsArrayV2Meta.md)
 - [fulfillmentApiV2.ReturnsArrayV2NonRestockedReason](docs/ReturnsArrayV2NonRestockedReason.md)
 - [fulfillmentApiV2.ReturnsArrayV2Order](docs/ReturnsArrayV2Order.md)
 - [fulfillmentApiV2.ReturnsArrayV2Status](docs/ReturnsArrayV2Status.md)
 - [fulfillmentApiV2.ReturnsItems](docs/ReturnsItems.md)
 - [fulfillmentApiV2.RmaItemV2](docs/RmaItemV2.md)
 - [fulfillmentApiV2.RmaRequestV2](docs/RmaRequestV2.md)
 - [fulfillmentApiV2.RmaResponseV2](docs/RmaResponseV2.md)
 - [fulfillmentApiV2.StatusEventV2](docs/StatusEventV2.md)
 - [fulfillmentApiV2.StatusTypeSimpleV2](docs/StatusTypeSimpleV2.md)
 - [fulfillmentApiV2.StatusTypeV2](docs/StatusTypeV2.md)
 - [fulfillmentApiV2.StatusTypeV2ActionRequiredBy](docs/StatusTypeV2ActionRequiredBy.md)
 - [fulfillmentApiV2.StatusTypeV2Stage](docs/StatusTypeV2Stage.md)
 - [fulfillmentApiV2.TrackingEventV2](docs/TrackingEventV2.md)
 - [fulfillmentApiV2.TrackingNumberV2](docs/TrackingNumberV2.md)
 - [fulfillmentApiV2.TrackingResponse](docs/TrackingResponse.md)
 - [fulfillmentApiV2.UserContactV2](docs/UserContactV2.md)
 - [fulfillmentApiV2.UserContactV21](docs/UserContactV21.md)
 - [fulfillmentApiV2.UserContactV21Merchant](docs/UserContactV21Merchant.md)
 - [fulfillmentApiV2.UserV2](docs/UserV2.md)

## Documentation for Authorization


### apiKey

- **Type**: API key
- **API key parameter name**: x-api-key
- **Location**: HTTP header

### fdcAuth

- **Type**: OAuth
- **Flow**: password
- **Authorization URL**: 
- **Scopes**: 
  - : 

