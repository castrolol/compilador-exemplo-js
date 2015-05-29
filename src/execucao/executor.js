var fs = require("fs");
var AnalisadorSintatico = require("../analisadores/analisador-sintatico");



var agentes = [
	"programa",
	"variaveis",
	"instrucoes",
	"condicional",
	"funcao",
	"literal",
	"atribuicao",
	"indicador",
	"matematica",
	"logico"
].map(function(path) {
	return new(require("./agentes/agente-" + path))();
});



function Executor(codigo) {

	this.codigo = codigo;
	this.sintatico = new AnalisadorSintatico();
}

function analisar() {
	this.arvoreExpressoes = this.sintatico.analisar(this.codigo);
}

function executarInterno(no) {

	var codigo = "\n ";
	var agente = obterAgente(no); 
	var precodigo = {};


	if (agente != null) {
		precodigo = agente.processar(no);
	}

	if (precodigo.codigo) {
		codigo += precodigo.codigo;
	}

	if ("ignorarFilhos" in precodigo == false || !precodigo.ignorarFilhos) {
		var filhos = no.children.map(function(child) {
			var codigoInterno = "";
			if(precodigo.prefixoItem) codigoInterno += precodigo.prefixoItem;
			codigoInterno += executarInterno(child);
			if (precodigo.sufixoItem) codigoInterno += precodigo.sufixoItem;
			return codigoInterno;
		});
		codigo += filhos.join((precodigo.separador || "") + "\n");
		
	}


	codigo += "\n "
	
	if(precodigo.sufixo){
		codigo += precodigo.sufixo;
	}

	return codigo;
}

function obterAgente(no) {

	if (no.token == null) {

		return null;

	}

	return agentes.filter(function(agente) {
		return agente.podeProcessar(no);
	})[0];
}


Executor.prototype.executar = function() {
	analisar.call(this);



	var codigo = executarInterno(this.arvoreExpressoes);
	try {
		var execucaoFinal = new Function("Programa", codigo);

		execucaoFinal(require("./programa"));
	}
	catch (e) {
		console.log(e);
	}

	return codigo;

};



module.exports = Executor;