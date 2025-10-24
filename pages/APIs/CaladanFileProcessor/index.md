Here is the YAML file converted to Markdown format.

# Caladan.FileProcessor

**Version:** 0.5.18
**OpenAPI:** 3.0.3

REST API service to extract invoice information.

**Contact:**

  * **Name:** GlobalLogic
  * **URL:** `https://globallogic.com`
  * **Email:** `andrii.nikolenko@globallogic.com`

-----

## API Tags

### File Processor

A set of APIs for extract invoice information from the file.

### Monitoring

A set of internal APIs for monitoring the service. These APIs can be used by monitoring software to check if the service is healthy.

-----

## Paths

### GET /api/file-processor/files/{id}

  * **Summary:** Extract invoice information
  * **Operation ID:** `extractInvoiceInformation`
  * **Description:** Extracts the invoice information.
  * **Tags:** `File Processor`
  * **Security:** `apiKey`

**Parameters:**

  * `$ref: '#/components/parameters/fileId'`

**Responses:**

  * **`200 OK`**: The invoice information has been extracted.
      * **Content:** `application/json`
      * **Schema:** `$ref: '#/components/schemas/extendedInvoice'`
  * **`400`**: `$ref: '#/components/responses/badRequest'`
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`404`**: `$ref: '#/components/responses/notFoundError'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### GET /api/file-processor/v2/files/{id}

  * **Summary:** Initialize invoice extraction
  * **Operation ID:** `extractInvoiceInformationV2`
  * **Description:** Initializes the invoice extraction.
  * **Tags:** `File Processor`
  * **Security:** `apiKey`

**Parameters:**

  * `$ref: '#/components/parameters/fileId'`

**Responses:**

  * **`200 OK`**: The invoice extraction has been started.
      * **Content:** `application/json`
      * **Schema:** `$ref: '#/components/schemas/fileProcessorOkResponse'`
  * **`400`**: `$ref: '#/components/responses/badRequest'`
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`404`**: `$ref: '#/components/responses/notFoundError'`
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### GET /api/file-processor/health

  * **Summary:** Get the health status of the service.
  * **Operation ID:** `getHealthStatus`
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
            "CosmosDb Authentication key is required"
          ]
        }
        ```
  * **`500`**: `$ref: '#/components/responses/internalServerError'`
  * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### POST /api/file-processor/files/{id}/feedback

  * **Summary:** Submit feedback for a file
  * **Operation ID:** `submitFileFeedback`
  * **Description:** Allows submission of feedback with status and status description for a specific file.
  * **Tags:** `File Processor`
  * **Security:** `apiKey`

**Parameters:**

  * `$ref: '#/components/parameters/fileId'`

**Request Body (Required):**

  * **Content:** `application/json`
  * **Schema:** `$ref: '#/components/schemas/fileFeedback'`

**Responses:**

  * **`200 OK`**: Feedback submitted successfully.
  * **`400`**: `$ref: '#/components/responses/badRequest'`
  * **`401`**: `$ref: '#/components/responses/unauthorized'`
  * **`404`**: `$ref: '#/components/responses/notFoundError'`
  * **`412 Precondition Failed`**: The file is not in the Completed state.
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

### Parameters

#### fileId

  * **Name:** `id`
  * **In:** `path`
  * **Required:** `true`
  * **Description:** A file identifier.
  * **Schema:** `string`
  * **Example:** `a8e23edb-d313-4de9-8138-cee9fbc0ca46`

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

#### extendedInvoice

  * **Type:** `object`
  * **Description:** The extended invoice object
  * **Properties:**
      * `invoice`: `$ref: '#/components/schemas/invoice'`
      * `verificationErrors`: `array` (of `string`)
      * `confidenceThresholds`: `array` (of `$ref: '#/components/schemas/confidenceThreshold'`)
      * `status`: `$ref: '#/components/schemas/validationStatus'`
  * **Example:**
    ```json
    {
      "invoice": {
        "vet": {
          "vetId": 14560,
          "name": "North Center Animal Hospital",
          "address": "1808 W. Addison St",
          "city": "Chicago",
          "state": "IL",
          "zipCode": "60613",
          "country": "US"
        },
        "petOwner": {
          "firstName": "Zaynab",
          "lastName": "Hossein",
          "phoneNumber": "(312) 399-2271",
          "address": "",
          "city": "Chicago",
          "state": "IL",
          "zipCode": "60068",
          "country": "US"
        },
        "pets": [
          {
            "petName": "Doggy",
            "subtotal": 100.69,
            "lineItems": [
              {
                "invoiceItemId": 1,
                "description": "PrednisTab 5mg (Per Tablet)",
                "lossDate": "2024/07/27",
                "quantity": 14,
                "amountCharged": 19.9
              },
              {
                "invoiceItemId": 2,
                "description": "Examination, Illness Clinical Support",
                "lossDate": "2024/07/27",
                "quantity": 1,
                "amountCharged": 86.79
              }
            ]
          }
        ]
      },
      "verificationErrors": [
        "Total sum of line items doesn't match to total of the invoice",
        "Missing Pet owner address"
      ],
      "confidenceThresholds": [
        {
          "name": "price",
          "value": 0.8
        },
        {
          "name": "description",
          "value": 0.8
        }
      ],
      "status": "Failed"
    }
    ```

