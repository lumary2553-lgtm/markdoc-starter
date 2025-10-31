---
title: State Post Processor 
---
# {% $markdoc.frontmatter.title %} {% #JSON %}

## __Purpose:__ 
The State Post Processor adjusts treatment names based on the customer's state of residence, accommodating regional variations in terminology or billing practices.


## __How it Works:__
1.	**Configuration:** The processor is configured with a list of rules, each specifying.:
    - TreatmentName: The original treatment name.
    - NewTreatmentName: The new treatment name to apply if the rule’s conditions are met. 
    - StateFilters: A list of state codes where the rule should be applied.
2.	**Processing:** For each claim:
    - The processor determines the customer’s state from their address.
    - It then examines each line item in the claim.
    - If a line item’s treatment name matches the TreatmentName in a rule AND the customer’s state is in the StateFilters list for that rule, the processor changes the treatment name to the NewTreatmentName.
3.	**Logging:** Each change is logged, recording the line item ID, the original treatment name, and the new treatment name.
4.	**Error Handling:** If the customer’s state cannot be determined, the processor logs a warning and does not make any changes to that claim.


## __Benefits:__
- Regionalization: Accommodates differences in terminology or billing practices across states.
- Flexibility: Allows for easy configuration of state-specific rules.
- Accuracy: Ensures that treatment names are appropriate for the customer’s location.


## __UI Configuration Data:__
- Treatment Name
- New Treatment Name
- State Filters
