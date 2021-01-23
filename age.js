const https = require('https');
const fs = require('fs')
const crypto = require('crypto');


https.get('https://coderbyte.com/api/challenges/json/age-counting', (resp) => {

  let data = '';
  let dataRes = {};
  let keys = [];
  let values = [];
  let result = {};
  let selectKeys = [];

  resp.on('data', (chunk) => {
    data += chunk;
  })
  resp.on('end', () => {
    dataRes = JSON.parse(data);
    // Convert data
    const tempData = dataRes.data.split(",");
    for (let item of tempData) {
      if(item.includes("key=")) {
        keys.push(item.replace(" key=", ''));
      }

      if(item.includes("age=")) {
        values.push(parseInt(item.replace(" age=", '')));
      }
    }

    result = values.reduce((result, field, index) => {
      result[keys[index]] = field;
      return result
    }, {});
    // Process
    for (let [key, value] of Object.entries(result)) {
      if(value === 32) {
        selectKeys.push(key)
      }
    }


    const file = fs.createWriteStream('output.txt');
    file.write(selectKeys.join('\n'));
    file.end('\n');

    let fileBuffer = fs.readFileSync('output.txt');
    let sum = crypto.createHash('sha1');
    sum.update(fileBuffer);
    const hexFile = sum.digest('hex');

    console.log(hexFile);
  })
});