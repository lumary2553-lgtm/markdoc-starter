---
title: Quantity Post Processor
---
# {% $markdoc.frontmatter.title %} {% #JSON %}

## __Purpose:__ 
The Quantity Post Processor ensures that all line items in a claim have a valid quantity, preventing errors that might arise from accidental entries of zero or negative quantities.

## __How it Works:__
1.	**Examination:** The processor examines each line item in a claim.
2.	**Validation:** If a line item has a quantity of zero or less, the processor automatically changes the quantity to 1.
3.	**Logging:** When a quantity is changed, the processor crates a “Decision” object.  The object logs the category, subcategory, treatment of the item, and a message indicating that the quantity was changed from 0 (or a negative value) to 1.
4.	**Reporting:** The processor provides a list of all quantity changes made for each claim.
 

## __Benefits:__
- **Error Prevention:** Corrects invalid quantities, preventing potential errors in downstream processing.
- **Data Integrity:** Ensures that all line items have valid quantities, improving the accuracy of claim data.


## __UI Configuration Data:__
None