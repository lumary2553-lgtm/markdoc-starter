# OpenAPI: CCH.PIMS.DataLoader (0.6.21)

## Tags

* **Practices**: Import and manage practice invoices.

---

## Paths

### `POST /api/practices/importInvoices`

**Tag:** `Practices`
**Operation ID:** `startPracticeInvoicesImport`

Starts the practices invoices import.

#### Security

  * `apiKey`

#### Responses

  * **`200 OK`**: The processing started successfully.
      * **Content:** `application/json`
      * **Schema:** `#/components/schemas/loadPracticeInvoicesResponse`
      * **Example:**
        ```json
        {
          "status": "Processing started",
          "practices": [
            {
              "practiceId": "e385dafc-578c-4b4d-ba08-a6f14927c1d3",
              "invoiceMaxCreatedDate": "2024-10-21T00:00:00",
              "invoiceMaxUpdatedDate": "2024-10-21T00:00:00",
              "newInvoicesOffset": 0,
              "updatedInvoicesOffset": 0
            }
          ]
        }
        ```
  * **`400 Bad Request`**: The processing can't be started.
      * **Content:** `application/json`
      * **Schema:** `#/components/schemas/loadPracticeInvoicesResponse`
      * **Example:**
        ```json
        {
          "status": "Processing can't be started",
          "errors": [
            "Value should be specified for the Bulldog userName",
            "CosmosDb Authentication key is required"
          ]
        }
        ```
  * **`401 Unauthorized`**: See `unauthorized` component.
  * **`500 Internal Server Error`**: See `internalServerError` component.
  * **`503 Service Unavailable`**: See `serviceUnavailable` component.

-----

### `GET /api/practices`

**Tag:** `Practices`
**Operation ID:** `getListPractices`

Get the list of all practices.

#### Security

  * `apiKey`

#### Responses

  * **`200 OK`**: The processing started successfully.
      * **Content:** `application/json`
      * **Schema:** array of `#/components/schemas/practiceMetadata`
      * **Example:**
        ```json
        [
          {
            "onboardingStatus": "Practice onboarded successfully",
            "practiceId": "e385dafc-578c-4b4d-ba08-a6f14927c1d3",
            "vetIds": ["vetId1", "vetId2"],
            "isHouseholdResolvingEnabled": true,
            "invoiceMaxCreatedDate": "2024-10-21T00:00:00",
            "invoiceMaxUpdatedDate": "2024-10-21T00:00:00"
          },
          {
            "onboardingStatus": "Practice onboarded successfully",
            "practiceId": "f485dafd-474f-2g7h-ba08-t9e14927g4j9",
            "vetIds": ["vetId3"],
            "isHouseholdResolvingEnabled": false,
            "invoiceMaxCreatedDate": "2024-10-20T00:00:00",
            "invoiceMaxUpdatedDate": "2024-10-20T00:00:00"
          }
        ]
        ```
  * **`401 Unauthorized`**: See `unauthorized` component.
  * **`500 Internal Server Error`**: See `internalServerError` component.
  * **`503 Service Unavailable`**: See `serviceUnavailable` component.

-----

### `POST /api/practices/onboardPractice`

**Tag:** `Practices`
**Operation ID:** `startPracticeOnboarding`

Starts the practice invoices import.

#### Security

  * `apiKey`

#### Request Body

  * **Required:** `true`
  * **Content:** `application/json`
  * **Schema:** `#/components/schemas/onboardingPracticeParameters`

#### Responses

  * **`200 OK`**: The processing started successfully.
      * **Content:** `application/json`
      * **Schema:** `#/components/schemas/practiceMetadata`
      * **Example:**
        ```json
        {
          "status": "Processing started",
          "practice": "e385dafc-578c-4b4d-ba08-a6f14927c1d3"
        }
        ```
  * **`400 Bad Request`**: The processing can't be started.
      * **Content:** `application/json`
      * **Schema:** `#/components/schemas/loadPracticeInvoicesResponse`
      * **Example:**
        ```json
        {
          "status": "Processing can't be started",
          "errors": [
            "Value should be specified for the Bulldog userName",
            "Failed to deserialize the request body"
          ]
        }
        ```
  * **`409 Conflict`**: The request could not be completed due to a conflict with the current state of the target resource.
      * **Content:** `application/json`
      * **Schema:** `#/components/schemas/loadPracticeInvoicesResponse`
      * **Example:**
        ```json
        {
          "status": "Practice already onboarded",
          "practice": "e385dafc-578c-4b4d-ba08-a6f14927c1d3"
        }
        ```
  * **`401 Unauthorized`**: See `unauthorized` component.
  * **`500 Internal Server Error`**: See `internalServerError` component.
  * **`503 Service Unavailable`**: See `serviceUnavailable` component.

-----

