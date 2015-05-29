var tiposToken = require("../../modulos/tipo-token");
function AgenteCondicao(){ 
}

AgenteCondicao.prototype.processar = function(no){


	if(no.token.value == "se"){
		return escreverSe.call(this, no);
	}else{
		return escreverEntaoESenao.call(this, no);
	}

}

function escreverSe(){
	
	var codigo = "condicao.se(";
	
	var sufixo = ");";
	
	return {
		codigo: codigo,
		sufixo: sufixo,
		separador: ","
	};
	
}

function escreverEntaoESenao(no){
	
	var codigo = "//" + no.token.value;
	codigo += "\nfunction(){\n";
	
	var sufixo = "\n}";
	
	return {
		codigo: codigo,
		sufixo: sufixo
	};
	
}

AgenteCondicao.prototype.podeProcessar = function(no){
	if(no.token == null) return false;
	if(no.token.type != tiposToken.palavraChave) return false;
	return no.token.valueIn(["se", "entao", "senao"]);
}

module.exports = AgenteCondicao;