
function Logica(){
	
};

Logica.prototype.maior = function(child1, child2){
	return child1 > child2;
};

Logica.prototype.menor = function(child1, child2){
	return child1 < child2;
};

Logica.prototype.maiorIgual = function(child1, child2){
	return child1 >= child2;
};

Logica.prototype.menorIgual = function(child1, child2){
	return child1 <= child2;
};

Logica.prototype.diferente = function(child1, child2){
	return child1 != child2;
};

Logica.prototype.igual = function(child1, child2){
	return child1 == child2;
};

Logica.prototype.e = function(child1, child2){
	return child1 && child2;
};

Logica.prototype.ou = function(child1, child2){
	return child1 || child2;
};

Logica.prototype.nao = function(child1){
	return !child1;
};


 
module.exports = new Logica();