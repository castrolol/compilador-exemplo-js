var tiposToken = require("../../modulos/tipo-token");


function AgenteVariaveis(){ 
}

AgenteVariaveis.prototype.processar = function(no){
	
	
	var codigo = no.children.map(function(child){
		
		var nome  = child.children[0].token.value;
		
		return "programa.vars.criar('" + nome + "', '" + child.token.value + "');";
		
	}).join(" \n ");


	return {
		codigo: codigo,
		ignorarFilhos: true
	};

}

AgenteVariaveis.prototype.podeProcessar = function(no){
	if(no.token == null) return false;
	if(no.token.type != tiposToken.palavraChave) return false;
	return no.token.value == "variaveis";
}




module.exports = AgenteVariaveis;