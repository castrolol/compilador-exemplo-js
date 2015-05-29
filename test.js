var programa = new Programa("Olá mundo!");


programa.vars.criar('nome', 'literal');
programa.vars.criar('idade', 'inteiro');
programa.vars.criar('media', 'real');


programa.iniciar();

(function(vars, condicao, logica, matematica, executar) {
	condicao.se(
		logica.maior(
			matematica.int(5),

			matematica.real(2)

		),

		//entao
		function() {

			executar('escrever',
				matematica.int(5)

			)

		},

		//senao
		function() {

			executar('escrever',
				matematica.real(2)

			)

		}
	);
}(
	programa.vars,
	programa.condicao,
	programa.logica,
	programa.matematica,
	programa.executar.bind(programa)
));