var tiposToken = require("../../modulos/tipo-token");
var estados = require("../../recursos/estados.json");

function MaquinaPrograma(estadoHandler){

	this.token = null;
	this.estado = estadoHandler;
}

MaquinaPrograma.prototype.consumir = function(token){

	var acao = "acao";

	switch (this.estado.obter()) {
		case estados.vazio:
			acao = "acaoVazio";
			break;
		case estados.definicaoPrograma:
			acao = "acaoDefinicaoPrograma";
			break;
		case estados.definicaoNomePrograma:
			acao = "programaDefinido";
		
		
			
	}


	if(this.estado.obter() == estados.vazio){
		this.acoesParaVazio(token);
	}

	if(this.estado.obter() == )



	if(token.type == tiposToken.palavraChave){
		if(token.value == "programa"){
			this.token = token;
			this.estado.mudar(estados.definicaoPrograma);
			return;
		}
	}
	
	if(token.type == tiposToken.literal){
		
	}

}


module.exports = MaquinaIdenfiticadores;