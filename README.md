# nutritionvalue-searchall

[![NPM](https://nodei.co/npm/nutritionvalue-searchall.png)](https://nodei.co/npm/nutritionvalue-searchall/)

Get JSON Nutrient Data from NutritionValue.org.

```bash
# using as command line application
nutritionvalue-searchall <start> <stop> <step>

# get nutrient info of food id 1001
nutritionvalue-searchall 1001

# get nutrient info of food id 1001 to 1100 (excluding)
nutritionvalue-searchall 1001 1100

# get nutrient info from page 1001 to 1100, 20 parallel connections
nutritionvalue-searchall 1001 1100 20
```
```javascript
// using as a javascript module
var searchall = require('nutritionvalue-searchall');
// serachall(<page>)

searchall(1001).then((ans) => console.log(ans));
// {"Butter, salted": { ... }}```
