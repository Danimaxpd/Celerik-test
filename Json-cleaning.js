const https = require('https')

https.get('https://coderbyte.com/api/challenges/json/json-cleaning', (resp) => {
  let data = ''
  let dataRes = {}
  resp.on('data', (chunk) => {
    data += chunk
  })
  resp.on('end', () => {
    dataRes = JSON.parse(data);
    for (let item in dataRes) {
      if (Array.isArray(dataRes[item])) {
        dataRes[item].forEach((v, k) => {
          if (validateEmpty(v)) {
            dataRes[item].splice(k, 1);
          }
        })
      } else if(typeof dataRes[item] === 'object' && dataRes[item] !== null) {
        for (let val in dataRes[item]) {
          if (validateEmpty(dataRes[item][val])) {
            delete dataRes[item][val];
          }
        }
      } else {
        if (validateEmpty(dataRes[item])) {
          delete dataRes[item];
        }
      }
    }

    console.log(dataRes);
  })
})

function validateEmpty (value) {

  if (value == 'N/A' || value == '-' || value == '' || value === null || value === undefined) {
    return true
  } else {
    return false
  }
}