# OpenAPI: ClarusTech.MGAInvoices.ApiGateway (0.3.1)

## Tags

* **Monitoring**: Internal monitoring endpoints
* **Invoices**: Invoice processing and retrieval
* **CallBacks**: Internal callback endpoints
* **Staged Invoices**: Manage staged invoices
* **Requests**: Manage request statuses

---

## Paths

### POST /api/v1/invoices/{customerId}/process

  * **Summary:** General Invoice Processing.
  * **Operation ID:** `processInvoice`
  * **Description:** The file is validated and stored in cloud storage if it meets validation criteria.
  * **Tags:** `Invoices`
  * **Security:** `jwtToken`, `apiKey`

**Parameters:**

  * `$ref: '#/components/parameters/customerIdPath'`
  * `$ref: '#/components/parameters/fileMd5'`

**Request Body (Required):**

  * **Content:** `application/octet-stream`
  * **Schema:** `string: binary`

**Responses:**

  * **`200 OK`**: Processing started.
      * **Content:** `application/json`
      * **Schema:** `$ref: '#/components/schemas/fileUploadReply'`
  * **`400`**: `$ref: '#/components/responses/badRequest'`
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`403`**: `$ref: '#/components/responses/forbidden'`
  * **`412`**: `$ref: '#/components/responses/preconditionFailed'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### POST /api/v1/invoices/{customerId}/lookup

  * **Summary:** Practice-Specific Invoice Processing.
  * **Operation ID:** `lookupInvoice`
  * **Description:** The file is validated and stored in cloud storage if it meets validation criteria.
  * **Tags:** `Invoices`
  * **Security:** `jwtToken`, `apiKey`

**Parameters:**

  * `$ref: '#/components/parameters/customerIdPath'`
  * `$ref: '#/components/parameters/fileMd5'`

**Request Body (Required):**

  * **Content:** `application/octet-stream`
  * **Schema:** `string: binary`

**Responses:**

  * **`200 OK`**: Processing started.
      * **Content:** `application/json`
      * **Schema:** `$ref: '#/components/schemas/fileUploadReply'`
  * **`400`**: `$ref: '#/components/responses/badRequest'`
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`403`**: `$ref: '#/components/responses/forbidden'`
  * **`412`**: `$ref: '#/components/responses/preconditionFailed'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### GET /api/v1/invoices/{customerId}/lookup/{invoiceNumber}

  * **Summary:** Direct Invoice Number Lookup.
  * **Operation ID:** `directLookupInvoice`
  * **Description:** Retrieve invoice data by customer ID and invoice number.
  * **Tags:** `Invoices`
  * **Security:** `jwtToken`, `apiKey`

**Parameters:**

  * `$ref: '#/components/parameters/customerIdPath'`
  * `$ref: '#/components/parameters/invoiceNumber'`

**Responses:**

  * **`200 OK`**: The invoice(s) has been obtained.
      * **Content:** `application/json`
      * **Schema:** `$ref: '#/components/schemas/pimsInvoice'`
  * **`204`**: `$ref: '#/components/responses/noContent'`
  * **`400`**: `$ref: '#/components/responses/badRequest'`
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`403`**: `$ref: '#/components/responses/forbidden'`
  * **`412`**: `$ref: '#/components/responses/preconditionFailed'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### GET /api/v1/staged-invoices

  * **Summary:** Get list of staged invoices.
  * **Operation ID:** `getStagedInvoicesList`
  * **Description:** Get list of staged invoices.
  * **Tags:** `Staged Invoices`
  * **Security:** `jwtToken`, `apiKey`

**Parameters:**

  * `$ref: '#/components/parameters/customerIdQuery'`
  * `$ref: '#/components/parameters/invoiceStatus'`
  * `$ref: '#/components/parameters/createdFrom'`

**Responses:**

  * **`200 OK`**: The list of staged invoices has been obtained.
      * **Content:** `application/json`
      * **Schema:** `array` (of `$ref: '#/components/schemas/extendedStagedPimsInvoice'`)
  * **`400`**: `$ref: '#/components/responses/badRequest'`
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`403`**: `$ref: '#/components/responses/forbidden'`
  * **`412`**: `$ref: '#/components/responses/preconditionFailed'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### PUT /api/v1/staged-invoices/{mgaInvoiceId}/status/complete

  * **Summary:** Sets staged invoice status to completed.
  * **Operation ID:** `completeStagedInvoice`
  * **Description:** Sets staged invoice status to completed.
  * **Tags:** `Staged Invoices`
  * **Security:** `jwtToken`, `apiKey`

