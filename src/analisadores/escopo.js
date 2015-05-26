var Variaveis = require("../modules/variaveis");

function Escopo(){
	
	this.stack = [];
	this.current = new Variaveis();
	
}

Escopo.prototype.criar = function(){
	this.stack.push(this.current);
	this.current = new Variaveis();
};


Escopo.prototype.limpar = function () {
	delete this.current;
	this.current = this.stack.pop();
}


module.exports = Escopo;