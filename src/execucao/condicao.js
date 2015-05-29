function Condicao(){
	
}

Condicao.prototype.se = function(condicao, entao, senao){

	if(condicao){
		entao();
	}else{
		if(senao) senao();
	}
	
};

module.exports = new Condicao();