# nutritionvalue-searchall

[![NPM](https://nodei.co/npm/nutritionvalue-searchall.png)](https://nodei.co/npm/nutritionvalue-searchall/)

Get JSON Nutrient Data from [NutritionValue].
> Reliability improved: now with auto retries.

```bash
nutritionvalue-searchall [flags] <start> <stop>
# <start>: start id (use 1001 for first item in NutritionValue) 
# <stop>: stop id (excluding) (note: Id == nutrient no.) 
# [-o|--output]: write output to file (null) 
# [-c|--connections]: maximum number of connections (4) 
# [-t|--timegap]: request time gap in milliseconds (250) 
# [-r|--retries]: times to retry failed requests (4) 
# [-v|--verbose]: get detailed logs 
# [--help]: show help 
 
nutritionvalue-searchall 1001
# {"Id": "1001", "Number": "1001", "Name": "Butter, salted", ...} 
nutritionvalue-searchall 1001 1100
# {"Id": "1001", "Number": "1001", "Name": "Butter, salted", ...} 
# {"Id": "1002", "Number": "1002", "Name": "Butter, whipped, with salt", ...} 
# ... 
nutritionvalue-searchall 1000 1002 --output nutrients.txt
# STDERR: ["1000"] 
# (["1000"] is the list of failed ids) 
# (id 1001 is written to file) 
nutritionvalue-searchall 1001 1100 -o somanyfoods.txt -c 20 -t 512 -r 10 -v
# (try this)
```
```javascript
// using as a javascript module
var searchall = require('nutritionvalue-searchall');
// searchall(<id>)

searchall('1001').then((ans) => console.log(ans));
// {"Id": "1001", "Number": "1001", "Name": "Butter, salted", ...}
```


[NutritionValue]: https://www.nutritionvalue.org
