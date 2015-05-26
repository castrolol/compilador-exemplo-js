var fs = require("fs");
var AnalisadorSintatico = require("../analisadores/analisador-sintatico");



var agentes = [
	"programa",
	"variaveis"
].map(function(path){
	return new (require("./agentes/agente-" + path))();
});



function Executor(codigo){
	
	this.codigo = codigo; 
	this.sintatico = new AnalisadorSintatico();
}

function analisar(){
	this.arvoreExpressoes = this.sintatico.analisar(this.codigo);
}

function executarInterno(no){
	
	var codigo = "\n ";
	var agente = obterAgente(no);
	var processChildren = true;
	
	if(agente != null){
	
		codigo += agente.processar(no);
		processChildren = !agente.ignoreChildren;
	
	}
	codigo += "\n "
	codigo += no.children.map(executarInterno.bind(this)).join("\n");
	
	return codigo;
}

function obterAgente(no){
	
	if(no.token == null){
		
		return null;
		
	}
	
	return agentes.filter(function(agente){
		return agente.podeProcessar(no);
	})[0];
}


Executor.prototype.executar = function(){
	analisar.call(this);
	
	
	
	var codigo = executarInterno(this.arvoreExpressoes);
	
	var execucaoFinal = new Function("Programa", codigo);
	
	execucaoFinal(require("./programa"));
	
	return codigo;

};



module.exports = Executor;