### `POST /api/practices/vetToPracticeMapping`

**Tag:** `Practices`
**Operation ID:** `vetToPracticeMapping`

Add Vet to Practice mapping.

#### Security

  * `apiKey`

#### Request Body

  * **Required:** `true`
  * **Content:** `application/json`
  * **Schema:** `#/components/schemas/vetToPracticeMappingParameters`

#### Responses

  * **`200 OK`**: The processing started successfully.
      * **Content:** `application/json`
      * **Schema:** `#/components/schemas/loadPracticeInvoicesResponse`
      * **Example:**
        ```json
        {
          "status": "VetIds added successfully",
          "practice": "e385dafc-578c-4b4d-ba08-a6f14927c1d3",
          "vetIds": ["vetId1", "vetId2"]
        }
        ```
  * **`400 Bad Request`**: The mapping can't be updated.
      * **Content:** `application/json`
      * **Schema:** `#/components/schemas/loadPracticeInvoicesResponse`
      * **Example:**
        ```json
        {
          "status": "Clinic can't be added",
          "errors": ["Failed to deserialize the request body"]
        }
        ```
  * **`404 Not Found`**: The mapping can't be updated.
      * **Content:** `application/json`
      * **Schema:** `#/components/schemas/loadPracticeInvoicesResponse`
      * **Example:**
        ```json
        {
          "status": "Failed to add VetIds",
          "errors": ["Practice not found"],
          "practice": "e385dafc-578c-4b4d-ba08-a6f14927c1d3",
          "vetIds": ["vetId3"]
        }
        ```
  * **`409 Conflict`**: The request could not be completed due to a conflict with the current state of the target resource.
      * **Content:** `application/json`
      * **Schema:** `#/components/schemas/loadPracticeInvoicesResponse`
      * **Example:**
        ```json
        {
          "status": "VetIds must be unique",
          "vetIds": ["vetId3"]
        }
        ```
  * **`401 Unauthorized`**: See `unauthorized` component.
  * **`500 Internal Server Error`**: See `internalServerError` component.
  * **`503 Service Unavailable`**: See `serviceUnavailable` component.

---

### `GET /api/practices/health`

**Tag:** `Practices`
**Operation ID:** `getHealthStatus`

Get service health status.

#### Security

  * `apiKey`

#### Responses

  * **`200 OK`**: The service is healthy.
      * **Content:** `application/json`
      * **Schema:** `#/components/schemas/healthResponse`
      * **Example:**
        ```json
        {
          "status": "Healthy"
        }
        ```
  * **`400 Bad Request`**: The service is unhealthy.
      * **Content:** `application/json`
      * **Schema:** `#/components/schemas/healthResponse`
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
  * **`500 Internal Server Error`**: See `internalServerError` component.
  * **`503 Service Unavailable`**: See `serviceUnavailable` component.

-----

## Tags

  * **Practices**: A set of APIs for importing Practice invoices.

-----

## Components

### Security Schemes

**`apiKey`**

  * **Type:** `apiKey`
  * **In:** `header`
  * **Name:** `api-key`
  * **Description:** Authentication with an API key.

### Responses

**`badRequest`**

  * **Description:** Bad Request - The request is invalid or malformed. For example, some data is missing or data format is not valid... (see full description in YAML)
  * **Content:** `application/json`
  * **Schema:** `#/components/schemas/serviceErrorResponse`
  * **Example:**
    ```json
    {
      "error": {
        "code": "BadRequest",
        "message": "The server cannot or will not process the request due to something that is perceived to be a client error."
      }
    }
    ```

**`unauthorized`**

  * **Description:** Unauthorized - The requester is not authenticated. This status may indicate that authentication credentials are not provided, invalid, or malformed... (see full description in YAML)

**`forbidden`**

  * **Description:** Forbidden - The requester is not authorized to perform this request... (see full description in YAML)

**`conflictError`**

  * **Description:** Conflict - The request could not be completed due to a conflict with the current state of the target resource... (see full description in YAML)

**`notFoundError`**

  * **Description:** Not Found - The resource is not registered on the service side. Usually, this status indicates that the resource is deleted... (see full description in YAML)

**`internalServerError`**

  * **Description:** Internal Server Error - An unexpected error has occurred in the service while processing the request... (see full description in YAML)
  * **Content:** `application/json`
  * **Schema:** `#/components/schemas/serviceErrorResponse`

**`serviceUnavailable`**

  * **Description:** Service Unavailable - The service is temporarily unavailable due to maintenance or for some other reason... (see full description in YAML)

### Schemas

#### `practiceResponseItem`

  * **Type:** `object`
  * **Description:** A practice response details.

**Properties**
| Property | Type | Format |
| :--- | :--- | :--- |
| `practiceId` | string | |
| `invoiceMaxCreatedDate` | string | date |
| `invoiceMaxUpdatedDate` | string | date |
| `newInvoicesOffset` | number | |
| `updatedInvoicesOffset` | number | |

