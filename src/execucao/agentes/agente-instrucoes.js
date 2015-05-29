var tiposToken = require("../../modulos/tipo-token");
function AgenteInstrucoes(){ 
}

AgenteInstrucoes.prototype.processar = function(no){

	var nomeNo = no.children[0];
	var nome = "";
	if(nomeNo != null){
		nome = nomeNo.token.value
	}

	var codigo = "programa.iniciar();\n\n";
	codigo += "(function(vars, condicao, logica, matematica, executar){";
	
	var params = [
		"vars",
		"condicao",
		"logica",
		"matematica",
		"executar.bind(programa)"
	];



	var fimCodigo = "}(\n" + params.map(function(item){
		return "programa." + item;
	}).join(",\n") + "\n));";

	return {
		
		codigo: codigo,
		sufixo: fimCodigo
	};

}

AgenteInstrucoes.prototype.podeProcessar = function(no){
	if(no.token == null) return false;
	if(no.token.type != tiposToken.palavraChave) return false;
	return no.token.value == "inicio";
}

module.exports = AgenteInstrucoes;