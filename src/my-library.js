function apropos(str) {
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
	if(is_float(num)) {
		x += '.' + decimal_floating_point_to_base_n(
			num - int, n, precision)
	}
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
	return function _(A, f) {
		let n = init
		for(const i in A)
			n = op(n, is_object(A[i]) ? _(A[i], f) : f(A[i]))
		return n
	}
}

function sum(arr, f=n=>n) {
	return join(0, (N,n) => N+n)(arr, f)
}

function product(arr, f=n=>n) {
	return join(1, (N,n) => N*n)(arr, f)
}

function parallel_resistors_equivalent(resistors) {
	return 1 / sum(resistors, n=>1/n)
}

function series_resistors_equivalent(resistors) {
	return sum(resistors)
}

function extend_left_by_character_n_times(str, char, n) {
	while(n > str.length)
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
	return sum(matrix_main_diagonal(A))
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
		return product(matrix_main_diagonal(A)) -
			product(matrix_anti_diagonal(A))
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

function make_vector(Xs) {
	return Xs
}

function vector_x(p) {
	return p[0]
}

function vector_y(p) {
	return p[1]
}

function vector_z(p) {
	return p[2]
}

function is_vector(x) {
	return array_length(x) > 1
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
	return Math.sqrt(
		sum(apply_proc_to_vector_elements(
			(_, x) => Math.pow(x, 2), p)))
}

function unit_vector(p) {
	return multiply_vector_by_scalar(p, 1 / vector_length(p))
}

function vectors_dot_product(p, q) {
	return sum(apply_proc_to_same_elements_of_vectors((a,b) => a*b, p, q))
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

function draw_line(s, n) {
	return s.repeat(n)
}

function draw_rect(x, y) {
	return '\n ' + '-'.repeat(x) + '\n' +
		('|' + ' '.repeat(x) + '|\n').repeat(y) +
		' '  + '-'.repeat(x) + '\n'
}

function lisp(str) {
	/* Parser */
	function parse(str) {
		return read_from_tokens(tokenizer(str))
	}
	function tokenizer(str) {
		return str.
			replace(/([\(\)\[\]\{\}])/g, ' $1 ').
			trim().
			split(/\s+/)
	}
	function read_from_tokens(tokens) {
		if(!tokens.length)
			return
		const token = tokens.shift()
		if('({['.indexOf(token) !== -1) {
			let L = []
			while(tokens.length && ']})'.indexOf(tokens[0]) === -1)
				L.push(read_from_tokens(tokens))
			tokens.shift()
			return L
		}
		else if(']})'.indexOf(token) !== -1)
			return
		else
			return atom(token)
	}
	function atom(token) {
		return isNaN(token) ? token : Number(token)
	}

	/* Evaluation */
	function _eval(exp, env) {
		while(true) {
			if(!isNaN(exp))
				return exp
			else if(!is_array(exp))
				return lookup(exp, env)
			else if(exp[0] == 'quote')
				return exp[1]
			else if(exp[0] == 'define')
				return define(exp, env)
			else if(exp[0] == 'lambda')
				return make_proc(exp[1], exp[2], env)
			else if(exp[0] == 'begin')
				return begin(exp, env)
			else if(exp[0] == 'if')
				exp = exp[_eval(exp[1], env) ? 2 : 3]
			else {
				const proc = _eval(exp.shift(), env)
				const arg = evlist(exp, env)
				const res = _apply(proc, arg, env)
				exp = res[0]
				env = res[1]
			}
		}
	}
	function evlist(list, env) {
		return list.map(o => _eval(o, env))
	}

	/* Special forms */
	function define(exp, env) {
		if(is_array(exp[1])) {
			const sym = exp[1].shift()
			return set(sym,
				   make_proc(exp[1], exp[2], env),
				   env)
		}
		return set(exp[1], _eval(exp[2], env), env)
	}
	function begin(exp, env) {
		exp = exp.map(x => _eval(x, env))
		return exp[exp.length - 1]
	}

	/* Environment */
	function env_name_generator(i = 0) {
		return () => i++
	}
	const generate_env_name = env_name_generator()
	function make_env(pairs, parent) {
		const env_name = generate_env_name()
		envs[env_name] = [pairs, parent]
		return env_name
	}
	function lookup(sym, env_name) {
		while(true) {
			const env = envs[env_name]
			if(sym in env[0])
				return env[0][sym]
			else if(env[1] !== undefined)
				env_name = env[1]
			else
				return
		}
	}
	function set(sym, val, env_name) {
		return envs[env_name][0][sym] = val
	}
	
	/* Procedure */
	function make_proc(param, body, env) {
		return ['closure', param, body, env]
	}
	function proc_param(proc) {
		return proc[1]
	}
	function proc_body(proc) {
		return proc[2]
	}
	function proc_env(proc) {
		return proc[3]
	}

	/* Apply */
	function _apply(proc, arg, env) {
		if(is_primitive(proc))
			return apply_primitive(proc, arg, env)
		else
			return apply_proc(proc, arg, env)
	}
	function apply_proc(proc, arg, env) {
		const exec_env = make_env({}, proc_env(proc))
		bind(proc_param(proc), arg, exec_env)
		return [ clone(proc_body(proc)) , exec_env ]
	}
	function apply_primitive(proc, arg, env) {
		return [ proc(arg) , env ]
	}
	function is_primitive(proc) {
		return typeof(proc) == 'function'
	}
	function bind(param, arg, env) {
		if(!is_array(param))
			set(param, arg, env)
		else if(param[param.length - 2] == '.') {
			const dot = param.length - 2
			bind(param.slice(0, dot), arg, exec_env)
			bind(param[dot + 1], arg.slice(dot), exec_env)
		}
		else
			param.map((p, i) => bind(p, arg[i], env))
	}
	function clone(x) {
		if(!is_array(x))
			return x
		
		let arr = []
		for(const o of x)
			arr.push(clone(o))
		return arr
	}

	/* Primitives */
	function js(arg) {
		return eval(arg.join(' '))
	}

	/* Print */
	function _print(x) {
		return append_to_result(to_string(x))
	}

	/* Run */
	const envs = []
	const global_env = make_env({ js }, undefined)
	return _eval(parse(str), global_env)
}

function server(url, func, arg, callback, keyword='request', method='post') {
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
	if(method == 'post') {
		x.open(method, url)
		x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
		x.send(request)
	}
	else {
		x.open(method, url + '?' + request)
		x.send()
	}
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

function hackernews() {
	return my_server('hackernews', '', links => {
		let html = ''
		for(const link of links)
			html += `<a href='${link[1]}'>${link[0]}</a>\n`
		append_to_result(html)
	})
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
	return not_gate(or_gate(a, b))
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
	return test_function(proc, [1,0])
}

function make_stream(init, proc) {
	return [init, proc]
}

function scar(stream) {
	return stream[0]
}

function scdr(stream) {
	return stream[1]()
}

function snth(stream, n) {
	for(let i = 0; i < n; i++)
		stream = scdr(stream)
	return stream
}

function factors(n, proc=n=>true, limit=null) {
	limit = limit || n
	let factors = []
	for(let i = 1; i <= limit; i++)
		n % i == 0 && proc(i) && factors.push(i)
	return factors
}

function nonprime_factors(n) {
	return factors(n, is_nonprime)
}

function prime_factors(n) {
	return factors(n, is_prime)
}

function is_prime(n) {
	if(n < 2)
		return false
	if(n == 2)
		return true
	if(n % 2 == 0)
		return false
	for(let i = 3; i <= Math.sqrt(n); i += 2)
		if(n % i == 0)
			return false
	return true
}

function is_nonprime(n) {
	return !is_prime(n)
}

function func_range(proc, domain) {
	return make_stream(
		proc(scar(domain)),
		() => func_range(proc, scdr(domain)))
}

function newtonian_gravity(m, M, R) {
	const G = 6.674e-11
	if(is_vector(R)) {
		const Rm = vector_length(R)
		const mag = G * m * M / (Rm * Rm * Rm)
		return multiply_vector_by_scalar(R, -mag)
	}
	return G * m * M / (R * R)
}

function max(arr, f=x=>x) {
	let M = [arr[0]]
	for(const o of arr.slice(1)) {
		if(f(o) > f(M[0]))
			M = [o]
		else if(f(o) == f(M[0]))
			M.push(o)
	}
	return M
}

function longest_array(arr) {
	return max(arr, A => A.length)
}

function logic_lang(str) {
	function translate(str) {
		str = str.
			replace(/\./g, '').
			replace(/\s/g, '').
			replace(/(\(.+\))'/g, '(!($1))').
			replace(/(\w)'/g, '(!$1)').
			replace(/(\w)(\w)/g, '($1&&$2)').
			replace(/(\))(\w)/g, '$1&&$2').
			replace(/(\w)(\()/g, '$1&&$2').
			replace(/(\))(\()/g, '$1&&$2').
			replace(/\+/g, ')||(')
		str = `((${str}))`
		return str
	}
	function extract_vars(str) {
		let vars = []
		for(const i in str)
			if('+\' \n\r\t().'.indexOf(str[i]) === -1 &&
			   vars.indexOf(str[i]) === -1)
				vars.push(str[i])
		return vars.sort()
	}
	function vars_list(str) {
		return `(${extract_vars(str).join(', ')})`
	}
	function make_proc(str) {
		return eval(`${vars_list(str)} => ${translate(str)}`)
	}
	return make_proc(str)
}

function translate_numbers(S) {
	/* Dictionary */
	const ckbNum = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
	const engNum = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
	const perNum = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
	const allNum = [ckbNum, engNum, perNum]

	/* Translator */
	const isAoA = X => Array.isArray(X[0])
	const map = (S, F, A='') => !S ? A : map(S.substr(1), F, A + F(S[0]))
	const toAll = S => translate(S, allNum, allNum)
	function translate(S, F, T) {
		if(isAoA(T))
			return T.map(t => translate(S, F, t))
		else if(isAoA(F)) {
			F.map(f => S = translate(S, f, T))
			return S
		}
		return map(S, C => (i = F.indexOf(C)) !== -1 ? T[i] : C)
	}
	return toAll(String(S))
}

function asm(str) {
	/* Functions */
	const parse = str => str.trim().split(/\n+/).map(
		ln => ln.trim().split(/\s+|,/).filter(o => o))
	const ev = x => isNaN(x) ? e[x] : Number(x)
	const run = st => f[st[0]](...st.slice(1))
	
	/* Run */
	const flag = 'flag'
	const f = {
		nop: () => null,
		hlt: () => ip = -1,
		mov: (d,s) => e[d] = ev(s),
		add: (d,s) => e[d] = ev(d)+ev(s),
		sub: (d,s) => e[d] = ev(d)-ev(s),
		mul: (d,s) => e[d] = ev(d)*ev(s),
		cmp: (d,s) => e[flag] = ev(d)-ev(s),
		jmp: n => ip = ev(n) - 1,
		jt: (n,t) => t ? f.jmp(n) : null,
		je: n => f.jt(n, !ev(flag)),
		jg: n => f.jt(n, ev(flag) > 0),
		jl: n => f.jt(n, ev(flag) < 0),
		jge: n => f.jt(n, ev(flag) >= 0),
		jle: n => f.jt(n, ev(flag) <= 0),
		jne: n => f.jt(n, ev(flag)),
	}
	const e = {}
	const statements = parse(str)
	for(let ip = 0; ip > -1 && ip < statements.length; ip++)
		run(statements[ip])
	return e
}

function equal(x, y) {
	if(is_object(x) && is_object(y)) {
		for(const i in x) {
			if(i in y) {
				if(!equal(x[i], y[i]))
					return false
			}
			else return false
		}
		for(const i in y) {
			if(i in x) {
				if(!equal(x[i], y[i]))
					return false
			}
			else return false
		}
		return true
	}
	return x == y || (isNaN(x) && isNaN(y))
}

function sort(A) {
	function swap(A, i, j) {
		const t = A[i]
		A[i] = A[j]
		A[j] = t
	}
	for(let i = 0; i < A.length; i++)
		for(let j = i + 1; j < A.length; j++)
			if(A[i] > A[j])
				swap(A, i, j)
	return A
}

function count_sort(A) {
	const B = {}
	for(const a of A)
		B[a] = a in B ? B[a] + 1 : 1
	
	const C = []
	for(const i in B)
		while(B[i]--)
			C.push(i)
	
	return C
}

function quick_sort(A, s=0, e=A.length-1) {
	function swap(A, i, j) {
		const t = A[i]
		A[i] = A[j]
		A[j] = t
	}
	function partition(A, s, e) {
		const p = A[e]
		let i = s - 1
		for(let j = s; j < e; j++)
			if(A[j] < p)
				swap(A, ++i, j)
		swap(A, i + 1, e)
		return i + 1
	}
	if(s < e) {
		const p = partition(A, s, e)
		quick_sort(A, s, p - 1)
		quick_sort(A, p + 1, e)
	}
	return A
}

function sql(str) {
	const db = { }

	/* Patterns */
	const matches = [
		[/create table (.+)/i, create_table],
		[/select (.+) from (.+) (where) (.+) (order) by (.+)/i,
		 select],
		[/select (.+) from (.+) (order) by (.+) (where) (.+)/i,
		 select],
		[/select (.+) from (.+) (where) (.+)/i, select],
		[/select (.+) from (.+) (order) by (.+)/i, select],
		[/select (.+) from (.+)/i, select],
		[/insert into (.+)\s*\((.+)\)\s*values\s*\((.+)\)/i, insert],
		[/insert into (.+) values\s*\((.+)\)/i, insert],
		[/update (.+) set (.+) where (.+)/i, update],
		[/update (.+) set (.+)/i, update],
	]
	function pattern_matcher(str) {
		let M = null
		for(const m of matches)
			if(M = str.match(m[0]))
				return m[1](M.slice(1))
		return M
	}
	function create_table(tbl) {
		return db[tbl] = []
	}
	function select(M) {
		const tbl = get_table(M[1])
		const cols = parse_cols(M[0])
		if(M.length == 2)
			return sel(tbl, cols)
		else if(M.length == 4) {
			const key = M[2].toLowerCase()
			if(key == 'where')
				return sel(where(M[3], tbl), cols)
			else if(key == 'order')
				return sel(order(M[3], tbl), cols)
		}
		else if(M.length == 6) {
			const key = M[2].toLowerCase()
			if(key == 'where')
				return sel(order(M[5], where(M[3], tbl)), cols)
			else if(key == 'order')
				return sel(order(M[3], where(M[5], tbl)), cols)
		}
		return null
	}
	function insert(M) {
		const tbl = get_table(M[0])
		if(M.length == 2) {
			const cols = extract_cols(tbl)
			const row = parse_row(M[1])
			return ins(tbl, cols, row)
		}
		else if(M.length == 3) {
			const cols = parse_cols(M[1])
			const row = parse_row(M[2])
			return ins(tbl, cols, row)
		}
		return null
	}
	function update(M) {
		const tbl = get_table(M[0])
		if(M.length == 2)
			return upd(M[1], tbl, _ => true)
		else if(M.length == 3)
			return upd(M[1], tbl, evcond(M[2]))
		return null
	}

	/* Parsers */
	function san_str(str) {
		return str.trim()
	}
	function san_ord(ord) {
		return ord.toLowerCase()
	}
	function san_table(tbl) {
		return tbl.trim()
	}
	function parse_cols(cols) {
		cols = cols.trim()
		if(cols == '*')
			return cols
		return cols.split(/\s*,\s*/)
	}
	function parse_row(row) {
		return row.split(/\s*,\s*/).map(t => eval(t.trim()))
	}
	function parse_set(set) {
		return set.trim().split(/\s*,\s*/).map(t => t.split(/\s*=\s*/))
	}
	function statements(str) {
		return remove_empty_members(str.split(/\s*;\s*/))
	}

	/* Mechanisms */
	function sel(tbl, cols) {
		if(cols == '*')
			return tbl
		const acc = []
		for(const row of tbl)
			acc.push(sel_cols(row, cols))
		return acc
	}
	function sel_cols(row, cols) {
		const acc = {}
		for(const col of cols)
			acc[col] = row[col]
		return acc
	}
	function ins(tbl, cols, row) {
		let acc = {}
		for(const i in cols)
			acc[cols[i]] = row[i]
		tbl.push(acc)
		return acc
	}
	function upd(set, tbl, cond) {
		set = parse_set(set)
		const ids = indexes(tbl, cond)
		for(const i of ids)
			for(const o of set)
				tbl[i][o[0]] = eval(o[1])
		return null
	}
	function where(test, tbl) {
		test = evcond(test)
		const acc = []
		for(const row of tbl)
			if(test(row))
				acc.push(row)
		return acc
	}
	function order(orderfn, tbl) {
		orderfn = evord(orderfn)
		return orderfn(tbl)
	}
	function evcond(cond) {
		cond = cond.trim()
		cond = cond.replace(/or/gi, '||')
		cond = cond.replace(/and/gi, '&&')
		cond = cond.replace(/(\w+)\s*!=\s*/gi, 'r["$1"]!==')
		cond = cond.replace(/(\w+)\s*=\s*/gi, 'r["$1"]===')
		return r => eval(cond)
	}
	function evord(ord) {
		ord = ord.split(/\s*,\s*/).map(o => o.split(/\s+/))
		return rows => {
			for(let i = ord.length - 1; i > -1; i--)
				rows = sort(rows, ord[i])
			return rows
		}
	}
	function sort(rows, ord) {
		if(ord.length == 1) /* ASC */
			return _sort(rows, ord[0], (a,b) => a > b)
		else if(ord.length == 2) {
			const order = san_ord(ord[1])
			if(order == 'asc')
				return _sort(rows, ord[0], (a,b) => a > b)
			else if(order == 'desc')
				return _sort(rows, ord[0], (a,b) => a < b)
		}
		return rows
	}

	/* Other Tools */
	function _sort(A, col, compfn) {
		function swap(A, i, j) {
			const t = A[i]
			A[i] = A[j]
			A[j] = t
		}
		for(let i = 0; i < A.length; i++)
			for(let j = i + 1; j < A.length; j++)
				if(compfn(A[i][col], A[j][col]))
					swap(A, i, j)
		return A
	}
	function remove_empty_members(arr) {
		let acc = []
		for(const o of arr)
			if(o) acc.push(o)
		return acc
	}
	function indexes(tbl, cond) {
		let acc = []
		for(const i in tbl)
			if(cond(tbl[i]))
				acc.push(i)
		return acc
	}
	function get_table(tbl) {
		return db[san_table(tbl)]
	}
	function extract_cols(tbl) {
		let cols = []
		for(const k in tbl[0])
			cols.push(k)
		return cols
	}

	/* Main */
	function ev(str) {
		const st = statements(san_str(str)).map(t => pattern_matcher(t))
		return st[st.length - 1]
	}

	/* Run */
	return [ev(str), db]
}

function search(A, x) {
	for(const i in A)
		if(x == A[i])
			return i
}

function random_search(A, x) {
	const S = new Set()
	while(S.size != A.length) {
		const I = Math.floor(Math.random() * A.length)
		if(A[I] == x)
			return I
		S.add(I)
	}
}

function binary_search(A, x, s=0, e=A.length-1) {
	if(s <= e) {
		const m = Math.floor((s + e) / 2)
		if(x < A[m])
			return binary_search(A, x, s, m - 1)
		if(x > A[m])
			return binary_search(A, x, m + 1, e)
		return m
	}
}

function iota(N) {
	const A = []
	for(let i = 0; i < N; i++)
		A.push(i)
	return A
}

function is_sorted(A, f=(a,b)=>a<=b) {
	let start = A[0]
	for(let i = 1; i < A.length; i++) {
		if(!f(start, A[i]))
			return false
		start = A[i]
	}
	return true
}

function random_list(n, f) {
	let A = []
	for(let i = 0; i < n; i++)
		A.push(f())
	return A
}

function random_int(min, max) {
	return Math.round(Math.random() * (max - min)) + min
}

function random_int_list(n, min=0, max=10) {
	return random_list(n, () => random_int(min, max))
}

function random_char(min, max) {
	min = min.charCodeAt(0)
	max = max.charCodeAt(0)
	return String.fromCharCode(random_int(min, max))
}

function random_char_list(n, min='A', max='Z') {
	return random_list(n, () => random_char(min, max))
}

function random_str(len, min, max) {
	let S = ''
	for(let i = 0; i < len; i++)
		S += random_char(min, max)
	return S
}

function random_str_list(n, min=1, max=10, char_min='A', char_max='Z') {
	return random_list(
		n, () => random_str(random_int(min, max), char_min, char_max))
}

function gcd(m, n) {
	const r = m % n
	return r ? gcd(n, r) : n
}

function fib(n, A=[0, 1]) {
	if(A[n] === undefined)
		A[n] = fib(n - 1, A) + fib(n - 2, A)
	return A[n]
}

function remainder(m, n) {
	if(m < n)
		return m
	return remainder(m - n, n)
}

function modulo(m, n) {
	const r = m % n
	return r * n < 0 ? r + n : r
}

function make_rat(n, d) {
	return simplify_rat([n, d])
}

function simplify_rat(r) {
	const g = gcd(rat_num(r), rat_div(r))
	return [rat_num(r) / g,	rat_div(r) / g]
}

function rat_num(r) {
	return r[0]
}

function rat_div(r) {
	return r[1]
}

function inverse_rat(r) {
	return make_rat(rat_div(r), rat_num(r))
}

function neg_rat(r) {
	return product_rats(r, make_rat(-1, 1))
}

function add_rats(r, u) {
	return make_rat(
		rat_num(r) * rat_div(u) + rat_num(u) * rat_div(r),
		rat_div(r) * rat_div(u))
}

function subtract_rats(r, u) {
	return add_rats(r, neg_rat(u))
}

function product_rats(r, u) {
	return make_rat(
		rat_num(r) * rat_num(u),
		rat_div(r) * rat_div(u))
}

function divide_rats(r, u) {
	return product_rats(r, inverse_rat(u))
}

function abs(n) {
	return n < 0 ? -n : n
}

function reach(i, pred, improve) {
	for( ; ; i = improve(i))
		if(pred(i))
			return i
}

function sqrt(n, i=0, e=1e-3) {
	return reach(i,
		     i => abs(n - i * i) < e,
		     i => n > i * i ? i + e * e : i - e * e)
}

function sqrt_2(n, i=1, e=1e-10) {
	return reach(i,
		     i => abs(n - i * i) < e,
		     i => (n / i + i) / 2)
}

function call_with_random_args(f, min=0, max=10) {
	return f(...random_int_list(f.length, min, max))
}

function loop(f, n) {
	const R = []
	while(n--)
		R.push(f())
	return R
}

function stack_machine() {
	const S = []
	const push = x => {S.push(x); return x}
	const pop = () => S.pop()
	const plus = () => push(pop() + pop())
	return {S, push, pop, plus}
}

function make_flower(n=5, back='yellow', petal=_ => 'blue', w=50, h=50, parent='#result p:last-child', ratio=1.5, style='') {
	const el = document.createElement('div')
	const w_m = w / ratio
	const h_m = h / ratio
	const petals = []

	el.style = (`width:${w}px; height:${h}px;` +
		    `border-radius:50%; background:${back};` +
		    `margin:${h_m}px auto;` +
		    style)

	for(let i = 0; i < n; i++) {
		const theta = 2 * Math.PI * i / n
		const x = Math.round(Math.sin(theta) * h_m)
		const y = Math.round(Math.cos(theta) * w_m)
		petals.push(`${x}px ${y}px 0 ${petal(i)}`)
	}

	el.style.boxShadow = petals.join(', ')
	append_to_result('Flower: ')
	document.querySelector(parent).appendChild(el)
}
