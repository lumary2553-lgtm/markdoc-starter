---
title: Species Gate
---
# {% $markdoc.frontmatter.title %} {% #JSON %}

## __Purpose:__ 
The Species Gate filters claims based on the pet's species and breed.  This gate ensures that only claims for allowed species and breeds are processed automatically, improving efficiency and accuracy in claims handling.


## __How it Works:__
This gate checks the species and breed information for the pet associated to the claim and compares it against the list of allowed species and disables breeds.

**1. Allowed Species:**  
  - The system maintains a list of allowed species.
  - If a claim is submitted for a pet whose species is not on this list, the claim will not pass through the gate.

**2. Disabled Breeds:**
  - For each species, there may be specific breeds that are not eligible for automatic processing.
  - The system checks if the pet's breed is on the disabled list for its species.

**3.	Decision Making:** 
  - If the pet's species is allowed and its breed is not disabled, the claim passes through the gate.
  - If either the species is not allowed or the breed is disabled, the claim does not pass through the gate.

**4.	Result:**
  - When a claim passes the gate, it continues to the next step in the automation process.
  - If a claim doesn't pass, it's flagged with a message: "Species Gate failed, Species or Breed is not allowed." This claim may require manual review.


## __Outcome:__
- **Pass:** If the species is on the ‘allowed list’ and its breed is not on the disabled list for that species, the claim will proceed through the automated workflow.
- **Fail:** If the pet’s species is not on the ‘allowed list’ or the breed is on the disabled list, the gate will fail.  The claim is flagged for manual review and the “decision object” is created with the message: “Species Gate failed, Species or Breed is not allowed”.


**Notes:** 
- The gate requires accurate information about the pet's species and breed in the claim data.
- If pet information is missing or incomplete, the gate may not function as expected.
- The lists of allowed species and disabled breeds can be configured as needed.


## __UI Configuration Data:__
Allowed Species