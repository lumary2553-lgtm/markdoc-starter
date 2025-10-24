---
title: Claim Submission Output
---
# {% $markdoc.frontmatter.title %} {% #JSON %}

This describes the data structure used for the response after a pet insurance claim has been processed.  This includes processing decisions, status updates, coded line items, and detailed logs.
## Output Data: This file represents the response after the submitted claim has been processed.

### __MetaData:__ Contains general information about the response document.
- **DocumentType:** Identifies the document as a "ClaimResponse".
- **Environment:** Indicates the system environment (e.g., "Production").
- **Status:** Shows the overall status of the automated processing (e.g., "AutomationComplete").
- **State:** The final state of the claim processing (e.g., "Completed").
- **SystemOfOrigin:** Specifies the source system (e.g., "Wombat").
- **Version:** The version of the response format.


### __Data:__ Contains the results and details of the claim processing.
- **MetaData:** Additional metadata related to the processing data.
- **Decisions:** An array listing specific decisions or flags raised during automated processing.  Each entry includes:
  - **DecisionId:** Unique identifier for the decision.
  - **Type:** The category of the decision (e.g., "Treatment Assignment").
  - **Name:** Specific name of the decision rule or check.
  - **Result:** Description of the outcome or issue found.
  - **Data:** Additional data related to the decision (e.g., the specific treatment involved).
- **ClaimTrackingStatus:** Provides the current status of the claim in the processing workflow.
  - **ReferenceId:** The claim identifier.
  - **SystemOfOrigin:** The source system.
  - **State:** Current processing state (e.g., "AutomationComplete").
  - **Status:** Specific status or step within the state (e.g., "TreatmentAssignment", indicating where manual review might be needed).
  - **Data:** Any additional data associated with the status (null in the example).
- **Invoices:** Repeats the invoice details submitted in the input for reference.  Structure mirrors the Invoices section in the input file.
- **Claim:** Contains the processed details of the claim.
  - **LossItems:** An array mapping original InvoiceItem details to standardized LineItemCode information.  Each entry links:
    - **InvoiceItem:** The original item details (ID, Description, Date, Quantity, Amount Charged).
    - **LineItemCode:** The standardized coding (ID, Treatment, Category, SubCategory).
  - **CodingLossItems:** Details how each invoice item was coded.  Each entry includes:
    - **Coding:** Information about the coding process (Code assigned, Certainty level, Prediction Type like "Machine Learning" or "Pattern Coding").
    - **InvoiceItem:** The original item details.
    - **LineItemCode:** The resulting standardized coding.
  - **UnAssociatedLineItems:** Lists line items from the invoice that were not successfully associated with a specific diagnosed incident in the claim.  Includes details like Amount Charged, Description, Line Item ID, Quantity, Treatment, Date, and a boolean RecommendedPayment flag.
  - **ClaimId:** The identifier for the processed claim.
  - **Losses:** Details the processed incidents, diagnoses, and associated line items.
    - **Incidents:** Array describing the medical event(s).
      - **Diagnoses:** List of conditions identified for the incident.
      - **LineItems:** Array of line items associated with this incident, including a RecommendedPayment flag and any Tags.
    - **Story:** The original customer-provided description of the incident.
- **Logs:** A detailed chronological record of the automated functions and steps executed during claim processing.  Each log entry includes:
  - **EventType:** The type of event logged (e.g., "Function", "GateEngine Result").
  - **EventName:** The name of the function or process step (e.g., "Verification", "LineItemCoding", "TreatmentAssignment").
  - **LogType:** The type of log entry (e.g., "Info", "Result").
  - **Message:** A description of the event or the result.
  - **CreatedOn:** Timestamp for the log entry.