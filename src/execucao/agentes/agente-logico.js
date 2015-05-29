var tiposToken = require("../../modulos/tipo-token");

function extrairTipos(obj) {
	return Object
		.keys(obj)
		.map(function(key) {
			return obj[key];
		});
}
function concatTypes(){
	
	return [].reduce.call(arguments, function(total, tipos){
		for(var prop in tipos){
			total[prop] = tipos[prop]
		}
		return total;
	}, {});
}

var tipos = extrairTipos(tiposToken.operador.comparacao).concat(extrairTipos(tiposToken.operador.logico));

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
	var logTipos = concatTypes(tiposToken.operador.comparacao, tiposToken.operador.logico);
 

	for (var prop in logTipos) {
		if (no.token.type == logTipos[prop]) {
			metodo = prop;
			break;
		}
	}
	
 
	if (metodo) {

		

		resposta.codigo = "programa.logica." + metodo + "( ";
		
		
		if(metodo == "nao"){
			no.children = [no.children[1]];
		}
		
		return resposta;

	}

	if (no.token.value == "verdadeiro") {
		return {
			codigo: "true"
		};
	}

	if (no.token.value == "falso") {
		return {
			codigo: "false"
		};
	}


	throw "Operação " + no.token.value + " não reconhecida!";

}

AgenteMatematica.prototype.podeProcessar = function(no) {
	if (no.token == null) return false;

	if (no.token.typeIn(tipos)) {
		return true;
	}

	return false;
}

module.exports = AgenteMatematica;