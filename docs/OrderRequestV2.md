# fulfillmentApiV2.OrderRequestV2

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**merchantId** | **Number** | Necessary if you have a multitenancy account, otherwise we will associate the order with your account | [optional] 
**merchantOrderId** | **String** | Unique ID provided by the merchant | 
**shippingMethod** | **String** | Custom for you, it will be mapped to an actual method within the OMS UI | 
**recipient** | [**ConsigneeNewV2**](ConsigneeNewV2.md) |  | 
**items** | [**[OrdersItems]**](OrdersItems.md) |  | 
**warehouse** | [**OrdersWarehouse**](OrdersWarehouse.md) |  | [optional] 
**integrator** | **String** | Use of this property requires special permission and must be discussed with your account executive; values are restricted while custom values need to be accepted by your AE. | [optional] 
**notes** | **String** |  | [optional] 

<a name="IntegratorEnum"></a>
## Enum: IntegratorEnum

* `1ShoppingCart` (value: `"1ShoppingCart"`)
* `3dCart` (value: `"3dCart"`)
* `AdobeBC` (value: `"AdobeBC"`)
* `AmazonAU` (value: `"AmazonAU"`)
* `AmazonEU` (value: `"AmazonEU"`)
* `AmazonNA` (value: `"AmazonNA"`)
* `BigCommerce` (value: `"BigCommerce"`)
* `BrandBoom` (value: `"BrandBoom"`)
* `BrightPearl` (value: `"BrightPearl"`)
* `BuyGoods` (value: `"BuyGoods"`)
* `Celery` (value: `"Celery"`)
* `ChannelAdvisor` (value: `"ChannelAdvisor"`)
* `Clickbank` (value: `"Clickbank"`)
* `CommerceHub` (value: `"CommerceHub"`)
* `Custom` (value: `"Custom"`)
* `Demandware` (value: `"Demandware"`)
* `Ebay` (value: `"Ebay"`)
* `Ecwid` (value: `"Ecwid"`)
* `Etsy` (value: `"Etsy"`)
* `FoxyCart` (value: `"FoxyCart"`)
* `Goodsie` (value: `"Goodsie"`)
* `Infusionsoft` (value: `"Infusionsoft"`)
* `Konnektive` (value: `"Konnektive"`)
* `LimeLight` (value: `"LimeLight"`)
* `Linio` (value: `"Linio"`)
* `Linnworks` (value: `"Linnworks"`)
* `Magento` (value: `"Magento"`)
* `Netsuite` (value: `"Netsuite"`)
* `NewEgg` (value: `"NewEgg"`)
* `Nexternal` (value: `"Nexternal"`)
* `NuOrder` (value: `"NuOrder"`)
* `Opencart` (value: `"Opencart"`)
* `OrderWave` (value: `"OrderWave"`)
* `osCommerce1` (value: `"osCommerce1"`)
* `Overstock` (value: `"Overstock"`)
* `PayPal` (value: `"PayPal"`)
* `PrestaShop` (value: `"PrestaShop"`)
* `Pricefalls` (value: `"Pricefalls"`)
* `Quickbooks` (value: `"Quickbooks"`)
* `Rakuten` (value: `"Rakuten"`)
* `Sears` (value: `"Sears"`)
* `Sellbrite` (value: `"Sellbrite"`)
* `SellerCloud` (value: `"SellerCloud"`)
* `Shipstation` (value: `"Shipstation"`)
* `Shopify` (value: `"Shopify"`)
* `Skubana` (value: `"Skubana"`)
* `SolidCommerce` (value: `"SolidCommerce"`)
* `SparkPay` (value: `"SparkPay"`)
* `SpreeCommerce` (value: `"SpreeCommerce"`)
* `spsCommerce` (value: `"spsCommerce"`)
* `StitchLabs` (value: `"StitchLabs"`)
* `StoneEdge` (value: `"StoneEdge"`)
* `TradeGecko` (value: `"TradeGecko"`)
* `UltraCart` (value: `"UltraCart"`)
* `Volusion` (value: `"Volusion"`)
* `VTEX` (value: `"VTEX"`)
* `Walmart` (value: `"Walmart"`)
* `WooCommerce` (value: `"WooCommerce"`)
* `Yahoo` (value: `"Yahoo"`)

