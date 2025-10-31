---
title: Line Item Gate
---
# {% $markdoc.frontmatter.title %} {% #JSON %}

## __Purpose:__ 
The Line-Item Gate ensures that only claims with valid invoice line items are processed automatically.  If a claim doesn't meet this criterion, the gate fails, and the decision object is returned with a message indicating the reason for the failure. 


## __How it Works:__
This gate checks each invoice associated with a claim, verifying that at least one line item has both a non-empty description and a positive amount charged.
1.	The gate is initiated for a specific claim, and the claim ID is logged for reference.
2.	The gate checks if there are any invoices associated with the claim.
3.	If invoices are found, the gate iterates through each invoice.
4.	For each invoice, the gate checks if there are any pets associated with it.
5.	If pets are found, the gate iterates through each pet invoice.
6.	For each pet invoice, the gate checks if there are any invoice items that meet the following criteria: 
a.	The invoice item has a non-empty description.
b.	The invoice item has a positive amount charged.
7.	If any invoice item meets the above criteria, the gate sets the result to true, indicating that the claim has at least one valid line item.
8.	If no valid line items are found after checking all invoices and pet invoices, the gate sets the result to false.
9.	If the result is false, the gate creates a decision object with a message indicating that the claim has no valid invoice line items.
10.	The gate logs the completion of the process for the specific claim ID.
11.	Finally, the gate returns the decision (if any) and the result (true or false) to indicate whether the claim has any valid line items.


## __Outcome:__
- **Pass:** A claim will proceed through the automated workflow if at least one valid line item (with a description and positive amount) is found. 
- **Fail:** The gate fails if no valid line items are found.  It will be flagged for manual review and a “decision object” will be created indicating the claim has no valid line items.


## __UI Configuration Data:__
None