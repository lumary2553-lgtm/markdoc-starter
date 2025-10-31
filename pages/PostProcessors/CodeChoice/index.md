---
title: Code Choice Post Processor
---
# {% $markdoc.frontmatter.title %} {% #JSON %}

## __Purpose:__ 
The Code Choice Post Processor modifies treatment codes on claim line items based on specific conditions.  This ensures consistent coding across similar claims and reduces manual review.

## __How it Works:__
1.	**Configuration:** Admins define "code choice" rules.  Each rule consists of: 

    - **TreatmentName:** An original treatment name to potentially be replaced.
    - **NewTreatmentName:** The new treatment name to be applied if the rule’s conditions are met.
    - **Filters:** A set of conditions that must be met for the rule to apply.  Filters can be based on the Type (Category, Subcategory, or Treatment) and Value of any line item.
2.	**Processing:** The processor looks at each line item in a claim.
3.	**Rule Matching:** If a line item's treatment code matches the TreatmentName in a rule, the processor evaluates the rule's Filters against the entire claim.
4.	**Code Update:** If all the Filters in a rule are met by the claim’s data, the processor updates the line item’s treatment code to NewTreatmentName.
5.	**Logging:** The processor logs each code change, records the original treatment, the new treatment, and the rule that triggered the change. 

## __Example:__
Consider this rule:
- TreatmentName: “Anesthesia”
- NewTreatmentName: “BrokenArm”
- Filters:
  - Type: “Category”, Value: “Antibiotic” 
  - Type: “Category”, Value: "Anesthesia” 
  - Type: “Subcategory”, Value: "Anesthesia local” 
  - Type: “Treatment”, Value: "Versed Injection”

If a claim contains a line item with the treatment "Anesthesia" AND the claim also includes line items matching all four filter criteria (Antibiotic category, Anesthesia category, Anesthesia local subcategory, and Versed Injection treatment), the processor will change the "Anesthesia" treatment code to "Broken Arm." This suggests that the general anesthesia was likely administered for a broken arm procedure.


## __UI Configuration Data:__
- Treatment Name
- New Treatment Name
- Filters:
  - Category
  - Subcategory
  - Treatment
