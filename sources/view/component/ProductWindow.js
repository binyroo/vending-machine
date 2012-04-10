vm.ProductWindow = iron.Class({
	initialize: function() {
		// code
	},

	setElement: function(el) {
		this._wrap = $(el);	
	},

	getElement: function() {
		return this._wrap[0];	
	},

	setList: function(list) {
		
		this._list = list;
		this._compList = [];

		for (var i = 0; i < list.length; i++) {
			var item = this._createProductItemComponent(list[i].get());
			this._wrap.append(item.getElement());

			this._compList.push(item);
		}
	},

	updateOnMoney: function(money) {
		
		var vo;
		var list = this._list;

		for (var i = 0; i < list.length; i++) {

			vo = list[i];
			
			if (this._canBuy(vo, money)) {
				
				this._compList[i].on();

			} else {
				
				this._compList[i].off();
			}
		}
	},

	updateOnStock: function() {
		
		var vo;
		var list = this._list;

		for (var i = 0; i < list.length; i++) {

			vo = list[i];
			
			if (this._isSoldout(vo)) {
				
				this._compList[i].soldout();
			}
		}
	},

	_canBuy: function(prodVO, money) {
		
		return (prodVO.getPrice() <= money) && (prodVO.getStockCount() > 0);
	},

	_isSoldout: function(prodVO) {
		
		return prodVO.getStockCount() <= 0;
	},

	_createProductItemComponent: function(data) {
		
		var comp = new vm.ProductItemComponent();
		var li = $('<li></li>');

		comp.setElement(li);
		comp.setData(data);

		return comp;
	}
});

