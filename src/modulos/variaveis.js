function Variaveis(){
	this.valores = null;
	this.definicoes = {};
	this.sealed = false;
}

function defaultFor(type){
	switch(type){
		case "literal":
			return "";
		case "inteiro":
		case "real":
			return 0;
		case "logico":
			return false;
		
	}
	return null;
}

Variaveis.prototype.obter = function(indicador){

	if( indicador in this.valores ){
		return this.valores[indicador];
	}

	throw "Variavel não definida";
};

Variaveis.prototype.atribuir = function (indicador, valor) {
	if(indicador in this.valores){
		this.valores[indicador] = valor;
		return;
	}
	throw "Variavel não definida";
}


Variaveis.prototype.seal = function(){
	this.sealed = true;
}

Variaveis.prototype.criar = function (indicador, tipo) {
	if(this.sealed){
		throw "As variaveis devem ser criadas na sessão de declaração !"
	}
	if(!this.valores){
		console.log("Valores:");
		this.valores = {};
	}
	
	if( indicador in this.valores ){
		console.log(indicador + " já foi definida.");
		return indicador + " já foi definida.";
	}
	
	console.log("|-- " + indicador + ": " + tipo );
	
	this.definicoes[indicador] = {
		indicador: indicador,
		tipo: tipo
	};
	
	this.valores[indicador] = defaultFor(tipo);
};

module.exports = Variaveis;