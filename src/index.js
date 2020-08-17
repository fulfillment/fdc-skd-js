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

import ApiClient from './ApiClient';
import AccessTokenRequestV2 from './model/AccessTokenRequestV2';
import AccessTokenResponseV2 from './model/AccessTokenResponseV2';
import ConsigneeNewV2 from './model/ConsigneeNewV2';
import ConsigneeV2 from './model/ConsigneeV2';
import ConsigneeV21 from './model/ConsigneeV21';
import ErrorStandardV2 from './model/ErrorStandardV2';
import ErrorStandardWithContextV2 from './model/ErrorStandardWithContextV2';
import Feature from './model/Feature';
import FeatureProperties from './model/FeatureProperties';
import Geometry from './model/Geometry';
import IsoCountryV2 from './model/IsoCountryV2';
import ItemInventoryArrayV2 from './model/ItemInventoryArrayV2';
import ItemInventoryArrayV2Item from './model/ItemInventoryArrayV2Item';
import ItemInventoryArrayV2Merchant from './model/ItemInventoryArrayV2Merchant';
import ItemInventoryArrayV2Meta from './model/ItemInventoryArrayV2Meta';
import ItemInventoryArrayV2Quantity from './model/ItemInventoryArrayV2Quantity';
import ItemInventoryArrayV2QuantityTotal from './model/ItemInventoryArrayV2QuantityTotal';
import ItemInventoryV2 from './model/ItemInventoryV2';
import MerchantV2 from './model/MerchantV2';
import OneOfAccessTokenRequestV2 from './model/OneOfAccessTokenRequestV2';
import OneOfGeometryCoordinates from './model/OneOfGeometryCoordinates';
import OneOfOrderResponseOneOfV2 from './model/OneOfOrderResponseOneOfV2';
import OrderRequestV2 from './model/OrderRequestV2';
import OrderResponseOneOfV2 from './model/OrderResponseOneOfV2';
import OrderResponseV2 from './model/OrderResponseV2';
import OrderResponseV2ParentOrder from './model/OrderResponseV2ParentOrder';
import OrderShipV2 from './model/OrderShipV2';
import OrdersItems from './model/OrdersItems';
import OrdersWarehouse from './model/OrdersWarehouse';
import OrdersidstatusStatus from './model/OrdersidstatusStatus';
import PaginationV2 from './model/PaginationV2';
import ReturnV2 from './model/ReturnV2';
import ReturnsArrayV2 from './model/ReturnsArrayV2';
import ReturnsArrayV2Item from './model/ReturnsArrayV2Item';
import ReturnsArrayV2Meta from './model/ReturnsArrayV2Meta';
import ReturnsArrayV2NonRestockedReason from './model/ReturnsArrayV2NonRestockedReason';
import ReturnsArrayV2Order from './model/ReturnsArrayV2Order';
import ReturnsArrayV2Status from './model/ReturnsArrayV2Status';
import ReturnsItems from './model/ReturnsItems';
import RmaItemV2 from './model/RmaItemV2';
import RmaRequestV2 from './model/RmaRequestV2';
import RmaResponseV2 from './model/RmaResponseV2';
import StatusEventV2 from './model/StatusEventV2';
import StatusTypeSimpleV2 from './model/StatusTypeSimpleV2';
import StatusTypeV2 from './model/StatusTypeV2';
import StatusTypeV2ActionRequiredBy from './model/StatusTypeV2ActionRequiredBy';
import StatusTypeV2Stage from './model/StatusTypeV2Stage';
import TrackingEventV2 from './model/TrackingEventV2';
import TrackingNumberV2 from './model/TrackingNumberV2';
import TrackingResponse from './model/TrackingResponse';
import UserContactV2 from './model/UserContactV2';
import UserContactV21 from './model/UserContactV21';
import UserContactV21Merchant from './model/UserContactV21Merchant';
import UserV2 from './model/UserV2';
import AuthApi from './api/AuthApi';
import InventoryApi from './api/InventoryApi';
import OrdersApi from './api/OrdersApi';
import PartnersApi from './api/PartnersApi';
import ReturnsApi from './api/ReturnsApi';
import TrackingApi from './api/TrackingApi';
import UsersApi from './api/UsersApi';

