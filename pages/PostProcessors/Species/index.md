---
title: Species Post Processor 
---
# {% $markdoc.frontmatter.title %} {% #JSON %}

## __Purpose:__ 
The Species Post Processor adjusts treatment codes on claim line items based on the pet's species and breed.  This configuration allows the processor to be easily adjusted for different policies or changes in coding practices without requiring changes to the underlying code.


## __How it Works:__
1.	**Configuration:** The processor is configured with a set of rules that define how treatment codes should be adjusted based on species and breed.  The configuration includes:
    - Codes: A list of default or generic treatment codes.
    - Choices: A list of species – and breed – specific treatment code mappings.  Each choice specifies the species and/or breed, and the corresponding treatment code to apply.
2.	**Processing:** For each line item in a claim, the processor:
    - Retrieves the pet’s species and breed information
    - Compares the information to the configured Choices.
    - If a specified Species and Breed match is found, it updates the treatment code for the line item accordingly. 
    - If only a Species match is found, it applies the species-specific code.
    - If no match is found, it applies the IsDefault code from the Choices list.  If no default is defined, it may use a generic code from the Codes list or leave the existing code unchanged, depending on the specific configuration.
3.	**Logging:** The process is logged for each claim.
 

## __Benefits:__
- Accuracy: Ensures that treatment codes are appropriate for the specific species and breed.
- Flexibility: Allows for easy configuration of species- and breed-specific rules.
- Efficiency: Reduces manual effort in adjusting treatment codes.


## __UI Configuration Data:__
- Species