# OpenAPI: ClarusTech.Mga.Practices (0.1.41)

## Tags

* **Health**: Service health check endpoint
* **Practices**: Manage MGA practices

---

## Paths

### `/api/health`

#### GET
Get service health status

**Tags**: `Monitoring`

**Responses**

* **`200`** (OK): Service is healthy
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/healthResponse'`
        * Example:
```json
{
    "status": "Healthy"
}
```

* **`400`** (Bad Request): Service is unhealthy
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/healthResponse'`
        * Example:
```json
{
    "status": "Unhealthy",
    "errors": [
        "Error message 1"
    ]
}
```

* **`500`** (Internal Server Error): Unexpected error occurred
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/serviceErrorResponse'`
* **`503`** (Service Unavailable): Service temporarily unavailable
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/serviceErrorResponse'`

### `/api/health/deep`

#### GET
Gets detailed service health status including dependencies

**Tags**: `Monitoring`

**Responses**

* **`200`** (OK): Service and dependencies are healthy
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/healthResponse'`
        * Example:
```json
{
    "status": "Healthy"
}
```

* **`400`** (Bad Request): Service or dependency is unhealthy
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/healthResponse'`
        * Example:
```json
{
    "status": "Unhealthy",
    "errors": [
        "Database connection failed",
        "Cache service unavailable"
    ]
}
```

* **`500`** (Internal Server Error): Unexpected error occurred
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/serviceErrorResponse'`
* **`503`** (Service Unavailable): Service temporarily unavailable
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/serviceErrorResponse'`

### `/api/practices`

#### GET
Retrieves a list of all practices

**Tags**: `Practices`

**Responses**

* **`200`** (OK): Practices retrieved successfully
    * Content: `application/json`
        * Schema: Array of `$ref: '#/components/schemas/practiceModel'`
* **`401`** (Unauthorized): Authentication required
* **`500`** (Internal Server Error): Unexpected error occurred
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/serviceErrorResponse'`
* **`503`** (Service Unavailable): Service temporarily unavailable
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/serviceErrorResponse'`

#### POST
Creates a new practice

**Tags**: `Practices`

**Request Body**
* Content: `application/json`
    * Schema: `$ref: '#/components/schemas/addPracticeParameters'`
    * Required: true

**Responses**

* **`200`** (OK): Practice created successfully
    * Content: `application/json`
        * Schema: object
            * Properties:
                * `clarusPracticeId` (string, uuid): Practice identifier
        * Example:
```json
{
    "clarusPracticeId": "00000000-0000-0000-0000-000000000000"
}
```
* **`400`** (Bad Request): Invalid request parameters
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/serviceErrorResponse'`
* **`401`** (Unauthorized): Authentication required
* **`500`** (Internal Server Error): Unexpected error occurred
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/serviceErrorResponse'`
* **`503`** (Service Unavailable): Service temporarily unavailable
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/serviceErrorResponse'`

#### PUT
Updates an existing practice

**Tags**: `Practices`

**Request Body**
* Content: `application/json`
    * Schema: `$ref: '#/components/schemas/updatePracticeParameters'`
    * Required: true

**Responses**

* **`200`** (OK): Practice updated successfully
* **`400`** (Bad Request): Invalid request parameters
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/serviceErrorResponse'`
* **`401`** (Unauthorized): Authentication required
* **`500`** (Internal Server Error): Unexpected error occurred
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/serviceErrorResponse'`
* **`503`** (Service Unavailable): Service temporarily unavailable
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/serviceErrorResponse'`

### `/api/practices/{practiceId}`

#### GET
Returns a practice by identifier

**Parameters**

| Name | In | Description | Required | Schema |
| :--- | :--- | :--- | :--- | :--- |
| `practiceId` | path | The unique identifier of the practice | **Yes** | string |

**Responses**

* **`200`** (OK): The requested practice
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/practiceModel'`
* **`401`** (Unauthorized): Authentication required
    * Content: `$ref: '#/components/responses/unauthorized'`
