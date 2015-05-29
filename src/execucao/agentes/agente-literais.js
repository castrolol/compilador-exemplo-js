var tiposToken = require("../../modulos/tipo-token");

function extrairTipos(obj) {
	return Object
		.keys(obj)
		.map(function(key) {
			return obj[key];
		});
}
var tipos = extrairTipos(tiposToken.operador.matematico).concat(tiposToken.inteiro, tiposToken.real);

function AgenteMatematica() {
	this.ignoreChildren = true;
}

AgenteMatematica.prototype.processar = function(no) {

	var resposta = {
		codigo: no.value
	};

	return resposta;

}

AgenteMatematica.prototype.podeProcessar = function(no) {
	if (no.token == null) return false;

	if (no.token.type == tiposToken.literal){
		return true;
	}
	
	return false;
}

module.exports = AgenteMatematica;