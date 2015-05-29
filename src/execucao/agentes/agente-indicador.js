var tiposToken = require("../../modulos/tipo-token");


function AgenteIndicador() {
}

AgenteIndicador.prototype.processar = function(no) {

	return {
		codigo: "programa.vars.obter('" + no.token.value + "')"
	};

}

 
AgenteIndicador.prototype.podeProcessar = function(no) {
	if (no.token == null) return false;
	if (no.token.type != tiposToken.identificador) return false;
	return true;
}

module.exports = AgenteIndicador;