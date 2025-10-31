# OpenAPI: Caladan.FileDataExtractor (0.5.18)

## Tags

* **Monitoring**: Internal monitoring endpoints

---

## Paths

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