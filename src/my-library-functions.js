const my_library_functions = [
	'add_matrices(A, B)',
	'add_vectors(p, q)',
	'allekok_status()',
	'and_gate(a, b)',
	'apply_predicate_to_matrix_elements(false_p, A)',
	'apply_proc_to_matrix_elements(proc, A)',
	'apply_proc_to_object_elements(proc, obj)',
	'apply_proc_to_same_elements_of_matrices(proc, A, B)',
	'apply_proc_to_same_elements_of_vectors(proc, p, q)',
	'apply_proc_to_vector_elements(proc, p)',
	'apropos(str)',
	'are_vectors_orthogonal(p, q)',
	'array_length(x)',
	'asm(str)',
	'base_n_floating_point_to_decimal(x, n)',
	'base_n_integer_to_decimal(x, n)',
	'base_n_to_decimal(x, n)',
	'binary_search(A, x, s=0, e=A.length-1)',
	'binary_to_decimal(bin)',
	'binary_to_hexadecimal(bin)',
	'binary_to_octal(bin)',
	'character_to_decimal(char)',
	'combinations(A, N=A.length, R=\'\', join=(A,a)=>A+a)',
	'continuous_data_class_length(data)',
	'continuous_data_domain(data)',
	'continuous_data_number_of_classes(data)',
	'count_elements(data)',
	'count_lines(str)',
	'count_sort(A)',
	'data_classes(data)',
	'data_cumulative_frequency(data)',
	'data_frequency(data)',
	'data_frequency_table_object(data)',
	'data_relative_frequency(data)',
	'decimal_floating_point_to_base_n(num, n, precision=101)',
	'decimal_integer_to_base_n(num, n)',
	'decimal_to_base_n(num, n, precision=101)',
	'decimal_to_bcd(num, num_of_bits=8)',
	'decimal_to_binary(num)',
	'decimal_to_character(num)',
	'decimal_to_hexadecimal(num)',
	'decimal_to_octal(num)',
	'decimal_to_packed_bcd(num)',
	'draw(bits, on_char=\'\u{25A0}\', off_char=\'\u{25A1}\')',
	'draw_vertically(char, n, indent=0)',
	'equal(x, y)',
	'extend_left_by_character_n_times(str, char, n)',
	'extract_sorted_object_keys(obj, sortFn=(x,y)=>x-y)',
	'factorial(n, acc=1)',
	'factors(n, proc=n=>true, limit=null)',
	'false_gate(a, b)',
	'false_true_gate(a, b)',
	'fib(n, A=[0, 1])',
	'func_range(proc, domain)',
	'gcd(m, n)',
	'hackernews()',
	'hexadecimal_to_binary(hex)',
	'hexadecimal_to_decimal(hex)',
	'hexadecimal_to_octal(hex)',
	'identity_matrix(rows, columns)',
	'iota(N)',
	'is_array(x)',
	'is_data_concrete(data)',
	'is_data_continuous(data)',
	'is_float(x)',
	'is_int(x)',
	'is_matrix(A)',
	'is_matrix_bottom_triangular(A)',
	'is_matrix_diagonal(A)',
	'is_matrix_identity(A)',
	'is_matrix_skew_symmetric(A)',
	'is_matrix_square(A)',
	'is_matrix_symmetric(A)',
	'is_matrix_top_triangular(A)',
	'is_matrix_zero(A)',
	'is_nonprime(n)',
	'is_object(x)',
	'is_prime(n)',
	'is_sorted(A, f=(a,b)=>a<=b)',
	'is_vector(x)',
	'join(init, op)',
	'lisp(str)',
	'logic_lang(str)',
	'longest_array(arr)',
	'make_matrix(rows, columns, proc)',
	'make_stream(init, proc)',
	'make_vector(Xs)',
	'matrices_to_string(As)',
	'matrix_anti_diagonal(A)',
	'matrix_as_sum_of_symmetric_and_skew_symmetric_matrices(A)',
	'matrix_columns(A, i=0)',
	'matrix_determinant(A)',
	'matrix_dimentions(A)',
	'matrix_inverse(A)',
	'matrix_main_diagonal(A)',
	'matrix_remove_row_column(A, r, c)',
	'matrix_rows(A)',
	'matrix_to_string(A)',
	'matrix_trace(A)',
	'matrix_transposition(A)',
	'max(arr, f=x=>x)',
	'modulo(m, n)',
	'multiply_matrices(A, B)',
	'multiply_matrix(A, x)',
	'multiply_matrix_by_scalar(A, n)',
	'multiply_vector_by_scalar(p, n)',
	'my_server(func, arg, callback)',
	'nand_gate(a, b)',
	'newtonian_gravity(m, M, R)',
	'nonprime_factors(n)',
	'nor_gate(a, b)',
	'not_gate(a)',
	'noxor_gate(a, b)',
	'object_properties(obj)',
	'octal_to_binary(octal)',
	'octal_to_decimal(octal)',
	'octal_to_hexadecimal(octal)',
	'or_gate(a, b)',
	'parallel_resistors_equivalent(resistors)',
	'permutations(A, N=A.length, R=\'\', join=(A,a)=>A+a)',
	'prime_factors(n)',
	'product(arr, f=n=>n)',
	'quick_sort(A, s=0, e=A.length-1)',
	'random_char(min, max)',
	'random_char_list(n, min=\'A\', max=\'Z\')',
	'random_int(min, max)',
	'random_int_list(n, min=0, max=10)',
	'random_list(n, f)',
	'random_search(A, x)',
	'random_str(len, min, max)',
	'random_str_list(n, min=1, max=10, char_min=\'A\', char_max=\'Z\')',
	'remainder(m, n)',
	'remove_similar_elements(arr)',
	'reverse_string(str)',
	'rtl(str)',
	'scar(stream)',
	'scdr(stream)',
	'search(A, x)',
	'series_resistors_equivalent(resistors)',
	'server(url, func, arg, callback, keyword=\'request\', method=\'post\')',
	'snth(stream, n)',
	'solve_quadratic_equation(a, b, c)',
	'sort(A)',
	'sql(str)',
	'string_to_matrix(str)',
	'subtract_matrices(A, B)',
	'subtract_vectors(p, q)',
	'sum(arr, f=n=>n)',
	'test_function(proc, inputs)',
	'tewar(w, n=25, dicts=\'all\', out=\'text\')',
	'time(proc)',
	'translate_numbers(S)',
	'true_false_gate(a, b)',
	'truth_table(proc)',
	'unit_vector(p)',
	'vector_length(p)',
	'vector_projection(p, q)',
	'vector_x(p)',
	'vector_y(p)',
	'vector_z(p)',
	'vectors_angle(p, q)',
	'vectors_angle_cos(p, q)',
	'vectors_dot_product(p, q)',
	'xor_gate(a, b)',
	'zero_matrix(rows, columns)',
]
