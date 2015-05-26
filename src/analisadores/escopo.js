var Variaveis = require("../modules/variaveis");
var estados = require("../recursos/estados");

function ContextoMaquina(maquina){
	
	this.estado = estados.vazio;
	this.erros = [];

	this.mudarEstado = function(novoEstado){
		this.estado = novoEstado;
	};
	
	this.obterEstado = function(){
		return this.estado;
	};
	
	this.registrarErro = function (erro, linha) {
		this.erros.push({
			erro: erro,
			linha: linha
		})	;
	};
	
	this.reescolherMaquina = function (token) {
		maquina.escolher(token);
	};
	
	this.copiar = function(){
		var novo = new ContextoMaquina(maquina);
		for(var prop in this){
			novo[prop] = this[prop]
			if(novo[prop] instanceof Array){
				novo[prop] = novo[prop].slice();
			};
		}
		return novo;
	};
}

function Escopo(maquina){
	this.maquina = maquina;
	this.stack = [];
	this.context = new ContextoMaquina(maquina);
	this.submaquina = null;
}

Escopo.prototype.criar = function(submaquina){
	if(typeof submaquina == "string"){
		submaquina = this.maquina.submaquinas[submaquina];
	}
	
	this.stack.push({ context: this.context, submaquina: this.submaquina });
	this.context = this.context.copiar();
	this.submaquina = submaquina;
	
};


Escopo.prototype.limpar = function () {
	delete this.context;
	this.submaquina = null;
	var restored = this.stack.pop();
	if(restored){
		this.context = restored.context;
		this.submaquina = restored.submaquina;
	}
};
 
module.exports = Escopo;
