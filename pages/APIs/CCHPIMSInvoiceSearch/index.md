# OpenAPI: CCH.PIMS.Invoice.Search (0.6.21)

## Tags

* **Invoices**: Retrieve PIMS invoices.
* **MgaInvoices**: Retrieve MGA staging invoices.

---

## Paths

### `GET` /api/invoice-management/invoices

> Get Invoice by 'Invoice number and VetId' or by 'Invoice number and LiveRamp householdId'

  * **Operation ID:** `getInvoice`
  * **Description:** Gets invoice.
  * **Tags:** `Invoices`
  * **Security:**
      * `apiKey: []`

**Parameters**

| Name | In | Required | Description | Schema |
| :--- | :--- | :--- | :--- | :--- |
| `invoiceNumber` | query | **true** | The invoice number. | `string` (maxLength: 255) |
| `householdId` | query | false | The LiveRamp household identifier. | `string` (maxLength: 255) |
| `vetId` | query | false | The vet identifier. | `string` (maxLength: 255) |

**Responses**

  * **`200 OK`**: The invoice(s) has been obtained.
      * **Content:** `application/json`
          * **Schema:** array of `$ref: '#/components/schemas/pimsInvoice'`
  * **`400 Bad Request`**: `$ref: '#/components/responses/badRequest'`
  * **`401 Unauthorized`**: `$ref: '#/components/responses/unauthorized'`
  * **`500 Internal Server Error`**: `$ref: '#/components/responses/internalServerError'`
  * **`503 Service Unavailable`**: `$ref: '#/components/responses/serviceUnavailable'`

-----

### `GET` /api/invoice-management/health

> Get service health status

  * **Operation ID:** `getHealthStatus`
  * **Description:** Get service health status.
  * **Tags:** `Invoices`
  * **Security:**
      * `apiKey: []`

**Responses**

  * **`200 OK`**: The service is healthy.
      * **Content:** `application/json`
          * **Schema:** `$ref: '#/components/schemas/healthResponse'`
          * **Example:**
            ```json
            {
              "status": "Healthy"
            }
            ```
  * **`400 Bad Request`**: The service is unhealthy.
      * **Content:** `application/json`
          * **Schema:** `$ref: '#/components/schemas/healthResponse'`
          * **Example:**
            ```json
            {
              "status": "Unhealthy",
              "errors": [
                "Value should be specified for the Bulldog userName",
                "CosmosDb Authentication key is required"
              ]
            }
            ```
  * **`500 Internal Server Error`**: `$ref: '#/components/responses/internalServerError'`
  * **`503 Service Unavailable`**: `$ref: '#/components/responses/serviceUnavailable'`

-----

### `GET` /api/invoice-management/mgas/{mgaName}/invoices/{mgaInvoiceId}

> Get mga invoice by 'mgaInvoiceId'

  * **Operation ID:** `getMgaInvoice`
  * **Description:** Gets invoice.
  * **Tags:** `MgaInvoices`
  * **Security:**
      * `apiKey: []`

**Parameters**

| Name | In | Required | Description | Schema |
| :--- | :--- | :--- | :--- | :--- |
| `mgaName` | path | **true** | Name of the MGA. | `string` (maxLength: 255) |
| `mgaInvoiceId` | path | **true** | The mga invoice identifier. | `string` (maxLength: 255) |

**Responses**

  * **`200 OK`**: The mga invoice(s) has been obtained.
      * **Content:** `application/json`
          * **Schema:** `$ref: '#/components/schemas/mgaInvoice'`
  * **`400 Bad Request`**: `$ref: '#/components/responses/badRequest'`
  * **`401 Unauthorized`**: `$ref: '#/components/responses/unauthorized'`
  * **`404 Not Found`**: `$ref: '#/components/responses/notFoundError'`
  * **`500 Internal Server Error`**: `$ref: '#/components/responses/internalServerError'`
  * **`503 Service Unavailable`**: `$ref: '#/components/responses/serviceUnavailable'`

-----

### `GET` /api/invoice-management/mgas/{mgaName}/invoices

> Get MGA Invoice list

  * **Operation ID:** `mgaInvoiceList`
  * **Description:** Get MGA invoices using filter.
  * **Tags:** `MgaInvoices`
  * **Security:**
      * `apiKey: []`

**Parameters**

| Name | In | Required | Description | Schema |
| :--- | :--- | :--- | :--- | :--- |
| `mgaName` | path | **true** | Name of the MGA. | `string` (maxLength: 255) |
| `customerId` | query | false | Customer identifier. | `string` (maxLength: 255) |
| `stagingStatuses` | query | false | The status of the staging invoice. | array of `string`<br>Enum: `[Pending, InProgress, StagingAvailable, StagingUnavailable, Completed]` |
| `createdAfter` | query | false | DateTime after staging invoice was create. | `string` (date-time, maxLength: 255) |

