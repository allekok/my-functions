function $(str) {
	let result = []
	for(const f of my_library_functions)
		if(f.indexOf(str) !== -1)
			result.push(f)
	return result
}

function reverse_string(str) {
	let revStr = ''
	for(let i = str.length - 1; str[i] !== undefined; i--)
		revStr += str[i]
	return revStr
}

function decimal_to_base_n(num, n) {
	let x = ''

	if(n < 2)
		return x
	
	do {
		x = decimal_to_character(num % n) + x
	} while(num = parseInt(num / n))

	return x
}

function decimal_to_character(num) {
	if(num >= 10 && num <= 35)
		return String.fromCharCode(num + 55)
	return num.toString()
}

function decimal_to_binary(num) {
	return decimal_to_base_n(num, 2)
}

function decimal_to_octal(num) {
	return decimal_to_base_n(num, 8)
}

function decimal_to_hexadecimal(num) {
	return decimal_to_base_n(num, 16)
}

function base_n_to_decimal(x, n) {
	let num = 0
	for(let i = x.length-1, p = 1; i >= 0; i--, p = Math.pow(n, x.length - i - 1))
		num += character_to_decimal(x[i]) * p
	return num
}

function character_to_decimal(char) {
	char = char.toUpperCase()
	if(char >= 'A' && char <= 'Z')
		return char.charCodeAt(0) - 55
	return parseInt(char)
}

function binary_to_decimal(bin) {
	return base_n_to_decimal(bin, 2)
}

function octal_to_decimal(octal) {
	return base_n_to_decimal(octal, 8)
}

function hexadecimal_to_decimal(hex) {
	return base_n_to_decimal(hex, 16)
}

function binary_to_hexadecimal(bin) {
	return decimal_to_hexadecimal(binary_to_decimal(bin))
}

function hexadecimal_to_binary(hex) {
	return decimal_to_binary(hexadecimal_to_decimal(hex))
}

function binary_to_octal(bin) {
	return decimal_to_octal(binary_to_decimal(bin))
}

function octal_to_binary(octal) {
	return decimal_to_binary(octal_to_decimal(octal))
}

function hexadecimal_to_octal(hex) {
	return decimal_to_octal(hexadecimal_to_decimal(hex))
}

function octal_to_hexadecimal(octal) {
	return decimal_to_hexadecimal(octal_to_decimal(octal))
}

function sum(f, numbers) {
	let sum = 0
	for(const num of numbers)
		sum += f(num)
	return sum
}

function parallel_resistors_equivalent(resistors) {
	return 1 / sum(n=>1/n, resistors)
}

function series_resistors_equivalent(resistors) {
	return sum(n=>n, resistors)
}

function extend_left_by_character_n_times(str, char, n) {
	n -= str.length
	while(n-- > 0)
		str = char + str
	return str
}

function decimal_to_bcd(num, num_of_bits=8) {
	num = String(num)
	let bin = ''
	for(let i = 0; num[i] !== undefined; i++)
		bin += extend_left_by_character_n_times(
			decimal_to_binary(num[i]), '0', num_of_bits) + ' '
	return bin
}

function decimal_to_packed_bcd(num) {
	return decimal_to_bcd(num, 4)
}

function matrix_to_string(A) {
	let string = '\n'
	for(const i in A) {
		for(const j in A[i])
			string += `${A[i][j]}\t`
		string += '\n'
	}
	return string
}

function apply_proc_to_matrix_elements(proc, A) {
	for(const i in A)
		for(const j in A[i])
			A[i][j] = proc(i, j, A[i][j])
	return A
}

function apply_proc_to_same_elements_of_matrices(proc, A, B) {
	return apply_proc_to_matrix_elements((i,j,a) => proc(a, B[i][j]), A)
}

function add_matrices(A, B) {
	return apply_proc_to_same_elements_of_matrices((a,b) => a+b, A, B)
}

function subtract_matrices(A, B) {
	return apply_proc_to_same_elements_of_matrices((a,b) => a-b, A, B)
}

function multiply_matrix(A, x) {
	if(typeof(x) != 'object')
		return multiply_matrix_by_scalar(A, x)
	else
		return multiply_matrices(A, x)
}

function multiply_matrix_by_scalar(A, n) {
	return apply_proc_to_matrix_elements((i,j,a) => a*n, A)
}

function multiply_matrices(A, B) {
	if(A[0].length != B.length)
		return `Can't be done.
# of columns(${A[0].length}) of A != # of rows(${B.length}) of B`

	let C = []
	for(const i in A) {
		C[i] = []
		for(const j in B[i]) {
			C[i][j] = 0
			for(const k in A[i]) {
				C[i][j] += A[i][k] * B[k][j]
			}
		}
	}
	return C
}
