Here's the YAML file converted to Markdown:

# ClarusTech.OnboardingTool.PracticeLoader

**Version:** 0.1.73
**OpenAPI:** 3.0.3

-----

## API Tags

### Health

Fetch health status

### PracticeEmailSender

Endpoints to manage practice onboarding and email sending

### PracticeOnboarding

*(No description provided in the YAML)*

### PracticeWatcher

*(No description provided in the YAML)*

-----

## Paths

### GET /api/health

  * **Tags:** `Health`
  * **Responses:**
      * **`200 OK`**: OK
      * **`400`**: `$ref: '#/components/responses/badRequest'`
      * **`500`**: `$ref: '#/components/responses/internalServerError'`
      * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### POST /api/startPracticeEmailSender

  * **Summary:** Sends emails notification.
  * **Tags:** `PracticeEmailSender`
  * **Request Body (Required):**
      * **Content:** `application/json`
      * **Schema:** `$ref: '#/components/schemas/PracticeOnboardedEmailMessage'`
  * **Responses:**
      * **`204 No Content`**: emails sent successfully.
      * **`400 Bad Request`**: Invalid request body.
      * **`400`**: `$ref: '#/components/responses/badRequest'`
      * **`500`**: `$ref: '#/components/responses/internalServerError'`
      * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### POST /api/startPracticeOnboarding

  * **Summary:** Starts the onboarding process for a practice.
  * **Tags:** `PracticeOnboarding`
  * **Responses:**
      * **`204 No Content`**: onboarding started successfully.
      * **`400`**: `$ref: '#/components/responses/badRequest'`
      * **`500`**: `$ref: '#/components/responses/internalServerError'`
      * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

<br>

### POST /api/startPracticeWatcher

  * **Summary:** Starts the practice watcher.
  * **Tags:** `PracticeWatcher`
  * **Responses:**
      * **`204 No Content`**: watcher started successfully.
      * **`400`**: `$ref: '#/components/responses/badRequest'`
      * **`500`**: `$ref: '#/components/responses/internalServerError'`
      * **`503`**: `$ref: '#/components/responses/serviceUnavailable'`

-----

## Components

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

#### PracticeOnboardedEmailMessage

  * **Type:** `object`
  * **Required:** `[ PracticeId, PracticeName, VetIds, OnBoardingDateTime, InvoiceNumbers, EmailRecipients ]`
  * **Properties:**
      * `PracticeId`: `string: uuid`
          * *Example:* `"a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78"`
      * `PracticeName`: `string`
          * *Example:* `"Sunrise Vet Clinic"`
      * `VetIds`: `array` (of `string`)
          * *Example:* `["vet123", "vet456"]`
      * `OnBoardingDateTime`: `string: date-time`
          * *Example:* `"2025-10-08T10:00:00Z"`
      * `InvoiceNumbers`: `array` (of `string`)
          * *Example:* `["INV-001", "INV-002"]`
      * `EmailRecipients`: `array` (of `string: email`)
          * *Example:* `["vet1@example.com", "admin@clinic.com"]`