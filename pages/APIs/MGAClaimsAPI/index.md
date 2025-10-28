# OpenAPI: ClarusTech.Mga.Claims (0.2.17)

## Tags

* **Claims**: Manage claims
* **Dashboard**: Provides aggregated metrics and insights for claims.

---

## Paths

### `/api/v1/claims`

#### GET
Get claims for a practice within a time range

**Security**
* `jwtToken`: [ ]

**Parameters**

| Name | In | Description | Required | Schema |
| :--- | :--- | :--- | :--- | :--- |
| `clarusPracticeId` | query | Practice identifier | **Yes** | string |
| `period` | query | Time period for filtering claims | No | `$ref: '#/components/schemas/dashboardPeriod'` |
| `currentPage` | query | Page number for pagination (min: 1, max: 2147483647) | No | integer |
| `pageSize` | query | Records per page (min: 1, max: 100) | No | integer |
| `sortBy` | query | Sort expression in 'field:direction' format | No | string |

**Sort Fields**
* `claimid`: Claim identifier
* `customerid`: Customer identifier
* `status`: Claim status
* `paid`: Paid amount
* `claimed`: Claimed amount
* `allowed`: Allowed amount
* `claimdate`: Claim date
* `mganame`: MGA name

**Sort Examples**
* `paid:asc`: Sort by paid amount ascending
* `claimdate:desc`: Sort by claim date descending
* `status:asc`: Sort by status ascending

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

---

#### POST
Create new claims in the database

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

---

#### PUT
Update existing claims in the database

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

---

### `/api/health`

#### GET
Gets the service health status

**Tags**: `Monitoring`

**Responses**

* **`200`** (OK): Service is healthy
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/healthResponse'`
* **`500`** (Internal Server Error): Service is unhealthy
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/apiErrorResponse'`

---

### `/api/health/deep`

#### GET
Gets detailed service health status including dependencies

**Tags**: `Monitoring`

**Responses**

* **`200`** (OK): Service and dependencies are healthy
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/healthResponse'`
* **`500`** (Internal Server Error): Service or dependency is unhealthy
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/apiErrorResponse'`

---

### `/api/v1/claims/dashboard`

#### GET
Retrieves dashboard metrics and insights for a practice

**Tags**: `Dashboard`

**Security**
* `jwtToken`: [ ]

**Parameters**

| Name | In | Description | Required | Schema |
| :--- | :--- | :--- | :--- | :--- |
| `clarusPracticeId` | query | Practice identifier | **Yes** | string |
| `period` | query | Reporting period | **Yes** | `$ref: '#/components/schemas/dashboardPeriod'` |

**Responses**

* **`200`** (OK): Dashboard data retrieved successfully
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/dashboardResponse'`
        * Schema: array
            * Items: `$ref: '#/components/schemas/practiceClaimsDashboard'`
* **`400`** (Bad Request): Bad Request – The request is invalid or malformed.
    * Content: `text/plain`, `application/json`, `text/json`
        * Schema: `$ref: '#/components/schemas/apiErrorResponse'`
* **`401`** (Unauthorized): Unauthorized - The requester is not authenticated.
* **`500`** (Internal Server Error): Internal Server Error – An unexpected error has occurred.
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/apiErrorResponse'`

---

#### POST
Creates new dashboard entries.

*Tags*: `Dashboard`

**Security**: `jwtToken`

**Request Body**

* Content: `application/json`, `text/json`, `application/*+json`
    * Schema: array
        * Items: `$ref: '#/components/schemas/practiceClaimsDashboard'`

**Responses**

* **`201`** (Created): Created
* **`400`** (Bad Request): Bad Request – The request is invalid or malformed.
    * Content: `text/plain`, `application/json`, `text/json`
        * Schema: `$ref: '#/components/schemas/apiErrorResponse'`
* **`401`** (Unauthorized): Unauthorized - The requester is not authenticated.
* **`500`** (Internal Server Error): Internal Server Error – An unexpected error has occurred.
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/apiErrorResponse'`

---

#### PUT
Updates existing dashboard entries.

*Tags*: `Dashboard`

**Security**: `jwtToken`

**Request Body**

* Content: `application/json`, `text/json`, `application/*+json`
    * Schema: array
        * Items: `$ref: '#/components/schemas/practiceClaimsDashboard'`

**Responses**

* **`204`** (No Content): No Content
* **`400`** (Bad Request): Bad Request – The request is invalid or malformed.
    * Content: `text/plain`, `application/json`, `text/json`
        * Schema: `$ref: '#/components/schemas/apiErrorResponse'`
* **`401`** (Unauthorized): Unauthorized - The requester is not authenticated.
* **`500`** (Internal Server Error): Internal Server Error – An unexpected error has occurred.
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/apiErrorResponse'`

---

## Components

### Schemas

#### `activeInsuredPetModel` (object)
Represents an active insured pet along with its associated condition data.

*Properties*
* **`conditionName`** (string, *required*): Gets the name of the condition associated with an active insured pet.
* `percentage` (number, format: double)

#### `apiError` (object)

*Properties*
* **`code`** (string, *required*)
* **`message`** (string, *required*)

#### `apiErrorResponse` (object)

### Schemas

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
    * `activeInsuredPets` (array): List of active insured pets
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
    * `items` (array of Practice Claim): List of claims
    * `totalPages` (integer): Total number of pages
    * `currentPage` (integer): Current page number

#### Practice Claim
Individual claim record

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
    * `clarusPracticeId` (string): Practice identifier
    * `claimId` (string): Claim identifier
    * `customerId` (string): Pet owner identifier
    * `status` (string): Claim status
    * `paid` (number): Amount paid
    * `claimed` (number): Amount claimed
    * `allowed` (number): Amount allowed
    * `mgaName` (string, max length: 100): MGA name
    * `claimDate` (string, date-time): Claim date

* **Required Properties**
    * `clarusPracticeId`
    * `claimId`
    * `customerId`
    * `status`
    * `mgaName`
    * `claimDate`

#### Practice Claims Dashboard
Dashboard data for a specific month and practice

* **Properties**
    * `clarusPracticeId` (string): Practice identifier
    * `month` (string): Dashboard month
    * `claims` (array): List of claim summaries
        * Items: `$ref: '#/components/schemas/dashboardClaimSummaryModel'`
    * `insuredPets` (array): List of insured pet summaries
        * Items: `$ref: '#/components/schemas/dashboardInsuredPetSummaryModel'`
    * `commonConditions` (array): List of common conditions
        * Items: `$ref: '#/components/schemas/dashboardCommonConditionModel'`

* **Required Properties**
    * `clarusPracticeId`
    * `month`
    * `claims`
    * `insuredPets`
    * `commonConditions`

*Properties*
* `type` (string)
* `title` (string)
* `status` (integer, format: int32)
* `detail` (string)
* `instance` (string)

---

### Security Schemes

#### `jwtToken` (http)
JWT Bearer token
* **Scheme**: bearer
* **Bearer Format**: JWT
```