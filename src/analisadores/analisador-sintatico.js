var analisadorLexico = require("./analisador-lexico");
var AnalisadorSemantico = require("./analisador-semantico");


function AnalisadorSintatico(){
	this.lexer = analisadorLexico;
	this.semantico = new AnalisadorSemantico();
	
	
	
	
}

AnalisadorSintatico.prototype.analisar = function(codigo){

	var tokens = this.lexer.analisar(codigo);
	var token = null;

	var instrucao = {};

	while((token = tokens.next()) != null){
		debugger;
		this.semantico.consumir(token);
		
		if(this.semantico.temErros){
			//tratar erros
		}

		

	}


};

module.exports = new AnalisadorSintatico;