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
import ConsigneeV21 from './ConsigneeV21';
import MerchantV2 from './MerchantV2';
import OrderResponseV2ParentOrder from './OrderResponseV2ParentOrder';
import Paths1orderspostresponses201contentapplication1jsonschemapropertiesoriginalConsignee from './Paths1orderspostresponses201contentapplication1jsonschemapropertiesoriginalConsignee';
import StatusEventV2 from './StatusEventV2';
import TrackingNumberV2 from './TrackingNumberV2';
import UserV2 from './UserV2';

/**
* The OrderResponseV2 model module.
* @module model/OrderResponseV2
* @version 2.0
*/
export default class OrderResponseV2 {
    /**
    * Constructs a new <code>OrderResponseV2</code>.
    * @alias module:model/OrderResponseV2
    * @class
    * @param id {Number} FDC ID for this order
    * @param validatedConsignee {module:model/Paths1orderspostresponses201contentapplication1jsonschemapropertiesoriginalConsignee} 
    * @param originalConsignee {module:model/ConsigneeV21} 
    * @param currentStatus {module:model/StatusEventV2} 
    * @param merchant {module:model/MerchantV2} 
    * @param recordedOn {Date} DateTime order was recorded by FDC
    * @param merchantShippingMethod {String} Requested ship method
    * @param merchantOrderId {String} Merchant provided ID
    */

    constructor(id, validatedConsignee, originalConsignee, currentStatus, merchant, recordedOn, merchantShippingMethod, merchantOrderId) {
        
        
        this['id'] = id;
        this['validatedConsignee'] = validatedConsignee;
        this['originalConsignee'] = originalConsignee;
        this['currentStatus'] = currentStatus;
        this['merchant'] = merchant;
        this['recordedOn'] = recordedOn;
        this['merchantShippingMethod'] = merchantShippingMethod;
        this['merchantOrderId'] = merchantOrderId;
        
    }

    /**
    * Constructs a <code>OrderResponseV2</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/OrderResponseV2} obj Optional instance to populate.
    * @return {module:model/OrderResponseV2} The populated <code>OrderResponseV2</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new OrderResponseV2();
                        
            
            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('trackingNumbers')) {
                obj['trackingNumbers'] = ApiClient.convertToType(data['trackingNumbers'], [TrackingNumberV2]);
            }
            if (data.hasOwnProperty('validatedConsignee')) {
                obj['validatedConsignee'] = Paths1orderspostresponses201contentapplication1jsonschemapropertiesoriginalConsignee.constructFromObject(data['validatedConsignee']);
            }
            if (data.hasOwnProperty('originalConsignee')) {
                obj['originalConsignee'] = ConsigneeV21.constructFromObject(data['originalConsignee']);
            }
            if (data.hasOwnProperty('currentStatus')) {
                obj['currentStatus'] = StatusEventV2.constructFromObject(data['currentStatus']);
            }
            if (data.hasOwnProperty('warehouse')) {
                obj['warehouse'] = UserV2.constructFromObject(data['warehouse']);
            }
            if (data.hasOwnProperty('merchant')) {
                obj['merchant'] = MerchantV2.constructFromObject(data['merchant']);
            }
            if (data.hasOwnProperty('departDate')) {
                obj['departDate'] = ApiClient.convertToType(data['departDate'], 'Date');
            }
            if (data.hasOwnProperty('dispatchDate')) {
                obj['dispatchDate'] = ApiClient.convertToType(data['dispatchDate'], 'Date');
            }
            if (data.hasOwnProperty('recordedOn')) {
                obj['recordedOn'] = ApiClient.convertToType(data['recordedOn'], 'Date');
            }
            if (data.hasOwnProperty('merchantShippingMethod')) {
                obj['merchantShippingMethod'] = ApiClient.convertToType(data['merchantShippingMethod'], 'String');
            }
            if (data.hasOwnProperty('purchaseOrderNum')) {
                obj['purchaseOrderNum'] = ApiClient.convertToType(data['purchaseOrderNum'], 'String');
            }
            if (data.hasOwnProperty('merchantOrderId')) {
                obj['merchantOrderId'] = ApiClient.convertToType(data['merchantOrderId'], 'String');
            }
            if (data.hasOwnProperty('parentOrder')) {
                obj['parentOrder'] = OrderResponseV2ParentOrder.constructFromObject(data['parentOrder']);
            }
        }
        return obj;
    }

    /**
    * FDC ID for this order
    * @member {Number} id
    */
    'id' = undefined;
    /**
    * @member {Array.<module:model/TrackingNumberV2>} trackingNumbers
    */
    'trackingNumbers' = undefined;
    /**
    * @member {module:model/Paths1orderspostresponses201contentapplication1jsonschemapropertiesoriginalConsignee} validatedConsignee
    */
    'validatedConsignee' = undefined;
    /**
    * @member {module:model/ConsigneeV21} originalConsignee
    */
    'originalConsignee' = undefined;
    /**
    * @member {module:model/StatusEventV2} currentStatus
    */
    'currentStatus' = undefined;
    /**
    * @member {module:model/UserV2} warehouse
    */
    'warehouse' = undefined;
    /**
    * @member {module:model/MerchantV2} merchant
    */
    'merchant' = undefined;
    /**
    * DateTime order departed an FDC warehouse
    * @member {Date} departDate
    */
    'departDate' = undefined;
    /**
    * DateTime order was dispatched for fulfillment by FDC
    * @member {Date} dispatchDate
    */
    'dispatchDate' = undefined;
    /**
    * DateTime order was recorded by FDC
    * @member {Date} recordedOn
    */
    'recordedOn' = undefined;
    /**
    * Requested ship method
    * @member {String} merchantShippingMethod
    */
    'merchantShippingMethod' = undefined;
    /**
    * Merchant provided PO#
    * @member {String} purchaseOrderNum
    */
    'purchaseOrderNum' = undefined;
    /**
    * Merchant provided ID
    * @member {String} merchantOrderId
    */
    'merchantOrderId' = undefined;
    /**
    * @member {module:model/OrderResponseV2ParentOrder} parentOrder
    */
    'parentOrder' = undefined;




}
