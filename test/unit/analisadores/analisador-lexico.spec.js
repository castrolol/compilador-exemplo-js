"use strict";

var chai = require("chai");
var should = chai.should();
var expect = chai.expect;

describe("AnalisadorLexico", function() {
	
	describe("#extrairTokens()", function() {
	
		var _analisador, _src, _resultado;
			
		before(function() {
			var AnalisadorLexico = require("../../../src/analisadores/analisador-lexico");
		 
			_analisador = new AnalisadorLexico();
			_src = "programa \"Olá mundo!\"";
			
			_resultado = _analisador.extrairTokens(_src);
			
		});
		
		it("deve retornar 2 tokens para o código fonte informado", function() {
			
			expect(_resultado.toArray()).to.have.length(2);
			
		});
		
		it("deve retornar os tokens 'programa' e \"Olá mundo!\"", function() {
			
			var tokens = _resultado.toArray();
			tokens[0].value.should.equal("programa");
			tokens[1].value.should.equal("\"Olá mundo!\"");
			
		});
		
		
	});
});