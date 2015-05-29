var tiposToken = require("../../modulos/tipo-token");

function AgenteAtribuica() {
	this.ignoreChildren = true;
}

AgenteAtribuica.prototype.processar = function(no) {

	var resposta = {
		codigo: "",
		separador: ",",
		sufixo: ")"
	};

	resposta.codigo = "vars.atribuir('" + no.token.value + "', ";
	
	return resposta;

}



AgenteAtribuica.prototype.podeProcessar = function(no) {
	if (no.token == null) return false;

	if (no.token.type == tiposToken.operador.atribuicao){
		return true;
	}
	
	return false;
}

module.exports = AgenteAtribuica;