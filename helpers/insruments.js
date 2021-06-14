const fs = require('fs');
const path = require('path');
const isEmpty = (obj) => {
  return Object.keys(obj).length === 0
}



const config = {
    get: () => new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, "../settings/config.json"), (err,res) => {
        resolve(JSON.parse(res))
      })
    }),
    write:(values) => new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, "../settings/config.json"),values, (err) => {
        if (err) reject(err)
        resolve()
      })
    })

}

module.exports = { isEmpty, config }
