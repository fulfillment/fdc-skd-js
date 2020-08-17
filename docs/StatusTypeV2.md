# fulfillmentApiV2.StatusTypeV2

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | Depricated, use code instead | [optional] 
**isClosed** | **Boolean** | Depricated, does this status event close the order | [optional] 
**actionRequiredBy** | [**StatusTypeV2ActionRequiredBy**](StatusTypeV2ActionRequiredBy.md) |  | [optional] 
**stage** | [**StatusTypeV2Stage**](StatusTypeV2Stage.md) |  | 
**state** | [**StatusTypeV2Stage**](StatusTypeV2Stage.md) |  | 
**detail** | **String** |  | [optional] 
**reason** | **String** | Depricated | [optional] 
**name** | **String** | Depricated, use stage/state instead | [optional] 
**detailCode** | **String** |  | 
**code** | **String** | Code, see [status codes](#section/Getting-Started/Status-Codes) | 
