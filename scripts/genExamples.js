const { transpile } = require("typescript")
const { readFile, writeFile } = require("fs")
const stringify = require("json-stable-stringify")
const { exit } = require("process")

const genExample = file =>
    new Promise((resolve, reject) => {
        readFile(file, (err, res) => {
            if (err) reject(err)
            const js = transpile(res.toString(), {})
            function scope(js) {
                var exports = {}
                eval(js)
                return exports
            }
            var module = scope(js)
            resolve(module)
        })
    })

module.exports = genExample

process.argv.slice(2).forEach(path => {
    genExample(path)
        .then(module => {
            var json = stringify(module, { space: 4 })
            var jsonPath = path.replace(/.ts$/, ".json").replace(/src\//, "out/")
            writeFile(jsonPath, json, {}, err => {
                if (err) throw err
            })
        })
        .catch(err => {
            console.error(err)
            exit(1)
        })
})
