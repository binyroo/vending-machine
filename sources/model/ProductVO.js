vm.ProductVO = iron.Class({
	initialize: function(data) {
		
		if (data) {
			this.set(data);
		}
	},

	set: function(data) {
		this._name = data.name;
		this._img = data.img;
		this._price = data.price;
		this._stockCount = data.stockCount;
	},
	
	get: function() {
		return {
			name: this._name,
			img: this._img,
			price: this._price,
			stockCount: this._stockCount
		};
	},

	getName: function() {
		return this._name;
	},

	getImg: function() {
		return this._img;	
	},

	getPrice: function() {
		return this._price;	
	},

	getStockCount: function() {
		return this._stockCount;	
	},

	sell: function() {
		if (this._stockCount === 0 || typeof this._stockCount == 'undefined') {
			return -1;
		}

		return --this._stockCount;
	}
});