**Parameters:**

  * **`mgaInvoiceId`** (path, required, `string`): A base64 string that represents identifier of a staged invoice to complete

**Responses:**

  * **`204`**: `$ref: '#/components/responses/noContent'`
  * **`400`**: `$ref: '#/components/responses/badRequest'`
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`403`**: `$ref: '#/components/responses/forbidden'`
  * **`404`**: `$ref: '#/components/responses/notFoundError'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### POST /api/v1/callback/ocr

  * **Summary:** Consume OCR callback.
  * **Operation ID:** `callbackOcr`
  * **Description:** Consume OCR callback.
  * **Tags:** `CallBacks`
  * **Security:** `apiKey`

**Request Body (Required):**

  * **Content:** `application/json`
  * **Schema:** `$ref: '#/components/schemas/webRequestPayload'`

**Responses:**

  * **`200 OK`**: The callback of OCR has been obtained.
      * **Content:** `application/json`
      * **Schema:** `string`
      * **Example:** `OCR results saved`
  * **`400`**: `$ref: '#/components/responses/badRequest'`
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### POST /api/v1/callback/pims

  * **Summary:** Consume PIMS callback.
  * **Operation ID:** `callbackStagedInvoice`
  * **Description:** Consume PIMS callback.
  * **Tags:** `CallBacks`
  * **Security:** `basicAuth`, `apiKey`

**Request Body (Required):**

  * **Content:** `application/json`
  * **Schema:** `$ref: '#/components/schemas/pimsStagedInvoice'`

**Responses:**

  * **`200 OK`**: The callback of PIMS has been obtained.
      * **Content:** `application/json`
      * **Schema:** `string`
      * **Example:** `Staged invoice processed`
  * **`400`**: `$ref: '#/components/responses/badRequest'`
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### GET /api/health

  * **Summary:** Get service health status
  * **Operation ID:** `getHealthStatus`
  * **Description:** Get detailed service health status
  * **Tags:** `Monitoring`
  * **Security:** `apiKey`

**Responses:**

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
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`412`**: `$ref: '#/components/responses/preconditionFailed'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### GET /api/health/deep

  * **Summary:** Get the health status of the service.
  * **Operation ID:** `getHealthDeepStatus`
  * **Description:** Gets the health status of the service.
  * **Tags:** `Monitoring`
  * **Security:** `apiKey`

**Responses:**

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
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`412`**: `$ref: '#/components/responses/preconditionFailed'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### GET /api/v1/requests/{requestId}

  * **Summary:** Get request details
  * **Operation ID:** `getRequest`
  * **Tags:** `Requests`
  * **Security:** `jwtToken`, `apiKey`

**Parameters:**

  * `$ref: '#/components/parameters/requestId'`

**Responses:**

  * **`200 OK`**: The request details successfully returned
      * **Content:** `application/json`
      * **Schema:** `$ref: '#/components/schemas/requestMetadata'`
  * **`400`**: `$ref: '#/components/responses/badRequest'`
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`403`**: `$ref: '#/components/responses/forbidden'`
  * **`404`**: `$ref: '#/components/responses/notFoundError'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

-----

## Components

### Security Schemes

#### apiKey

  * **Type:** `apiKey`
  * **In:** `header`
  * **Name:** `api-key`
  * **Description:** Authentication with an API key.

#### jwtToken

  * **Type:** `http`
  * **Scheme:** `bearer`
  * **Bearer Format:** `JWT`
  * **Description:** Authentication with JWT token.

#### basicAuth

  * **Type:** `http`
  * **Scheme:** `basic`
  * **Description:** Use username and password for authentication.

### Parameters

#### customerIdPath

  * **Name:** `customerId`
  * **In:** `path`
  * **Required:** `true`
  * **Description:** The MGA customer Identifier.
  * **Schema:** `string`

#### invoiceNumber

  * **Name:** `invoiceNumber`
  * **In:** `path`
  * **Required:** `true`
  * **Description:** An invoice number.
  * **Schema:** `string`

