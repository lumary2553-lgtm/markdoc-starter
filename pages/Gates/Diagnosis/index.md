---
title: Diagnosis Gate
---
# {% $markdoc.frontmatter.title %} {% #JSON %}

## __Purpose:__ 
The Diagnosis Gate streamlines automation by ensuring that only claims with a single, clearly defined diagnosis are processed automatically.  Claims that do not meet these criteria will be flagged for manual review or additional processing steps.


## __How it Works:__
When a claim is submitted, the Diagnosis Gate performs the following checks:
1.	It verifies that the submission contains loss information and at least one incident.
2.	If there are incidents present, the gate checks if there is exactly one incident in the submission.
3.	If there is a single incident, the gate further checks if the incident has exactly one diagnosis.

## __Outcome:__
- **Pass:** If the claim has a single incident with a single diagnosis, it proceeds through the automated workflow.
- **Fail:** If the claim has multiple incidents, or if the single incident has multiple diagnoses, the gate fails.  The claim is flagged for manual review.  A "decision object" is created, indicating the reason for failure (multiple incidents or diagnoses).


## __UI Configuration Data:__
None