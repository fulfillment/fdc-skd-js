/**
 * Fulfillment.com APIv2
 * Welcome to our current iteration of our REST API. While we encourage you to upgrade to v2.0 we will continue support for our [SOAP API](https://github.com/fulfillment/soap-integration).  # Versioning  The Fulfillment.com (FDC) REST API is version controlled and backwards compatible. We have many future APIs scheduled for publication within our v2.0 spec so please be prepared for us to add data nodes in our responses, however, we will not remove knowledge from previously published APIs.  #### A Current Response  ```javascript {   id: 123 } ```  #### A Potential Future Response  ```javascript {   id: 123,   reason: \"More Knowledge\" } ```  # Getting Started  We use OAuth v2.0 to authenticate clients, you can choose [implicit](https://oauth.net/2/grant-types/implicit/) or [password](https://oauth.net/2/grant-types/password/) grant type. To obtain an OAuth `client_id` and `client_secret` contact your account executive.  **Tip**: Generate an additional login and use those credentials for your integration so that changes are accredited to that \"user\".  You are now ready to make requests to our other APIs by filling your `Authorization` header with `Bearer {access_token}`.  ## Perpetuating Access  Perpetuating access to FDC without storing your password locally can be achieved using the `refresh_token` returned by [POST /oauth/access_token](#operation/generateToken).  A simple concept to achieve this is outlined below.  1. Your application/script will ask you for your `username` and `password`, your `client_id` and `client_secret` will be accessible via a DB or ENV. 2. [Request an access_token](#operation/generateToken)   + Your function should be capable of formatting your request for both a `grant_type` of \\\"password\\\" (step 1) and \\\"refresh_token\\\" (step 4). 3. Store the `access_token` and `refresh_token` so future requests can skip step 1 4. When the `access_token` expires request anew using your `refresh_token`, replace both tokens in local storage.  + If this fails you will have to revert to step 1.  Alternatively if you choose for your application/script to have access to your `username` and `password` you can skip step 4.  In all scenarios we recommend storing all credentials outside your codebase.  ## Date Time Definitions  We will report all date-time stamps using the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. When using listing API's where fromDate and toDate are available note that both dates are inclusive while requiring the fromDate to be before or at the toDate.  ### The Fulfillment Process  Many steps are required to fulfill your order we report back to you three fundamental milestones inside the orders model.  * `recordedOn` When we received your order. This will never change.  * `dispatchDate` When the current iteration of your order was scheduled for fulfillment. This may change however it is an indicator that the physical process of fulfillment has begun and a tracking number has been **assigned** to your order. The tracking number **MAY CHANGE**. You will not be able to cancel an order once it has been dispatched. If you need to recall an order that has been dispatched please contact your account executive.  * `departDate` When we recorded your order passing our final inspection and placed with the carrier. At this point it is **safe to inform the consignee** of the tracking number as it will not change.  ## Evaluating Error Responses  We currently return two different error models, with and without context. All errors will include a `message` node while errors with `context` will include additional information designed to save you time when encountering highly probable errors. For example, when you send us a request to create a duplicate order, we will reject your request and the context will include the FDC order `id` so that you may record it for your records.  ### Without Context  New order with missing required fields.  | Header | Response | | ------ | -------- | | Status | `400 Bad Request` |  ```javascript {       \"message\": \"Invalid request body\" } ```  ### With Context  New order with duplicate `merchantOrderId`.  | Header | Response | | ------ | -------- | | Status | `409 Conflict` |  ```javascript {   \"message\": \"Duplicate Order\",   \"context\": {     \"id\": 123   } } ```  ## Status Codes  Codes are a concatenation of State, Stage, and Detail.  `^([0-9]{2})([0-9]{2})([0-9]{2})$`  | Code | State              | Stage    | Detail         | | ---- | ------------------ | -------- | -------------- | | 010101 | Processing Order | Recieved | Customer Order | | 010102 | Processing Order | Recieved | Recieved | | 010201 | Processing Order | Approved | | | 010301 | Processing Order | Hold | Merchant Stock | | 010302 | Processing Order | Hold | Merchant Funds | | 010303 | Processing Order | Hold | For Merchant | | 010304 | Processing Order | Hold | Oversized Shipment | | 010305 | Processing Order | Hold | Invalid Parent Order | | 010306 | Processing Order | Hold | Invalid Address | | 010307 | Processing Order | Hold | By Admin | | 010401 | Processing Order | Address Problem | Incomplete Address | | 010402 | Processing Order | Address Problem | Invalid Locality | | 010403 | Processing Order | Address Problem | Invalid Region | | 010404 | Processing Order | Address Problem | Address Not Found | | 010405 | Processing Order | Address Problem | Many Addresses Found | | 010406 | Processing Order | Address Problem | Invalid Postal Code | | 010407 | Processing Order | Address Problem | Country Not Mapped | | 010408 | Processing Order | Address Problem | Invalid Recipient Name | | 010409 | Processing Order | Address Problem | Bad UK Address | | 010410 | Processing Order | Address Problem | Invalid Address Line 1 or 2 | | 010501 | Processing Order | Sku Problem | Invalid SKU | | 010501 | Processing Order | Sku Problem | Child Order has Invalid SKUs | | 010601 | Processing Order | Facility Problem | Facility Not Mapped | | 010701 | Processing Order | Ship Method Problem | Unmapped Ship Method | | 010702 | Processing Order | Ship Method Problem | Unmapped Ship Cost | | 010703 | Processing Order | Ship Method Problem | Missing Ship Method | | 010704 | Processing Order | Ship Method Problem | Invalid Ship Method | | 010705 | Processing Order | Ship Method Problem | Order Weight Outside of Ship Method Weight | | 010801 | Processing Order | Inventory Problem | Insufficient Inventory In Facility | | 010802 | Processing Order | Inventory Problem | Issue Encountered During Inventory Adjustment | | 010901 | Processing Order | Released To WMS | Released | | 020101 | Fulfillment In Progress | Postage Problem | Address Issue | | 020102 | Fulfillment In Progress | Postage Problem | Postage OK, OMS Issue Occurred | | 020103 | Fulfillment In Progress | Postage Problem | Postage Void Failed | | 020201 | Fulfillment In Progress | Postage Acquired | | | 020301 | Fulfillment In Progress | Postage Voided | Postage Void Failed Gracefully | | 020301 | Fulfillment In Progress | Hold | Departure Hold Requested | | 020401 | Fulfillment In Progress | 4PL Processing | | | 020501 | Fulfillment In Progress | 4PL Problem | Order is Proccessable, Postage Issue Occurred | | 020601 | Fulfillment In Progress | Label Printed | | | 020701 | Fulfillment In Progress | Shipment Cubed | | | 020801 | Fulfillment In Progress | Picking Inventory | | | 020901 | Fulfillment In Progress | Label Print Verified | | | 021001 | Fulfillment In Progress | Passed Final Inspection | | | 030101 | Shipped | Fulfilled By 4PL | | | 030102 | Shipped | Fulfilled By 4PL | Successfully Fulfilled, OMS Encountered Issue During Processing | | 030201 | Shipped | Fulfilled By FDC | | | 040101 | Returned | Returned | | | 050101 | Cancelled | Cancelled | | | 060101 | Test | Test | Test | 
 *
 * OpenAPI spec version: 2.0
 * Contact: dev@fulfillment.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import ConsigneeNewV2 from './ConsigneeNewV2';
import OrdersItems from './OrdersItems';
import OrdersWarehouse from './OrdersWarehouse';

/**
* The OrderRequestV2 model module.
* @module model/OrderRequestV2
* @version 2.0
*/
export default class OrderRequestV2 {
    /**
    * Constructs a new <code>OrderRequestV2</code>.
    * @alias module:model/OrderRequestV2
    * @class
    * @param merchantOrderId {String} Unique ID provided by the merchant
    * @param shippingMethod {String} Custom for you, it will be mapped to an actual method within the OMS UI
    * @param recipient {module:model/ConsigneeNewV2} 
    * @param items {Array.<module:model/OrdersItems>} 
    */

