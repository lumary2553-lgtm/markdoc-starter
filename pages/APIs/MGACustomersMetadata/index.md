# OpenAPI: ClarusTech.Mga.Pii (0.2.9)

## Tags

* **Health**: Service health check endpoint
* **Metadata**: Manage customer metadata

## Contact Information

* **Organization**: ClarusTechnology
* **Website**: https://www.clarustechnology.com
* **Email**: ContactUsAPI@clarusTech.com

---

## Paths

### `/api/health`

#### GET
Gets the health status of the service

**Tags**: `Monitoring`

**Responses**

* **`200`** (OK): The service is healthy
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/healthResponse'`
```json
{
    "status": "Healthy"
}
```

* **`400`** (Bad Request): The service is unhealthy
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/healthResponse'`
        * Example:
```json
{
    "status": "Unhealthy",
    "errors": [
        "Error message 1",
        "Error message 2"
    ]
}
```
* **`500`** (Internal Server Error): An unexpected error occurred
    * Content: `$ref: '#/components/responses/internalServerError'`
* **`503`** (Service Unavailable): The service is temporarily unavailable
    * Content: `$ref: '#/components/responses/serviceUnavailable'`

### `/api/health/deep`

#### GET
Gets a more thorough health status of the service

**Tags**: `Monitoring`
**Responses**

* **`200`** (OK): The service is healthy
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/healthResponse'`
        * Example:
```json
{
    "status": "Healthy"
}
```
* **`400`** (Bad Request): The service is unhealthy
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/healthResponse'`
        * Example:
```json
{
    "status": "Unhealthy",
    "errors": [
        "Error message 1",
        "Error message 2"
    ]
}
```
* **`500`** (Internal Server Error): An unexpected error occurred
    * Content: `$ref: '#/components/responses/internalServerError'`
* **`503`** (Service Unavailable): The service is temporarily unavailable
    * Content: `$ref: '#/components/responses/serviceUnavailable'`

### `/api/v1/mgas/{mgaName}/customers/{customerId}`

Gets HouseholdId by MGA name and customerId

**Security**
* `jwtToken`: [ ]

**Operation ID**: `getHouseholdIdByMgaAndCustomer`

**Tags**: `MGA`

**Parameters**

| Name | In | Description | Required | Schema |
| :--- | :--- | :--- | :--- | :--- |
| `mgaName` | path | The name of the MGA | **Yes** | string |
| `customerId` | path | The customer identifier | **Yes** | string |

**Responses**

* **`200`** (OK): Successfully retrieved HouseholdId
    * Content: `application/json`
        * Schema: object
            * Properties:
                * `householdId` (string, example: "HH123456789")
* **`401`** (Unauthorized): Missing or invalid credentials
* **`404`** (Not Found): MGA name or CustomerId not found
          * **'500':** `$ref: '#/components/responses/internalServerError'`
          * **'503':** `$ref: '#/components/responses/serviceUnavailable'`

-----

### `/api/v1/customers`

#### POST
Adds new customer metadata to the database

**Security**
* `jwtToken`: [ ]

**Tags**: `Customers Metadata`

**Request Body**
* Content: `application/json`
    * Schema: Array of `$ref: '#/components/schemas/mgaCustomerData'`
    * Required: true

**Responses**

* **`204`** (No Content): Customers have been saved to the database
* **`400`** (Bad Request): Invalid request
    * Content: `$ref: '#/components/responses/badRequest'`
* **`401`** (Unauthorized): Authentication required
    * Content: `$ref: '#/components/responses/unauthorized'`
* **`500`** (Internal Server Error): An unexpected error occurred
    * Content: `$ref: '#/components/responses/internalServerError'`
* **`503`** (Service Unavailable): The service is temporarily unavailable
    * Content: `$ref: '#/components/responses/serviceUnavailable'`

#### PUT
Updates customer metadata in the database

* Content: `application/json`
    * Schema: Array of `$ref: '#/components/schemas/mgaCustomerData'`
    * Required: true

**Responses**

* **`204`** (No Content): Customers have been updated in the database
* **`400`** (Bad Request): Invalid request
    * Content: `$ref: '#/components/responses/badRequest'`
* **`401`** (Unauthorized): Authentication required
    * Content: `$ref: '#/components/responses/unauthorized'`
* **`500`** (Internal Server Error): An unexpected error occurred
    * Content: `$ref: '#/components/responses/internalServerError'`
* **`503`** (Service Unavailable): The service is temporarily unavailable
    * Content: `$ref: '#/components/responses/serviceUnavailable'`

### `/api/v1/customers/search`

#### POST
Search for MGA customer metadata by CustomerId, HouseholdId, or MgaName

**Security**
* `jwtToken`: [ ]

**Operation ID**: `searchMgaCustomers`

**Tags**: `Customers Metadata`
      * **Request Body:**
          * **Required:** true
