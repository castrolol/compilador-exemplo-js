var tiposToken = require("../../modulos/tipo-token");
var Token = require("../../modulos/token-collection").Token;
var Expressao = require("../expressao");
var tipos = ["literal", "inteiro", "real", "logico"];
var estados = require("../../recursos/estados.json");

function MaquinaInstrucoes(escopo){
 
	this.escopo = escopo;
	this.instrucao = null;
	
	Object.defineProperty(this, "context", {
		get: function(){
			return escopo.context;
		}	
	});
	
}

MaquinaInstrucoes.prototype.consumir = function(token){
	
	if(token.type == tiposToken.palavraChave ){
		
		switch (token.value) {
			case 'fim':
				return this.escopo.limpar();
			case 'ler':
				return tratarFuncaoEscrever.call(this, token);
			case 'escrever': 
				return tratarFuncaoEscrever.call(this, token);
			default:
				
		}
	}else if(token.type == tiposToken.identificador){
		tratarAtribuicao.call(this, token);
	}
	
}

function tratarFuncaoEscrever(token){
	var raiz = this.escopo.raiz;
	this.escopo.criar("funcoes");
	this.escopo.raiz = raiz;
	this.escopo.submaquina.consumir(token);
}

function tratarAtribuicao(token){
	var raiz = this.escopo.raiz;
	var attr = new Expressao(token);
	raiz.addChild(attr);
	this.escopo.criar("atribuicao");
	this.escopo.raiz = raiz;
	this.context.mudarEstado(estados.aguardandoAtribuicao);
	this.escopo.raiz = attr;
}


module.exports = MaquinaInstrucoes;