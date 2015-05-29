 var estados = require("../recursos/estados");

 function ContextoMaquina(maquina) {

 	this.estado = estados.vazio;
 	this.erros = [];
 	this.raiz = null;

 	this.mudarEstado = function(novoEstado) {
 		this.estado = novoEstado;
 	};

 	this.obterEstado = function() {
 		return this.estado;
 	};

 	this.registrarErro = function(erro, linha) {
 		maquina.erros.push({
 			erro: erro,
 			linha: linha
 		});
 	};

 	this.reescolherMaquina = function(token) {
 		maquina.escolher(token);
 	};

 	this.copiar = function() {
 		var novo = new ContextoMaquina(maquina);
 		novo.estado = this.estado;
 		novo.erros = this.erros.slice();
 		novo.raiz = this.raiz;
 		return novo;
 	};
 }

 function Escopo(maquina) {
 	this.maquina = maquina;
 	this.stack = [];
 	this.context = new ContextoMaquina(maquina);
 	this.submaquina = null;
 }

 Escopo.prototype.criar = function(submaquina) {
 	if (typeof submaquina == "string") {
 		submaquina = this.maquina.submaquinas[submaquina];
 	}

 	this.stack.push({
 		context: this.context,
 		submaquina: this.submaquina,
 		raiz: this.raiz
 	});
 	this.context = this.context.copiar();
 	this.submaquina = submaquina;

 };


 Escopo.prototype.limpar = function() {
 	if (this.stack.length < 1) return;
 	delete this.context;
 	this.submaquina = null;
 	var restored = this.stack.pop();
 	if (restored) {
 		this.context = restored.context;
 		this.submaquina = restored.submaquina;
 		this.raiz = restored.raiz;
 	}
 };

 module.exports = Escopo;