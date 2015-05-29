
 
 var programa = new Programa("Olá mundo!"); 
 

 programa.vars.criar('nome', 'literal'); 
 programa.vars.criar('idade', 'inteiro'); 
 programa.vars.criar('media', 'real');
 

 programa.iniciar();

(function(vars, condicao, logica, matematica, executar){
 executar('escrever',
 "Informe sua idade"
 
 )

 vars.atribuir('idade', 
 executar('ler'
 )
 )

 vars.atribuir('tt', 
 matematica.int(2)
 
 )

 condicao.se(
 logica.menor( 
 vars.obter('idade')
 ,

 matematica.int(18)
 
 ),

 //entao
function(){

 condicao.se(
 logica.menor( 
 vars.obter('idade')
 ,

 matematica.real(5)
 
 ),

 //entao
function(){

 executar('escrever',
 "Você save ler ?"
 
 )
 
},

 //senao
function(){

 executar('escrever',
 "Você não é maior de idade"
 
 )
 
}
 );
 
},

 //senao
function(){

 executar('escrever',
 "beleza... pode passar!"
 
 )
 
}
 );
 }(
programa.vars,
programa.condicao,
programa.logica,
programa.matematica,
programa.executar.bind(programa)
));
 