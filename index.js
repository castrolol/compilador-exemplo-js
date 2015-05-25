var analisador = require("./src/analisadores/analisador-lexico");

var string = require("fs").readFileSync("./hello.lus", "utf8");

var resultado = analisador.analisar(string);
require("fs").writeFileSync("./test.json", JSON.stringify(resultado, null, 4), "utf8")