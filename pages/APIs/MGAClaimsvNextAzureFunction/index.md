# OpenAPI: ClarusTech.Mga.VNextClaims (0.2.17)

A set of APIs to manage VNext Claims.

## Tags

* **Health**: Service health check endpoint
* **Claims**: Manage VNext claims

## Contact Information

* **Organization**: ClarusTechnology
* **Website**: https://www.clarustechnology.com
* **Email**: ContactUsAPI@clarusTech.com

---

## Paths

### `/api/health`

#### GET
Gets the service health status

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
        "Error message 1",
        "Error message 2"
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
        "Error message 1",
        "Error message 2"
    ]
}
```

* **`500`** (Internal Server Error): Unexpected error occurred
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/serviceErrorResponse'`
* **`503`** (Service Unavailable): Service temporarily unavailable
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/serviceErrorResponse'`

---

## Tags

### `Monitoring`
A set of internal APIs for monitoring the service. These APIs can be used by monitoring software to check if the service is healthy.

---

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

**Content**: `application/json`
* Schema: `$ref: '#/components/schemas/serviceErrorResponse'`

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

#### Service Error Response
Standardized API error response envelope

* **Properties**
    * `error` (Service Error): Error details object

* **Required Properties**
    * `error`