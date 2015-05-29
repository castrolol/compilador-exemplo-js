var AnalisadorLexico = require("./analisador-lexico");
var AnalisadorSemantico = require("./analisador-semantico");


function AnalisadorSintatico(){
	this.lexer = new AnalisadorLexico();
	this.semantico = new AnalisadorSemantico();
}

AnalisadorSintatico.prototype.analisar = function(codigo){

	var tokens = this.lexer.analisar(codigo);
	var token = null;
	var erros = null;
	var instrucao = {};

	if(this.lexer.erros.length){
		console.log(this.lexer.erros);
		return;
	}

	while((token = tokens.next()) != null){

		this.semantico.consumir(token);
		
		if(erros = this.semantico.obterErros()){
			console.log(erros);
			break;
		}

	}

	return this.semantico.obterArvoreExpressoes();

};

module.exports = AnalisadorSintatico;