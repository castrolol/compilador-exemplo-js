var tiposToken = require("../../modulos/tipo-token");
var Token = require("../../modulos/token-collection").Token;
var Expressao = require("../expressao");
var tipos = ["literal", "inteiro", "real", "logico"];

function MaquinaVariaveis(escopo){

	this.ultimoToken = null;
	this.escopo = escopo;
	Object.defineProperty(this, "context", {
		get: function(){
			return escopo.context;
		}	
	});
	
}

MaquinaVariaveis.prototype.consumir = function(token){
	
	var acao = null;

	if(token.type == tiposToken.fimInstrucao){
		this.ultimoToken = null;
		return;
	}
	
	if(token.type == tiposToken.identificador){
	
		if(this.ultimoToken != null){
			this.context.registrarErro("Era esperado um tipo, identificador " + this.ultimoToken.value + " não esperado", token.line);
			return;
		}
		
		this.ultimoToken = token;
		
	}else if(token.type == tiposToken.palavraChave && token.valueIn(tipos)){
		
		var declaracao = new Expressao(token);
		var identificador = new Expressao(this.ultimoToken);
		declaracao.addChild(identificador);
		this.escopo.raiz.addChild(declaracao);
		this.ultimoToken = null;
	}else if(token.type == tiposToken.palavraChave && token.value == "inicio"){
		this.escopo.limpar();
		this.escopo.submaquina.consumir(token);
	}
	
}


module.exports = MaquinaVariaveis;