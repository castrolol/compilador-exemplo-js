var Analisador = require("./src/analisadores/analisador-sintatico");
var Executor = require("./src/execucao/executor");

var analisador = new Analisador();

var string = require("fs").readFileSync("./simple.lus", "utf8");

//var resultado = analisador.analisar(string);
var resultado = new Executor(string).executar();
require("fs").writeFileSync("./test.js",resultado, "utf8")


