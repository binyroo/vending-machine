binyroo.ProductInfoProxy = iron.Class(puremvc.Proxy, {
	
	initialize: function(name, data) {
		
		puremvc.Proxy.call(this, [ 'ProductInfoProxy', data ]);
	},
	
	getProductList: function() {
		
		return this._productInfoList;
	},
	
	onRegister: function() {
		
		var list = this.getData();
		
		this._productInfoList = this._randomize(list.concat());
	},
	
	_randomize: function() {
		
	},
});