#### fileMd5

  * **Name:** `fileMd5`
  * **In:** `query`
  * **Required:** `true`
  * **Description:** The file's byte array MD5 hash. Must be URL-encoded to avoid invalid characters.
  * **Schema:** `string` (MaxLength: 24)

#### customerIdQuery

  * **Name:** `customerId`
  * **In:** `query`
  * **Required:** `false`
  * **Description:** The MGA customer Identifier.
  * **Schema:** `string`

#### invoiceStatus

  * **Name:** `invoiceStatus`
  * **In:** `query`
  * **Description:** Invoices status.
  * **Schema:** `string` (Enum: `[StagingAvailable, StagingUnavailable, Completed]`)

#### createdFrom

  * **Name:** `createdFrom`
  * **In:** `query`
  * **Required:** `false`
  * **Description:** The start date of the invoice in ISO-8601 format
  * **Schema:** `string: date-time` (MaxLength: 255)

#### requestId

  * **Name:** `requestId`
  * **In:** `path`
  * **Required:** `true`
  * **Description:** The GUID request Identifier.
  * **Schema:** `string`

### Responses

#### badRequest

  * **Description:** Bad Request - The request is invalid or malformed. For example, some data is missing or data format is not valid. This includes both issues with a request body as well as issues with request headers. Usually, this status indicates the wrong implementation of the interface on the client side. There is no need to retry the request because interface violations require changes either on the client or service sides. Refer to the response content for more details regarding the interface violation.
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

#### noContent

  * **Description:** NoContent - The server has successfully fulfilled the client's request, but there is no content to return in the response body.

#### unauthorized

  * **Description:** Unauthorized - The requester is not authenticated. This status may indicate that authentication credentials are not provided, invalid, or malformed. There is no need to retry the request because interface violations require changes on the client side and invalid credentials are unlikely to become valid several seconds later.

#### forbidden

  * **Description:** Forbidden - The requester is not authorized to perform this request. Usually, this status indicates that the requester is authenticated but does not have enough permissions to execute the operation. There is no need to retry the request because it will fail until required permissions are granted and a new JWT token is available.

#### notFoundError

  * **Description:** Not Found - The resource is not registered on the service side. Usually, this status indicates that the resource is deleted. There is no need to retry the request because this is unlikely that the resource will be available several seconds later.

#### internalServerError

  * **Description:** Internal Server Error - An unexpected error has occurred in the service while processing the request. It is recommended to retry the request 30 seconds later but not to execute more than 3 retries. Refer to the response content for more details regarding the error occurred.
  * **Content:** `application/json`
      * **Schema:** `$ref: '#/components/schemas/serviceErrorResponse'`

#### serviceUnavailable

  * **Description:** Service Unavailable - The service is temporarily unavailable due to maintenance or for some other reason. It is recommended to retry the request one minute later.

#### preconditionFailed

  * **Description:** Precondition Failed - access to the target resources was denied. It is recommended to verify request parameters and retry the request one minute later.

### Schemas

#### pimsStagedInvoice

  * **Type:** `object`
  * **Properties:**
      * `mgaInvoiceId`: `string` (The mga invoice id)
      * `mgaName`: `string` (The mga name)
      * `customerId`: `string` (The customer identifier)
      * `householdId`: `string` (The household id)
      * `stagingStatus`: `string` (The status of the staging invoice, Enum: `[StagingAvailable, StagingUnavailable, Completed]`)
      * `stagingFailureReason`: `string` (The staging failure reason)
      * `invoice`: `$ref: '#/components/schemas/pimsInvoice'`

#### requestMetadata

  * **Type:** `object`
  * **Properties:**
      * `id`: `string`
      * `customerId`: `string`
      * `status`: `$ref: '#/components/schemas/requestStatus'`
      * `requestType`: `$ref: '#/components/schemas/requestType'`
      * `documents`: `array` (of `$ref: '#/components/schemas/extendedDocument'`)

#### extendedDocument

  * **Type:** `object`
  * **Properties:**
      * `documentType`: `$ref: '#/components/schemas/metadataDocumentType'`
      * `document`: `$ref: '#/components/schemas/document'`
      * `verificationErrors`: `array` (of `string`)
      * `status`: `$ref: '#/components/schemas/verificationStatus'`

