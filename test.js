var programa = new Programa("Olá mundo!");




programa.vars.criar('nome', 'literal');
programa.vars.criar('idade', 'real');



programa.executar('escrever',
	programa.matematica.multiplicacao(
		programa.matematica.adicao(
			programa.matematica.int(5),

			programa.matematica.real(2)

		),

		programa.matematica.real(3)

	)
)