# OpenAPI: ClarusTech.Mga.InvoiceData (0.1.0)

## Overview

The Clarus Invoice Data API provides unified invoice data processing and retrieval. It combines OCR (Optical Character Recognition) with PIMS (Practice Information Management System) data lookup for accurate invoice information.

## Tags

* **Invoices**: Process and manage invoice data
* **Health**: Service health check endpoint

## Contact Information

* **Organization**: ClarusTechnology
* **Website**: https://www.clarustechnology.com
* **Email**: ContactUsAPI@clarusTech.com

## Authentication

### Overview
The API uses JSON Web Token (JWT) based authentication to secure all endpoints.

### Token Format
* Type: Bearer Token
* Format: JWT (JSON Web Token)
* Expiration: 24 hours from issuance

### Request Headers
```http
Authorization: Bearer <token>
Content-Type: application/json
```

### Token Contents
JWT payload includes:
* `mga_id`: MGA identifier
* `permissions`: Array of granted permissions
* `exp`: Token expiration timestamp
* `iat`: Token issuance timestamp

### Error Responses

#### Missing Token
```json
{
    "error": {
        "code": "AUTH_TOKEN_MISSING",
        "message": "Authentication token is required"
    }
}
```

#### Invalid Token
```json
{
    "error": {
        "code": "AUTH_TOKEN_INVALID",
        "message": "Invalid or malformed authentication token"
    }
}
```

#### Expired Token
```json
{
    "error": {
        "code": "AUTH_TOKEN_EXPIRED",
        "message": "Authentication token has expired"
    }
}
```

### Token Management
1. Request initial token through secure email channel
2. Store token securely in your environment
3. Monitor token expiration and request new token as needed
4. Do not share tokens between environments or applications

### Security Best Practices
1. Never expose tokens in client-side code
2. Use HTTPS for all API requests
3. Implement token rotation on regular intervals
4. Monitor for unauthorized token usage
5. Revoke compromised tokens immediately
* **Scheme**: `bearer`
* **Format**: `JWT`

Include the JWT token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Base URL

```
https://api.clarus.com/v1/invoice
```

## Paths

### `/api/v1/invoice/{customerId}/process`

#### POST
Process invoice image and return data from best available source

**Tags**: `Invoices`

**Security**
* `jwtToken`: [ ]

**Parameters**

| Name | Description | Required | Schema |
| :--- | :--- | :--- | :--- |
| `customerId` | Pet Parent Customer identifier | **Yes** | string |

**Request Body**
* Content: `multipart/form-data`
    * `invoice` (file): Invoice image (PDF, JPEG, PNG)
    * `webhookUrl` (string): Callback URL for completion notification

**Processing**
1. OCR processes invoice image
2. System extracts invoice number
3. PIMS lookup attempts using invoice number
4. Returns PIMS data if available, otherwise OCR data

**Responses**

* **`200`** (OK): Processing successful
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/invoiceResponse'`
* **`400`** (Bad Request): Invalid request parameters
* **`401`** (Unauthorized): Authentication required
* **`500`** (Internal Server Error): Processing failed
* **`202`** (Accepted): Async processing started (if webhook provided)

### `/api/v1/invoice/{customerId}/lookup`

#### POST
Process invoice image and return PIMS data only

**Tags**: `Invoices`

**Security**
* `jwtToken`: [ ]

**Parameters**

| Name | Description | Required | Schema |
| :--- | :--- | :--- | :--- |
| `customerId` | Customer identifier | **Yes** | string |

**Request Body**
* Content: `multipart/form-data`
    * `invoice` (file): Invoice image (PDF, JPEG, PNG)
    * `webhookUrl` (string): Callback URL for completion notification

**Processing**
1. OCR processes invoice image
2. System extracts invoice number
3. PIMS lookup attempts using invoice number
4. Returns PIMS data if found, otherwise empty response

**Responses**

* **`200`** (OK): Processing successful
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/invoiceResponse'`
* **`400`** (Bad Request): Invalid request parameters
* **`401`** (Unauthorized): Authentication required
* **`500`** (Internal Server Error): Processing failed
* **`202`** (Accepted): Async processing started (if webhook provided)

### `/api/v1/invoice/{customerId}/lookup/{invoiceNumber}`

#### GET
Directly retrieve invoice data by number

**Tags**: `Invoices`

**Security**
* `jwtToken`: [ ]

**Parameters**

| Name | Description | Required | Schema |
| :--- | :--- | :--- | :--- |
| `customerId` | Customer identifier | **Yes** | string |
| `invoiceNumber` | Invoice number | **Yes** | string |

**Processing**
1. Direct PIMS lookup using invoice number
2. Returns data if found, otherwise empty response

**Responses**

* **`200`** (OK): Lookup successful
    * Content: `application/json`
        * Schema: `$ref: '#/components/schemas/invoiceResponse'`
