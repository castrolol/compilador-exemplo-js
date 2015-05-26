function StringHelper(){

}


StringHelper.prototype.toCamelCase = function(nome){

	nome = nome.toLowerCase();
	return nome.replace(/(-|_|\.)([a-z0-9])?/gi, function(total, grupo1, grupo2){
		return (grupo2 || "").toUpperCase();
	});
	
};


module.exports = new StringHelper();