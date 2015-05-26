var tiposToken = require("../../modulos/tipo-token");
function AgentePrograma(){
	this.ignoreChildren = true;
}

AgentePrograma.prototype.processar = function(no){

	var nomeNo = no.children[0];
	var nome = "";
	if(nomeNo != null){
		nome = nomeNo.token.value
	}

	return "var programa = new Programa(" + nome + "); ";

}

AgentePrograma.prototype.podeProcessar = function(no){
	if(no.token == null) return false;
	if(no.token.type != tiposToken.palavraChave) return false;
	return no.token.value == "programa";
}

module.exports = AgentePrograma;