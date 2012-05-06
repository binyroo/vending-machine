vm.ProductListProxy = iron.Class(puremvc.Proxy, {

	NAME: 'ProductListProxy',

	initialize: function() {
		puremvc.Proxy.apply(this, [this.NAME]);
	},

	initProductList: function(list) {

		this.setData(list);
		this.sendNotification(vm.Const.INIT_PRODUCT_LIST, this.getData());
	},

	selectProduct: function(index) {
		
		var product = this._getProduct(index);
		product.sell();

		this.sendNotification(vm.Const.UPDATE_PRODUCT_LIST);
	},

	_getProduct: function(index) {
		
		return this.getData()[index];
	}
});

