
function Matematica(){
	
};

Matematica.prototype.adicao = function(child1, child2){
	return child1 + child2;
};

Matematica.prototype.subtracao = function(child1, child2){
	return child1 - child2;
};

Matematica.prototype.multiplicacao = function(child1, child2){
	return child1 * child2;
};

Matematica.prototype.divisao = function(child1, child2){
	return child1 / child2;
};

Matematica.prototype.real = function(num){
	return +num;
};

Matematica.prototype.int = function(num){
	return Math.floor(+num);
};



module.exports = new Matematica();