# nutritionvalue-searchall

[![NPM](https://nodei.co/npm/nutritionvalue-searchall.png)](https://nodei.co/npm/nutritionvalue-searchall/)

Get JSON Nutrient Data from NutritionValue.org.

```bash
# using as command line application
nutritionvalue-searchall <start> <stop> <step>

# get nutrient info from page 1
nutritionvalue-searchall 1

# get nutrient info from page 1 to 10 (excluding)
nutritionvalue-searchall 1 10

# get nutrient info from page 1 to 10, 5 pages in parallel
nutritionvalue-searchall 1 10 5
```
```javascript
// using as a javascript module
var searchall = require('nutritionvalue-searchall');
// serachall(<page>)

serachall(1).then((ans) => console.log(ans));
// {"Poi":{ ... }, ...}```
