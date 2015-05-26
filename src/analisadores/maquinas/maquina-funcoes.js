var tiposToken = require("../../modulos/tipo-token");
var Token = require("../../modulos/token-collection").Token;
var Expressao = require("../expressao");
var tipos = ["literal", "inteiro", "real", "logico"];

function MaquinaFuncoes(escopo){
 
	this.escopo = escopo;
	this.instrucao = null;
	
	Object.defineProperty(this, "context", {
		get: function(){
			return escopo.context;
		}	
	});
	
}

MaquinaFuncoes.prototype.consumir = function(token){
	
	if(token.type == tiposToken.palavraChave ){
		
		switch (token.value) {
			case 'fim':
				return this.escopo.limpar();
			case 'escrever': 
				return tratarFuncaoEscrever.call(this, token);
			default:
				
		}
	}
	
}

function tratarFuncaoEscrever(token){

	this.escopo.criar("funcoes");
	this.escopo.raiz = new Expressao(token);
	this.escopo.submaquina.consumir(token);
	
}


module.exports = MaquinaFuncoes;