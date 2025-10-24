---
title: Symptom Date Check Gate
---
# {% $markdoc.frontmatter.title %} {% #JSON %}

## __Purpose:__ 
The Symptom Date Gate prevents claims for pre-existing conditions (conditions that started before the policy's coverage began) from being processed automatically.


## __How it Works:__
This gate compares the onset date of each incident in the claim to the earliest start date among all policies associated with the account.
1.	The gate examines all policies associated with the account.
2.	It identifies the earliest policy start date among all policies.
3.	It then checks the onset date of each incident in the claim.
4.	If any incident's onset date is earlier than the earliest policy start date, the gate fails.
 

## __Outcome:__
- **Pass:** If all incident onset dates are on or after the earliest start date, the claim proceeds to the next step in the automation workflow.
- **Fail:** If any incident has an onset date that is earlier than the earliest policy start date, the gate will fail.  The claim is flagged for manual review with a message indicating a potential pre-existing condition.  


## __UI Configuration Data:__
None