#### webRequestPayload

  * **Type:** `object`
  * **Properties:**
      * `id`: `string`
      * `status`: `$ref: '#/components/schemas/fileStatus'`
      * `completedAt`: `string`
      * `results`: `array` (of `$ref: '#/components/schemas/ocrExtendedDocument'`)

#### ocrExtendedDocument

  * **Type:** `object`
  * **Properties:**
      * `documentType`: `$ref: '#/components/schemas/documentType'`
      * `document`: `$ref: '#/components/schemas/document'`
      * `verificationErrors`: `array` (of `string`)
      * `confidenceThresholds`: `array` (of `$ref: '#/components/schemas/confidenceThreshold'`)
      * `status`: `$ref: '#/components/schemas/verificationStatus'`

#### document

  * **Type:** `object`
  * **Properties:**
      * `vet`: `$ref: '#/components/schemas/vet'`
      * `petOwner`: `$ref: '#/components/schemas/petOwner'`
      * `pets`: `array` (of `$ref: '#/components/schemas/ocrPet'`)
      * `documentNumber`: `string`
      * `total`: `number`
      * `taxes`: `number`
      * `isTaxesIncludedInTotal`: `boolean`

#### vet

  * **Type:** `object`
  * **Properties:**
      * `name`: `string`
      * `address`: `string`
      * `city`: `string`
      * `state`: `string`
      * `zipCode`: `string`
      * `country`: `string`

#### petOwner

  * **Type:** `object`
  * **Properties:**
      * `firstName`: `string`
      * `lastName`: `string`
      * `phoneNumber`: `string`
      * `city`: `string`
      * `state`: `string`
      * `zipCode`: `string`
      * `country`: `string`

#### ocrPet

  * **Type:** `object`
  * **Description:** The pet object.
  * **Properties:**
      * `petName`: `string` (The pet name.)
      * `subTotal`: `number` (The subtotal for the pet.)
      * `invoiceItems`: `array` (The invoice items. Items: `$ref: '#/components/schemas/ocrInvoiceItem'`)
  * **Example:**
    ```json
    {
      "petName": "Barksalot",
      "subTotal": 732.39,
      "invoiceItems": []
    }
    ```

#### ocrInvoiceItem

  * **Type:** `object`
  * **Properties:**
      * `invoiceItemId`: `integer`
      * `description`: `string`
      * `lossDate`: `string`
      * `quantity`: `number`
      * `amountCharged`: `number`
      * `discount`: `number`

#### confidenceThreshold

  * **Type:** `object`
  * **Properties:**
      * `name`: `string`
      * `value`: `number`
      * `createdDateTime`: `string: date-time`
      * `createdBy`: `string`
      * `updatedDateTime`: `string: date-time`
      * `updatedBy`: `string`

#### fileStatus

  * **Type:** `string`
  * **Enum:** `[ Pending, ValidationFailed, InProgress, Completed, FailedToProcess, CategorizationPending, CategorizedSuccessfully, CategorizationFailed, ExtractionPending, ExtractionFailed ]`

#### verificationStatus

  * **Type:** `string`
  * **Enum:** `[ Passed, Failed, AutoPassed, AutoFailed ]`

#### documentType

  * **Type:** `string`
  * **Enum:** `[ Invoice, Receipt, Claim, Order, Other ]`

#### extendedStagedPimsInvoice

  * **Type:** `object`
  * **Description:** An invoice decorated with staging properties
  * **Properties:**
      * `mgaName`: `string` (The mga name)
      * `customerId`: `string` (The customer identifier)
      * `invoice`: `$ref: '#/components/schemas/stagedPimsInvoice'`

