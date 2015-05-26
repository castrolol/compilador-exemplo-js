var readline = require("readline-sync");
var Variaveis = require("../modulos/variaveis");

function Programa(nome){

	console.log("Criado programa " + nome);
	this.vars = new Variaveis();
	
}

Programa.prototype.escrever = function(texto){
	console.log(texto);
};

Programa.prototype.ler = function(){
	return readline.prompt();
};

module.exports = Programa;