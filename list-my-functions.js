const fs = require('fs')

const input = 'my-library.js'
const output = 'my-library-functions.js'
const objectName = 'my_library_functions'

const content = fs.readFileSync(input).toString()

/* Extract Functions */
const functions = content.match(/function\s+(.+)\s*\)/g).map(x => {
	return x.replace(/function\s+/, '')
}).sort()

/* Array to String */
let toWrite = `const ${objectName} = [\n`
for(const o of functions) {
	toWrite += `\t'${o}',\n`
}
toWrite += ']\n'

/* Save List of Functions */
fs.writeFileSync(output, toWrite)

console.log(`${output} Done!`)
