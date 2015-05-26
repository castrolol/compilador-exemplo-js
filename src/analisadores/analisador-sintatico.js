var AnalisadorLexico = require("./analisador-lexico");
var AnalisadorSemantico = require("./analisador-semantico");


function AnalisadorSintatico(){
	this.lexer = new AnalisadorLexico();
	this.semantico = new AnalisadorSemantico();
}

AnalisadorSintatico.prototype.analisar = function(codigo){

	var tokens = this.lexer.analisar(codigo);
	var token = null;

	var instrucao = {};

	while((token = tokens.next()) != null){

		this.semantico.consumir(token);
		
		if(this.semantico.temErros){
			//tratar erros
		}

	}

	return this.semantico.obterArvoreExpressoes();

};

module.exports = AnalisadorSintatico;