var TokenCollection = require("./token-collection");

function TokenBuilder(collection){
	this.value = "";
	this.collection = collection || new TokenCollection();
	this.line = 1;
}


TokenBuilder.prototype.addChar = function(char){

	this.value += char;
	
};

TokenBuilder.prototype.save = function(type){
	
	if(this.value){
		this.collection.add(this.value, this.line, type);
	}
	this.value = "";
	
}

TokenBuilder.prototype.getCollection = function(){
	return this.collection;
}


module.exports = TokenBuilder;