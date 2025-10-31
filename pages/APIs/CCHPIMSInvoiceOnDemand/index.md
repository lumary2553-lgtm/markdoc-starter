# OpenAPI: CCH.PIMS.Invoice.OnDemand (0.6.21)

## Tags

* **Invoices**: Push invoices on demand.

---

## Paths
### `POST` /api/data-on-demand/invoices

> Upsert Invoices to the database

  * **Operation ID:** `upsertInvoice`
  * **Description:** Pushes invoices, adding new ones and updating existing.
  * **Tags:** `Invoices`
  * **Security:**
      * `jwtToken: []`

**Request Body**

  * **Required:** `true`
  * **Content:** `application/json`
      * **Schema:** `$ref: '#/components/schemas/upsertInvoicesParameters'`

**Responses**

  * **`202` Accepted**: The invoice(s) has been accepted for processing.
  * **`400 Bad Request`**: `$ref: '#/components/responses/badRequest'`
  * **`401 Unauthorized`**: `$ref: '#/components/responses/unauthorized'`
  * **`500 Internal Server Error`**: `$ref: '#/components/responses/internalServerError'`
  * **`503 Service Unavailable`**: `$ref: '#/components/responses/serviceUnavailable'`

-----

## Tags

  * **Invoices**: A set of APIs for pushing PIMS invoices.

-----

## Components

### Security Schemes

  * **`jwtToken`**
      * **Type:** `http`
      * **Scheme:** `bearer`
      * **Bearer Format:** `JWT`
      * **Description:** Authentication and authorization with a JWT token.

-----

### Reusable Responses

  * **`badRequest`**

      * **Description:** Bad Request - The request is invalid or malformed.
      * **Content:** `application/json`
          * **Schema:** `$ref: '#/components/schemas/serviceError'`
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

      * **Description:** Unauthorized - The requester is not authenticated.

  * **`forbidden`**

      * **Description:** Forbidden - The requester is not authorized to perform this request.

  * **`notFoundError`**

      * **Description:** Not Found - The resource is not registered on the service side.

  * **`internalServerError`**

      * **Description:** Internal Server Error - An unexpected error has occurred.
      * **Content:** `application/json`
          * **Schema:** `$ref: '#/components/schemas/serviceError'`

  * **`serviceUnavailable`**

      * **Description:** Service Unavailable - The service is temporarily unavailable.

-----

### Schemas

#### `upsertInvoicesParameters`

  * **Type:** `object`
  * **Required:** `[ invoices ]`
  * **Properties:**
    | Name | Type |
    | :--- | :--- |
    | `invoices` | array of `$ref: '#/components/schemas/invoice'` |

#### `invoice`

  * **Type:** `object`
  * **Required:** `[ id, date, invoiceNumber, vetPractice, petOwner ]`
  * **Properties:**
    | Name | Type | Format | Nullable |
    | :--- | :--- | :--- | :--- |
    | `id` | `string` | | |
    | `date` | `string` | `date-time` | |
    | `invoiceCreatedAt` | `string` | `date-time` | |
    | `invoiceUpdatedAt` | `string` | `date-time` | true |
    | `invoiceNumber` | `string` | | |
    | `invoiceStatus` | `string` | | |
    | `total` | `number` | `decimal` | |
    | `invoiceItems` | array of `$ref: '#/components/schemas/invoiceItem'` | | |
    | `vetPractice` | `$ref: '#/components/schemas/vetPractice'` | | |
    | `petOwner` | `$ref: '#/components/schemas/petOwner'` | | |

#### `invoiceItem`

  * **Type:** `object`
  * **Properties:**
    | Name | Type | Format | Nullable |
    | :--- | :--- | :--- | :--- |
    | `invoiceItemId` | `string` | | |
    | `description` | `string` | | true |
    | `lossDate` | `string` | `date-time` | |
    | `quantity` | `integer` | | true |
    | `amountCharged` | `number` | `decimal` | |
    | `codeName` | `string` | | true |
    | `comments` | `string` | | true |
    | `isPayment` | `boolean` | | |
    | `pet` | `$ref: '#/components/schemas/pet'` | | |

#### `vetPractice`

  * **Type:** `object`
  * **Required:** `[ practiceId ]`
  * **Properties:**
    | Name | Type | Nullable |
    | :--- | :--- | :--- |
    | `practiceId` | `string` | |
    | `locationId` | `string` | |
    | `name` | `string` | |
    | `address` | `string` | |
    | `city` | `string` | |
    | `state` | `string` | true |
    | `zipCode` | `string` | |
    | `country` | `string` | |

#### `petOwner`

  * **Type:** `object`
  * **Properties:**
    | Name | Type | Nullable |
    | :--- | :--- | :--- |
    | `firstName` | `string` | |
    | `lastName` | `string` | |
    | `email` | `string` | |
    | `phone` | `string` | |
    | `address` | `string` | |
    | `city` | `string` | |
    | `state` | `string` | true |
    | `zipCode` | `string` | |
    | `country` | `string` | |

#### `pet`

  * **Type:** `object`
  * **Properties:**
    | Name | Type | Nullable |
    | :--- | :--- | :--- |
    | `name` | `string` | |
    | `species` | `string` | |
    | `breed` | `string` | |
    | `age` | `integer` | true |
    | `weight` | `number` | true |

#### `serviceError`

  * **Type:** `object`
  * **Description:** A service error in the form exposed to the outside.
  * **Required:** `[ code, message ]`
  * **Properties:**
    | Name | Type | Description |
    | :--- | :--- | :--- |
    | `code` | `string` | The error code. |
    | `message` | `string` | The human-readable representation of the error. |
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
    | `message` | `string` | The human-readable representation of the error detail. |