#### fileProcessorOkResponse

  * **Type:** `object`
  * **Description:** The v2 file processor response
  * **Properties:**
      * `message`: `string`
  * **Example:**
    ```json
    {
      "message": "Processing started. To receive the results, make sure to subscribe to the webhook."
    }
    ```

#### validationStatus

  * **Type:** `string`
  * **Enum:** `[ Passed, Failed, AutoPassed ]`

#### confidenceThreshold

  * **Type:** `object`
  * **Description:** The confidence threshold
  * **Properties:**
      * `name`: `string`
      * `value`: `number`
  * **Example:**
    ```json
    {
      "name": "price",
      "value": 0.8
    }
    ```

#### invoice

  * **Type:** `object`
  * **Description:** The invoice object
  * **Properties:**
      * `vet`: `$ref: '#/components/schemas/vetPractice'`
      * `petOwner`: `$ref: '#/components/schemas/petOwner'`
      * `pets`: `array` (of `$ref: '#/components/schemas/pet'`)
      * `total`: `number`
      * `invoiceNumber`: `string`
  * **Example:**
    ```json
    {
      "vet": {
        "vetId": 14560,
        "name": "North Center Animal Hospital",
        "address": "1808 W. Addison St",
        "city": "Chicago",
        "state": "IL",
        "zipCode": "60613",
        "country": "US"
      },
      "petOwner": {
        "firstName": "Zaynab",
        "lastName": "Hossein",
        "phoneNumber": "(312) 399-2271",
        "address": "1011 N Delphia Ave Park Ridge",
        "city": "Chicago",
        "state": "IL",
        "zipCode": "60068",
        "country": "US"
      },
      "pets": [
        {
          "petName": "Doggy",
          "subtotal": 106.69,
          "lineItems": [
            {
              "invoiceItemId": 1,
              "description": "PrednisTab 5mg (Per Tablet)",
              "lossDate": "2024/07/27",
              "quantity": 14,
              "amountCharged": 19.9
            },
            {
              "invoiceItemId": 2,
              "description": "Examination, Illness Clinical Support",
              "lossDate": "2024/07/27",
              "quantity": 1,
              "amountCharged": 86.79
            }
          ]
        }
      ]
    }
    ```

#### vetPractice

  * **Type:** `object`
  * **Description:** The vet practice object
  * **Properties:**
      * `vetId`: `string` (The internal Vet identifier of vNext)
      * `name`: `string`
      * `address`: `string`
      * `city`: `string`
      * `state`: `string`
      * `zipCode`: `string`
      * `country`: `string`

#### petOwner

  * **Type:** `object`
  * **Description:** The Pet Owner object.
  * **Properties:**
      * `firstName`: `string`
      * `lastName`: `string`
      * `phoneNumber`: `string`
      * `address`: `string`
      * `city`: `string`
      * `state`: `string`
      * `zipCode`: `string`
      * `country`: `string`

#### pet

  * **Type:** `object`
  * **Description:** The Pet object with line items
  * **Properties:**
      * `petName`: `string`
      * `subTotal`: `number`
      * `invoiceItems`: `array` (of `$ref: '#/components/schemas/lineItem'`)

#### lineItem

  * **Type:** `object`
  * **Description:** The line item of the invoice.
  * **Properties:**
      * `invoiceItemId`: `string`
      * `description`: `string`
      * `lossDate`: `string` (format: `date`)
      * `quantity`: `number`

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

#### fileFeedback

  * **Type:** `object`
  * **Description:** Feedback submission for a file.
  * **Required:** `[ status, statusDescription ]`
  * **Properties:**
      * `status`: `string` (Enum: `[ Passed, Failed ]`. The status of the file feedback.)
      * `statusDescription`: `string` (MaxLength: 500. Additional details about the file feedback.)