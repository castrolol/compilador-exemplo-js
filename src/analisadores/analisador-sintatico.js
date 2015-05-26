var analisadorLexico = require("./analisador-lexico");
var AnalisadorSemantico = require("./analisador-semantico");
var estados = require("../recursos/estados");


function AnalisadorSintatico(){
	this.lexer = analisadorLexico;
	this.semantico = new AnalisadorSemantico();
}

AnalisadorSintatico.prototype.analisar = function(codigo){

	var tokens = this.lexer.analisar(codigo);
	

};

module.exports = new AnalisadorSintatico;