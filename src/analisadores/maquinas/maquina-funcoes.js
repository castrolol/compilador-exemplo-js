var tiposToken = require("../../modulos/tipo-token");
var estados = require("../../recursos/estados.json");
var Token = require("../../modulos/token-collection").Token;
var Expressao = require("../expressao");  

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
	
	switch(this.context.obterEstado()){
		case estados.iniciadoFuncao: 
			tratarParenteses.call(this, token);
			break;
		case estados.iniciadaInvocacao:
			break;
		case estados.finalizadaInvocacao:
			this.escopo.limpar();
			break;
		default:
			if(token.type == tiposToken.palavraChave ){
				tratarFuncoes.call(this, token);
			}else{
				this.context.registrarErro("Não era esperado o " + token.type + ": " + token.value, token.line);
			}
	}
	
	
}



function tratarFuncoes(token){
	this.context.mudarEstado(estados.iniciadaInvocacao);
	var fToken = new Token(token.value, token.line);
	fToken.type = tiposToken.funcao;
	this.context.funcao = new Expressao(fToken);
	this.escopo.raiz.addChild(	this.context.funcao);
}

function tratarParenteses(){
	var raiz = this.context.funcao;
	this.context.mudarEstado(estados.finalizadaInvocacao);
	this.escopo.criar("expressao");
	this.escopo.raiz = raiz;
}

module.exports = MaquinaFuncoes;