

function Expressao(token){
	
	this.token = token;
	this.children = [];
	this.parent = null;
	this.addChild = function(child){
		child.parent = this;
		this.children.push(child);
	}
}


module.exports = Expressao;