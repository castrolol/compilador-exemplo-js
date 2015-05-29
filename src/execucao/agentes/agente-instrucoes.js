var tiposToken = require("../../modulos/tipo-token");
function AgentePrograma(){ 
}

AgentePrograma.prototype.processar = function(no){

	var nomeNo = no.children[0];
	var nome = "";
	if(nomeNo != null){
		nome = nomeNo.token.value
	}

	var codigo = "(function(vars, logica, matematica, executar){";

	var fimCodigo = "}(programa.vars, programa.logica, programa.matematica, programa.logica));";

	return {
		
		codigo: codigo,
		sufixo: fimCodigo
	};

}

AgentePrograma.prototype.podeProcessar = function(no){
	if(no.token == null) return false;
	if(no.token.type != tiposToken.palavraChave) return false;
	return no.token.value == "inicio";
}

module.exports = AgentePrograma;