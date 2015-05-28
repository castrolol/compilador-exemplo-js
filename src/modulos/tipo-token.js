var stringHelper = require("../helpers/string-helper");
var especiais = require("../recursos/caracteres-especiais.json");

function adicionar(originalNome, tipos, nome){
	nome = nome || originalNome;
	
	var possivelGrupo = nome.split("_")[0];
	if(grupos[possivelGrupo]){
		if(grupos[possivelGrupo] in tipos == false){
			tipos[grupos[possivelGrupo]] = {};	
		}
		adicionar(originalNome, tipos[grupos[possivelGrupo]], nome.split("_").slice(1).join("_"));
	}else{
		tipos[stringHelper.toCamelCase(nome)] = originalNome;	
	}
}

var tipos = {

	word: "WORD",
	palavraChave: "PALAVRA_CHAVE",
	literal: "LITERAL",
	inteiro: "NUMERAL",
	real: "REAL",
	logico: "LOGICO",
	identificador: "INDENTIFICADOR" ,
	funcao: "FUNCAO"
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