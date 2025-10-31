---
title: State Gate
---
# {% $markdoc.frontmatter.title %} {% #JSON %}

## __Purpose:__ 
The State Check Gate verifies whether a claim is eligible for automated processing based on the customer's state of residence.  This gate ensures that claims from certain states receive manual attention, which may be necessary due to state-specific regulations or other business requirements.


## __How it Works:__
This gate checks the customer’s state of residence against a list of disallowed state codes.
1.	The gate retrieves the customer's state code from their address information.
2.	It compares this state code against a list of disallowed state codes.
3.	If the customer's state is not on the list of disallowed states, the gate allows the claim to proceed.
4.	If the customer's state is in the list of disallowed states, or if the state information is missing, the gate stops the automated processing.

## __Outcome:__
- **Pass:** If the customer’s state is not on the disallowed list, the claim continues through the automation workflow.
- **Fail:** If the customer’s state is on the disallowed list, or there is missing state information, the gate will fail.  The claim is flagged for manual review with a message indicating that the account is in a disallowed state.

## __Logging:__ 
The gate logs the start and end of its process, including the claim ID, for tracking and debugging purposes.

## __Configuration:__ 
Administrators can configure the list of disallowed state codes.  Claims from customers residing in these states will not be eligible for automated processing.

## __UI Configuration Data:__
Disallow State Codes