---
title: Condition Post Processor
---
# {% $markdoc.frontmatter.title %} {% #JSON %}

## __Purpose:__ 
The Condition Post Processor updates treatment codes on insurance claims based on specific conditions.  This is useful for automatically standardizing or updating treatment codes across claims, ensuring consistency and potentially reducing manual review time.

## __How it Works:__
1.	**Configuration:** The processor uses a configuration file to map conditions that correspond to treatment code updates.  Each entry in the configuration file specifies a condition and the treatment code changes to apply when that condition is present. 
2.	**Processing:** The processor identifies all diagnosed conditions.
3.	**Mapping:** The processor checks the configuration file for any associated treatment code updates for each diagnosed condition.
4.	**Update:** If a mapping is found, the processor searches for line items with the “old” treatment code and updates them with the “new” treatment code specified in the configuration.  
5.	**Logging:** The processor records each treatment code change, noting the condition that triggered the update, the original treatment code, and the new treatment code.  It also logs the start and end times of processing for each claim.
 

## __Benefits:__
- **Accuracy:** Ensures that treatment codes accurately reflect the diagnosed conditions.
- **Standardization:** Promotes consistency in treatment coding across claims.
- **Efficiency:** Reduces the need for manual review and correction of treatment codes.


## __UI Configuration Data:__
None