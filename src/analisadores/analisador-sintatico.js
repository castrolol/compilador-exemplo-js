var analisadorLexico = require("./analisador-lexico");
var AnalisadorSemantico = require("./analisador-semantico");
var estados = require("../recursos/estados");


function AnalisadorSintatico(){
	this.lexer = analisadorLexico;
	this.semantico = new AnalisadorSemantico();
}

AnalisadorSintatico.prototype.analisar = function(codigo){

	var tokens = this.lexer.analisar(codigo);
	var instrucoes = tokens.getInstrucoes();	

	

};

module.exports = new AnalisadorSintatico;