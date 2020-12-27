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