#### stagedPimsInvoice

  * **Type:** `object`
  * **Description:** An invoice.
  * **Properties:**
      * `id`: `string` (The invoice identifier.)
      * `total`: `number` (The invoice total amount.)
      * `date`: `string: date-time` (The date of the invoice in ISO-8601 format.)
      * `number`: `string` (The invoice number.)
      * `householdId`: `string` (The global customer identifier)
      * `stagingStatus`: `string` (The status of the staging invoice, Enum: `[StagingAvailable, StagingUnavailable, Completed]`)
      * `practice`: `$ref: '#/components/schemas/practice'`
      * `pets`: `array` (of `$ref: '#/components/schemas/pet'`)
  * **Example:**
    ```json
    {
      "id": "57b367cd-c788-4c5b-8445-d7d3ab1d05d0",
      "date": "2023-09-03T00:00:00",
      "number": "1234567",
      "total": 732.39,
      "householdId": "12345",
      "stagingStatus": "StagingAvailable",
      "practice": {
        "Id": "62222650-73f4-41d3-8d41-e2f1990d23ad",
        "name": "PetWellClinic",
        "address": "14944 Pines Blvd, Pembroke Pines",
        "city": "Miami",
        "state": "Florida",
        "zipCode": "33027",
        "country": "USA"
      },
      "pets": [
        {
          "petName": "Barksalot",
          "subTotal": 732.39,
          "invoiceItems": [
            {
              "invoiceItemId": "821f6d883a1e4f8cb79a24dd9edb33aa",
              "description": "Emergency Exam",
              "lossDate": "2023-09-03T00:00:00",
              "quantity": 1,
              "amountCharged": 222.8,
              "code": "EMER01"
            },
            {
              "invoiceItemId": "9fe14e69d9664cecb3381807ff698a9e",
              "description": "VetScan Comprehensive Diagnostic Profile + CBC",
              "lossDate": "2023-09-03T00:00:00",
              "quantity": 1,
              "amountCharged": 353.4,
              "code": "VSCN"
            },
            {
              "invoiceItemId": "07430feef1c446d0be7a06ccc25d818a",
              "description": "Fluids Subcutaneous",
              "lossDate": "2023-09-03T00:00:00",
              "quantity": 1,
              "amountCharged": 54.6,
              "code": "FL04"
            },
            {
              "invoiceItemId": "6613334da6984cca938215e4ecc50efb",
              "description": "Maropitant (Cerenia) 10mg/mL/mL",
              "lossDate": "2023-09-03T00:00:00",
              "quantity": 0.19,
              "amountCharged": 101.59,
              "code": "DFG02"
            }
          ]
        }
      ]
    }
    ```

#### pimsInvoice

  * **Type:** `object`
  * **Description:** An invoice.
  * **Properties:**
      * `invoiceId`: `string` (The invoice identifier.)
      * `total`: `number` (The invoice total amount.)
      * `date`: `string: date-time` (The date of the invoice in ISO-8601 format.)
      * `number`: `string` (The invoice number.)
      * `practice`: `$ref: '#/components/schemas/practice'`
      * `pets`: `array` (of `$ref: '#/components/schemas/pet'`)
  * **Example:**
    ```json
    {
      "invoiceId": "57b367cd-c788-4c5b-8445-d7d3ab1d05d0",
      "date": "2023-09-03T00:00:00",
      "number": "1234567",
      "total": 732.39,
      "practice": {
        "id": "62222650-73f4-41d3-8d41-e2f1990d23ad",
        "name": "PetWellClinic",
        "address": "14944 Pines Blvd, Pembroke Pines",
        "city": "Miami",
        "state": "Florida",
        "zipCode": "33027",
        "country": "USA"
      },
      "pets": [
        {
          "petName": "Barksalot",
          "subTotal": 732.39,
          "invoiceItems": [
            {
              "invoiceItemId": "821f6d883a1e4f8cb79a24dd9edb33aa",
              "description": "Emergency Exam",
              "lossDate": "2023-09-03T00:00:00",
              "quantity": 1,
              "amountCharged": 222.8,
              "code": "EMER01"
            },
            {
              "invoiceItemId": "9fe14e69d9664cecb3381807ff698a9e",
              "description": "VetScan Comprehensive Diagnostic Profile + CBC",
              "lossDate": "2023-09-03T00:00:00",
              "quantity": 1,
              "amountCharged": 353.4,
              "code": "VSCN"
            },
            {
              "invoiceItemId": "07430feef1c446d0be7a06ccc25d818a",
              "description": "Fluids Subcutaneous",
              "lossDate": "2023-09-03T00:00:00",
              "quantity": 1,
              "amountCharged": 54.6,
              "code": "FL04"
            },
            {
              "invoiceItemId": "6613334da6984cca938215e4ecc50efb",
              "description": "Maropitant (Cerenia) 10mg/mL/mL",
              "lossDate": "2023-09-03T00:00:00",
              "quantity": 0.19,
              "amountCharged": 101.59,
              "code": "DFG02"
            }
          ]
        }
      ]
    }
    ```

