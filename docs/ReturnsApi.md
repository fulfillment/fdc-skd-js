# fulfillmentApiV2.ReturnsApi

All URIs are relative to *https://api.fulfillment.com/v2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getReturns**](ReturnsApi.md#getReturns) | **GET** /returns | List Returns
[**putReturns**](ReturnsApi.md#putReturns) | **PUT** /returns | Inform us of an RMA

<a name="getReturns"></a>
# **getReturns**
> ReturnsArrayV2 getReturns(fromDate, toDate, opts)

List Returns

Retrieves summary return activity during the queried timespan. Although return knowledge can be learned from &#x60;GET /orders/{id}&#x60; it can take an unknown amount of time for an order that is refused or undeliverable to return to an FDC facility. Instead we recommend regularly querying this API.

### Example
```javascript
import fulfillmentApiV2 from 'fulfillment';
let defaultClient = fulfillmentApiV2.ApiClient.instance;

// Configure OAuth2 access token for authorization: fdcAuth
let fdcAuth = defaultClient.authentications['fdcAuth'];
fdcAuth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new fulfillmentApiV2.ReturnsApi();
let fromDate = "fromDate_example"; // String | Date-time in ISO 8601 format for selecting orders after, or at, the specified time
let toDate = "toDate_example"; // String | Date-time in ISO 8601 format for selecting orders before, or at, the specified time
let opts = { 
  'page': 1, // Number | A multiplier of the number of items (limit paramater) to skip before returning results
  'limit': 80 // Number | The numbers of items to return
};
apiInstance.getReturns(fromDate, toDate, opts, (error, data, response) => {
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
 **fromDate** | **String**| Date-time in ISO 8601 format for selecting orders after, or at, the specified time | 
 **toDate** | **String**| Date-time in ISO 8601 format for selecting orders before, or at, the specified time | 
 **page** | **Number**| A multiplier of the number of items (limit paramater) to skip before returning results | [optional] [default to 1]
 **limit** | **Number**| The numbers of items to return | [optional] [default to 80]

### Return type

[**ReturnsArrayV2**](ReturnsArrayV2.md)

### Authorization

[fdcAuth](../README.md#fdcAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="putReturns"></a>
# **putReturns**
> RmaResponseV2 putReturns(body)

Inform us of an RMA

Inform FDC of an expected return.

### Example
```javascript
import fulfillmentApiV2 from 'fulfillment';
let defaultClient = fulfillmentApiV2.ApiClient.instance;

// Configure OAuth2 access token for authorization: fdcAuth
let fdcAuth = defaultClient.authentications['fdcAuth'];
fdcAuth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new fulfillmentApiV2.ReturnsApi();
let body = new fulfillmentApiV2.RmaRequestV2(); // RmaRequestV2 | RMA

apiInstance.putReturns(body, (error, data, response) => {
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
 **body** | [**RmaRequestV2**](RmaRequestV2.md)| RMA | 

### Return type

[**RmaResponseV2**](RmaResponseV2.md)

### Authorization

[fdcAuth](../README.md#fdcAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

