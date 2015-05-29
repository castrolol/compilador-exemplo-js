var tiposToken = require("../../modulos/tipo-token");


function AgenteFuncao() {
}

AgenteFuncao.prototype.processar = function(no) {

	return {
		codigo: "programa.executar('" + no.token.value + "'",
		prefixoItem: ",",
		sufixo: ")"
	};

}

 
AgenteFuncao.prototype.podeProcessar = function(no) {
	if (no.token == null) return false;
	if (no.token.type != tiposToken.funcao) return false;
	return true;
}

module.exports = AgenteFuncao;