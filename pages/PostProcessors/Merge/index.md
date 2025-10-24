---
title: Merge Post Processor Configuration
---
# {% $markdoc.frontmatter.title %} {% #JSON %}

## __Purpose:__ 
The Merge Post Processor combines multiple related treatments and services into a single, more comprehensive category.  This is useful for streamlining complex claims, such as wellness visits, where multiple services are often performed together.


## __How it Works:__
1.	**Configuration:**
- **Name:** Each configuration is given a unique name (e.g. WellnessMergeConfiguration”).
- **Groups:** Within each configuration, you can define “Groups”.  Each group represents a set of items to be merged.
  - **Type:** A label for the merged category (e.g., WellnessCombo”).
  - **Service Subcodes:** The primary service codes to be merged (e.g., "Spay," "Ovariohysterectomy").
  - **Categories, Subcategories, and Codes:** Additional related items to be included in the merged category (e.g., “Anesthesia”, “Antibiotic”, “Pain NSAID”, “E-Collar”).
- **Conditions:** You can specify conditions under which the merge should occur (e.g., “Wellness Claim”).
2.	**Processing:** When the configured conditions are met (e.g., “Wellness Claim”), the processor merges the specified Service Subcodes, Categories, Subcategories, and Codes into a single category defined by the Type.

## __Benefits:__
- **Simplification:** Streamlines complex claims by grouping related services.
- **Consistency:** Ensures uniform handling of similar claims, such as wellness visits.
- **Efficiency:** Reduces manual effort in categorizing and processing multi-service claims.
- **Flexibility:** Allows for multiple configurations to handle different types of claims or services.

## __Outcome:__
In a wellness claim, the processor will automatically combine "Spay" or "Ovariohysterectomy" service codes, along with any related items from the specified categories, subcategories, and codes, into a single "WellnessCombo" treatment category.

## __Access:__
1.	Navigate to the “Post Processor” section in vNext.
2.	Select the “Merge Post Processor” option.
3.	Create and manage your configurations as needed.


## __UI Configuration Data:__
- Name
- Conditions
- Groups:
  - Type
  - Categories 
  - Subcategories 
  - Service Subcodes 
  - Codes