* **`400`** (Bad Request): Invalid parameters
* **`401`** (Unauthorized): Authentication required
* **`404`** (Not Found): Invoice not found
* **`500`** (Internal Server Error): Lookup failed

### Common Responses

#### Bad Request (400)
Invalid or malformed request
- Missing or invalid parameters
- Invalid file format
- File size exceeds limit (10MB)
- Invalid webhook URL

**Content**: `application/json`
* Schema: `$ref: '#/components/schemas/errorResponse'`

#### Unauthorized (401)
Authentication failure
- Missing JWT token
- Invalid JWT token
- Expired JWT token

#### Not Found (404)
Resource not found
- Invoice number not found
- Customer not found

#### Internal Server Error (500)
Processing error
- OCR processing failed
- PIMS lookup error
- System error

### Schemas

#### Invoice Response
Complete invoice processing response

* **Properties**
    * `requestId` (string): Unique processing request identifier
    * `status` (string, enum): Processing status
        * `completed`
        * `failed`
    * `completedAt` (string, date-time): Processing completion timestamp
    * `source` (string, enum): Data source
        * `PIMS`
        * `OCR`
    * `validationResults` (object): Data validation results
        * `passed` (boolean): Overall validation status
        * `checks` (array): List of validation checks
            * `field` (string): Validated field name
            * `status` (string): Validation status
            * `message` (string): Validation message
    * `data` (Invoice Data): Invoice details

* **Required Properties**
    * `requestId`
    * `status`
    * `completedAt`

#### Invoice Data
Detailed invoice information

* **Properties**
    * `invoiceId` (string): System-generated invoice identifier
    * `invoiceNumber` (string): Original invoice number
    * `invoiceDate` (string, date): Invoice issue date
    * `dueDate` (string, date): Payment due date
    * `totalAmount` (number): Total invoice amount
    * `currency` (string): Currency code
    * `status` (string): Invoice status
    * `practice` (Practice Data): Veterinary practice details
    * `customer` (Customer Data): Pet owner details
    * `lineItems` (array): List of invoice items
    * `payments` (array): List of payments
    * `balanceDue` (number): Remaining balance

* **Required Properties**
    * `invoiceNumber`
    * `invoiceDate`
    * `totalAmount`
    * `currency`

#### Practice Data
Veterinary practice information

* **Properties**
    * `practiceId` (string): Practice identifier
    * `practiceName` (string): Practice name
    * `address` (object): Practice location
        * `street` (string): Street address
        * `city` (string): City name
        * `state` (string): State/province code
        * `zipCode` (string): Postal code
    * `phone` (string): Contact phone number
    * `email` (string): Contact email address

* **Required Properties**
    * `practiceId`
    * `practiceName`

#### Customer Data
Pet owner information

* **Properties**
    * `customerId` (string): Customer identifier
    * `firstName` (string): First name
    * `lastName` (string): Last name
    * `email` (string): Email address
    * `phone` (string): Phone number

* **Required Properties**
    * `customerId`

#### Line Item
Invoice line item details

* **Properties**
    * `lineItemId` (string): Line item identifier
    * `description` (string): Service or product description
    * `quantity` (number): Quantity
    * `unitPrice` (number): Price per unit
    * `totalPrice` (number): Total line item price
    * `category` (string): Item category

* **Required Properties**
    * `description`
    * `totalPrice`

#### Payment
Payment transaction details

* **Properties**
    * `paymentId` (string): Payment identifier
    * `paymentDate` (string, date): Payment date
    * `amount` (number): Payment amount
    * `method` (string): Payment method
    * `status` (string): Payment status

* **Required Properties**
    * `amount`
    * `paymentDate`

#### Error Response
Error information

* **Properties**
    * `requestId` (string): Request identifier
    * `status` (string): Always "failed"
    * `completedAt` (string, date-time): Error timestamp
    * `error` (object): Error details
        * `code` (string): Error code
        * `message` (string): Error description

* **Required Properties**
    * `requestId`
    * `status`
    * `error`

## Webhook Integration

### Request Format
Webhook notifications are sent as POST requests to your specified URL with:
- Full invoice response in request body
- `X-Request-Signature` header for verification
- Content-Type: application/json

### Security
Verify webhook authenticity:
1. Get HMAC-SHA256 signature from X-Request-Signature header
2. Calculate HMAC-SHA256 of request body using webhook secret
3. Compare signatures to validate request

### Best Practices
1. Process webhooks asynchronously
2. Implement retry logic for failed webhook deliveries
3. Store webhook secret securely
4. Validate all webhook requests
5. Implement idempotency handling

## File Requirements

* **Supported Formats**
    * PDF
    * JPEG
    * PNG
    * TIFF

* **Size Limits**
    * Maximum: 10MB per file
    * Minimum: 50KB per file

* **Image Quality**
    * Minimum resolution: 300 DPI
    * Clear, legible text
    * No blurring or distortion
    * Complete invoice visibility