#### practice

  * **Type:** `object`
  * **Description:** The Vet Practice object.
  * **Properties:**
      * `id`: `string` (The vet practice identifier.)
      * `name`: `string` (The vet practice name.)
      * `address`: `string` (The vet practice address line.)
      * `city`: `string` (The vet practice city.)
      * `state`: `string` (The vet practice state.)
      * `zipCode`: `string` (The vet practice zip code.)
      * `country`: `string` (The vet practice country.)
  * **Example:**
    ```json
    {
      "vetId": "62222650-73f4-41d3-8d41-e2f1990d23ad",
      "name": "PetWellClinic",
      "address": "14944 Pines Blvd, Pembroke Pines",
      "city": "Miami",
      "state": "Florida",
      "zipCode": "33027",
      "country": "USA"
    }
    ```

#### pet

  * **Type:** `object`
  * **Description:** The pet object.
  * **Properties:**
      * `petName`: `string` (The pet name.)
      * `subTotal`: `number` (The subtotal for the pet.)
      * `invoiceItems`: `array` (The invoice items. Items: `$ref: '#/components/schemas/invoiceItem'`)
  * **Example:**
    ```json
    {
      "petName": "Barksalot",
      "subTotal": 732.39,
      "invoiceItems": []
    }
    ```

#### invoiceItem

  * **Type:** `object`
  * **Description:** The invoice line item object.
  * **Properties:**
      * `invoiceItemId`: `string` (The invoice item id.)
      * `description`: `string` (The line number description.)
      * `lossDate`: `string` (The line number loss date.)
      * `quantity`: `number` (The quantity.)
      * `amountCharged`: `number` (The amount charged.)
      * `code`: `string` (The code.)
  * **Example:**
    ```json
    {
      "invoiceItemId": "821f6d883a1e4f8cb79a24dd9edb33aa",
      "description": "Emergency Exam",
      "lossDate": "2023-09-03T00:00:00",
      "quantity": 1,
      "amountCharged": 222.8,
      "code": "EMEX01"
    }
    ```

#### requestStatus

  * **Type:** `string`
  * **Enum:** `[ Pending, ValidationFailed, InProgress, ExtractionCompleted, Completed, Delivered, FailedToProcess ]`

#### requestType

  * **Type:** `string`
  * **Enum:** `[ Process, Lookup ]`

#### metadataDocumentType

  * **Type:** `string`
  * **Enum:** `[ OcrInvoice, OcrReceipt, OcrClaim, OcrOrder, OcrOther, PimsInvoice ]`

#### fileUploadReply

  * **Type:** `object`
  * **Description:** The process response
  * **Properties:**
      * `requestId`: `string`
      * `message`: `string`
  * **Example:**
    ```json
    {
      "requestId": "a8e23edb-d313-4de9-8138-cee9fbc0ca46",
      "message": "Processing started."
    }
    ```

#### healthResponse

  * **Type:** `object`
  * **Description:** A health response.
  * **Required:** `[ status ]`
  * **Properties:**
      * `status`: `string` (Enum: `[ Healthy, Unhealthy ]`)
      * `errors`: `array` (of `string`)

#### serviceErrorResponse

  * **Type:** `object`
  * **Description:** An error response.
  * **Required:** `[ error ]`
  * **Properties:**
      * `error`: `$ref: '#/components/schemas/serviceError'`
  * **Example:**
    ```json
    {
      "error": {
        "code": "InternalServerError",
        "message": "Something went wrong with the request."
      }
    }
    ```

#### serviceError

  * **Type:** `object`
  * **Description:** A service error in the form exposed to the outside.
  * **Required:** `[ code, message ]`
  * **Properties:**
      * `code`: `string` (The error code.)
      * `message`: `string` (The human-readable representation of the error.)
      * `details`: `array` (The additional level of details regarding the error. Items: `$ref: '#/components/schemas/serviceErrorDetail'`)
      * `innerError`: `$ref: '#/components/schemas/serviceError'`

#### serviceErrorDetail

  * **Type:** `object`
  * **Description:** An additional detail about the service error.
  * **Required:** `[ target, message ]`
  * **Properties:**
      * `target`: `string` (The target of the error detail.)
      * `message`: `string` (The human-readable representation of the error detail.)