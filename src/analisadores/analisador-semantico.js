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


module.exports = AnalisadorSemantico;