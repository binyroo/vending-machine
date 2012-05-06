
vm.ProductWindowMediator = iron.Class(puremvc.Mediator, {
	
	NAME: 'ProductWindowMediator',

	initialize: function() {
		
		puremvc.Mediator.apply(this, [this.NAME, new vm.ProductWindow()]);
	},

	listNotificationInterests: function() {
		return [
			vm.Const.INIT_PRODUCT_LIST,
			vm.Const.UPDATE_PRODUCT_LIST,
			vm.Const.UPDATE_INSERTED_MONEY
		];
	},

	handleNotification: function(note) {
		
		var comp = this.getViewComponent();
		
		switch (note.getName()) {

			case vm.Const.INIT_PRODUCT_LIST:

				var list = note.getBody();
				comp.setList(list);

				break;

			case vm.Const.UPDATE_PRODUCT_LIST:

				comp.updateOnStock();

				break;

			case vm.Const.UPDATE_INSERTED_MONEY:

				var money = note.getBody().insertedMoney;
				comp.updateOnMoney(money);

				break;
		}
	},

	onRegister: function(attribute) {
		
		var comp = this.getViewComponent();

		// DOM 엘리먼트 설정
		comp.setElement($('#product-view ul'));
		
		// ViewComponent의 이벤트 수신
		comp.addListener('select_product', this._onSelectProduct.bind(this));
		
		// 상품 선택 시 발생시킬 노티의 커맨드 설정
		var facade = this.getFacade();
		facade.registerCommand(vm.Const.SELECT_PRODUCT, vm.SelectProductCommand);
	},

	_onSelectProduct: function(e) {
		
		this.sendNotification(vm.Const.SELECT_PRODUCT, e);
	}

});
