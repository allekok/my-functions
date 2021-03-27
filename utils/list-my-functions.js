const fs = require('fs')

const langs = ['js', 'php']
const inputs = ['src/my-library.js', 'srv/my-library.php']
const outputs = ['src/my-library-functions.js', 'srv/my-library-functions.php']
const objectName = 'my_library_functions'

for(const i in langs) {
	const lang = langs[i]
	const input = inputs[i]
	const output = outputs[i]
	
	const content = fs.readFileSync(input).toString()

	/* Extract Functions */
	const functions = content.match(/^function\s+(.+)\s*\)/gm).map(x => {
		return x.replace(/function\s+/, '').replace(/'/g, "\\'")
	}).sort()

	/* Array to String */
	let toWrite = lang == 'php' ? '<?php\n' : ''
	toWrite += `const ${objectName} = [\n`
	for(const o of functions) {
		toWrite += `\t'${o}',\n`
	}
	toWrite += ']'
	toWrite += lang == 'php' ? ';\n?>\n' : '\n'

	/* Save List of Functions */
	fs.writeFileSync(output, toWrite)

	console.log(`${output} Done.`)
}
