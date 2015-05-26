var tiposToken = require("../../modulos/tipo-token");
var estados = require("../../recursos/estados.json");
var Escopo = require("../escopo");

var submaquinas = {
	principal: require("./maquina-programa"),
	variaveis: require("./maquina-variaveis")
};



function MaquinaEstados(){
	
	this.escopo = new Escopo(this);

	this.submaquinas = {};
	for(var submaquina in submaquinas){
		this.submaquinas[submaquina] = new submaquinas[submaquina](this.escopo);
	}
	
	this.escopo.submaquina = this.submaquinas.principal;
	
	
}


MaquinaEstados.prototype.consumir = function (token) {
	this.escolherPara(token);
	this.submaquinaAtual.consumir(token);
};

MaquinaEstados.prototype.escolherPara = function (token){
	var submaquina = escolherMaquina.call(this, token);
	if(submaquina == null || submaquina == this.escopo.submaquina){
		return;
	}
	this.escopo.criar(submaquina);
};

function escolherMaquina (token) {

	if(token.type == tiposToken.palavraChave){
		
		switch(token.value){
			case "programa": 
				return this.submaquinas.principal;
			case "variaveis":
				return this.submaquinas.variaveis;
		}
		
	}
};





module.exports = MaquinaEstados