    constructor(merchantOrderId, shippingMethod, recipient, items) {
        
        
        this['merchantOrderId'] = merchantOrderId;
        this['shippingMethod'] = shippingMethod;
        this['recipient'] = recipient;
        this['items'] = items;
        
    }

    /**
    * Constructs a <code>OrderRequestV2</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/OrderRequestV2} obj Optional instance to populate.
    * @return {module:model/OrderRequestV2} The populated <code>OrderRequestV2</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new OrderRequestV2();
                        
            
            if (data.hasOwnProperty('merchantId')) {
                obj['merchantId'] = ApiClient.convertToType(data['merchantId'], 'Number');
            }
            if (data.hasOwnProperty('merchantOrderId')) {
                obj['merchantOrderId'] = ApiClient.convertToType(data['merchantOrderId'], 'String');
            }
            if (data.hasOwnProperty('shippingMethod')) {
                obj['shippingMethod'] = ApiClient.convertToType(data['shippingMethod'], 'String');
            }
            if (data.hasOwnProperty('recipient')) {
                obj['recipient'] = ConsigneeNewV2.constructFromObject(data['recipient']);
            }
            if (data.hasOwnProperty('items')) {
                obj['items'] = ApiClient.convertToType(data['items'], [OrdersItems]);
            }
            if (data.hasOwnProperty('warehouse')) {
                obj['warehouse'] = OrdersWarehouse.constructFromObject(data['warehouse']);
            }
            if (data.hasOwnProperty('integrator')) {
                obj['integrator'] = ApiClient.convertToType(data['integrator'], 'String');
            }
            if (data.hasOwnProperty('notes')) {
                obj['notes'] = ApiClient.convertToType(data['notes'], 'String');
            }
        }
        return obj;
    }

    /**
    * Necessary if you have a multitenancy account, otherwise we will associate the order with your account
    * @member {Number} merchantId
    */
    'merchantId' = undefined;
    /**
    * Unique ID provided by the merchant
    * @member {String} merchantOrderId
    */
    'merchantOrderId' = undefined;
    /**
    * Custom for you, it will be mapped to an actual method within the OMS UI
    * @member {String} shippingMethod
    */
    'shippingMethod' = undefined;
    /**
    * @member {module:model/ConsigneeNewV2} recipient
    */
    'recipient' = undefined;
    /**
    * @member {Array.<module:model/OrdersItems>} items
    */
    'items' = undefined;
    /**
    * @member {module:model/OrdersWarehouse} warehouse
    */
    'warehouse' = undefined;
    /**
    * Use of this property requires special permission and must be discussed with your account executive; values are restricted while custom values need to be accepted by your AE.
    * @member {module:model/OrderRequestV2.IntegratorEnum} integrator
    */
    'integrator' = undefined;
    /**
    * @member {String} notes
    */
    'notes' = undefined;



