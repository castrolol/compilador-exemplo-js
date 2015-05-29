var tiposToken = require("../../modulos/tipo-token");
var estados = require("../../recursos/estados.json");
var Token = require("../../modulos/token-collection").Token;
var Expressao = require("../expressao");

function MaquinaExpressoes(escopo) {

	this.escopo = escopo;
	this.instrucao = null;

	Object.defineProperty(this, "context", {
		get: function() {
			return escopo.context;
		}
	});

}

var ordens = {};

ordens[tiposToken.operador.matematico.adicao] = 1;
ordens[tiposToken.operador.matematico.subtracao] = 1;
ordens[tiposToken.operador.matematico.multiplicacao] = 2;
ordens[tiposToken.operador.matematico.divisao] = 2;
ordens[tiposToken.operador.matematico.resto] = 2;


ordens[tiposToken.operador.logico.e] = 1;
ordens[tiposToken.operador.logico.ou] = 2;
ordens[tiposToken.operador.logico.nao] = 2;

ordens[tiposToken.operador.comparacao.maior] = 3;
ordens[tiposToken.operador.comparacao.menor] = 3;
ordens[tiposToken.operador.comparacao.maiorIgual] = 3;
ordens[tiposToken.operador.comparacao.menorIgual] = 3;
ordens[tiposToken.operador.comparacao.igual] = 3;
ordens[tiposToken.operador.comparacao.diferente] = 3;

function ehUnario(token) {

	if (token.type == tiposToken.operador.logico.nao) {
		return true;
	}

	if (token.type == tiposToken.operador.matematico.subtracao) {
		return true;
	}

	return false;

}

function ehValor(token) {

	if (token.type == tiposToken.operador.invocacao.abertura) {
		return "expressao";
	}

	if (token.type == tiposToken.identificador) {
		return "identificador";
	}

	if (token.type == tiposToken.inteiro) {
		return "inteiro";
	}

	if (token.type == tiposToken.literal) {
		return "literal";
	}

	if (token.type == tiposToken.logico) {
		return "logico";
	}

	if (token.type == tiposToken.real) {
		return "real";
	}

	if (token.type == tiposToken.palavraChave && token.value == "ler") {
		return "funcao";
	}

	return null;
}

function ehOperador(token) {

	var operador = tiposToken.operador;
	var matematicos = extrairTipos(operador.matematico);
	var comparacoes = extrairTipos(operador.comparacao);
	var logicos = extrairTipos(operador.logico);

	if (token.typeIn(matematicos)) {
		return "matematico";
	}

	if (token.typeIn(comparacoes)) {
		return "logico";
	}

	if (token.typeIn(logicos)) {
		return "logico";
	}

	return null;
}

function extrairTipos(obj) {
	return Object
		.keys(obj)
		.map(function(key) {
			return obj[key];
		});
}

function extrairFolha(raiz) {

	if (raiz.children.length < 2) {
		if (ehValor(raiz.token)) {
			return raiz.parent;
		}
		return raiz;
	}

	return extrairFolha(raiz.children[raiz.children.length - 1]);
}

MaquinaExpressoes.prototype.consumir = function(token) {

	if (token.type == tiposToken.fimInstrucao ||
		token.type == tiposToken.operador.invocacao.fechamento ||
		token.type == tiposToken.operador.invocacao.separacao) {

		if ("arvore" in this.context) {
			this.escopo.raiz.addChild(this.context.arvore);
			this.escopo.limpar();
			if(token.type != tiposToken.operador.invocacao.fechamento)this.escopo.submaquina.consumir(token);
			return;
		}
		else {
			this.escopo.limpar();
			if(token.type != tiposToken.operador.invocacao.fechamento)this.escopo.submaquina.consumir(token);
		}


		return;
	}



	if ("arvore" in this.context) {

		var tipoOperador = ehOperador(token);

		var raiz = this.context.arvore;
		var folha = extrairFolha(raiz);
		var expressao = new Expressao(token);


		if (tipoOperador) {

			if (!this.context.tipoArvore) {
				this.context.tipoArvore = tipoOperador;
			}

			if (tipoOperador != this.context.tipoArvore) {
				this.context.registrarErro("Era esperado um operador " + this.context.tipoArvore + ", foi encontrado " + tipoOperador, token.line);
				return;
			}


			var ordemRaiz = ordens[raiz.token.type];
			var ordemAtual = ordens[token.type];

			if (folha.children.length == 2 && ordemRaiz < ordemAtual) {

				var segundoTermo = folha.children[1];
				folha.children = [folha.children[0]];
				expressao.addChild(segundoTermo);
				folha.addChild(expressao);



			}
			else {
				expressao.parent = this.context.arvore.parent;
				this.context.arvore = expressao
				this.context.arvore.addChild(raiz)

			}


			return;
		}
		else if (ehValor(token)) {

			if (token.type == tiposToken.palavraChave) {

				var fToken = new Token(token.value, token.line);
				fToken.type = tiposToken.funcao;
				token = fToken;
				expressao = new Expressao(token);
			}

			if (folha.children.length == 1) {
				folha.addChild(expressao);
			}

			if (token.type == tiposToken.operador.invocacao.abertura) {

				this.escopo.criar("expressao");
				this.escopo.raiz = expressao;

			}
			return;
		}



	}

	if (!ehValor(token)) {

		if (ehUnario(token)) {

			var expressao = new Expressao(token);
			var dumpToken = new Token("0", token.line);
			dumpToken.type = tiposToken.inteiro;
			expressao.addChild(new Expressao(dumpToken));
			this.context.arvore = expressao;
			expressao.parent = this.escopo.raiz;
			return;
		}
		else {
			this.context.registrarErro(token.type + " não era esperado", token.line);
			return;
		}
	}

	if (token.type == tiposToken.palavraChave) {

		var fToken = new Token(token.value, token.line);
		fToken.type = tiposToken.funcao;
		token = fToken;
	}

	if (token.type == tiposToken.operador.invocacao.abertura) {

		token = new Token("resolve", token.line);
		token.type = tiposToken.funcao;

		var expressao = new Expressao(token)
		this.context.arvore = expressao;
		expressao.parent = this.escopo.raiz;

		this.escopo.criar("expressao");
		this.escopo.raiz = expressao;


	}
	else {
		var expressao = new Expressao(token)
		this.context.arvore = expressao;
		expressao.parent = this.escopo.raiz;
	}



}



function tratarFuncoes(token) {
	this.context.mudarEstado(estados.iniciadaInvocacao);
}

function tratarParenteses() {

	this.context.mudarEstado(estados.finalizadaInvocacao);
	this.escopo.criar("expressao");

}

module.exports = MaquinaExpressoes;