/**
* Welcome_to_our_current_iteration_of_our_REST_API__While_we_encourage_you_to_upgrade_to_v2_0_we_will_continue_support_for_our__SOAP_API_httpsgithub_comfulfillmentsoap_integration__VersioningThe_Fulfillment_com__FDC_REST_API_is_version_controlled_and_backwards_compatible__We_have_many_future_APIs_scheduled_for_publication_within_our_v2_0_spec_so_please_be_prepared_for_us_to_add_data_nodes_in_our_responses_however_we_will_not_remove_knowledge_from_previously_published_APIs__A_Current_Responsejavascript__id_123_A_Potential_Future_Responsejavascript__id_123__reason_More_Knowledge_Getting_StartedWe_use_OAuth_v2_0_to_authenticate_clients_you_can_choose__implicit_httpsoauth_net2grant_typesimplicit_or__password_httpsoauth_net2grant_typespassword_grant_type__To_obtain_an_OAuth_client_id_and_client_secret_contact_your_account_executive_Tip_Generate_an_additional_login_and_use_those_credentials_for_your_integration_so_that_changes_are_accredited_to_that_user_You_are_now_ready_to_make_requests_to_our_other_APIs_by_filling_your_Authorization_header_with_Bearer_access_token__Perpetuating_AccessPerpetuating_access_to_FDC_without_storing_your_password_locally_can_be_achieved_using_the_refresh_token_returned_by__POST_oauthaccess_token_operationgenerateToken_A_simple_concept_to_achieve_this_is_outlined_below_1__Your_applicationscript_will_ask_you_for_your_username_and_password_your_client_id_and_client_secret_will_be_accessible_via_a_DB_or_ENV_2___Request_an_access_token_operationgenerateToken___Your_function_should_be_capable_of_formatting_your_request_for_both_a_grant_type_of_password__step_1_and_refresh_token__step_4_3__Store_the_access_token_and_refresh_token_so_future_requests_can_skip_step_14__When_the_access_token_expires_request_anew_using_your_refresh_token_replace_both_tokens_in_local_storage__If_this_fails_you_will_have_to_revert_to_step_1_Alternatively_if_you_choose_for_your_applicationscript_to_have_access_to_your_username_and_password_you_can_skip_step_4_In_all_scenarios_we_recommend_storing_all_credentials_outside_your_codebase__Date_Time_DefinitionsWe_will_report_all_date_time_stamps_using_the__ISO_8601_httpsen_wikipedia_orgwikiISO_8601_standard__When_using_listing_APIs_where_fromDate_and_toDate_are_available_note_that_both_dates_are_inclusive_while_requiring_the_fromDate_to_be_before_or_at_the_toDate__The_Fulfillment_ProcessMany_steps_are_required_to_fulfill_your_order_we_report_back_to_you_three_fundamental_milestones_inside_the_orders_model__recordedOn_When_we_received_your_order__This_will_never_change__dispatchDate_When_the_current_iteration_of_your_order_was_scheduled_for_fulfillment__This_may_change_however_it_is_an_indicator_that_the_physical_process_of_fulfillment_has_begun_and_a_tracking_number_has_been_assigned_to_your_order__The_tracking_number_MAY_CHANGE__You_will_not_be_able_to_cancel_an_order_once_it_has_been_dispatched__If_you_need_to_recall_an_order_that_has_been_dispatched_please_contact_your_account_executive__departDate_When_we_recorded_your_order_passing_our_final_inspection_and_placed_with_the_carrier__At_this_point_it_is_safe_to_inform_the_consignee_of_the_tracking_number_as_it_will_not_change__Evaluating_Error_ResponsesWe_currently_return_two_different_error_models_with_and_without_context__All_errors_will_include_a_message_node_while_errors_with_context_will_include_additional_information_designed_to_save_you_time_when_encountering_highly_probable_errors__For_example_when_you_send_us_a_request_to_create_a_duplicate_order_we_will_reject_your_request_and_the_context_will_include_the_FDC_order_id_so_that_you_may_record_it_for_your_records__Without_ContextNew_order_with_missing_required_fields__Header__Response____________________Status__400_Bad_Request_javascript______message_Invalid_request_body_With_ContextNew_order_with_duplicate_merchantOrderId__Header__Response____________________Status__409_Conflict_javascript__message_Duplicate_Order__context_____id_123___Status_CodesCodes_are_a_concatenation_of_State_Stage_and_Detail___0_92__0_92__0_92_Code__State_______________Stage_____Detail______________________________________________________________010101__Processing_Order__Recieved__Customer_Order__010102__Processing_Order__Recieved__Recieved__010201__Processing_Order__Approved___010301__Processing_Order__Hold__Merchant_Stock__010302__Processing_Order__Hold__Merchant_Funds__010303__Processing_Order__Hold__For_Merchant__010304__Processing_Order__Hold__Oversized_Shipment__010305__Processing_Order__Hold__Invalid_Parent_Order__010306__Processing_Order__Hold__Invalid_Address__010307__Processing_Order__Hold__By_Admin__010401__Processing_Order__Address_Problem__Incomplete_Address__010402__Processing_Order__Address_Problem__Invalid_Locality__010403__Processing_Order__Address_Problem__Invalid_Region__010404__Processing_Order__Address_Problem__Address_Not_Found__010405__Processing_Order__Address_Problem__Many_Addresses_Found__010406__Processing_Order__Address_Problem__Invalid_Postal_Code__010407__Processing_Order__Address_Problem__Country_Not_Mapped__010408__Processing_Order__Address_Problem__Invalid_Recipient_Name__010409__Processing_Order__Address_Problem__Bad_UK_Address__010410__Processing_Order__Address_Problem__Invalid_Address_Line_1_or_2__010501__Processing_Order__Sku_Problem__Invalid_SKU__010501__Processing_Order__Sku_Problem__Child_Order_has_Invalid_SKUs__010601__Processing_Order__Facility_Problem__Facility_Not_Mapped__010701__Processing_Order__Ship_Method_Problem__Unmapped_Ship_Method__010702__Processing_Order__Ship_Method_Problem__Unmapped_Ship_Cost__010703__Processing_Order__Ship_Method_Problem__Missing_Ship_Method__010704__Processing_Order__Ship_Method_Problem__Invalid_Ship_Method__010705__Processing_Order__Ship_Method_Problem__Order_Weight_Outside_of_Ship_Method_Weight__010801__Processing_Order__Inventory_Problem__Insufficient_Inventory_In_Facility__010802__Processing_Order__Inventory_Problem__Issue_Encountered_During_Inventory_Adjustment__010901__Processing_Order__Released_To_WMS__Released__020101__Fulfillment_In_Progress__Postage_Problem__Address_Issue__020102__Fulfillment_In_Progress__Postage_Problem__Postage_OK_OMS_Issue_Occurred__020103__Fulfillment_In_Progress__Postage_Problem__Postage_Void_Failed__020201__Fulfillment_In_Progress__Postage_Acquired___020301__Fulfillment_In_Progress__Postage_Voided__Postage_Void_Failed_Gracefully__020301__Fulfillment_In_Progress__Hold__Departure_Hold_Requested__020401__Fulfillment_In_Progress__4PL_Processing___020501__Fulfillment_In_Progress__4PL_Problem__Order_is_Proccessable_Postage_Issue_Occurred__020601__Fulfillment_In_Progress__Label_Printed___020701__Fulfillment_In_Progress__Shipment_Cubed___020801__Fulfillment_In_Progress__Picking_Inventory___020901__Fulfillment_In_Progress__Label_Print_Verified___021001__Fulfillment_In_Progress__Passed_Final_Inspection___030101__Shipped__Fulfilled_By_4PL___030102__Shipped__Fulfilled_By_4PL__Successfully_Fulfilled_OMS_Encountered_Issue_During_Processing__030201__Shipped__Fulfilled_By_FDC___040101__Returned__Returned___050101__Cancelled__Cancelled___060101__Test__Test__Test_.<br>
* The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
* <p>
* An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
* <pre>
* var FulfillmentcomApIv2 = require('index'); // See note below*.
* var xxxSvc = new FulfillmentcomApIv2.XxxApi(); // Allocate the API class we're going to use.
* var yyyModel = new FulfillmentcomApIv2.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
* and put the application logic within the callback function.</em>
* </p>
* <p>
* A non-AMD browser application (discouraged) might do something like this:
* <pre>
* var xxxSvc = new FulfillmentcomApIv2.XxxApi(); // Allocate the API class we're going to use.
* var yyy = new FulfillmentcomApIv2.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* </p>
* @module index
* @version 2.0
*/
export {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient,

    /**
     * The AccessTokenRequestV2 model constructor.
     * @property {module:model/AccessTokenRequestV2}
     */
    AccessTokenRequestV2,

    /**
     * The AccessTokenResponseV2 model constructor.
     * @property {module:model/AccessTokenResponseV2}
     */
    AccessTokenResponseV2,

    /**
     * The ConsigneeNewV2 model constructor.
     * @property {module:model/ConsigneeNewV2}
     */
    ConsigneeNewV2,

    /**
     * The ConsigneeV2 model constructor.
     * @property {module:model/ConsigneeV2}
     */
    ConsigneeV2,

    /**
     * The ConsigneeV21 model constructor.
     * @property {module:model/ConsigneeV21}
     */
    ConsigneeV21,

    /**
     * The ErrorStandardV2 model constructor.
     * @property {module:model/ErrorStandardV2}
     */
    ErrorStandardV2,

    /**
     * The ErrorStandardWithContextV2 model constructor.
     * @property {module:model/ErrorStandardWithContextV2}
     */
    ErrorStandardWithContextV2,

    /**
     * The Feature model constructor.
     * @property {module:model/Feature}
     */
    Feature,

    /**
     * The FeatureProperties model constructor.
     * @property {module:model/FeatureProperties}
     */
    FeatureProperties,

    /**
     * The Geometry model constructor.
     * @property {module:model/Geometry}
     */
    Geometry,

    /**
     * The IsoCountryV2 model constructor.
     * @property {module:model/IsoCountryV2}
     */
    IsoCountryV2,

    /**
     * The ItemInventoryArrayV2 model constructor.
     * @property {module:model/ItemInventoryArrayV2}
     */
    ItemInventoryArrayV2,

    /**
     * The ItemInventoryArrayV2Item model constructor.
     * @property {module:model/ItemInventoryArrayV2Item}
     */
    ItemInventoryArrayV2Item,

    /**
     * The ItemInventoryArrayV2Merchant model constructor.
     * @property {module:model/ItemInventoryArrayV2Merchant}
     */
    ItemInventoryArrayV2Merchant,

    /**
     * The ItemInventoryArrayV2Meta model constructor.
     * @property {module:model/ItemInventoryArrayV2Meta}
     */
    ItemInventoryArrayV2Meta,

    /**
     * The ItemInventoryArrayV2Quantity model constructor.
     * @property {module:model/ItemInventoryArrayV2Quantity}
     */
    ItemInventoryArrayV2Quantity,

    /**
     * The ItemInventoryArrayV2QuantityTotal model constructor.
     * @property {module:model/ItemInventoryArrayV2QuantityTotal}
     */
    ItemInventoryArrayV2QuantityTotal,

    /**
     * The ItemInventoryV2 model constructor.
     * @property {module:model/ItemInventoryV2}
     */
    ItemInventoryV2,

    /**
     * The MerchantV2 model constructor.
     * @property {module:model/MerchantV2}
     */
    MerchantV2,

    /**
     * The OneOfAccessTokenRequestV2 model constructor.
     * @property {module:model/OneOfAccessTokenRequestV2}
     */
    OneOfAccessTokenRequestV2,

    /**
     * The OneOfGeometryCoordinates model constructor.
     * @property {module:model/OneOfGeometryCoordinates}
     */
    OneOfGeometryCoordinates,

    /**
     * The OneOfOrderResponseOneOfV2 model constructor.
     * @property {module:model/OneOfOrderResponseOneOfV2}
     */
    OneOfOrderResponseOneOfV2,

    /**
     * The OrderRequestV2 model constructor.
     * @property {module:model/OrderRequestV2}
     */
    OrderRequestV2,

    /**
     * The OrderResponseOneOfV2 model constructor.
     * @property {module:model/OrderResponseOneOfV2}
     */
    OrderResponseOneOfV2,

    /**
     * The OrderResponseV2 model constructor.
     * @property {module:model/OrderResponseV2}
     */
    OrderResponseV2,

    /**
     * The OrderResponseV2ParentOrder model constructor.
     * @property {module:model/OrderResponseV2ParentOrder}
     */
    OrderResponseV2ParentOrder,

    /**
     * The OrderShipV2 model constructor.
     * @property {module:model/OrderShipV2}
     */
    OrderShipV2,

    /**
     * The OrdersItems model constructor.
     * @property {module:model/OrdersItems}
     */
    OrdersItems,

    /**
     * The OrdersWarehouse model constructor.
     * @property {module:model/OrdersWarehouse}
     */
    OrdersWarehouse,

    /**
     * The OrdersidstatusStatus model constructor.
     * @property {module:model/OrdersidstatusStatus}
     */
    OrdersidstatusStatus,

    /**
     * The PaginationV2 model constructor.
     * @property {module:model/PaginationV2}
     */
    PaginationV2,

    /**
     * The ReturnV2 model constructor.
     * @property {module:model/ReturnV2}
     */
    ReturnV2,

    /**
     * The ReturnsArrayV2 model constructor.
     * @property {module:model/ReturnsArrayV2}
     */
    ReturnsArrayV2,

    /**
     * The ReturnsArrayV2Item model constructor.
     * @property {module:model/ReturnsArrayV2Item}
     */
    ReturnsArrayV2Item,

    /**
     * The ReturnsArrayV2Meta model constructor.
     * @property {module:model/ReturnsArrayV2Meta}
     */
    ReturnsArrayV2Meta,

    /**
     * The ReturnsArrayV2NonRestockedReason model constructor.
     * @property {module:model/ReturnsArrayV2NonRestockedReason}
     */
    ReturnsArrayV2NonRestockedReason,

    /**
     * The ReturnsArrayV2Order model constructor.
     * @property {module:model/ReturnsArrayV2Order}
     */
    ReturnsArrayV2Order,

    /**
     * The ReturnsArrayV2Status model constructor.
     * @property {module:model/ReturnsArrayV2Status}
     */
    ReturnsArrayV2Status,

    /**
     * The ReturnsItems model constructor.
     * @property {module:model/ReturnsItems}
     */
    ReturnsItems,

    /**
     * The RmaItemV2 model constructor.
     * @property {module:model/RmaItemV2}
     */
    RmaItemV2,

    /**
     * The RmaRequestV2 model constructor.
     * @property {module:model/RmaRequestV2}
     */
    RmaRequestV2,

    /**
     * The RmaResponseV2 model constructor.
     * @property {module:model/RmaResponseV2}
     */
    RmaResponseV2,

    /**
     * The StatusEventV2 model constructor.
     * @property {module:model/StatusEventV2}
     */
    StatusEventV2,

    /**
     * The StatusTypeSimpleV2 model constructor.
     * @property {module:model/StatusTypeSimpleV2}
     */
    StatusTypeSimpleV2,

    /**
     * The StatusTypeV2 model constructor.
     * @property {module:model/StatusTypeV2}
     */
    StatusTypeV2,

    /**
     * The StatusTypeV2ActionRequiredBy model constructor.
     * @property {module:model/StatusTypeV2ActionRequiredBy}
     */
    StatusTypeV2ActionRequiredBy,

    /**
     * The StatusTypeV2Stage model constructor.
     * @property {module:model/StatusTypeV2Stage}
     */
    StatusTypeV2Stage,

    /**
     * The TrackingEventV2 model constructor.
     * @property {module:model/TrackingEventV2}
     */
    TrackingEventV2,

    /**
     * The TrackingNumberV2 model constructor.
     * @property {module:model/TrackingNumberV2}
     */
    TrackingNumberV2,

    /**
     * The TrackingResponse model constructor.
     * @property {module:model/TrackingResponse}
     */
    TrackingResponse,

    /**
     * The UserContactV2 model constructor.
     * @property {module:model/UserContactV2}
     */
    UserContactV2,

    /**
     * The UserContactV21 model constructor.
     * @property {module:model/UserContactV21}
     */
    UserContactV21,

    /**
     * The UserContactV21Merchant model constructor.
     * @property {module:model/UserContactV21Merchant}
     */
    UserContactV21Merchant,

    /**
     * The UserV2 model constructor.
     * @property {module:model/UserV2}
     */
    UserV2,

    /**
    * The AuthApi service constructor.
    * @property {module:api/AuthApi}
    */
    AuthApi,

    /**
    * The InventoryApi service constructor.
    * @property {module:api/InventoryApi}
    */
    InventoryApi,

    /**
    * The OrdersApi service constructor.
    * @property {module:api/OrdersApi}
    */
    OrdersApi,

    /**
    * The PartnersApi service constructor.
    * @property {module:api/PartnersApi}
    */
    PartnersApi,

    /**
    * The ReturnsApi service constructor.
    * @property {module:api/ReturnsApi}
    */
    ReturnsApi,

    /**
    * The TrackingApi service constructor.
    * @property {module:api/TrackingApi}
    */
    TrackingApi,

    /**
    * The UsersApi service constructor.
    * @property {module:api/UsersApi}
    */
    UsersApi
};
