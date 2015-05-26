function Variaveis(){
	
}


Variaveis.prototype.obter = function(indicador){

	if( indicador in this.valores ){
		return this.definicoes[indicador];
	}
	
	return null;
};

Variaveis.prototype.criar = function (indicador, tipo) {
	
	if( indicador in this.valores ){
		return indicador + " já foi definida.";
	}
	
	this.definicoes[indicador] = {
		indicador: indicador,
		tipo: tipo
	};
};

module.exports = Variaveis;