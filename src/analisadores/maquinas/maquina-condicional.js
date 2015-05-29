var tiposToken = require("../../modulos/tipo-token");
var estados = require("../../recursos/estados.json");
var Token = require("../../modulos/token-collection").Token;
var Expressao = require("../expressao");  

function MaquinaCondicional(escopo){
 
	this.escopo = escopo;
	this.instrucao = null;
	
	Object.defineProperty(this, "context", {
		get: function(){
			return escopo.context;
		}	
	});
	
}

MaquinaCondicional.prototype.consumir = function(token){
	
	
	
	switch(this.context.obterEstado()){
		case estados.aguardandoCondicao: 
			tratarAguardandoCondicao.call(this, token);
			break;
		case estados.finalizadaCondicao:
			tratarInicioCondicao.call(this, token);
			break;
		case estados.emCondicao:
			tratarEmCondicao.call(this, token);
	
	}
	
	
}



function tratarAguardandoCondicao(token){
	if(token.type != tiposToken.operador.invocacao.abertura){
		this.context.registrarErro("Era esperado abertura de condicional, encontrado " + token.type, token.line);
		return;
	}
	
	var raiz = this.escopo.raiz;
	this.context.mudarEstado(estados.finalizadaCondicao);
	this.escopo.criar("expressao");
	this.context.tipoArvore = "logico";
	this.escopo.raiz = raiz;
}

function tratarInicioCondicao(token){

	if(token.type != tiposToken.palavraChave){
		this.context.registrarErro("Era esperado uma palavra chave, encontrado " + token.type, token.line);
		return;
	}
	
	if(token.value != "entao"){
		this.context.registrarErro("Era esperado uma palavra chave 'entao', encontrado " + token.value, token.line);
		return;
	}
	
	this.context.mudarEstado(estados.emCondicao);
	var instrucoes = new Expressao(token); 
	this.escopo.raiz.addChild(instrucoes);
	this.escopo.criar("instrucoes");
	this.context.emSe = true;
	this.escopo.raiz = instrucoes;
	
}


function tratarEmCondicao(token){

	if(token.type == tiposToken.palavraChave && token.value == "senao"){
		
		if(this.context.jaExisteSenao){
			this.registrarErro("Já foi definido um SENAO para esta condição", token.line);
			return;
		}
		
		var instrucoes = new Expressao(token); 
		this.context.jaExisteSenao = true;
		this.escopo.raiz.addChild(instrucoes);
		this.escopo.criar("instrucoes");
		this.context.emSe = true;
		this.escopo.raiz = instrucoes;
		return;
	}
	
	this.escopo.limpar();

}

module.exports = MaquinaCondicional;