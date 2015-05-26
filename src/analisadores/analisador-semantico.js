var MaquinaEstados = require("./maquinas");


function AnalisadorSemantico(){
    this.maquina = new MaquinaEstados();	
}

AnalisadorSemantico.prototype.consumir = function (token) {
    this.maquina.consumir(token);
};

module.exports = AnalisadorSemantico;