* **`404`** (Not Found): Practice not found
* **`500`** (Internal Server Error): An unexpected error occurred
    * Content: `$ref: '#/components/responses/internalServerError'`
* **`503`** (Service Unavailable): The service is temporarily unavailable
    * Content: `$ref: '#/components/responses/serviceUnavailable'`

**Tags**: `Practices`

### `/api/practices/corporate-groups/{groupId}`

#### GET
Retrieves practices for a specific corporate group

**Tags**: `Practices`

**Parameters**

| Name | Description | Required | Schema |
| :--- | :--- | :--- | :--- |
| `groupId` | Corporate group identifier | **Yes** | string |
| `searchString` | Practice name filter | No | string |

**Responses**

* **`200`** (OK): Practices retrieved successfully
    * Content: `application/json`
        * Schema: Array of `$ref: '#/components/schemas/practiceModel'`
* **`401`** (Unauthorized): Authentication required
* **`404`** (Not Found): No practices found
* **`412`** (Precondition Failed): Invalid corporate group
* **`500`** (Internal Server Error): Unexpected error occurred
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/serviceErrorResponse'`
* **`503`** (Service Unavailable): Service temporarily unavailable
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/serviceErrorResponse'`

### `/api/practices/mapping`

#### POST
Creates a practice to MGA name mapping

**Tags**: `Practices`

**Request Body**
* Content: `application/json`
    * Schema: `$ref: '#/components/schemas/addPracticeMappingParameters'`
    * Required: true

**Responses**

* **`201`** (Created): Mapping created successfully
* **`400`** (Bad Request): Invalid request parameters
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/serviceErrorResponse'`
* **`401`** (Unauthorized): Authentication required
* **`500`** (Internal Server Error): Unexpected error occurred
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/serviceErrorResponse'`
* **`503`** (Service Unavailable): Service temporarily unavailable
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/serviceErrorResponse'`

### `/api/practices/unmapped`

#### GET
Retrieves practices without MGA mappings

**Tags**: `Practices`

**Responses**

* **`200`** (OK): Unmapped practices retrieved successfully
    * Content: `application/json`
        * Schema: Array of `$ref: '#/components/schemas/unmappedPracticeModel'`
* **`401`** (Unauthorized): Authentication required
* **`500`** (Internal Server Error): Unexpected error occurred
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/serviceErrorResponse'`
* **`503`** (Service Unavailable): Service temporarily unavailable
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/serviceErrorResponse'`

## Components

### Common Responses

#### Bad Request
Invalid or malformed request. This includes:
- Missing or invalid data format
- Issues with request body or headers
- Interface implementation issues on client side
- Non-retryable errors requiring client or service changes

Refer to response content for detailed violation information.
        application/json:
          schema:
            $ref: '#/components/schemas/serviceErrorResponse'
          example:
            error:
              code: BadRequest
              message: The server cannot or will not process the request due to something
                that is perceived to be a client error.

#### Unauthorized
Authentication failure. This includes:
- Missing credentials
- Invalid or malformed credentials
- Non-retryable errors requiring client-side changes

#### Internal Server Error
Unexpected service error:
- Retry after 30 seconds
- Maximum 3 retry attempts
- See response content for error details

Content: `application/json`
* Schema: `$ref: '#/components/schemas/serviceErrorResponse'`

#### Service Unavailable
Service temporarily unavailable:
- Due to maintenance or other reasons
- Retry after one minute

### Schemas

#### Health Response
Object describing service health status

* **Properties**
    * `status` (string, enum): Service status
        * `Healthy`
        * `Unhealthy`
    * `errors` (array of string): List of error messages

* **Required Properties**
    * `status`

#### Add Practice Parameters
Parameters for creating a new practice

* **Properties**
    * `vetId` (string): Veterinary practice identifier
    * `name` (string): Practice name
    * `address` (string): Street address
    * `city` (string): City name
    * `zipCode` (string): Postal/ZIP code
    * `state` (string): State/province
    * `country` (string): Country code

* **Required Properties**
    * `vetId`
    * `name`

