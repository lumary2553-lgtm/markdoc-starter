# OpenAPI: ClarusTech.OnboardingTool.Backend (0.1.73)

## Tags

* **Configuration**: Retrieve service configuration
* **Monitoring**: Internal monitoring endpoints
* **Practices**: Manage practices
* **Users**: Manage users

---

## Paths

### GET /api/v1/configuration/spa

  * **Summary:** Get Auth0 configuration for SPA
  * **Description:** Get Auth0 configuration settings for the SPA
  * **Tags:** `Configuration`

**Responses:**

  * **`200 OK`**: Auth0 configuration has been retrieved.
      * **Content:** `application/json`
      * **Schema:** `$ref: '#/components/schemas/authConfiguration'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### GET /api/v1/practices

  * **Summary:** Retrieves a list of practices.
  * **Tags:** `Practices`
  * **Security:** `jwtToken`, `basicAuth`

**Parameters:**

  * `practiceId` (query, `string: uuid`, max-length: 50)
  * `vetId` (query, `string`)
  * `orderBy` (query, `$ref: '#/components/schemas/getPracticesOrderByType'`)
  * `SortOrder` (query, `$ref: '#/components/schemas/sortOrderType'`)
  * `pageNumber` (query, `integer: int32`, min: 1, default: 1)
  * `pageSize` (query, `integer: int32`, min: 1, default: 20)

**Responses:**

  * **`200 OK`**: Practices have been obtained.
      * **Content:** `application/json`
      * **Schema:** `array` (of `$ref: '#/components/schemas/practice'`)
  * **`400`**: `$ref: '#/components/responses/badRequest'`
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`403`**: `$ref: '#/components/responses/forbidden'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### POST /api/v1/practices

  * **Summary:** Onboard practice.
  * **Tags:** `Practices`
  * **Security:** `jwtToken`

**Request Body:**

  * **Content:** `application/json`
  * **Schema:** `$ref: '#/components/schemas/practiceOnboardingParameters'`

**Responses:**

  * **`200 OK`**: Practice have been onboarded.
      * **Content:** `application/json`
      * **Schema:** `$ref: '#/components/schemas/onboardPracticeResponse'`
  * **`400`**: `$ref: '#/components/responses/badRequest'`
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`403`**: `$ref: '#/components/responses/forbidden'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### POST /api/v1/practices/publish

  * **Summary:** Publish onboarded practice.
  * **Tags:** `Practices`
  * **Security:** `jwtToken`

**Responses:**

  * **`200 OK`**: Onboarded practice have been published.
  * **`400`**: `$ref: '#/components/responses/badRequest'`
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`403`**: `$ref: '#/components/responses/forbidden'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### GET /api/v1/practices/{practiceId}/invoice-samples

  * **Summary:** Retrieves a list of invoice samples.
  * **Tags:** `Practices`
  * **Security:** `jwtToken`

**Parameters:**

  * `practiceId` (path, required, `string: uuid`, max-length: 50)

**Responses:**

  * **`200 OK`**: OK
      * **Content:** `application/json`
      * **Schema:** `string: binary`
  * **`400`**: `$ref: '#/components/responses/badRequest'`
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`403`**: `$ref: '#/components/responses/forbidden'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### PATCH /api/v1/users/{email}/productData

  * **Summary:** Updates user's product-related data
  * **Tags:** `Users`
  * **Security:** `jwtToken`

**Parameters:**

  * `email` (path, required, `string: email`): The email of the user

**Request Body (Required):**

  * **Description:** List of JsonPatchOperations to perform on a document
  * **Content:** `application/json`
  * **Schema:** `$ref: '#/components/schemas/jsonPatchOperationList'`

**Responses:**

  * **`200 OK`**: Onboarded practice have been published.
  * **`400`**: `$ref: '#/components/responses/badRequest'`
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`403`**: `$ref: '#/components/responses/forbidden'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### GET /api/health

  * **Summary:** Get the health status of the service.
  * **Operation ID:** `getHealthStatus`
  * **Description:** Gets the health status of the service.
  * **Tags:** `Monitoring`

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
  * **`400`**: `$ref: '#/components/responses/badRequest'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

-----

## Components

### Security Schemes

#### jwtToken

  * **Type:** `http`
  * **Scheme:** `bearer`
  * **Bearer Format:** `JWT`
  * **Description:** Authentication with JWT token.

#### basicAuth

  * **Type:** `http`
  * **Scheme:** `basic`

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

### Schemas

#### authConfiguration

  * **Type:** `object`
  * **Properties:**
      * `domain`: `string` (The Auth0 domain.)
      * `clientId`: `string` (The Auth0 client ID.)
      * `audience`: `string` (The Auth0 API audience.)

#### getPracticesOrderByType

  * **Type:** `string`
  * **Enum:** `[ PracticeName, PracticeOnboardingDate ]`

#### sortOrderType

  * **Type:** `string`
  * **Enum:** `[ Asc, Desc ]`

#### practice

  * **Type:** `object`
  * **Required:** `[ practiceInfo ]`
  * **Properties:**
      * `practiceInfo`: `$ref: '#/components/schemas/practiceInfo'`
      * `isOnboarded`: `boolean`
      * `vetIds`: `array` (of `string`, nullable)
      * `isHouseholdResolvingEnabled`: `boolean`
      * `invoiceMaxCreatedDate`: `string: date-time` (nullable)
      * `invoiceMaxUpdatedDate`: `string: date-time` (nullable)
      * `startDateTimeInvoicesLoading`: `string: date-time` (nullable)
      * `endDateTimeInvoicesLoading`: `string: date-time` (nullable)
      * `onBoardingDateTime`: `string: date-time` (nullable)
      * `initialInvoiceCount`: `integer: int64` (nullable)
      * `initialInvoicesDeviation`: `integer: int64` (nullable)
      * `isInvoicesLoading`: `boolean` (nullable)
      * `totalInvoicesForThisYear`: `integer: int32` (nullable)
      * `totalInvoicesWithHouseholdId`: `integer: int32` (nullable)
  * **Additional Properties:** `false`

#### practiceInfo

  * **Type:** `object`
  * **Required:** `[ id ]`
  * **Properties:**
      * `id`: `string: uuid`
      * `name`: `string` (nullable)
      * `pimsConnectorName`: `string` (nullable)
      * `demographics`: `$ref: '#/components/schemas/practiceDemographics'`
  * **Additional Properties:** `false`

#### practiceDemographics

  * **Type:** `object`
  * **Properties:**
      * `address`: `string` (nullable)
      * `city`: `string` (nullable)
      * `state`: `string` (nullable)
      * `postalCode`: `string` (nullable)
      * `phone`: `string` (nullable)
      * `email`: `string` (nullable)
      * `country`: `string` (nullable)
  * **Additional Properties:** `false`

#### practiceOnboardingParameters

  * **Type:** `object`
  * **Required:** `[ practiceId, vetIds ]`
  * **Properties:**
      * `practiceId`: `string: uuid` (non-nullable, max-length: 50)
      * `vetIds`: `array` (of `string`, non-nullable)
  * **Additional Properties:** `false`

#### onboardPracticeResponse

  * **Type:** `object`
  * **Required:** `[ status ]`
  * **Properties:**
      * `status`: `string` (non-nullable)
  * **Additional Properties:** `false`

#### jsonPatchOperationList

  * **Type:** `array`
  * **Items:** `object`
      * **Required:** `[ op, path ]`
      * **Properties:**
          * `op`: `string` (Enum: `[ add, remove, replace, move, copy ]`)
          * `path`: `string`
          * `value`: (one of: `integer`, `string`, `boolean`, `number`)

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