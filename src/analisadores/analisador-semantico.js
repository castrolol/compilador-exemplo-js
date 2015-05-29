var MaquinaEstados = require("./maquinas");


function AnalisadorSemantico(){
    this.maquina = new MaquinaEstados();	
}

AnalisadorSemantico.prototype.consumir = function (token) {
    this.maquina.consumir(token);
};

AnalisadorSemantico.prototype.obterArvoreExpressoes = function () {
    return this.maquina.arvoreExpressoes;
};

AnalisadorSemantico.prototype.obterErros = function(){
    
    if(this.maquina.erros.length){
        return this.maquina.erros;
    }
    
    return null;
    
}


module.exports = AnalisadorSemantico;