#### Update Practice Parameters
Parameters for updating an existing practice

* **Properties**
    * `clarusPracticeId` (string): Practice identifier
    * `name` (string): Practice name
    * `address` (string): Street address
    * `city` (string): City name
    * `zipCode` (string): Postal/ZIP code
    * `state` (string): State/province
    * `country` (string): Country code

* **Required Properties**
    * `clarusPracticeId`
    * `name`

#### Practice Model
Practice information

* **Properties**
    * `clarusPracticeId` (string): Practice identifier
    * `vetId` (string): Veterinary practice identifier
    * `name` (string): Practice name
    * `address` (string): Street address
    * `city` (string): City name
    * `zipCode` (string): Postal/ZIP code
    * `state` (string): State/province
    * `country` (string): Country code
    * `mgaNames` (array of string): Associated MGA names

* **Required Properties**
    * `clarusPracticeId`
    * `vetId`
    * `name`

#### Unmapped Practice Model
Practice without MGA mapping

* **Properties**
    * `clarusPracticeId` (string): Practice identifier
    * `vetId` (string): Veterinary practice identifier
    * `name` (string): Practice name
    * `mgaNames` (array of string): Currently associated MGA names

* **Required Properties**
    * `clarusPracticeId`
    * `vetId`
    * `name`

#### Add Practice Mapping Parameters
Parameters for creating a practice-MGA mapping

* **Properties**
    * `clarusPracticeId` (string): Practice identifier
    * `mgaName` (string): MGA name to map to practice

* **Required Properties**
    * `clarusPracticeId`
    * `mgaName`

#### Service Error Response
Standardized API error response envelope

* **Properties**
    * `error` (object): Error details
        * `code` (string): Error classification code
        * `message` (string): Human-readable error description
        * `details` (array): Additional error context
            * `target` (string): Error target component
            * `message` (string): Detail description

* **Required Properties**
    * `error`

* **Required Properties**
    * `practiceId` (string)
    * `clarusPracticeId` (string)
    * `name` (string)

* **Properties**
    * `practiceId` (string)
    * `clarusPracticeId` (string)
        name:
          type: string
          nullable: false
        address:
          type: string
          nullable: true
        city:
          type: string
          nullable: true
        zipCode:
          type: string
          nullable: true
        state:
    * `name` (string)
    * `country` (string, nullable)

#### Unmapped Practice Model
Object representing an unmapped practice

* **Required Properties**
    * `practiceId` (string)
    * `name` (string)
    * `mgaName` (string)

* **Properties**
    * `practiceId` (string)
    * `name` (string)
    * `mgaName` (string)
    * `address` (string, nullable)
    * `city` (string, nullable)
    * `zipCode` (string, nullable)
          nullable: true
        state:
          type: string
          nullable: true
        country:
          type: string
          nullable: true
        matchRate:
          type: integer
        matchClarusPracticeId:
          type: string
          nullable: true

#### Add Practice Mapping Parameters
Object containing practice mapping parameters

* **Required Properties**
    * `practiceId` (string)
    * `clarusPracticeId` (string, format: uuid)
    * `mgaName` (string)

* **Properties**
    * `practiceId` (string)
    * `clarusPracticeId` (string, format: uuid)
    * `mgaName` (string)

#### Service Error Response
Object representing an error response

* **Required Properties**
    * `error` (`$ref: '#/components/schemas/serviceError'`)

* **Example**
```json
{
    "error": {
        "code": "InternalServerError",
        "message": "Something went wrong with the request."
    }
}
```

#### Service Error
Object representing a service error exposed externally

* **Required Properties**
    * `code` (string): Error code
    * `message` (string): Human-readable error description

* **Optional Properties**
    * `details` (array): Additional error details
        * Items: `$ref: '#/components/schemas/serviceErrorDetail'`

#### Service Error Detail
Object containing additional service error information

* **Required Properties**
    * `target` (string): Error detail target

* **Properties**
    * `target` (string): Error detail target
    * `message` (string): Human-readable error detail description
        - message