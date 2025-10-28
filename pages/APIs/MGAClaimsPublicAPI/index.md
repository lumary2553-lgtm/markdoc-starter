# OpenAPI: ClarusTech.Mga.Claims (0.2.17)

## Tags

* **Claims**: Manage claims

## Authentication

This API uses JWT Bearer token authentication. All protected endpoints require an `Authorization` header.

**Security Scheme**: `jwtToken`
* **Type**: `http`
* **Scheme**: `bearer`
* **Format**: `JWT`

---

## Paths

### `/api/v1/claims`

#### GET
Get claims for a practice within a time range

**Security**
* `jwtToken`: [ ]

**Parameters**

| Name | Description | Required | Schema |
| :--- | :--- | :--- | :--- |
| `clarusPracticeId` | Practice identifier | **Yes** | string |
| `period` | Time period for filtering claims | No | `dashboardPeriod` |
| `currentPage` | Page number (min: 1, max: 2147483647) | No | integer |
| `pageSize` | Records per page (min: 1, max: 100) | No | integer |
| `sortBy` | Sort expression 'field:direction' | No | string |

**Sort Fields**
* `claimid`: Claim identifier
* `customerid`: Customer identifier
* `status`: Claim status
* `paid`: Paid amount
* `claimed`: Claimed amount
* `allowed`: Allowed amount
* `claimdate`: Claim date
* `mganame`: MGA name

**Examples**
* `paid:asc`: Sort by paid amount ascending
* `claimdate:desc`: Sort by claim date descending

**Responses**

* **`200`** (OK): Claims retrieved successfully
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/pagedResponse_OasPracticeClaim'`
* **`400`** (Bad Request): Invalid request parameters
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/apiErrorResponse'`
* **`401`** (Unauthorized): Authentication required
* **`500`** (Internal Server Error): Unexpected error occurred
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/apiErrorResponse'`

#### POST
Creates new claims in the database

**Security**
* `jwtToken`: [ ]

**Request Body**
* Content: `application/json`
    * Schema: Array of `$ref: '#/components/schemas/practiceClaimParameters'`
    * Required: true

**Responses**

* **`201`** (Created): Claims successfully created
* **`400`** (Bad Request): Invalid request format or data
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/apiErrorResponse'`
* **`401`** (Unauthorized): Authentication required
* **`500`** (Internal Server Error): Unexpected error occurred
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/apiErrorResponse'`

#### PUT
Updates existing claims in the database

**Security**
* `jwtToken`: [ ]

**Request Body**
* Content: `application/json`
    * Schema: Array of `$ref: '#/components/schemas/practiceClaimParameters'`
    * Required: true
    * Description: Array of claim update models with updated details

**Responses**

* **`204`** (No Content): Claims successfully updated
* **`400`** (Bad Request): Invalid request format or data
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/apiErrorResponse'`
* **`401`** (Unauthorized): Authentication required
* **`500`** (Internal Server Error): Unexpected error occurred
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/apiErrorResponse'`

-----

### `/api/v1/claims/dashboard`

#### GET
Retrieves dashboard data for a specific practice and period

**Security**
* `jwtToken`: [ ]

**Parameters**

| Name | Description | Required | Schema |
| :--- | :--- | :--- | :--- |
| `clarusPracticeId` | Practice identifier | **Yes** | string |
| `period` | Reporting period | **Yes** | `dashboardPeriod` |

**Responses**

* **`200`** (OK): Dashboard data retrieved successfully
    * Content: `application/json`
        * Schema: Array of `$ref: '#/components/schemas/practiceClaimsDashboard'`
* **`400`** (Bad Request): Invalid request parameters
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/apiErrorResponse'`
* **`401`** (Unauthorized): Authentication required
* **`500`** (Internal Server Error): Unexpected error occurred
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/apiErrorResponse'`

#### POST
Creates new dashboard entries

**Security**
* `jwtToken`: [ ]

**Request Body**
* Content: `application/json`
    * Schema: Array of `$ref: '#/components/schemas/practiceClaimsDashboard'`
    * Required: true

**Responses**

* **`201`** (Created): Dashboard entries successfully created
* **`400`** (Bad Request): Invalid request format or data
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/apiErrorResponse'`
* **`401`** (Unauthorized): Authentication required
* **`500`** (Internal Server Error): Unexpected error occurred
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/apiErrorResponse'`

#### PUT
Updates existing dashboard entries

**Security**
* `jwtToken`: [ ]

**Request Body**
* Content: `application/json`
    * Schema: Array of `$ref: '#/components/schemas/practiceClaimsDashboard'`
    * Required: true

