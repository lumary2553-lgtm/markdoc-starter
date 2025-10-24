---
title: Discounted Item Gate
---
# {% $markdoc.frontmatter.title %} {% #JSON %}

## __Purpose:__ 
The Discounted Item Gate checks whether any of the invoices associated with a claim contain discounted or negatively priced items.  This allows for appropriate handling of such claims, either through manual intervention or by applying specific business rules and processing logic.  


## __How it Works:__
This gate examines each invoice associated with a claim and checks to see if any invoice item has a negative amount charged.  

## __Outcome:__
- **Pass:** If all invoice items across all invoices have non-negative amounts charged, the gate passes, allowing the claim to proceed for further automated processing.
- **Fail:** If any invoice item has a negative amount charged, the gate fails, indicating that the claim contains a discounted item and cannot be processed automatically.  The claim will be flagged for manual review and a “decision object” is created, indicating the presence of a discounted item.


## __UI Configuration Data:__
Minimum Tax Percentage