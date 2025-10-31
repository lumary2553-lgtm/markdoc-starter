# OpenAPI: ClarusTech.Mga.CustomersPII (0.2.1)

## Tags

* **Health**: Service health check endpoint
* **Customers**: Manage customer PII data

## Contact Information

* **Organization**: ClarusTechnology
* **Website**: https://www.clarustechnology.com
* **Email**: ContactUsAPI@clarusTech.com

---

## Paths

### `/api/health`

#### GET
Get service health status

**Security**
* `apiKey`: [ ]

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

**Tags**: `Monitoring`

### `/api/health/deep`

#### GET
Gets a more thorough health status of the service, including dependencies

**Security**
* `apiKey`: [ ]

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

**Tags**: `Monitoring`

### `/api/v1/customers-pii`

#### POST
Get customers PII data by MGA name and customerId

**Security**
* `apiKey`: [ ]

**Description**
Returns the list of customers PII data associated with the given MGA and customer.

**Operation ID**: `GetCustomersPiiData`

**Request Body**
* Content: `application/json`
    * Schema: Array of `$ref: '#/components/schemas/mgaCustomerPiiParameters'`
    * Required: true

**Responses**

* **`200`** (OK): Successfully retrieved customers PII data
    * Content: `application/json`
        * Schema: Array of `$ref: '#/components/schemas/mgaCustomerPiiData'`
* **`401`** (Unauthorized): Missing or invalid credentials
* **`404`** (Not Found): MGA name or CustomerId not found
* **`500`** (Internal Server Error): An unexpected error occurred
    * Content: `$ref: '#/components/responses/internalServerError'`
* **`503`** (Service Unavailable): The service is temporarily unavailable
    * Content: `$ref: '#/components/responses/serviceUnavailable'`

**Tags**: `Customers PII`

## Components

### Security Schemes

#### API Key Authentication
* **Type**: `apiKey`
* **Location**: `header`
* **Name**: `api-key`
* **Description**: Authentication with an API key

### Common Responses

#### Bad Request (400)
Invalid or malformed request
- Missing or invalid data format
- Issues with request body or headers
- Interface implementation issues on client side
- Non-retryable errors requiring client or service changes

**Content**: `application/json`
* Schema: `$ref: '#/components/schemas/serviceErrorResponse'`

**Example**:
```json
{
    "error": {
        "code": "BadRequest",
        "message": "The server cannot or will not process the request due to something that is perceived to be a client error."
    }
}
```

#### Unauthorized (401)
Authentication failure
- Missing credentials
- Invalid or malformed credentials
- Non-retryable errors requiring client-side changes

#### Forbidden (403)
Authorization failure
- Authenticated but insufficient permissions
- Requires new API key with appropriate permissions
- Non-retryable without permission changes

#### Not Found (404)
Resource not found
- Resource does not exist
- Resource has been deleted
- Non-retryable as resource is unlikely to become available

#### Conflict (409)
Request conflicts with current state
- Typically when creating a resource that already exists
- May require resolution of the conflicting state

#### Precondition Failed (412)
Request prerequisites not met
- Required conditions not satisfied
- Check preconditions and try again

#### Internal Server Error (500)
Unexpected service error
- Retry after 30 seconds
- Maximum 3 retry attempts
- See response content for error details

**Content**: `application/json`
* Schema: `$ref: '#/components/schemas/serviceErrorResponse'`

#### Service Unavailable (503)
Service temporarily unavailable
- Due to maintenance or other reasons
- Retry after one minute

### Schemas

#### MGA Customer PII Parameters
Parameters for retrieving customer PII data

* **Properties**
    * `mgaName` (string): The name of the MGA
    * `customerId` (string): The customer identifier

* **Required Properties**
    * `mgaName`
    * `customerId`

#### MGA Customer PII Data
Customer PII data associated with an MGA customer

* **Properties**
    * `mgaName` (string): The name of the MGA
    * `customerId` (string): The customer identifier
    * `firstName` (string): Customer's first name
    * `lastName` (string): Customer's last name
    * `email` (string): Customer's email address
    * `phone` (string): Customer's phone number
    * `address` (object): Customer's address
        * `street1` (string): Street address line 1
        * `street2` (string, optional): Street address line 2
        * `city` (string): City
        * `state` (string): State or province
        * `postalCode` (string): Postal/ZIP code
        * `country` (string): Country code

* **Required Properties**
    * `mgaName`
    * `customerId`
    * `firstName`
    * `lastName`
    * `email`
    * `address`

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