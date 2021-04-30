function $(str) {
	function normalize_data(str) {
		str = str.replace(/[\s_\-,\.\?!\*]+/g, '')
		str = str.toUpperCase()
		return str
	}
	str = normalize_data(str)
	let result = ''
	for(const f of my_library_functions) {
		if(normalize_data(f).indexOf(str) === -1)
			continue
		const n = f.match(/([^\(\s]+)/)[1]
		result += `<button type="button" class="func_btn"`
		result += ` onclick="func_form(${n})">${f}</button>\n`
	}
	return result
}

function reverse_string(str) {
	let rev = ''
	for(let i = str.length - 1; i >= 0; i--)
		rev += str[i]
	return rev
}

function is_int(x) {
	return parseFloat(x) == parseInt(x)
}

function is_float(x) {
	return !is_int(x)
}

function is_array(x) {
	return Array.isArray(x)
}

function is_object(x) {
	return typeof(x) == 'object'
}

function array_length(x) {
	return is_array(x) && x.length
}

function decimal_integer_to_base_n(num, n) {
	let x = ''
	do {
		x = decimal_to_character(num % n) + x
	} while(num = parseInt(num / n))
	return x
}

function decimal_floating_point_to_base_n(num, n, precision=101) {
	let x = '', int
	do {
		num *= n
		int = parseInt(num)
		num -= int
		x += decimal_to_character(int)
	} while(num && --precision)
	return x
}

function decimal_to_base_n(num, n, precision=101) {
	let x, int = parseInt(num)
	x = decimal_integer_to_base_n(int, n)
	if(is_float(num))
		x += decimal_floating_point_to_base_n(num - int, n, precision)
	return x
}

function decimal_to_character(num) {
	if(num >= 10 && num <= 35)
		return String.fromCharCode(num + 55)
	return String(num)
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

function base_n_integer_to_decimal(x, n) {
	let N = 0
	for(let i = 0; i < x.length; i++)
		N += character_to_decimal(x[i]) * Math.pow(n, x.length - 1 - i)
	return N
}

function base_n_floating_point_to_decimal(x, n) {
	let N = 0
	for(let i = 0; i < x.length; i++)
		N += character_to_decimal(x[i]) / Math.pow(n, i + 1)
	return N
}

function base_n_to_decimal(x, n) {
	const tokens = x.split('.')
	const int = base_n_integer_to_decimal(tokens[0], n)
	const fp = tokens[1] !== undefined ?
	      base_n_floating_point_to_decimal(tokens[1], n) : 0
	return int + fp
}

function character_to_decimal(char) {
	char = char.toUpperCase()
	if(char >= 'A' && char <= 'Z')
		return char.charCodeAt(0) - 55
	return Number(char)
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

function join(init, op) {
	return function _(f, arr) {
		let n = init
		for(const a of arr)
			n = op(n, is_object(a) ? _(f, a) : f(a))
		return n
	}
}

function sum(f, arr) {
	return join(0, (x,y) => x+y)(f, arr)
}

function product(f, arr) {
	return join(1, (x,y) => x*y)(f, arr)
}

function parallel_resistors_equivalent(resistors) {
	return 1 / sum(n=>1/n, resistors)
}

function series_resistors_equivalent(resistors) {
	return sum(n=>n, resistors)
}

function extend_left_by_character_n_times(str, char, n) {
	while(n-- > str.length)
		str = char + str
	return str
}

function decimal_to_bcd(num, num_of_bits=8) {
	num = String(parseInt(num))
	let bin = ''
	for(let i = 0; num[i] !== undefined; i++)
		bin += extend_left_by_character_n_times(
			decimal_to_binary(num[i]), '0', num_of_bits) + ' '
	return bin
}

function decimal_to_packed_bcd(num) {
	return decimal_to_bcd(num, 4)
}

function is_matrix(A) {
	const rows = matrix_rows(A)
	const cols = matrix_columns(A, 0)
	if(!rows || !cols) return false
	for(let i = 1; i < rows; i++)
		if(matrix_columns(A, i) != cols)
			return false
	return true
}

function matrix_to_string(A) {
	let string = ''
	for(const i in A) {
		for(const j in A[i])
			string += `${A[i][j]}\t`
		string += '\n'
	}
	return string
}

function matrices_to_string(As) {
	let string = ''
	for(const i in As)
		string += `${i}:${matrix_to_string(As[i])}\n\n`
	return string
}

function string_to_matrix(str) {
	return str.trim().replace(/[\s]{2,}/g, '$1').split(/\n+/).map(
		c => c.trim().split(/\s/).map(n => Number(n)))
}

function matrix_rows(A) {
	return array_length(A)
}

function matrix_columns(A, i=0) {
	return matrix_rows(A) && array_length(A[i])
}

function matrix_dimentions(A) {
	return is_matrix(A) && [matrix_rows(A), matrix_columns(A)]
}

function apply_proc_to_matrix_elements(proc, A) {
	let C = []
	for(const i in A) {
		C[i] = []
		for(const j in A[i])
			C[i][j] = proc(i, j, A[i][j])
	}
	return C
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
	return (is_array(x) &&
		multiply_matrices(A, x)) ||
		multiply_matrix_by_scalar(A, x)
}

function multiply_matrix_by_scalar(A, n) {
	return apply_proc_to_matrix_elements((i,j,a) => a*n, A)
}

function multiply_matrices(A, B) {
	if(matrix_columns(A) != matrix_rows(B))
		return `Can't be done. 
# of A columns[${matrix_columns(A)}] != # of B rows[${matrix_rows(B)}]`
	
	let C = []
	for(const i in A) {
		C[i] = []
		for(const j in B[i]) {
			C[i][j] = 0
			for(const k in A[i])
				C[i][j] += A[i][k] * B[k][j]
		}
	}
	return C
}

function matrix_transposition(A) {
	let C = []
	for(let j = 0; j < matrix_columns(A); j++) {
		C[j] = []
		for(const i in A)
			C[j][i] = A[i][j]
	}
	return C
}

function matrix_main_diagonal(A) {
	let C = []
	for(const i in A)
		for(const j in A)
			if(i == j)
				C.push(A[j][j])
	return C
}

function matrix_anti_diagonal(A) {
	let C = []
	for(const i in A)
		C.push(A[i][matrix_columns(A,i)-i-1])
	return C
}

function is_matrix_square(A) {
	return is_matrix(A) && (matrix_rows(A) == matrix_columns(A))
}

function apply_predicate_to_matrix_elements(false_p, A) {
	for(const i in A)
		for(const j in A[i])
			if(false_p(i, j, A[i][j]))
				return false
	return true
}

function is_matrix_symmetric(A) {
	const A_t = matrix_transposition(A)
	return apply_predicate_to_matrix_elements(
		(i,j,a) => a != A_t[i][j], A)
}

function is_matrix_skew_symmetric(A) {
	const A_t = matrix_transposition(A)
	return apply_predicate_to_matrix_elements(
		(i,j,a) => a != -A_t[i][j], A)
}

function is_matrix_diagonal(A) {
	return apply_predicate_to_matrix_elements(
		(i,j,a) => (i != j && a), A)
}

function is_matrix_top_triangular(A) {
	return apply_predicate_to_matrix_elements((i,j,a) => (i > j && a), A)
}

function is_matrix_bottom_triangular(A) {
	return apply_predicate_to_matrix_elements((i,j,a) => (i < j && a), A)
}

function is_matrix_zero(A) {
	return apply_predicate_to_matrix_elements((i,j,a) => a, A)
}

function is_matrix_identity(A) {
	return apply_predicate_to_matrix_elements(
		(i,j,a) => (i != j && a) || (i == j && a != 1), A)
}

function make_matrix(rows, columns, proc) {
	let C = []
	for(let i = 0; i < rows; i++) {
		C[i] = []
		for(let j = 0; j < columns; j++)
			C[i][j] = proc(i,j)
	}
	return C
}

function identity_matrix(rows, columns) {
	return make_matrix(rows, columns, (i,j) => i==j ? 1 : 0)
}

function zero_matrix(rows, columns) {
	return make_matrix(rows, columns, (i,j) => 0)
}

function matrix_as_sum_of_symmetric_and_skew_symmetric_matrices(A) {
	const A_t = matrix_transposition(A)
	const sym = multiply_matrix(add_matrices(A,A_t), 0.5)
	const skew = multiply_matrix(subtract_matrices(A,A_t), 0.5)
	return {
		symmetric: sym,
		skew_symmetric: skew,
	}
}

function matrix_trace(A) {
	return sum(x=>x, matrix_main_diagonal(A))
}

function matrix_remove_row_column(A, r, c) {
	let C = []
	for(const i in A) {
		if(r != i) {
			let row = []
			for(const j in A[i])
				if(j != c) 
					row.push(A[i][j])
			C.push(row)
		}
	}
	return C
}

function matrix_determinant(A) {
	if(!is_matrix_square(A))
		return 'Matrix is not square.'
	if(matrix_rows(A) < 2)
		return 'Matrix is too small.'

	if(matrix_rows(A) == 2 && matrix_columns(A) == 2) {
		return product(x=>x, matrix_main_diagonal(A)) -
			product(x=>x, matrix_anti_diagonal(A))
	}
	else {
		const firstRow = A[0]
		let det = 0
		for(const i in firstRow) {
			const a = i % 2 ? -firstRow[i] : firstRow[i]
			const B = matrix_remove_row_column(A, 0, i)
			det += a * matrix_determinant(B)
		}
		return det
	}
}

function matrix_inverse(A) {	
	const det = matrix_determinant(A)
	if(typeof(det) == 'string')  /* Error */
		return det
	else if(det == 0)
		return 'Matrix is not invertible.'

	if(matrix_rows(A) == 2 && matrix_columns(A) == 2) {
		let C = apply_proc_to_matrix_elements(
			(i,j,a) => i != j ? -a : a, A)
		const temp = C[0][0]
		C[0][0] = C[1][1]
		C[1][1] = temp
		return multiply_matrix(C, 1/det)
	}
	else {
		const C = make_matrix(
			matrix_rows(A), matrix_columns(A),
			(i,j) => {
				const det = matrix_determinant(
					matrix_remove_row_column(A,j,i))
				return (i+j) % 2 ? -det : det
			})
		return multiply_matrix(C, 1/det)
	}
}

function solve_quadratic_equation(a, b, c) {
	const delta = (b * b) - (4 * a * c)
	let roots = {delta: delta}
	if(delta >= 0) {
		let xp = (-b + Math.sqrt(delta)) / (2 * a)
		let xm = (-b - Math.sqrt(delta)) / (2 * a)
		roots['x+'] = xp
		roots['x-'] = xm

		xp = (-xp).toFixed(2)
		xm = (-xm).toFixed(2)
		if(xp[0] != '-') xp = `+${xp}`
		if(xm[0] != '-') xm = `+${xm}`
		roots['factorization'] = `(x${xp})(x${xm})`
	}
	return roots
}

function make_vector(x,y) {
	return [x,y]
}

function vector_x(p) {
	return p[0]
}

function vector_y(p) {
	return p[1]
}

function apply_proc_to_vector_elements(proc, p) {
	let y = []
	for(const i in p)
		y[i] = proc(i, p[i])
	return y
}

function apply_proc_to_same_elements_of_vectors(proc, p, q) {
	return apply_proc_to_vector_elements((i,a) => proc(a,q[i]), p)
}

function add_vectors(p, q) {
	return apply_proc_to_same_elements_of_vectors((a,b) => a+b, p, q)
}

function subtract_vectors(p, q) {
	return apply_proc_to_same_elements_of_vectors((a,b) => a-b, p, q)
}

function multiply_vector_by_scalar(p, n) {
	return apply_proc_to_vector_elements((i,a) => a*n, p)
}

function vector_length(p) {
	return Math.sqrt(Math.pow(vector_x(p), 2) +
			 Math.pow(vector_y(p), 2))
}

function unit_vector(p) {
	return multiply_vector_by_scalar(p, 1 / vector_length(p))
}

function vectors_dot_product(p, q) {
	return sum(x => x,
		   apply_proc_to_same_elements_of_vectors((a,b) => a*b, p, q))
}

function vectors_angle_cos(p, q) {
	return vectors_dot_product(p,q) / vector_length(p) / vector_length(q)
}

function vectors_angle(p, q) {
	return Math.acos(vectors_angle_cos(p,q)) / Math.PI * 180
}

function are_vectors_orthogonal(p, q) {
	return 0 == vectors_dot_product(p,q)
}

function vector_projection(p, q) {
	return multiply_vector_by_scalar(
		q, (vectors_dot_product(p,q) / Math.pow(vector_length(q),2)))
}

function apply_proc_to_object_elements(proc, obj) {
	let y = {}
	for(const i in obj)
		y[i] = proc(i,obj[i])
	return y
}

function extract_sorted_object_keys(obj, sortFn=(x,y)=>x-y) {
	let l = []
	for(const k in obj)
		l.push(k)
	return l.sort(sortFn)
}

function count_elements(data) {
	let z = {}
	for(const o of data) {
		if(o in z) z[o]++
		else       z[o]=1
	}
	return z
}

function remove_similar_elements(arr) {
	return extract_sorted_object_keys(count_elements(arr))
}

function data_classes(data) {
	return remove_similar_elements(data)
}

function is_data_continuous(data) {
	const z = data_classes(data)
	if(z.length <= 2)
		return false
	if(isNaN(z[0]) || isNaN(z[1]))
		return false
	let d = z[1] - z[0]
	for(let i = 1; i < z.length-1; i++) {
		if(isNaN(z[i+1]) || isNaN(z[i]))
			return false
		if(d !== (z[i+1] - z[i]))
			return false
	}
	return d
}

function is_data_concrete(data) {
	return !is_data_continuous(data)
}

function continuous_data_domain(data) {
	const xs = data_classes(data)
	return xs[xs.length-1] - xs[0]
}

function continuous_data_number_of_classes(data) {
	return Math.round(1 + 3.3 * Math.log10(data.length))
}

function continuous_data_class_length(data) {
	return Math.round(continuous_data_domain(data) /
			  continuous_data_number_of_classes(data))
}

function data_frequency(data) {
	return count_elements(data)
}

function data_cumulative_frequency(data) {
	const freq = data_frequency(data)
	const keys = extract_sorted_object_keys(freq)
	let sum = 0
	for(const k of keys) {
		sum += freq[k]
		freq[k] = sum
	}
	return freq
}

function data_relative_frequency(data) {
	return apply_proc_to_object_elements((k,v) => v / data.length,
					     data_frequency(data))
}

function data_frequency_table_object(data) {
	return {
		classes: data_classes(data),
		frequency: data_frequency(data),
		relative_frequency: data_relative_frequency(data),
		cumulative_frequency: data_cumulative_frequency(data),
	}
}

function factorial(n, acc=1) {
	while(n > 1) acc *= n--
	return acc
}

function combinations(A, N=A.length, R='', join=(A,a)=>A+a) {
	function _combinations(N, R) {
		if(!N)
			Rs.push(R)
		else
			for(const i in A)
				_combinations(N-1, join(R,A[i]))
	}
	
	let Rs = []
	_combinations(N, R)
	return Rs
}

function permutations(A, N=A.length, R='', join=(A,a)=>A+a) {
	function remove(A, i) {
		let B = []
		for(const j in A)
			if(i != j)
				B.push(A[j])
		return B
	}
	function _permutations(A, N, R) {
		if(N == 0)
			Rs.push(R)
		else
			for(const i in A)
				_permutations(remove(A,i), N-1, join(R,A[i]))
	}
	
	let Rs = []
	_permutations(A, N, R)
	return Rs
}

function draw(bits, on_char='\u{25A0}', off_char='\u{25A1}') {
	return bits.replace(/1/g, on_char).replace(/0/g, off_char)
}

function draw_vertically(char, n, indent=0) {
	let str = ''
	for(let i = 0; i < n; i++)
		str += ' '.repeat(indent) + char + '\n'
	return str.trimEnd()
}

function lisp(str) {
	function tokenizer(str) {
		return str.replace(/([\(\)\[\]\{\}])/g, ' $1 ').trim().split(/\s+/)
	}
	function atom(token) {
		if(token === '0')
			return 0
		else if(Number(token))  /* !isNaN(Number(token)) */
			return Number(token)
		else
			return token
	}
	function read_from_tokens(tokens) {
		if(tokens.length == 0)
			return
		const token = tokens.shift()
		if('({['.indexOf(token) !== -1) {
			let L = []
			while(tokens.length > 0 && ']})'.indexOf(tokens[0]) === -1)
				L.push(read_from_tokens(tokens))
			tokens.shift()
			return L
		}
		else if(']})'.indexOf(token) !== -1)
			return
		else
			return atom(token)
	}
	function parse(str) {
		return read_from_tokens(tokenizer(str))
	}
	function _eval(exp, env) {
		while(true) {
			if(!isNaN(exp))
				return exp
			else if(!Array.isArray(exp))
				return lookup_env(exp, env)
			else if(exp[0] == 'quote')
				return exp.slice(1)
			else if(exp[0] == 'if')
				exp = exp[_eval(exp[1], env) ? 2 : 3]
			else if(exp[0] == 'define') {
				if(Array.isArray(exp[1])) {
					const k = exp[1].shift()
					return envs[env][1][k] = make_proc(exp[1], exp[2], make_env({}, env))
				}
				return envs[env][1][exp[1]] = _eval(exp[2], env)
			}
			else if(exp[0] == 'lambda')
				return make_proc(exp[1], exp[2], make_env({}, env))
			else if(exp[0] == 'begin') {
				exp.shift()
				for(let i = 0; i < exp.length-1; i++)
					_eval(exp[i], env)
				exp = exp[exp.length - 1]
			}
			else {
				const proc = _eval(exp.shift(), env)
				if(is_primitive(proc)) {
					const arg = exp.map(o => _eval(o, env))
					exp = proc(arg)
				}
				else {
					const param = proc[1]
					const body = proc[2]
					const proc_env_name = proc[3]
					const exec_env_name = make_env({}, proc_env_name)
					let exec_env = envs[exec_env_name]
					
					for(const i in param)
						exec_env[1][param[i]] = _eval(exp[i], env)
					
					env = exec_env_name
					exp = clone(body)
				}
			}
		}
	}
	function is_primitive(proc) {
		return typeof(proc) == 'function'
	}
	function clone(arr) {
		let new_arr = []
		for(const o of arr)
			new_arr.push(Array.isArray(o) ? clone(o) : o)
		return new_arr
	}
	function generate_env_name() {
		return env_key++
	}
	function make_env(pairs, parent, env) {
		const env_name = generate_env_name()
		envs[env_name] = [parent, pairs]
		return env_name
	}
	function lookup_env(key, env_name) {
		while(true) {
			const env = envs[env_name]
			if(key in env[1])
				return env[1][key]
			else if(env[0] !== undefined)
				env_name = env[0]
			else
				return key
		}
	}
	function make_proc(param, body, env) {
		return ['closure', param, body, env]
	}
	function js_eval(arg) {
		return eval(arg.join(' '))
	}
	function _print(x) {
		return append_to_result(to_string(x))
	}
	
	let env_key = 0
	let envs = []
	const global_env = make_env({ js: js_eval }, undefined)
	return _eval(parse(str), global_env)
}

function server(url, func, arg, callback, keyword='request') {
	function make_object() {
		return {
			func: func,
			arg: arg,
		}
	}
	function make_request(object) {
		return `${keyword}=${encodeURIComponent(JSON.stringify(object))}`
	}

	const request = make_request(make_object())
	const x = new XMLHttpRequest
	x.onload = e => callback(x)
	x.open('post', url)
	x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
	x.send(request)
}

function my_server(func, arg, callback) {
	return server('../srv/', func, arg,
		      x => callback(JSON.parse(x.responseText)))
}

function object_properties(obj) {
	return Object.getOwnPropertyNames(obj)
}

function rtl(str) {
	return `<span class='rtl'>${str}</span>`
}

function allekok_status() {
	return my_server('download', 'https://allekok.ir/status.php',
			 t => append_to_result(rtl(to_string(t))))
}

function tewar(w, n=25, dicts='all', out='text') {
	w = encodeURIComponent(w)
	const url = 'https://allekok.ir/tewar/src/backend/lookup.php'
	return my_server('download',
			 `${url}?q=${w}&n=${n}&dicts=${dicts}&output=${out}`,
			 t => append_to_result(rtl(to_string(t))))
}

function count_lines(str) {
	if(str.length == 0)
		return 0
	let n = 1
	for(const i in str)
		if(str[i] == '\n')
			n++
	return n
}

function time(proc) {
	const start = Date.now()
	const res = proc()
	return [(Date.now() - start) / 1000, res]
}

function and_gate(a, b) {
	/* a = b = 1 */
	return a ? b : a
}

function or_gate(a, b) {
	/* a != b != 0 */
	return a ? a : b
}

function not_gate(a) {
	return a ? false : true
}

function nand_gate(a, b) {
	/* a != b != 1 */
	return not_gate(and_gate(a, b))
}

function nor_gate(a, b) {
	/* a = b = 0 */
	return not_gate(or_gate(a, b))
}

function xor_gate(a, b) {
	/* a != b */
	return and_gate(or_gate(a, b), nand_gate(a, b))
}

function noxor_gate(a, b) {
	/* a = b */
	return not_gate(xor_gate(a, b))
}

function false_gate(a, b) {
	/* !a = !b = 1 */
	return and_gate(not_gate(a), not_gate(b))
}

function true_false_gate(a, b) {
	/* a = !b = 1 */
	return and_gate(a, not_gate(b))
}

function false_true_gate(a, b) {
	/* !a = b = 1 */
	return and_gate(not_gate(a), b)
}

function test_function(proc, inputs) {
	const args = combinations(inputs, proc.length,
				  [], (A,a) => A.concat(a))
	let result = {}
	for(const arg of args)
		result[arg] = proc(...arg)
	return result
}

function truth_table(proc) {
	return test_function(proc, [true,false])
}
