jQuery(function() {
	
	module('ProductWindow', {

		setup: function() {
			
			$('#product-view ul')[0].innerHTML = '';

			var getProdWindow = function() {
				
				var comp = new vm.ProductWindow();
				comp.setElement($('#product-view ul')[0]);

				return comp;
			};

			this.getProdWindow = getProdWindow;
		},

		teardown: function() {
		}
	});

	test('set/getElement', function() {
		
		// Given
		var comp = new vm.ProductWindow();
		var el = $('#product-view ul')[0];

		// When
		comp.setElement(el);

		// Then
		deepEqual(comp.getElement(), el);
	});

	test('set product list data', function() {
		
		// Given
		var comp = this.getProdWindow();
		var list = vm.ProductProvider.get();

		// When
		comp.setList(list);

		// Then
		var itemLIs = $('#product-view ul li');
		var itemImgs = $('#product-view ul li img');

		equal(itemLIs.size(), list.length);
		equal(itemImgs.size(), list.length);
	});

	test('update inserted money', function() {
		
		// Given
		var comp = this.getProdWindow();
		var list = vm.ProductProvider.get();

		comp.setList(list);

		// When
		comp.updateOnMoney(400);

		// Then
		var onItems = $('#product-view ul li.on');

		equal(onItems.size(), 4);

		// When
		comp.updateOnMoney(200);

		// Then
		onItems = $('#product-view ul li.on');

		equal(onItems.size(), 2);
	});

	test('update stock count', function() {
		
		// Given
		var comp = this.getProdWindow();
		var list = vm.ProductProvider.get();

		var notStockProdVO = new vm.ProductVO({
			name: '콜라',
			img: 'http://binyroo.github.com/VendingMachine/img/pImg08.png',
			price: 100,
			stockCount: 0
		});

		list[0] = notStockProdVO;

		comp.setList(list);

		// When
		comp.updateOnStock();

		// Then
		var notStockItem = $('#product-view ul li').eq(0);
		
		ok(notStockItem.is('.disabled'));
	});
});
