
 
 var programa = new Programa("Olá mundo!"); 
 

 programa.vars.criar('nome', 'literal'); 
 programa.vars.criar('idade', 'inteiro'); 
 programa.vars.criar('media', 'real');
 

 
 programa.executar('escrever',
 programa.logica.nao( 
 
 programa.logica.diferente( 
 programa.executar('resolve',
 programa.matematica.adicao( 
 programa.matematica.int(3)
 ,

 programa.matematica.real(3)
 
 )
 ),

 
 programa.matematica.multiplicacao( 
 programa.matematica.int(2)
 ,

 programa.matematica.real(3)
 
 )
 
 )
 
 )
 )

 programa.executar('escrever',
 programa.logica.igual( 
 programa.executar('resolve',
 programa.matematica.adicao( 
 programa.matematica.int(3)
 ,

 programa.matematica.real(3)
 
 )
 ),

 
 programa.matematica.multiplicacao( 
 programa.matematica.int(2)
 ,

 programa.matematica.real(3)
 
 )
 
 )
 )
 
 