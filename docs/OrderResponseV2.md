# fulfillmentApiV2.OrderResponseV2

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | FDC ID for this order | 
**trackingNumbers** | [**[TrackingNumberV2]**](TrackingNumberV2.md) |  | [optional] 
**validatedConsignee** | [**Paths1orderspostresponses201contentapplication1jsonschemapropertiesoriginalConsignee**](Paths1orderspostresponses201contentapplication1jsonschemapropertiesoriginalConsignee.md) |  | 
**originalConsignee** | [**ConsigneeV21**](ConsigneeV21.md) |  | 
**currentStatus** | [**StatusEventV2**](StatusEventV2.md) |  | 
**warehouse** | [**UserV2**](UserV2.md) |  | [optional] 
**merchant** | [**MerchantV2**](MerchantV2.md) |  | 
**departDate** | **Date** | DateTime order departed an FDC warehouse | [optional] 
**dispatchDate** | **Date** | DateTime order was dispatched for fulfillment by FDC | [optional] 
**recordedOn** | **Date** | DateTime order was recorded by FDC | 
**merchantShippingMethod** | **String** | Requested ship method | 
**purchaseOrderNum** | **String** | Merchant provided PO# | [optional] 
**merchantOrderId** | **String** | Merchant provided ID | 
**parentOrder** | [**OrderResponseV2ParentOrder**](OrderResponseV2ParentOrder.md) |  | [optional] 
