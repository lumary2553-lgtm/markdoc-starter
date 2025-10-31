# OpenAPI: CCH.PIMS.DataEncryptor (0.6.21)

## Tags

* **Data Encryptor**: Enriches invoices with household IDs.

---

## Paths

### `GET` /api/health

> Get service health status

  * **Operation ID:** `getHealthStatus`
  * **Description:** Get service health status.
  * **Tags:** `Data Encryptor`
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

## Tags

  * **Data Encryptor**: A set of APIs for retrieving Abilitec entities.

-----

## Components

### Security Schemes

  * **`apiKey`**
      * **Type:** `apiKey`
      * **In:** `header`
      * **Name:** `api-key`
      * **Description:** Authentication with an API key.

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

#### `serviceErrorResponse`

  * **Type:** `object`
  * **Description:** An error response.
  * **Required:** `[ error ]`
  * **Properties:**
    | Name | Type |
    | :--- | :--- |
    | `error` | `$ref: '#/components/schemas/serviceError'` |
  * **Example:**
    ```json
    {
      "error": {
        "code": "InternalServerError",
        "message": "Something went wrong with the request."
      }
    }
    ```

#### `serviceError`

  * **Type:** `object`
  * **Description:** A service error in the form exposed to the outside.
  * **Required:** `[ code, message ]`
  * **Properties:**
    | Name | Type | Description |
    | :--- | :--- | :--- |
    | `code` | `string` | The error code. |
    | `message`| `string` | The human-readable representation of the error. |
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
    | `message`| `string` | The human-readable representation of the error detail. |