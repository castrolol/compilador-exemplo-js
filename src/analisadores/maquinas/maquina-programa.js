var tiposToken = require("../../modulos/tipo-token");
var estados = require("../../recursos/estados.json");
var Expressao = require("../expressao");

function MaquinaPrograma(escopo){

	this.token = null;
	this.escopo = escopo;
	Object.defineProperty(this, "context", {
		get: function(){
			return escopo.context
		}	
	});
	
}

MaquinaPrograma.prototype.consumir = function(token){
	
	var acao = null;

	switch (this.context.obterEstado()) {
		case estados.vazio:
			acao = definirPrograma;
			break;
		case estados.definicaoPrograma:
			acao = nomearPrograma;
			break;
		case estados.definicaoNomePrograma:
			acao = encerrarNomeacaoPrograma
			break;
		case estados.programaDefinido:
			acao = iniciarVariaveis;
		break;
		case estados.definicaoVariaveis:
			acao = iniciarInstrucoes;
			break;
	}
	
	if(acao){
		acao.call(this, token);
	}
	
}

function definirPrograma(token){
	
	if(token.type != tiposToken.palavraChave){
		this.context.registrarErro("Era esperado a palavra chave programa", token.line);
		return;
	}
	
	if(token.value != "programa"){
		this.context.registrarErro("Era esperado a palavra chave programa, econtrado " + token.value, token.line);
		return;
	}
	
	
	this.context.mudarEstado(estados.definicaoPrograma);
	this.raiz = new Expressao(token);
	this.escopo.raiz.addChild(this.raiz);
	
};

function nomearPrograma(token) {
	
	if(token.type != tiposToken.literal){
		this.context.registrarErro("Era esperado um literal para nomear o 'programa'", token.line);
	}
	
	
	this.context.mudarEstado(estados.definicaoNomePrograma);
	this.raiz.addChild(new Expressao(token));
};

function encerrarNomeacaoPrograma(token){
	if(token.type != tiposToken.fimInstrucao){
		this.context.registrarErro("Era esperado uma quebra de linha, encontrado  " + token.value, token.line);
		return;
	}
	
	this.context.mudarEstado(estados.programaDefinido);
}

function iniciarVariaveis(token) {
	if(token.type != tiposToken.palavraChave){
		this.context.registrarErro("Era esperado uma palavra chave", token.line);
		return;
	}
	
	if( !token.valueIn("inicio", "variaveis") ){
		this.context.registrarErro("Era esperado a palavra chave 'inicio' ou 'variaveis' , econtrado " + token.value, token.line);
		return;
	}
	
	this.context.mudarEstado(estados.definicaoVariaveis);
	
	if(token.value == "inicio"){
		return this.iniciarInstrucoes(token);
	}
	
	this.raizVariaveis = new Expressao(token);
	this.escopo.raiz.addChild(this.raizVariaveis);
	this.escopo.criar("variaveis");
	this.escopo.raiz = this.raizVariaveis;
}

function iniciarInstrucoes(token){
	if(token.type != tiposToken.palavraChave){
		this.context.registrarErro("Era esperado uma palavra chave", token.line);
		return;
	}
	
	if( token.value != "inicio" ){
		this.context.registrarErro("Era esperado a palavra chave 'inicio' , econtrado " + token.value, token.line);
		return;
	}
	
	this.context.mudarEstado(estados.inicioInstrucao);
	

	
	this.raizInstrucoes = new Expressao(token); 
	this.escopo.raiz.addChild(this.raizInstrucoes);
	this.escopo.criar("instrucoes");
	this.escopo.raiz = this.raizInstrucoes;
};

module.exports = MaquinaPrograma;