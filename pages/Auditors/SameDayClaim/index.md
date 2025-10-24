---
title: Accident Only Auditor
---
# {% $markdoc.frontmatter.title %} {% #JSON %}

## __Purpose:__ 
The Accident Only Auditor verifies whether a claim is eligible for processing based on the policyholder's coverage.  This helps ensure that only eligible claims are processed, based on the policyholder's active coverage during the relevant treatment dates.  

## __How it Works:__
1.	**Initialization:** The auditor starts for each claim and logs its initiation.
2.	**Data Validation:** It verifies that all necessary data is present, including claim details, associated losses, and policyholder account information.  If data is incomplete, the audit fails, and the reason is logged.
3.	**Treatment Date Collection:** It gathers all unique treatment dates from the claim's line items.
4.	**Policy Identification:** Using the treatment dates, it identifies the policies that were active during those dates by comparing them with policy start and end dates.
5.	**Coverage Check:** It analyzes the identified policies to determine if the claim is covered under an “Accident Only” policy type.
6.	**Result Logging:** The audit results (pass or fail) and any associated decisions are logged for tracking and further action.

## __Outcome:__
- **Pass:** If the claim is determined to be covered under an active "Accident Only" policy and all data is valid, the claim proceeds.
- **Fail:** If the claim is not covered under an "Accident Only" policy or if data is incomplete, the audit fails.  A decision object is created, and the claim is typically flagged for manual review.

## __Benefits:__
- **Policy Adherence:** Ensures that “Accident Only” policies are strictly enforced.
- **Error Prevention:** Prevents incorrect processing of claims that don’t mee the “Accident Only” criteria.

## __UI Configuration Data:__
- Accident Conditions