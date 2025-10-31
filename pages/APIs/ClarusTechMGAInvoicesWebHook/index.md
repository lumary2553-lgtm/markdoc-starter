# OpenAPI: CCH.MGAInvoices.WebHook (0.3.1)

## Tags

* **Monitoring**: Internal monitoring endpoints
* **WebHooks**: Manage webhook subscriptions

---

## Paths

### POST /api/subscriptions/web-hooks

  * **Summary:** Subscribe to webhook
  * **Operation ID:** `subscribe`
  * **Tags:** `WebHooks`
  * **Security:** `jwtToken`, `apiKey`

**Request Body (Required):**

  * **Content:** `application/json`
  * **Schema:** `$ref: '#/components/schemas/webHookParameters'`

**Responses:**

  * **`200 OK`**: The subscription successfully established
      * **Content:** `application/json`
      * **Schema:** `$ref: '#/components/parameters/webHookId'`
  * **`400`**: `$ref: '#/components/responses/badRequest'`
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`403`**: `$ref: '#/components/responses/forbidden'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### GET /api/subscriptions/web-hooks

  * **Summary:** Get list of subscriptions
  * **Operation ID:** `getSubscriptions`
  * **Tags:** `WebHooks`
  * **Security:** `jwtToken`, `apiKey`

**Responses:**

  * **`200 OK`**: List of MGA subscriptions
      * **Content:** `application/json`
      * **Schema:** `$ref: '#/components/schemas/webHookOkResponse'`
  * **`400`**: `$ref: '#/components/responses/badRequest'`
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`403`**: `$ref: '#/components/responses/forbidden'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### PATCH /api/subscriptions/web-hooks/{webHookId}

  * **Summary:** Update subscription details
  * **Operation ID:** `updateSubscription`
  * **Tags:** `WebHooks`
  * **Security:** `jwtToken`, `apiKey`

**Parameters:**

  * `$ref: '#/components/parameters/webHookId'`

**Responses:**

  * **`204`**: `$ref: '#/components/responses/noContent'`
  * **`400`**: `$ref: '#/components/responses/badRequest'`
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`403`**: `$ref: '#/components/responses/forbidden'`
  * **`404`**: `$ref: '#/components/responses/notFoundError'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### DELETE /api/subscriptions/web-hooks/{webHookId}

  * **Summary:** Unsubscribe from web hook event
  * **Operation ID:** `unsubscribe`
  * **Tags:** `WebHooks`
  * **Security:** `jwtToken`, `apiKey`

**Parameters:**

  * `$ref: '#/components/parameters/webHookId'`

**Responses:**

  * **`204`**: `$ref: '#/components/responses/noContent'`
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`403`**: `$ref: '#/components/responses/forbidden'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### GET /api/subscriptions/health

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

### Parameters

#### webHookId

  * **Name:** `webHookId`
  * **In:** `path`
  * **Required:** `true`
  * **Description:** The GUID web hook Identifier.
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

#### noContent

  * **Description:** NoContent - The server has successfully fulfilled the client's request, but there is no content to return in the response body.

### Schemas

#### eventType

  * **Type:** `string`
  * **Enum:** `[ InvoiceStaged ]`

#### webHookParameters

  * **Type:** `object`
  * **Required:** `[ eventType, url, headers ]`
  * **Properties:**
      * `eventType`: `string`
      * `url`: `string`
      * `headers`: `object` (additionalProperties: `string`)

#### webHookOkResponse

  * **Type:** `object`
  * **Properties:**
      * `id`: `string`
      * `mgaName`: `string`
      * `eventType`: `string`
      * `url`: `string`
      * `headers`: `object` (additionalProperties: `string`)

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