**Responses**

* **`204`** (No Content): Dashboard entries successfully updated
* **`400`** (Bad Request): Invalid request format or data
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/apiErrorResponse'`
* **`401`** (Unauthorized): Authentication required
* **`500`** (Internal Server Error): Unexpected error occurred
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/apiErrorResponse'`

-----

### `/api/health`

#### GET
Gets the service health status

**Security**
* `jwtToken`: [ ]

**Responses**

* **`200`** (OK): Service is healthy
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/healthResponse'`
* **`500`** (Internal Server Error): Service is unhealthy
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/apiErrorResponse'`

### `/api/health/deep`

#### GET
Gets detailed service health status including dependencies

**Security**
* `jwtToken`: [ ]

**Responses**

* **`200`** (OK): Service and dependencies are healthy
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/healthResponse'`
* **`500`** (Internal Server Error): Service or dependency is unhealthy
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/apiErrorResponse'`

### Schemas

#### Active Insured Pet
Information about an actively insured pet and associated conditions

* **Properties**
    * `conditionName` (string): Pet's medical condition name
    * `percentage` (number): Associated percentage value

* **Required Properties**
    * `conditionName`

#### API Error
Base error information

* **Properties**
    * `code` (string): Error classification code
    * `message` (string): Human-readable error description

* **Required Properties**
    * `code`
    * `message`

#### API Error Response
Standardized API error response envelope

* **Properties**
    * `error` (API Error): Error details object

* **Required Properties**
    * `error`

#### Dashboard Claim Summary
Summary of claim details for a dashboard context

* **Properties**
    * `totalClaims` (integer): Total number of claims
    * `totalPaid` (number): Total monetary amount paid for claims

#### Dashboard Common Condition
Common conditions displayed on the Dashboard

* **Properties**
    * `conditionName` (string): Condition name
    * `percentage` (number): Percentage of claims with this condition

* **Required Properties**
    * `conditionName`

#### Dashboard Insured Pet Summary
Summary of insured pet information

* **Properties**
    * `totalInsuredPets` (integer): Total number of insured pets
    * `totalActiveInsuredPets` (integer): Number of actively insured pets
    * `activeInsuredPets` (array): List of active insured pets and conditions
        * Items: `$ref: '#/components/schemas/activeInsuredPetModel'`

* **Required Properties**
    * `activeInsuredPets`

#### Dashboard Period
Available reporting periods for dashboard data

* **Enum Values**
    * `CurrentMonth`: Current month data
    * `Last3Months`: Last 3 months data
    * `Last6Months`: Last 6 months data
    * `Year`: Full year data

#### Paged Practice Claims Response
Paginated list of practice claims

* **Properties**
    * `items` (array): List of practice claims
        * Items: `$ref: '#/components/schemas/practiceClaim'`
    * `totalPages` (integer): Total number of pages
    * `currentPage` (integer): Current page number

#### Practice Claim
Individual claim record in the response

* **Properties**
    * `clarusPracticeId` (string): Practice identifier
    * `claimId` (string): External claim identifier
    * `customerId` (string): Pet owner identifier
    * `status` (string): Claim status
    * `paid` (number): Amount paid on claim
    * `claimed` (number): Amount claimed
    * `allowed` (number): Amount allowed
    * `createdBy` (string): Creator's identifier
    * `createdDateTime` (string, date-time): Creation timestamp
    * `updatedBy` (string): Last updater's identifier
    * `updatedDateTime` (string, date-time): Last update timestamp
    * `claimDate` (string, date-time): Date of claim
    * `mgaName` (string): MGA name

#### Practice Claim Parameters
Parameters for creating or updating a claim

* **Properties**
    * `clarusPracticeId` (string, min length: 1): Practice identifier
    * `claimId` (string, min length: 1): Claim identifier
    * `customerId` (string, min length: 1): Pet owner identifier
    * `status` (string, min length: 1): Claim status
    * `paid` (number): Amount paid
    * `claimed` (number): Amount claimed
    * `allowed` (number): Amount allowed
    * `mgaName` (string, min length: 1, max length: 100): MGA name
    * `claimDate` (string, date-time): Claim date

* **Required Properties**
    * `clarusPracticeId`
    * `claimId`
    * `customerId`
    * `status`
    * `mgaName`
    * `claimDate`

#### Problem Details
Standard problem details object for HTTP APIs

* **Properties**
    * `type` (string): URI reference that identifies the problem type
    * `title` (string): Summary of the problem
    * `status` (integer): HTTP status code
    * `detail` (string): Detailed explanation
    * `instance` (string): URI reference that identifies the specific occurrence