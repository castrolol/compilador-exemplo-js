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
			case 'se':
				return tratarCondicao.call(this, token);
			case 'senao':
				if(this.context.emSe){
					this.escopo.limpar();
					this.escopo.submaquina.consumir(token);
					return;
				}

			default:
				var erro = "Palavra chave " + token.value + " não esperada.";
				this.context.registrarErro(erro, token.line);
				return 
		}
	}else if(token.type == tiposToken.identificador){
		tratarAtribuicao.call(this, token);
	}
	
}

function tratarCondicao(token){
	
	var raiz = this.escopo.raiz;
	var se = new Expressao(token);
	raiz.addChild(se);
	this.escopo.criar("condicional");
	this.escopo.raiz = se;
	this.context.mudarEstado(estados.aguardandoCondicao);

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