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
		codigo: "",
		separador: ",",
		sufixo: ")"
	};

	var metodo = null;
	var matTipos = tiposToken.operador.matematico
	
	for(var prop in matTipos){
		if(no.token.type == matTipos[prop]){
			metodo = prop;
			break;
		}
	}

	if(metodo){
		
		resposta.codigo = "matematica." + metodo + "( " ;
		return resposta;
		
	}

	if(no.token.type == tiposToken.inteiro){
		return {
			codigo: "matematica.int(" + no.token.value + ")"
		};
	}
	
	if(no.token.type == tiposToken.real){
		return {
			codigo: "matematica.real(" + no.token.value + ")"
		};
	}
	
	throw "Operação " + no.token.value + " não reconhecida!";

}

AgenteMatematica.prototype.podeProcessar = function(no) {
	if (no.token == null) return false;

	if (no.token.typeIn(tipos)){
		return true;
	}
	
	return false;
}

module.exports = AgenteMatematica;