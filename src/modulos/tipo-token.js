var stringHelper = require("../helpers/string-helper");
var especiais = require("../recursos/caracteres-especiais.json");

function adicionar(nome, tipos){
	
	var possivelGrupo = nome.split("_")[0];
	if(grupos[possivelGrupo]){
		if(grupos[possivelGrupo] in tipos == false){
			tipos[grupos[possivelGrupo]] = {};	
		}
		adicionar(nome.split("_").slice(1).join("_"), tipos[grupos[possivelGrupo]]);
	}else{
		tipos[stringHelper.toCamelCase(nome)] = nome;	
	}
}

var tipos = {

	word: "WORD",
	palavraChave: "PALAVRA_CHAVE",
	literal: "LITERAL",
	numeral: "NUMERAL",
	logico: "LOGICO",
	identificador: "INDENTIFICADOR"
};

var grupos = {
	"OP": "operador",
	"MAT": "matematico",
	"COMP": "comparacao",
	"INV": "invocacao",
	"IND": "indexacao",
	"LOG": "logico"
};



for(var i = 0; i < especiais.length; i++){
	var especial = especiais[i];
	adicionar(especial.id, tipos);
}


module.exports = tipos;