**Responses**

  * **`200 OK`**: The mga invoice(s) has been obtained.
      * **Content:** `application/json`
          * **Schema:** array of `$ref: '#/components/schemas/mgaInvoice'`
  * **`400 Bad Request`**: `$ref: '#/components/responses/badRequest'`
  * **`401 Unauthorized`**: `$ref: '#/components/responses/unauthorized'`
  * **`500 Internal Server Error`**: `$ref: '#/components/responses/internalServerError'`
  * **`503 Service Unavailable`**: `$ref: '#/components/responses/serviceUnavailable'`

-----

### `PATCH` /api/invoice-management/mgas/{mgaName}/invoices/{mgaInvoiceId}/status

> Update MGA invoice status

  * **Operation ID:** `updateMgaInvoiceStatus`
  * **Description:** Update MGA invoice status by mgaInvoiceId.
  * **Tags:** `MgaInvoices`
  * **Security:**
      * `apiKey: []`

**Parameters**

| Name | In | Required | Description | Schema |
| :--- | :--- | :--- | :--- | :--- |
| `mgaName` | path | **true** | Name of the MGA. | `string` (maxLength: 255) |
| `mgaInvoiceId` | path | **true** | The mga invoice identifier. | `string` (maxLength: 255) |

**Request Body**

  * **Required:** `true`
  * **Content:** `application/json`
      * **Schema:** `$ref: '#/components/schemas/updateMgaInvoiceStatusRequest'`

**Responses**

  * **`200 OK`**: The MGA invoice(s) has been obtained.
  * **`400 Bad Request`**: `$ref: '#/components/responses/badRequest'`
  * **`401 Unauthorized`**: `$ref: '#/components/responses/unauthorized'`
  * **`403 Forbidden`**: `$ref: '#/components/responses/forbidden'`
  * **`404 Not Found`**: `$ref: '#/components/responses/notFoundError'`
  * **`500 Internal Server Error`**: `$ref: '#/components/responses/internalServerError'`
  * **`503 Service Unavailable`**: `$ref: '#/components/responses/serviceUnavailable'`

-----

## Tags

  * **Invoices**: A set of APIs for retrieving PIMS invoices.
  * **MgaInvoices**: A set of APIs for retrieving staging invoices.

-----

## Components

### Security Schemes

  * **`apiKey`**
      * **Type:** `apiKey`
      * **In:** `header`
      * **Name:** `api-key`
      * **Description:** Authentication with an API key.

-----

### Reusable Parameters

| Name | In | Required | Description | Schema |
| :--- | :--- | :--- | :--- | :--- |
| `invoiceId` | path | **true** | The invoice identifier. | `string` (maxLength: 255) |
| `mgaInvoiceId` | path | **true** | The mga invoice identifier. | `string` (maxLength: 255) |
| `mgaName` | path | **true** | Name of the MGA. | `string` (maxLength: 255) |
| `customerId` | query | false | Customer identifier. | `string` (maxLength: 255) |
| `stagingStatuses`| query | false | The status of the staging invoice. | array of `string`<br>Enum: `[Pending, InProgress, StagingAvailable, StagingUnavailable, Completed]` |
| `createdAfter` | query | false | DateTime after staging invoice was create. | `string` (date-time, maxLength: 255) |
| `invoiceNumber` | query | **true** | The invoice number. | `string` (maxLength: 255) |
| `householdId` | query | false | The LiveRamp household identifier. | `string` (maxLength: 255) |
| `vetId` | query | false | The vet identifier. | `string` (maxLength: 255) |

-----

### Reusable Responses

  * **`badRequest`**

      * **Description:** Bad Request - The request is invalid or malformed. For example, some data is missing or data format is not valid...
      * **Content:** `application/json`
          * **Schema:** `$ref: '#/components/schemas/serviceErrorResponse'`
          * **Example:**
            ```json
            {
              "error": {
                "code": "BadRequest",
                "message": "The server cannot or will not process the request due to something that is perceived to be a client error."
              }
            }
            ```

  * **`unauthorized`**

      * **Description:** Unauthorized - The requester is not authenticated. This status may indicate that authentication credentials are not provided, invalid, or malformed...

  * **`forbidden`**

      * **Description:** Forbidden - The requester is not authorized to perform this request. Usually, this status indicates that the requester is authenticated but does not have enough permissions...

  * **`notFoundError`**

      * **Description:** Not Found - The resource is not registered on the service side. Usually, this status indicates that the resource is deleted...

  * **`internalServerError`**

      * **Description:** Internal Server Error - An unexpected error has occurred in the service while processing the request. It is recommended to retry the request 30 seconds later...
      * **Content:** `application/json`
          * **Schema:** `$ref: '#/components/schemas/serviceErrorResponse'`

  * **`serviceUnavailable`**

      * **Description:** Service Unavailable - The service is temporarily unavailable due to maintenance or for some other reason. It is recommended to retry the request one minute later.

