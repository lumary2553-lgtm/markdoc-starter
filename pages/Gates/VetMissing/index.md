---
title: Vet Missing Gate
---
# {% $markdoc.frontmatter.title %} {% #JSON %}

## __Purpose:__ 
The Vet Missing Gate is responsible for validating the completeness of vet information on an invoice.  This gate is crucial for maintaining data integrity and ensuring that necessary vet information is included in each claim processed through the automation workflow.


## __How it Works:__
This gate checks each invoice to ensure that a valid VetId is present in the vet property.
1.	**Vet Property Inspection**: This gate examines the vet property in each invoice associated with a claim.
2.	**VetId Verification**: The primary check is whether a VetId is assigned to the vet property.
  

## __Outcome:__
- **Pass:** If all invoices have a VetId, the claim will proceed through the automation workflow.
- **Fail:** If an invoice is missing a VetId, the gate will fail.  The claim is flagged for manual review to find the missing vet information.  A “decision object” is created stating that the invoice lacks essential VetId information.


## __UI Configuration Data:__
None