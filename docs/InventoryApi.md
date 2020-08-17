# fulfillmentApiV2.InventoryApi

All URIs are relative to *https://api.fulfillment.com/v2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getInventory**](InventoryApi.md#getInventory) | **GET** /inventory | List of Item Inventories

<a name="getInventory"></a>
# **getInventory**
> ItemInventoryArrayV2 getInventory(opts)

List of Item Inventories

Retrieve inventory for one or more items. This API requires elevated permissions, please speak to your success manager.

### Example
```javascript
import fulfillmentApiV2 from 'fulfillment';
let defaultClient = fulfillmentApiV2.ApiClient.instance;

// Configure OAuth2 access token for authorization: fdcAuth
let fdcAuth = defaultClient.authentications['fdcAuth'];
fdcAuth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new fulfillmentApiV2.InventoryApi();
let opts = { 
  'page': 1, // Number | A multiplier of the number of items (limit paramater) to skip before returning results
  'limit': 80, // Number | The numbers of items to return
  'merchantIds': [3.4], // [Number] | A CSV of merchant id, '123' or '1,2,3'
  'externalSkuNames': ["externalSkuNames_example"] // [String] | A CSV of sku reference names, 'skuName1' or 'skuName1,skuName2,skuName3'
};
apiInstance.getInventory(opts, (error, data, response) => {
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
 **page** | **Number**| A multiplier of the number of items (limit paramater) to skip before returning results | [optional] [default to 1]
 **limit** | **Number**| The numbers of items to return | [optional] [default to 80]
 **merchantIds** | [**[Number]**](Number.md)| A CSV of merchant id, &#x27;123&#x27; or &#x27;1,2,3&#x27; | [optional] 
 **externalSkuNames** | [**[String]**](String.md)| A CSV of sku reference names, &#x27;skuName1&#x27; or &#x27;skuName1,skuName2,skuName3&#x27; | [optional] 

### Return type

[**ItemInventoryArrayV2**](ItemInventoryArrayV2.md)

### Authorization

[fdcAuth](../README.md#fdcAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