**Example**

```json
{
  "practiceId": "e385dafc-578c-4b4d-ba08-a6f14927c1d3",
  "invoiceMaxCreatedDate": "2024-10-21T00:00:00",
  "invoiceMaxUpdatedDate": "2024-10-21T00:00:00",
  "newInvoicesOffset": 0,
  "updatedInvoicesOffset": 0
}
```

-----

#### `onboardingPracticeParameters`

  * **Type:** `object`
  * **Description:** The parameters required for onboarding practice.
  * **Required Fields:**
      * `practiceId`
      * `vetIds`

**Properties**
| Property | Type | Items |
| :--- | :--- | :--- |
| `practiceId` | string | |
| `vetIds` | array | string |
| `enableHouseholdResolve` | boolean | |

**Example**

```json
{
  "practiceId": "e385dafc-578c-4b4d-ba08-a6f14927c1d3",
  "vetIds": ["vetId1", "vetId2"],
  "enableHouseholdResolve": true
}
```

-----

#### `vetToPracticeMappingParameters`

  * **Type:** `object`
  * **Description:** The parameters required for updating vet to practice mapping.
  * **Required Fields:**
      * `practiceId`
      * `vetIds`

**Properties**
| Property | Type | Items |
| :--- | :--- | :--- |
| `practiceId` | string | |
| `vetIds` | array | string |

**Example**

```json
{
  "practiceId": "e385dafc-578c-4b4d-ba08-a6f14927c1d3",
  "vetIds": ["vetId1", "vetId2"]
}
```

-----

#### `practiceMetadata`

  * **Type:** `object`
  * **Description:** Get list of practice response details.

**Properties**
| Property | Type | Items | Format |
| :--- | :--- | :--- | :--- |
| `onboardingStatus` | string | | |
| `practiceId` | string | | |
| `vetIds` | array | string | |
| `isHouseholdResolvingEnabled` | boolean | | |
| `invoiceMaxCreatedDate` | string | | date |
| `invoiceMaxUpdatedDate` | string | | date |

**Example**

```json
{
  "onboardingStatus": "Practice onboarded successfully",
  "practiceId": "e385dafc-578c-4b4d-ba08-a6f14927c1d3",
  "vetIds": ["vetId1", "vetId2"],
  "isHouseholdResolvingEnabled": true,
  "invoiceMaxCreatedDate": "2024-10-21T00:00:00",
  "invoiceMaxUpdatedDate": "2024-10-21T00:00:00"
}
```

-----

#### `loadPracticeInvoicesResponse`

  * **Type:** `object`
  * **Description:** A response for the command for loading practice invoices.
  * **Required Fields:**
      * `status`

**Properties**
| Property | Type | Items | Schema | Enum |
| :--- | :--- | :--- | :--- | :--- |
| `status` | string | | | `[ Processing Started, Processing can't be started ]` |
| `practice` | string | | | |
| `practices` | array | | `#/components/schemas/practiceResponseItem` | |
| `vetIds` | array | string | | |
| `errors` | array | string | | |

-----

#### `healthResponse`

  * **Type:** `object`
  * **Description:** A health response.
  * **Required Fields:**
      * `status`

**Properties**
| Property | Type | Items | Enum |
| :--- | :--- | :--- | :--- |
| `status` | string | | `[ Healthy, Unhealthy ]` |
| `errors` | array | string | |

-----

#### `serviceErrorResponse`

  * **Type:** `object`
  * **Description:** An error response.
  * **Required Fields:**
      * `error`

**Properties**
| Property | Type | Schema |
| :--- | :--- | :--- |
| `error` | object | `#/components/schemas/serviceError` |

**Example**

```json
{
  "error": {
    "code": "InternalServerError",
    "message": "Something went wrong with the request."
  }
}
```

-----

#### `serviceError`

  * **Type:** `object`
  * **Description:** A service error in the form exposed to the outside.
  * **Required Fields:**
      * `code`
      * `message`

**Properties**
| Property | Type | Items | Schema | Description |
| :--- | :--- | :--- | :--- | :--- |
| `code` | string | | | The error code. |
| `message` | string | | | The human-readable representation of the error. |
| `details` | array | | `#/components/schemas/serviceErrorDetail` | The additional level of details regarding the error. |
| `innerError`| object | | `#/components/schemas/serviceError` | |

-----

#### `serviceErrorDetail`

  * **Type:** `object`
  * **Description:** An additional detail about the service error.
  * **Required Fields:**
      * `target`
      * `message`

**Properties**
| Property | Type | Description |
| :--- | :--- | :--- |
| `target` | string | The target of the error detail. |
| `message`| string | The human-readable representation of the error detail. |