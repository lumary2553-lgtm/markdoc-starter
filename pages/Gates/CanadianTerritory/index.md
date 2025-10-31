---
title: Canadian Territory Gate
---
# {% $markdoc.frontmatter.title %} {% #JSON %}

## __Purpose:__ 
The Canadian Territory Gate ensures that claims from Canadian territories are handled appropriately, given the potential differences in regulations and business rules.  This happens by verifying the format of the veterinarian’s zip code.


## __How it Works:__
The Canadian Territory Gate is a validation step that checks the zip code of the veterinarian associated with the claim.  If the zip code contains any alphabetic characters (a-z or A-Z), the claim will be removed from the automated processing workflow.  

## __Outcome:__
- **Pass:** If all veterinarian zip codes are valid (they do not contain alphabetical characters), the gate will pass, and the claim will continue through the automated processing workflow.
- **Fail:** If any of the veterinarian zip codes contain alphabetic characters, the gate will fail, and the claim will be excluded from automated processing.
  - A “decision object” of type “Gate” is created, logging the specific zip code that caused the failure


**Notes:** This gate helps maintain compliance and ensures accurate processing of claims originating from different regions.

## __UI Configuration Data:__
None