var tiposToken = require("../../modulos/tipo-token");
var estados = require("../../recursos/estados.json");
var Escopo = require("../escopo");
var Expressao = require("../expressao");

var submaquinas = {
	principal: require("./maquina-programa"),
	variaveis: require("./maquina-variaveis"),
	instrucoes: require("./maquina-instrucoes"),
	
	funcoes: require("./maquina-funcoes")
};



function MaquinaEstados() {

	this.escopo = new Escopo(this);
	this.arvoreExpressoes = new Expressao(null);
	this.escopo.raiz = this.arvoreExpressoes;
	this.submaquinas = {};
	for (var submaquina in submaquinas) {
		this.submaquinas[submaquina] = new submaquinas[submaquina](this.escopo);
	}

	this.escopo.submaquina = this.submaquinas.principal;


}


MaquinaEstados.prototype.consumir = function(token) {

	this.escopo.submaquina.consumir(token);
};






module.exports = MaquinaEstados