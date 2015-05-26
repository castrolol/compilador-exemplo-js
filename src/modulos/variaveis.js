function Variaveis(){
	this.valores = {};
	this.definicoes = {};
}


Variaveis.prototype.obter = function(indicador){

	if( indicador in this.valores ){
		return this.definicoes[indicador];
	}
	
	return null;
};

Variaveis.prototype.criar = function (indicador, tipo) {
	
	if( indicador in this.valores ){
		console.log(indicador + " já foi definida.");
		return indicador + " já foi definida.";
	}
	
	console.log("criado " + indicador + " (" + tipo + ")");
	
	this.definicoes[indicador] = {
		indicador: indicador,
		tipo: tipo
	};
};

module.exports = Variaveis;