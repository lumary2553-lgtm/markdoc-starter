---
title: Claim Submission Output
---
# {% $markdoc.frontmatter.title %} {% #JSON %}

This describes the data structure used for submitting a pet insurance claim. This includes claim details, customer information, policy data, and invoice specifics required for processing.
## Input Data: This file represents the initial submission of a claim.

### __MetaData:__ Contains general infomation about the document.
- **DocumentType:** Identifies the document as a "ClaimSubmission".
- **Environment:** Indicates the system environment (e.g., "Development").
- **SystemOfOrigin:** Specifies the source system (e.g., "Wombat").


### __Data:__ Contains core information for the claim.
- **Account:** Information about the customer, pet, policies, and past claims.
  - **Pet:** Details about the pet (Breed Name, Customer ID, Gender, Pet ID, Pet Name, Species, Date of Birth).
  - **Customer:** Information about the policyholder (Address, Customer ID, Deletion status, Email, Name, Phone Number, Active status).
  - **Claims:** An array listing previous claims associated with the account.  Each entry includes:
    - **ClaimId:** Unique identifier for the past claim.
    - **ClaimStatusDisplay:** Current status (e.g., "Closed", "Processing").
    - **DateSubmitted:** Date the past claim was submitted.
    - **Losses:** Details about the incidents within the past claim.
      - **Incidents:** Array containing diagnoses and associated LineItems.
        - **Diagnoses:** List of conditions treated.
        - **IncidentId:** Unique identifier for the incident.
        - **LineItems:** Array detailing specific treatments/services, including amounts allowed/charged/denied/paid, quantity, treatment description, and date.
    - **Paid:** Total amount paid for the past claim.

  - **Policies:** An array detailing the insurance policies held by the customer.  Each entry includes:
    - **CoveragePeriodStartDate, CoveragePeriodEndDate:** Dates defining the policy term.
    - **PetCoverages:** Details specific to the pet's coverage under the policy.
      - **AnnualLimit:** Maximum coverage amount per year.
      - **Coinsurance:** Percentage the policyholder pays after the deductible.
      - **Coverages:** Types of coverage (e.g., "Accident", "Illness") and associated waiting periods.
      - **Deductible:** Amount the policyholder pays before insurance coverage begins.
      - **PetId:** Identifier for the covered pet.
      - **RemainingAnnualLimit, RemainingDeductible:** Current status of limits for the policy period.
    - **PolicyEndDate, PolicyStartDate:** Overall start and end dates of the policy.
    - **PolicyType:** Type of policy (e.g., "Individual").



- **Invoices:** An array containing details about the veterinary invoice(s) related to the current claim.
  - **Vet:** Information about the veterinary clinic (Vet ID, Name, Address, City, State, Zip Code, Country).
  - **Pets:** Details of invoice items per pet.
    - **PetName:** Name of the pet treated.
    - **SubTotal:** Subtotal amount for the pet on this invoice.
    - **InvoiceItems:** Array of specific line items from the invoice (Invoice Item ID, Description, Loss Date, Quantity, Amount Charged).
  - **Total:** The total amount on the invoice.
  - **InvoiceId:** The identifier for the invoice.

- **Submission:** An array containing details about the veterinary invoice(s) related to the current claim.
  - **AmountClaimed:** The total amount requested in the claim.
  - **Attachments:** An array of links or references to supporting documents (e.g., invoice PDF), including attachment type and URL.
  - **IsEstimate, IsMultiPetInvoice, IsPayToCustomer:** Boolean flags indicating specifics about the claim/invoice.
  - **Loss:** Details about the reason for the current claim.
    - **Incidents:** Array describing the medical event(s).
      - **Diagnoses:** List of conditions being claimed.
      - **IncidentId:** Identifier for the incident (can be empty initially).
      - **LineItems:** Associated line items (can be empty initially).
      - **OnsetDate:** Date the condition was first noticed or occurred.
  - **ReferenceId:** A unique identifier for this specific submission (may be a placeholder initially).
  - **DateSubmitted:** The date the current claim was submitted.