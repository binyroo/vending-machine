jQuery(function() {

	module('vm.ProductItemComponent', {
		setup: function() {
			
			this.getProductData = function() {
				return {
					name: '콜라',
					img: 'http://binyroo.github.com/VendingMachine/img/pImg00.png',
					price: 900,
					stockCount: 3
				};
			};

			this.createComponent = function() {
				var comp = new vm.ProductItemComponent();
				comp.setElement($('#product-view li').eq(0));

				return comp;
			};
		}
	});
	
	test('rendering test', function() {
		
		// Given
		var comp = this.createComponent();		
		var data = this.getProductData();

		// When
		comp.setData(data);

		// Then
		var el = $(comp.getElement());

		equal(el.find('div > img').attr('src'), data.img);
		equal(el.find('p > strong').text(), data.name);
		equal(el.find('p > span').text(), data.price.toString());
	});

	test('on state', function() {
		
		// Given
		var comp = this.createComponent();
		var data = this.getProductData();

		comp.setData(data);

		// When
		comp.on();

		// Then
		var el = $(comp.getElement());

		ok(el.is('.on'));
	});

	test('off state', function() {
		
		// Given
		var comp = this.createComponent();
		var data = this.getProductData();

		comp.setData(data);
		comp.on();

		// When
		comp.off();

		// Then
		var el = $(comp.getElement());

		ok(!el.is('.on'));
	});

	test('soldout state', function() {
		
		// Given
		var comp = this.createComponent();
		var data = this.getProductData();

		comp.setData(data);

		// When
		comp.soldout();

		// Then
		var el = $(comp.getElement());

		ok(el.is('.disabled'));
	});
});
