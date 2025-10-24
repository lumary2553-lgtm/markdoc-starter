---
title: Multi Pet Invoice Gate
---
# {% $markdoc.frontmatter.title %} {% #JSON %}

## __Purpose:__ 
The Multi-Pet Invoice Gate checks whether a submission is associated with multiple pets.  


## __How it Works:__
This gate checks the "IsMultiPetInvoice" property on the claim submission object.  

## __Outcome:__
- **Pass:** “IsMultiPetInvoice” property is false (indicating a single-pet invoice), the claim will proceed through the automated workflow.
- **Fail:** "IsMultiPetInvoice" property is true (indicating a multi-pet invoice), the gate fails.  The claim is flagged for manual review.  A "decision object" is created, indicating that the claim is associated with a multi-pet invoice.

## __UI Configuration Data:__
None