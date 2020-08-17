# fulfillmentApiV2.UsersApi

All URIs are relative to *https://api.fulfillment.com/v2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getUsersMe**](UsersApi.md#getUsersMe) | **GET** /users/me | About Me

<a name="getUsersMe"></a>
# **getUsersMe**
> UserContactV2 getUsersMe()

About Me

Returns the user profile of the access token&#x27;s owner. This could be useful if managing multiple accounts or confirming validity of a token.

### Example
```javascript
import fulfillmentApiV2 from 'fulfillment';
let defaultClient = fulfillmentApiV2.ApiClient.instance;

// Configure OAuth2 access token for authorization: fdcAuth
let fdcAuth = defaultClient.authentications['fdcAuth'];
fdcAuth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new fulfillmentApiV2.UsersApi();
apiInstance.getUsersMe((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**UserContactV2**](UserContactV2.md)

### Authorization

[fdcAuth](../README.md#fdcAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

