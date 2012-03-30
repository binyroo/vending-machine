binyroo.ProductListService = iron.Class(iron.Dispatcher, {
	
	request: function() {
		
		var me = this;
		
		setTimeout(function() {
			
			me.onSuccess(TEST_DATA);
		}, 10);
	},
	
	onSuccess: function(data) {
		
		this.dispatch('loadProductList', {
			data: data
		});
	}
});