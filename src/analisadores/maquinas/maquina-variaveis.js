var tiposToken = require("../../modulos/tipo-token");
var Token = require("../../modules/token-collection").Token;

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
		
		new Token()
	}
	
	if(acao){
		this[acao](token);
	}
	
}


module.exports = MaquinaVariaveis;