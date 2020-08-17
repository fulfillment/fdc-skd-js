# FulfillmentcomApIv2.PartnersApi

All URIs are relative to *https://api.fulfillment.com/v2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**putOrdersIdShip**](PartnersApi.md#putOrdersIdShip) | **PUT** /orders/{id}/ship | Ship an Order
[**putOrdersIdStatus**](PartnersApi.md#putOrdersIdStatus) | **PUT** /orders/{id}/status | Update Order Status

<a name="putOrdersIdShip"></a>
# **putOrdersIdShip**
> Paths1orderspostresponses201contentapplication1jsonschema putOrdersIdShip(bodyid)

Ship an Order

Note, this API is used to update orders and is reserved for our shipping partners.

### Example
```javascript
import FulfillmentcomApIv2 from 'fulfillmentcom_ap_iv2';
let defaultClient = FulfillmentcomApIv2.ApiClient.instance;

// Configure OAuth2 access token for authorization: fdcAuth
let fdcAuth = defaultClient.authentications['fdcAuth'];
fdcAuth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FulfillmentcomApIv2.PartnersApi();
let body = new FulfillmentcomApIv2.OrderShipV2(); // OrderShipV2 | Shipping Details
let id = 56; // Number | The FDC order Id

apiInstance.putOrdersIdShip(bodyid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**OrderShipV2**](OrderShipV2.md)| Shipping Details | 
 **id** | **Number**| The FDC order Id | 

### Return type

[**Paths1orderspostresponses201contentapplication1jsonschema**](Paths1orderspostresponses201contentapplication1jsonschema.md)

### Authorization

[fdcAuth](../README.md#fdcAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="putOrdersIdStatus"></a>
# **putOrdersIdStatus**
> Paths1orderspostresponses201contentapplication1jsonschema putOrdersIdStatus(bodyid)

Update Order Status

Note, this API is used to update orders and is reserved for our shipping partners.

### Example
```javascript
import FulfillmentcomApIv2 from 'fulfillmentcom_ap_iv2';
let defaultClient = FulfillmentcomApIv2.ApiClient.instance;

// Configure OAuth2 access token for authorization: fdcAuth
let fdcAuth = defaultClient.authentications['fdcAuth'];
fdcAuth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FulfillmentcomApIv2.PartnersApi();
let body = new FulfillmentcomApIv2.StatusTypeSimpleV2(); // StatusTypeSimpleV2 | New status event
let id = 56; // Number | The FDC order Id

apiInstance.putOrdersIdStatus(bodyid, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**StatusTypeSimpleV2**](StatusTypeSimpleV2.md)| New status event | 
 **id** | **Number**| The FDC order Id | 

### Return type

[**Paths1orderspostresponses201contentapplication1jsonschema**](Paths1orderspostresponses201contentapplication1jsonschema.md)

### Authorization

[fdcAuth](../README.md#fdcAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

