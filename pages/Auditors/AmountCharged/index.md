---
title: Amount Charged Auditor
---
# {% $markdoc.frontmatter.title %} {% #JSON %}

## __Purpose:__ 
The Amount Charged Auditor validates the amounts charged for each treatment, comparing them against historical data to identify potentially inflated or erroneous charges.  This helps prevent overpayments and maintain the integrity of the claims process. 

## __How it Works:__
1.	**Configuration:** The auditor is configured with:
  - Percentile: The maximum acceptable percentile for a treatment code’s charge based on historical data.
  - Time Period: The lookback period (in days) for historical data.
  - Minimum Samples: The minimum number of historical data points required for a treatment code to be considered valid for comparison.
  - Ignored Codes: A list of treatment codes that should be excluded from the audit.
2.	**Processing:** For each line item in a claim:
  - Checks if the treatment code is in the Ignored Codes list.  
  - Retrieves historical data for the treatment code, considering the configured Time Period and Percentile. 
  - Compares the amount charged for the line item against the historical data.
3.	**Validation:** The line item passes if:
  - There are at least Minimum Samples of historical data.
  - The amount charged is present. 
  - The amount charged is less than or equal to the value at the configured Percentile in the historical data.


## __Outcome:__
- **Pass:** If all line items pass the audit, the claim passes.
- **Fail:** If any line item fails, the entire claim fails the audit.  A message is logged, and the claim is typically flagged for manual review.

## __Benefits:__
- **Policy Adherence:** Ensures that “Accident Only” policies are strictly enforced.
- **Error Prevention:** Prevents incorrect processing of claims that don’t mee the “Accident Only” criteria.

## __UI Configuration Data:__
- Accident Conditions