var readline = require("readline-sync");
var Variaveis = require("../modulos/variaveis");




function Programa(nome){

	console.log("Programa: " + nome);
	this.vars = new Variaveis();

	this.matematica = require("./matematica");
	
}

Programa.prototype.escrever = function(texto){
	console.log(texto);
};

Programa.prototype.ler = function(){
	return readline.prompt();
};

Programa.prototype.executar = function(funcao, parametros){
	if( funcao in this ){
		return this[funcao](parametros);
	} 
	throw "Função " + funcao + " inexistente";
};

Programa.prototype.resolve = function(expressao){
	return expressao;
}



module.exports = Programa;