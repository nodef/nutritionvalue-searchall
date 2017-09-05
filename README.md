# nutritionvalue-searchall

[![NPM](https://nodei.co/npm/nutritionvalue-searchall.png)](https://nodei.co/npm/nutritionvalue-searchall/)

Get JSON Nutrient Data from NutritionValue.org.

```bash
# using as command line application
node index <start> <stop> <step>

# get nutrient info from page 1
node index 1

# get nutrient info from page 1 to 10 (excluding)
node index 1 10

# get nutrient info from page 1 to 10, 5 pages in parallel
node index 1 10 5
```
