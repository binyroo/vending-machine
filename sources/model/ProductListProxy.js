vm.ProductListProxy = iron.Class(puremvc.Proxy, {

	NAME: 'ProductListProxy',

	initialize: function() {
		puremvc.Proxy.apply(this, [this.NAME]);
	},

	initProductList: function(list) {

		this.setData(list);
		this.sendNotification(vm.Const.INIT_PRODUCT_LIST, this.getData());
	},

	sellProduct: function(index) {
		
		var product = this._getProduct(index);
		product.sell();

		this.sendNotification(vm.Const.UPDATE_PRODUCT_LIST);
	},

	getPriceAt: function(index) {
		return this._getProduct(index).getPrice();
	},

	_getProduct: function(index) {
		
		return this.getData()[index];
	}
});

