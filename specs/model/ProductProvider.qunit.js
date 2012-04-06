jQuery(function() {

	module('vm.DataHelper', {
		setup: function() {
			
			this.isAllDiff = function(arr) {

				var origin, target;

				for (var i = 0; i < arr.length - 1; i++) {
					origin = arr[i];

					for (var j = ++i; j < arr.length; j++) {
						target = arr[j];

						if (origin == target) {
							return false;
						}
					}
				};

				return true;
			};

		},

		teardown: function() {
			
		}
	});

	test('init', function() {
		
		var helper = vm.DataHelper;

		ok(helper);
	});

	test('getRandomNum', function() {

		//Given
		var helper = vm.DataHelper;

		// When
		var randomNum = helper.getRandomInt(0, 5);

		// Then
		equal(typeof randomNum, 'number');
		ok((randomNum >= 0) && (randomNum <= 5));

	});

	test('getRandomIntList: 사이즈와 배열값의 최대/최소값 지정', function() {
		
		// Given
		var helper = vm.DataHelper;

		// When
		var list = helper.getRandomIntList(8, 0, 22);

		// Then
		equal(list.length, 8);
		ok(this.isAllDiff(list));
	});

	test('getRandomIntList: 사이즈만 입력하는 경우', function() {
		
		// Given
		var helper = vm.DataHelper;

		// When
		var list = helper.getRandomIntList(8);

		// Then
		equal(list.length, 8);
		ok(this.isAllDiff(list));
	});

	module('vm.ProductProvider', {
		setup: function() {
			
			var validateNameOrImg = function(prop) {
				
				return (typeof prop == 'string');
			};

			var validatePrice = function(price) {
				
				if (typeof price != 'number') {
					return false;
				}

				return (price >= 100) && (price <= 800);
			};


			var validateStockCount = function(stockCount) {
				
				if (typeof stockCount != 'number') {
					return false;
				}

				return (stockCount >= 1) && (stockCount <= 3);
			};

			var validateData = function(list) {
				
				var prodVO;

				for (var i = 0; i < list.length; i++) {
					prodVO = list[i];

					if (!validateNameOrImg(prodVO.name)
						|| !validateNameOrImg(prodVO.img)
						|| !validatePrice(prodVO.price)
						|| !validateStockCount(prodVO.stockCount)) {
						return false;
					}
				}

				return true;
			};

			this.validateNameOrImg = validateNameOrImg;
			this.validatePrice = validatePrice;
			this.validateStockCount = validateStockCount;

			this.validateData = validateData;
		},

		teardown: function() {
			
		}
	});

	test('forTestFn Test', function() {

		ok(this.validateNameOrImg('콜라'));
		ok(!this.validateNameOrImg());

		ok(this.validatePrice(300));
		ok(!this.validatePrice(1000));
		ok(!this.validatePrice(0));
		ok(!this.validatePrice());

		ok(this.validateStockCount(2));
		ok(!this.validateStockCount(0));
		ok(!this.validateStockCount());
	});

	test('ProductProvider.get', function() {
		
		// Given
		var provider = vm.ProductProvider;

		// When
		var data = provider.get();

		// Then
		equal(data.length, 8);
		ok(this.validateData(data));
	});
});
