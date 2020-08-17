# fulfillmentApiV2.AuthApi

All URIs are relative to *https://api.fulfillment.com/v2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**postOauthAccessToken**](AuthApi.md#postOauthAccessToken) | **POST** /oauth/access_token | Generate an Access Token

<a name="postOauthAccessToken"></a>
# **postOauthAccessToken**
> AccessTokenResponseV2 postOauthAccessToken(body)

Generate an Access Token

By default tokens are valid for 7 days while refresh tokens are valid for 30 days. If your &#x60;grant_type&#x60; is \&quot;password\&quot; include the &#x60;username&#x60; and &#x60;password&#x60;, if however your &#x60;grant_type&#x60; is \&quot;refresh_token\&quot; the username/password are not required, instead set the &#x60;refresh_token&#x60;

### Example
```javascript
import fulfillmentApiV2 from 'fulfillment';

let apiInstance = new fulfillmentApiV2.AuthApi();
let body = new fulfillmentApiV2.AccessTokenRequestV2(); // AccessTokenRequestV2 | Get an access token

apiInstance.postOauthAccessToken(body, (error, data, response) => {
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
 **body** | [**AccessTokenRequestV2**](AccessTokenRequestV2.md)| Get an access token | 

### Return type

[**AccessTokenResponseV2**](AccessTokenResponseV2.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

