const fs = require('fs')

const input = 'src/my-library.js'
const output = 'src/my-library-functions.js'
const objectName = 'my_library_functions'

const content = fs.readFileSync(input).toString()

/* Extract Functions */
const functions = content.match(/^function\s+(.+)\s*\)/gm).map(x => {
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
