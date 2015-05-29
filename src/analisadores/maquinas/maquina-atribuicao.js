var tiposToken = require("../../modulos/tipo-token");
var estados = require("../../recursos/estados.json");
var Token = require("../../modulos/token-collection").Token;
var Expressao = require("../expressao");  

function MaquinaAtribuicao(escopo){
 
	this.escopo = escopo;
	this.instrucao = null;
	
	Object.defineProperty(this, "context", {
		get: function(){
			return escopo.context;
		}	
	});
	
}

MaquinaAtribuicao.prototype.consumir = function(token){
	
	switch(this.context.obterEstado()){
		case estados.aguardandoAtribuicao:
			tratarAtribuicao.call(this, token);
			break;
		case estados.iniciadaAtribuicao:
			tratarValorAtribuicao.call(this, token);
			break;
		case estados.finalizadaAtribuicao:
			this.escopo.limpar();
			break;
	}
	
	
}



function tratarAtribuicao(token){
	if(token.type != tiposToken.operador.atribuicao){
		this.context.registrarErro("ILLEGAL token", token.line);
		return;
	}
	
	this.context.mudarEstado(estados.iniciadaAtribuicao);
	var nome = this.escopo.raiz.token.value;
	this.escopo.raiz.token = token;
	token.value = nome;
	
}

function tratarValorAtribuicao(token){
 	var raiz = this.escopo.raiz;
	this.context.mudarEstado(estados.finalizadaAtribuicao);
	
	this.escopo.criar("expressao");
	this.escopo.raiz = raiz;
	this.escopo.submaquina.consumir(token);
}

module.exports = MaquinaAtribuicao;