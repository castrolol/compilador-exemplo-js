var programa = new Programa("Olá mundo!");




programa.vars.criar('nome', 'literal');
programa.vars.criar('idade', 'real');



programa.executar('escrever',
	programa.matematica.subtracao(
		programa.matematica.adicao(
			programa.matematica.adicao(
				programa.matematica.real(5),

				programa.matematica.multiplicacao(
					programa.matematica.real(2),

					programa.matematica.int(3)

				)
			),

			programa.matematica.real(8)

		),

		programa.matematica.real(3)

	)
)