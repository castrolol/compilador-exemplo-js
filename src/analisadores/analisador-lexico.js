var tokensBruto = require("../recursos/tokens.json");
var caracteres = require("../recursos/caracteres.json");
var regexNumeral = /[0-9.]/gi
var regexEspecial = /[+*\/%=(){}[\]~^<>:;,-]/gi
var regexEspecialDuplo = /((==)|(&&)|(\|\|)|(\+\+)|(--))/gi

function caracterEhValido(caracter){
    return ~caracteres.indexOf(caracter);
}

function AnalisadorLexico(){
    
   this.caracterAtual = null;
   this.emString = false;
   this.tokens = [];
   this.tokenAtual = "";
   this.linha = 1;
 
    

}


function loadTokens(){

    return tokensBruto.map(function(bruto){
        return {
            nome: bruto[0],
            id: bruto[1],
            info: bruto[2]
        };
    });
}
 

AnalisadorLexico.prototype.registrarErro = function(erro, linha){
    
}
 
AnalisadorLexico.prototype.analisar = function(codigo){
 
    
    var caracterAtual = null;
    var caracterAnterior = null;
    var caracterSucedente = null;
    var emString = false;
    var tokens = [];
    var tokenAtual = "";
    var linha = 1;
    var espaco = { tipo: "espaco"};
    var ultimoToken = null;
    
    for(var i = 0; i < codigo.length; i++){
        ultimoToken = tokens[tokens.length-1];
        caracterAtual = codigo.charAt(i) || "§";
        if(i) caracterAnterior = codigo.charAt(i-1);
        caracterSucedente = codigo.charAt(i+1) || "§";
        
        if(emString && caracterAtual != "\""){
            tokenAtual += caracterAtual;
            continue;
        }
        
        if(!caracterEhValido(caracterAtual)){
            this.registrarErro("Caracter invalido", linha);
        }
        
        if(caracterAtual == '\n'){
            if(emString) {
                tokenAtual += caracterAtual;
            }else{
                if(tokenAtual){
                    tokens.push({
                        token: tokenAtual,
                        linha: linha
                    })
                }
                tokenAtual = "";
            }
            linha++;
            continue;
        }
        
        if( regexEspecialDuplo.test(caracterAtual + caracterSucedente)){
            if(tokenAtual){
                tokens.push({
                    token: tokenAtual,
                    linha: linha
                })
            }
            tokens.push({
                token: caracterAtual + caracterSucedente,
                linha: linha
            });
            i++;
            tokenAtual = "";
            continue;
        }

        if(regexEspecial.test(caracterAtual)){
             if(tokenAtual){
                tokens.push({
                    token: tokenAtual,
                    linha: linha
                })
            }
            tokens.push({
                token: caracterAtual,
                linha: linha
            });
            tokenAtual = "";
            continue;
        }
        
          
        if(caracterAtual == " "){
            if(caracterAnterior == " "){
                continue;
            }
            if(tokenAtual){
                tokens.push({
                    token: tokenAtual,
                    linha: linha
                })
            }
            tokenAtual = "";
           
            if(ultimoToken != espaco){
                tokens.push({
                    token: espaco,
                    linha: linha
                });
            }
            continue;
        }
        
       
        
        
        tokenAtual += caracterAtual;
        
        if(caracterAtual == '"'){
            if(emString){
                tokens.push({
                    token: tokenAtual,
                    linha: linha
                });
                tokenAtual = "";
            }
            emString = !emString;
        }
       
    }

    return tokens;

};
 
module.exports = new AnalisadorLexico;