---
title: Market Channel Code Brand Gate
---
# {% $markdoc.frontmatter.title %} {% #JSON %}

## __Purpose:__ 
The Market Channel Code Brand Gate examines the market channel codes associated with the policies of an account.  This ensures that only claims associated with accounts having allowed market channel codes are processed, allowing for different processing rules or eligibility criteria based on the origin of the policy.

## __How it Works:__
This gate examines the market channel code on each policy associated with the customer’s account and compares it against the predefined list of allowed market channel codes.
1.	The gate is configured using a JSON configuration file that specifies a list of allowed market channel codes.
2.	When the claims automation process reaches the Market Channel Code Brand Gate, the gate retrieves the account information associated with the claim being processed.
3.	The gate then iterates through each policy associated with the account and checks if any of the policies have a market channel code that matches one of the allowed market channel codes specified in the configuration.
4.	If any policy has a market channel code that is not allowed, the gate fails, and the claims automation process is halted for that claim.  The gate returns a decision object containing a message indicating which market channel code caused the failure.
5.	If all policies have allowed market channel codes, the gate passes, and the claims automation process continues to the next step.
6.	The gate logs informational messages to indicate when it starts and completes processing for each claim.


## __Outcome:__
- **Pass:** The claim will proceed through the automated workflow if all policies have market channel codes that are on the ‘allowed list’.
- **Fail:** The gate will fail if any policy has a market channel code that is not on the ‘allowed list’.  The claim will be flagged for manual review and a “decision object” is created, indicating the specific market channel code that caused the failure.


## __UI Configuration Data:__
Code