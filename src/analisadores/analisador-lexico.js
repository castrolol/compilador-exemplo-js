var palavrasChave = require("../recursos/palavras-chave.json");
var caracteres = require("../recursos/caracteres.json");
var caracteresEspeciais = require("../recursos/caracteres-especiais.json").sort(function(a, b){
	return b.quantidade - a.quantidade;
});


var TokenCollection = require("../modulos/token-collection");
var TokenBuilder = require("../modulos/token-builder");
var tiposToken = require("../modulos/tipo-token");



function caracterEhValido(caracter) {
	return ~caracteres.indexOf(caracter);
}

function AnalisadorLexico() {
	this.erros = [];
}

 


AnalisadorLexico.prototype.registrarErro = function(erro, linha) {
	this.erros.push({
		erro: erro,
		linha: linha
	});
}

AnalisadorLexico.prototype.analisar = function(codigo) {

	var tokens = this.extrairTokens(codigo);
	var tokensReconhecidos = this.reconhecerTokens(tokens);
	return tokensReconhecidos;

}

function ehCaractereEspecial(caracterAtual, caracterSucedente){
	var coincide = null;
	var duplo = caracterAtual + caracterSucedente;
	
	for(var i = 0; i < caracteresEspeciais.length; i++){
		var especial = caracteresEspeciais[i];
		if(especial.quantidade == 1){
			if(caracterAtual == especial.char){
				coincide = especial;
				break;
			}
		}else{
			if(duplo == especial.char){
				coincide = especial;
				break;
			}
		}
	}
	
	return coincide;
}

AnalisadorLexico.prototype.extrairTokens = function(codigo) {


	var caracterAtual = null;
	var caracterAnterior = null;
	var caracterSucedente = null;
	var emString = false;
	var tokens = new TokenCollection();
	var token = new TokenBuilder(tokens);
 	var especial = null;
 	var linhaString = 1;
 	var emComentario = false;
 
 
	var spaceChars = [" ", "\t", "\0", "\n"];

	for (var i = 0; i < codigo.length; i++) {

		caracterAtual = codigo.charAt(i) || "§";
		if (i) caracterAnterior = codigo.charAt(i - 1);
		caracterSucedente = codigo.charAt(i + 1) || "§";

		if (emString && caracterAtual != "\"") {
			token.addChar(caracterAtual);
			continue;
		}

		

		if (!caracterEhValido(caracterAtual)) {
			this.registrarErro("Caracter invalido", token.line );
		}

		if (caracterAtual == '\n') {
			token.line += 1;
			if(emComentario == 1) emComentario = 0;
		}
		
		if(caracterAtual == "/" && caracterSucedente == "/"){
			emComentario = true;
		}
		if(emComentario) continue;
		
		especial = ehCaractereEspecial(caracterAtual, caracterSucedente);
		if(especial != null){
			token.save();
			token.addChar(especial.char);
			token.save(especial.id);
			if(especial.quantidade == 2) i++;
			continue;
		}

		if (~spaceChars.indexOf(caracterAtual)) {
			if (~spaceChars.indexOf(caracterAnterior)) {
				continue;
			}
			token.save();
			continue;
		}


		token.addChar(caracterAtual);

		

		if (caracterAtual == '"') {
			if (emString) {
				token.save();
			}else{
				linhaString = token.line;
			}
			emString = !emString;
		}

	}
	
	token.save();
	if(emString){
		this.registrarErro("Literal não terminado!", linhaString);
	}

	return tokens;

};

AnalisadorLexico.prototype.reconhecerTokens = function(tokens) {

		 
	var regexInteiro = /[0-9]/gi;
	var regexLiteral = /^"(.*?)"$/i;
	var regexLogico = /^(verdadeiro|falso)$/;
	var regexIndicador = /^[a-z_][0-9a-z_]*$/i;
	
	var words = tokens.toArray().filter(function(token){
		return token.type == tiposToken.word;
	});
	
	var val = null;
	var word = null;
	
	for(var i = 0; i < words.length; i++){
		
		word = words[i];
		val = word.value.slice();
		
		if(~palavrasChave.indexOf(val.toLowerCase())){
			word.type = tiposToken.palavraChave;
			continue;
		}
		
		if(regexLiteral.test(val)){
			word.type = tiposToken.literal;
			continue;
		}
		
		
		if(/[0-9.]/gi.test(+val)){ 
			
			if(regexInteiro.test(+val)){
				word.type = tiposToken.inteiro;
			}else{
				word.type = tiposToken.real;
			}
			continue;
		}

		if(regexLogico.test(val)){
			word.type = tiposToken.logico;
			continue;
		}

		if(!regexIndicador.test(val)){
			this.registrarErro("'" + val + "' não é um indicador valido!", word.line);
		}

		word.type = tiposToken.identificador;

	}
		
	return tokens;

}

module.exports = AnalisadorLexico;