# OpenAPI: Caladan.WebRequests (0.5.18)

## Tags

* **Requests**: Manage web request subscriptions
* **Monitoring**: Internal monitoring endpoints

---

## Paths

### POST /api/web-requests/requests

  * **Summary:** Subscribe to web request
  * **Operation ID:** `subscribe`
  * **Tags:** `Requests`
  * **Security:** `apiKey`

**Request Body (Required):**

  * **Content:** `application/json`
  * **Schema:** `$ref: '#/components/schemas/webRequest'`

**Responses:**

  * **`200 OK`**: The subscription successfully established
      * **Content:** `application/json`
      * **Schema:** `$ref: '#/components/schemas/webRequestReply'`
  * **`400`**: `$ref: '#/components/responses/badRequest'`
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### DELETE /api/web-requests/requests/{requestId}

  * **Summary:** Unsubscribe from web request
  * **Operation ID:** `unsubscribe`
  * **Tags:** `Requests`
  * **Security:** `apiKey`

**Parameters:**

  * **`requestId`** (path, required, `string`)

**Responses:**

  * **`204`**: `$ref: '#/components/responses/noContent'`
  * **`400`**: `$ref: '#/components/responses/badRequest'`
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`404`**: `$ref: '#/components/responses/notFoundError'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### GET /api/web-requests/requests/{requestId}

  * **Summary:** Get web request details
  * **Operation ID:** `getWebRequest`
  * **Tags:** `Requests`
  * **Security:** `apiKey`

**Parameters:**

  * **`requestId`** (path, required, `string`)

**Responses:**

  * **`200 OK`**: The request details successfully returned
      * **Content:** `application/json`
      * **Schema:** `$ref: '#/components/schemas/webRequestReply'`
  * **`400`**: `$ref: '#/components/responses/badRequest'`
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`404`**: `$ref: '#/components/responses/notFoundError'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### GET /api/web-requests/health

  * **Summary:** Get service health status
  * **Operation ID:** `healthCheck`
  * **Tags:** `Monitoring`
  * **Security:** `apiKey`

**Responses:**

  * **`200 OK`**: Service is healthy
      * **Content:** `application/json`
      * **Schema:** `$ref: '#/components/schemas/healthCheckResponse'`
  * **`400 Bad Request`**: Service is unhealthy
      * **Content:** `application/json`
      * **Schema:** `$ref: '#/components/schemas/healthCheckResponse'`
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
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

### Responses

#### noContent

  * **Description:** No Content - The operation was successful, there's no content in the response.

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

### Schemas

#### webRequest

  * **Type:** `object`
  * **Required:** `[ id, requestType, idempotencyKey ]`
  * **Properties:**
      * `id`: `string`
      * `url`: `string`
      * `requestType`: `$ref: '#/components/schemas/requestType'`
      * `headers`: `object` (additionalProperties: `string`)
      * `idempotencyKey`: `string`

#### webRequestReply

  * **Type:** `object`
  * **Properties:**
      * `id`: `string`
      * `deliveryStatus`: `$ref: '#/components/schemas/deliveryStatus'`
      * `status`: `$ref: '#/components/schemas/fileStatus'`
      * `requestType`: `$ref: '#/components/schemas/requestType'`
      * `completedAt`: `string`
      * `results`: `array` (of `$ref: '#/components/schemas/extendedDocument'`)

#### extendedDocument

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
      * `pets`: `array` (of `$ref: '#/components/schemas/pet'`)
      * `documentNumber`: `string`
      * `total`: `number`
      * `taxes`: `number`
      * `isTaxesIncludedInTotal`: `boolean`

#### pet

  * **Type:** `object`
  * **Properties:**
      * `petName`: `string`
      * `subTotal`: `number`
      * `invoiceItems`: `array` (of `$ref: '#/components/schemas/invoiceItem'`)

#### invoiceItem

  * **Type:** `object`
  * **Properties:**
      * `invoiceItemId`: `integer`
      * `description`: `string`
      * `lossDate`: `string`
      * `quantity`: `number`
      * `amountCharged`: `number`
      * `discount`: `number`

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

#### confidenceThreshold

  * **Type:** `object`
  * **Properties:**
      * `name`: `string`
      * `value`: `number`
      * `createdDateTime`: `string` (format: `date-time`)
      * `createdBy`: `string`
      * `updatedDateTime`: `string` (format: `date-time`)
      * `updatedBy`: `string`

#### healthCheckResponse

  * **Type:** `object`
  * **Properties:**
      * `status`: `string` (Enum: `[ Healthy, Unhealthy ]`)
      * `errors`: `array` (of `string`)

#### modelValidationResponse

  * **Type:** `object`
  * **Properties:**
      * `errors`: `object` (additionalProperties: `array` of `string`)

#### deliveryStatus

  * **Type:** `string`
  * **Enum:** `[ ProcessingPending, Failed, Successfull ]`

#### fileStatus

  * **Type:** `string`
  * **Enum:** `[ Pending, ValidationFailed, InProgress, Completed, FailedToProcess, CategorizationPending, CategorizedSuccessfully, CategorizationFailed, ExtractionPending, ExtractionFailed ]`

#### requestType

  * **Type:** `string`
  * **Enum:** `[ OcrExtraction ]`

#### documentType

  * **Type:** `string`
  * **Enum:** `[ Invoice, Receipt, Claim, Order, Other ]`

#### verificationStatus

  * **Type:** `string`
  * **Enum:** `[ Passed, Failed, AutoPassed, AutoFailed ]`

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