**Request Body**
* Content: `application/json`
    * Schema: `$ref: '#/components/schemas/oasMgaCustomerSearchParameters'`
    * Required: true

**Responses**

* **`200`** (OK): List of matching MGA customers
    * Content: `application/json`
        * Schema: Array of `$ref: '#/components/schemas/oasMgaCustomerSearchData'`
        * Example:
```json
[
    {
        "customerId": "C001",
        "mgaName": "MGA_001",
        "householdId": "HH123"
    },
    {
        "customerId": "C002",
        "mgaName": "MGA_002",
        "householdId": "HH456"
    }
]
```
* **`400`** (Bad Request): Invalid request
    * Content: `$ref: '#/components/responses/badRequest'`
* **`401`** (Unauthorized): Authentication required
    * Content: `$ref: '#/components/responses/unauthorized'`
* **`500`** (Internal Server Error): An unexpected error occurred
    * Content: `$ref: '#/components/responses/internalServerError'`
* **`503`** (Service Unavailable): The service is temporarily unavailable
    * Content: `$ref: '#/components/responses/serviceUnavailable'`

### Available Tags

* **Customers Metadata**: APIs for managing customer metadata
* **MGA**: APIs for searching MGA customers
* **Monitoring**: Internal APIs for monitoring service health

### Security Schemes

#### JWT Authentication
* **Type**: `http`
* **Scheme**: `bearer`
* **Format**: `JWT`
* **Description**: Authentication using JWT token

### Common Responses

#### Bad Request
Invalid or malformed request. This includes:
- Missing or invalid data format
- Issues with request body or headers
- Interface implementation issues on client side
- Non-retryable errors requiring client or service changes

Content: `application/json`
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

#### Unauthorized
Authentication failure. This includes:
- Missing credentials
- Invalid or malformed credentials
- Non-retryable errors requiring client-side changes

#### Forbidden
Authorization failure. This includes:
- Authenticated but insufficient permissions
- Requires new JWT token with appropriate permissions
- Non-retryable without permission changes

#### Not Found
Resource not found. This includes:
- Resource does not exist
- Resource has been deleted
- Non-retryable as resource is unlikely to become available

#### Conflict
Request conflicts with current state:
- Typically when creating a resource that already exists
- May require resolution of the conflicting state

#### Precondition Failed
Request prerequisites not met:
- Required conditions not satisfied
- Check preconditions and try again

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

#### MGA Customer Data
Object containing customer metadata

* **Properties**
    * `customerId` (string, max length: 255): Customer identifier
    * `mgaName` (string, max length: 255): MGA name
    * `householdId` (string): Household identifier
    * `matchConfidence` (string): Confidence level of the match
    * `matchComponents` (string): Components used in matching
    * `distinctMatch` (boolean): Whether the match is distinct
    * `peopleRank` (string): Ranking score for people matching
    * `addressRank` (string): Ranking score for address matching
    * `emailRank` (string): Ranking score for email matching
    * `phoneRank` (string): Ranking score for phone matching
    * `phoneType` (string): Type of phone number
    * `suspectedFakeEmail` (boolean): Flag for suspected fake email
    * `isValidPhone` (boolean): Phone number validation status
    * `isBestPostalTouchpoint` (boolean): Best postal contact point indicator
    * `isValidEmail` (boolean): Email validation status

* **Required Properties**
    * `customerId`
    * `householdId`
    * `mgaName`

#### Health Response
Object describing service health status

* **Properties**
    * `status` (string, enum): Service status
        * `Healthy`
        * `Unhealthy`
    * `errors` (array of string): List of error messages

* **Required Properties**
    * `status`

#### Service Error Response
Object representing an API error response

* **Properties**
    * `error` (object): Error details object (see Service Error)

* **Required Properties**
    * `error`

**Example**
```json
{
    "error": {
        "code": "InternalServerError",
        "message": "Something went wrong with the request."
    }
}
```

#### Service Error
Detailed error information exposed to clients

* **Properties**
    * `code` (string): Error classification code
    * `message` (string): Human-readable error description
    * `details` (array of Service Error Detail): Additional error context

* **Required Properties**
    * `code`
    * `message`

#### Service Error Detail
Additional context about a service error

* **Properties**
    * `target` (string): Component or field that caused the error
    * `message` (string): Human-readable detail description

* **Required Properties**
    * `target`
    * `message`

#### MGA Customer Search Parameters
Parameters for searching MGA customer records

* **Properties**
    * `customerIds` (array of string): List of customer identifiers
    * `householdIds` (array of string): List of household identifiers
    * `mgaNames` (array of string): List of MGA names

#### MGA Customer Search Data
Customer information returned by MGA search operations

* **Properties**
    * `customerId` (string): Customer identifier
    * `mgaName` (string): MGA name
    * `householdId` (string): Household identifier

* **Required Properties**
    * `customerId`
    * `mgaName`
    * `householdId`