    /**
    * Allowed values for the <code>integrator</code> property.
    * @enum {String}
    * @readonly
    */
    static IntegratorEnum = {
        /**
         * value: "1ShoppingCart"
         * @const
         */
        "1ShoppingCart": "1ShoppingCart",
        /**
         * value: "3dCart"
         * @const
         */
        "3dCart": "3dCart",
        /**
         * value: "AdobeBC"
         * @const
         */
        "AdobeBC": "AdobeBC",
        /**
         * value: "AmazonAU"
         * @const
         */
        "AmazonAU": "AmazonAU",
        /**
         * value: "AmazonEU"
         * @const
         */
        "AmazonEU": "AmazonEU",
        /**
         * value: "AmazonNA"
         * @const
         */
        "AmazonNA": "AmazonNA",
        /**
         * value: "BigCommerce"
         * @const
         */
        "BigCommerce": "BigCommerce",
        /**
         * value: "BrandBoom"
         * @const
         */
        "BrandBoom": "BrandBoom",
        /**
         * value: "BrightPearl"
         * @const
         */
        "BrightPearl": "BrightPearl",
        /**
         * value: "BuyGoods"
         * @const
         */
        "BuyGoods": "BuyGoods",
        /**
         * value: "Celery"
         * @const
         */
        "Celery": "Celery",
        /**
         * value: "ChannelAdvisor"
         * @const
         */
        "ChannelAdvisor": "ChannelAdvisor",
        /**
         * value: "Clickbank"
         * @const
         */
        "Clickbank": "Clickbank",
        /**
         * value: "CommerceHub"
         * @const
         */
        "CommerceHub": "CommerceHub",
        /**
         * value: "Custom"
         * @const
         */
        "Custom": "Custom",
        /**
         * value: "Demandware"
         * @const
         */
        "Demandware": "Demandware",
        /**
         * value: "Ebay"
         * @const
         */
        "Ebay": "Ebay",
        /**
         * value: "Ecwid"
         * @const
         */
        "Ecwid": "Ecwid",
        /**
         * value: "Etsy"
         * @const
         */
        "Etsy": "Etsy",
        /**
         * value: "FoxyCart"
         * @const
         */
        "FoxyCart": "FoxyCart",
        /**
         * value: "Goodsie"
         * @const
         */
        "Goodsie": "Goodsie",
        /**
         * value: "Infusionsoft"
         * @const
         */
        "Infusionsoft": "Infusionsoft",
        /**
         * value: "Konnektive"
         * @const
         */
        "Konnektive": "Konnektive",
        /**
         * value: "LimeLight"
         * @const
         */
        "LimeLight": "LimeLight",
        /**
         * value: "Linio"
         * @const
         */
        "Linio": "Linio",
        /**
         * value: "Linnworks"
         * @const
         */
        "Linnworks": "Linnworks",
        /**
         * value: "Magento"
         * @const
         */
        "Magento": "Magento",
        /**
         * value: "Netsuite"
         * @const
         */
        "Netsuite": "Netsuite",
        /**
         * value: "NewEgg"
         * @const
         */
        "NewEgg": "NewEgg",
        /**
         * value: "Nexternal"
         * @const
         */
        "Nexternal": "Nexternal",
        /**
         * value: "NuOrder"
         * @const
         */
        "NuOrder": "NuOrder",
        /**
         * value: "Opencart"
         * @const
         */
        "Opencart": "Opencart",
        /**
         * value: "OrderWave"
         * @const
         */
        "OrderWave": "OrderWave",
        /**
         * value: "osCommerce1"
         * @const
         */
        "osCommerce1": "osCommerce1",
        /**
         * value: "Overstock"
         * @const
         */
        "Overstock": "Overstock",
        /**
         * value: "PayPal"
         * @const
         */
        "PayPal": "PayPal",
        /**
         * value: "PrestaShop"
         * @const
         */
        "PrestaShop": "PrestaShop",
        /**
         * value: "Pricefalls"
         * @const
         */
        "Pricefalls": "Pricefalls",
        /**
         * value: "Quickbooks"
         * @const
         */
        "Quickbooks": "Quickbooks",
        /**
         * value: "Rakuten"
         * @const
         */
        "Rakuten": "Rakuten",
        /**
         * value: "Sears"
         * @const
         */
        "Sears": "Sears",
        /**
         * value: "Sellbrite"
         * @const
         */
        "Sellbrite": "Sellbrite",
        /**
         * value: "SellerCloud"
         * @const
         */
        "SellerCloud": "SellerCloud",
        /**
         * value: "Shipstation"
         * @const
         */
        "Shipstation": "Shipstation",
        /**
         * value: "Shopify"
         * @const
         */
        "Shopify": "Shopify",
        /**
         * value: "Skubana"
         * @const
         */
        "Skubana": "Skubana",
        /**
         * value: "SolidCommerce"
         * @const
         */
        "SolidCommerce": "SolidCommerce",
        /**
         * value: "SparkPay"
         * @const
         */
        "SparkPay": "SparkPay",
        /**
         * value: "SpreeCommerce"
         * @const
         */
        "SpreeCommerce": "SpreeCommerce",
        /**
         * value: "spsCommerce"
         * @const
         */
        "spsCommerce": "spsCommerce",
        /**
         * value: "StitchLabs"
         * @const
         */
        "StitchLabs": "StitchLabs",
        /**
         * value: "StoneEdge"
         * @const
         */
        "StoneEdge": "StoneEdge",
        /**
         * value: "TradeGecko"
         * @const
         */
        "TradeGecko": "TradeGecko",
        /**
         * value: "UltraCart"
         * @const
         */
        "UltraCart": "UltraCart",
        /**
         * value: "Volusion"
         * @const
         */
        "Volusion": "Volusion",
        /**
         * value: "VTEX"
         * @const
         */
        "VTEX": "VTEX",
        /**
         * value: "Walmart"
         * @const
         */
        "Walmart": "Walmart",
        /**
         * value: "WooCommerce"
         * @const
         */
        "WooCommerce": "WooCommerce",
        /**
         * value: "Yahoo"
         * @const
         */
        "Yahoo": "Yahoo"    };

}