-----

### Schemas

#### `healthResponse`

  * **Type:** `object`
  * **Description:** A health response.
  * **Required:** `[ status ]`
  * **Properties:**
    | Name | Type | Description |
    | :--- | :--- | :--- |
    | `status` | `string` | Enum: `[ Healthy, Unhealthy ]` |
    | `errors` | array of `string` | |

#### `updateMgaInvoiceStatusRequest`

  * **Type:** `object`
  * **Description:** A request for update staging invoice status
  * **Properties:**
    | Name | Type | Description |
    | :--- | :--- | :--- |
    | `stagingStatus` | `string` | Staging status of the invoice<br>Enum: `[Pending, InProgress, StagingAvailable, StagingUnavailable, Completed]` |
    | `stagingMessage`| `string` | Staging message of the invoice |

#### `mgaInvoice`

  * **Type:** `object`
  * **Description:** An invoice decorated with staging properties
  * **Properties:**
    | Name | Type | Description |
    | :--- | :--- | :--- |
    | `mgaInvoiceId` | `string` | The mga invoice identifier |
    | `mgaName` | `string` | The mga name |
    | `customerId` | `string` | The customer identifier |
    | `householdId` | `string` | The global customer identifier |
    | `stagingStatus`| `string` | The staging status of the mga invoice<br>Enum: `[Pending, InProgress, StagingAvailable, StagingUnavailable, Completed]` |
    | `stagingMessage`| `string` | The staging message of the mga invoice |
    | `invoice` | `$ref: '#/components/schemas/pimsInvoice'` | |

#### `pimsInvoice`

  * **Type:** `object`
  * **Description:** An invoice.
  * **Properties:**
    | Name | Type | Description |
    | :--- | :--- | :--- |
    | `invoiceId` | `string` | The invoice identifier. |
    | `invoiceNumber` | `string` | The invoice number. |
    | `invoiceDate` | `string` | The invoice date. |
    | `total` | `number` | The invoice total amount. |
    | `vet` | `$ref: '#/components/schemas/vetPractice'` | |
    | `pets` | array of `$ref: '#/components/schemas/pet'` | |

#### `vetPractice`

  * **Type:** `object`
  * **Description:** The Vet Practice object.
  * **Properties:**
    | Name | Type | Description |
    | :--- | :--- | :--- |
    | `vetId` | `string` | The vet practice identifier. |
    | `name` | `string` | The vet practice name. |
    | `address` | `string` | The vet practice address line. |
    | `city` | `string` | The vet practice city. |
    | `state` | `string` | The vet practice state. |
    | `zipCode` | `string` | The vet practice zip code. |
    | `country` | `string` | The vet practice country. |

#### `pet`

  * **Type:** `object`
  * **Description:** The pet object.
  * **Properties:**
    | Name | Type | Description |
    | :--- | :--- | :--- |
    | `petName` | `string` | The pet name. |
    | `subTotal` | `number` | The subtotal for the pet. |
    | `invoiceItems` | array of `$ref: '#/components/schemas/invoiceItem'` | The invoice items. |

#### `invoiceItem`

  * **Type:** `object`
  * **Description:** The invoice line item object.
  * **Properties:**
    | Name | Type | Description |
    | :--- | :--- | :--- |
    | `invoiceItemId` | `string` | The invoice item id. |
    | `description` | `string` | The line number description. |
    | `lossDate` | `string` | The line number loss date. |
    | `quantity` | `number` | The quantity. |
    | `amountCharged` | `number` | The amount charged. |
    | `code` | `string` | The code. |

#### `serviceErrorResponse`

  * **Type:** `object`
  * **Description:** An error response.
  * **Required:** `[ error ]`
  * **Properties:**
    | Name | Type |
    | :--- | :--- |
    | `error` | `$ref: '#/components/schemas/serviceError'` |

#### `serviceError`

  * **Type:** `object`
  * **Description:** A service error in the form exposed to the outside.
  * **Required:** `[ code, message ]`
  * **Properties:**
    | Name | Type | Description |
    | :--- | :--- | :--- |
    | `code` | `string` | The error code. |
    | `message` | `string` | The human-readable representation of the error. |
    | `details` | array of `$ref: '#/components/schemas/serviceErrorDetail'` | The additional level of details regarding the error. |
    | `innerError` | `$ref: '#/components/schemas/serviceError'` | |

#### `serviceErrorDetail`

  * **Type:** `object`
  * **Description:** An additional detail about the service error.
  * **Required:** `[ target, message ]`
  * **Properties:**
    | Name | Type | Description |
    | :--- | :--- | :--- |
    | `target` | `string` | The target of the error detail. |
    | `message` | `string` | The human-readable representation of the error detail. |