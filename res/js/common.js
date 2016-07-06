var menu_position_left = false;
var menu_position_top = false;
var head_bar_height = 55;

$(function () {

	if ($('.subhead').size()) {
		fixedRatioHeight(".subhead", 160, 1050);
	}

	var recommends = $("#recommends-carousel");
	if (recommends.size()) {
		recommends.owlCarousel({
			slideSpeed: 300,
			autoPlay: true,
			paginationSpeed: 400,
			items: 3, //10 items above 1000px browser width
			itemsDesktop: [1000, 3], //5 items between 1000px and 901px
			itemsDesktopSmall: [900, 3], // betweem 900px and 601px
			itemsTablet: [800, 2], //2 items between 600 and 0
			itemsMobile: [400, 1], // itemsMobile disabled - inherit from itemsTablet option
			navigation: true,
			beforeInit: function () {
				$(".owl-carousel").css("visibility", "visible");
			}
		});
	}

	var scarehead = $("#scarehead-carousel");
	if (scarehead.size()) {
		scarehead.owlCarousel({
			navigation: true, // Show next and prev buttons
			slideSpeed: 300,
			autoPlay: true,
			paginationSpeed: 400,
			singleItem: true,
			beforeInit: function () {
				$(".owl-carousel").css("visibility", "visible");
			}
		});
	}

	//長い文章を一定以上表示しないように
	$('.item__lower, .recommended__text, #top-recommend p').dotdotdot({watch: true, ellipsis: ''});

	if (_LANG == 'ja') {
		//hotel-reservationが存在する場合のみ処理
		if ($('#hotel-reservation').size()) {
			changeTab("hotel");
			HideSearchControl('search_room_count');
			HideSearchControl('search_room_count2');
			HideSearchControl('search_method_room_type');
			HideSearchControl('search_method_price_type');
		}

		$('#hotel-reservation select').each(function () {
			$(this).prev().html($('option:selected', this).text() + "<span></span>");
		});

		$('#hotel-reservation select').on('change', function () {
			$('#hotel-reservation select').each(function () {
				$(this).prev().html($('option:selected', this).text() + "<span></span>");
			});
		});

		$('#hotel-reservation .radio-box .check').each(function () {
			if ($(this).prop('checked')) {
				$(this).next('label').addClass('on');
				$(this).next('label').removeClass('off');
			} else {
				$(this).next('label').addClass('off');
				$(this).next('label').removeClass('on');
			}
		});

		$('#hotel-reservation .radio-box .check').on('change', function () {
			$('#hotel-reservation .radio-box .check').each(function () {
				if ($(this).prop('checked')) {
					$(this).next('label').addClass('on');
					$(this).next('label').removeClass('off');
				} else {
					$(this).next('label').addClass('off');
					$(this).next('label').removeClass('on');
				}
			});
		});

		$('#ana-reservation select').each(function () {
			$(this).prev().html($('option:selected', this).text() + "<span></span>");
		});

		$('#ana-reservation select').on('change', function () {
			$('#ana-reservation select').each(function () {
				$(this).prev().html($('option:selected', this).text() + "<span></span>");
			});
		});

		// SPの宿泊予約・ANA航空券のクリック処理
		$('.menu_position_top .gnav__reserve a').on('click', function (event) {
			event.preventDefault();
			var $id = $(this).data('id');
			if ($(this).hasClass('open')) {
				//既にオープンしている時は何もしない
			} else {
				$(".gnav__reserve .open").each(function () {
					$('#' + $(this).data('id')).hide();
					$(this).removeClass('open');
				});
				//$('#' + $id).velocity("transition.fadeIn", {duration: 500});
				$('#' + $id).show();
				$(this).addClass('open');
			}
		});

		// PCの宿泊予約・ANA航空券のクリック処理
		$('.menu_position_left .gnav__reserve a').on('click', function (event) {
			event.preventDefault();
			var id = $(this).data('id');
			if ($(this).hasClass('open')) {
				$('#' + id).velocity("transition.slideLeftOut", {duration: 500});
				$(this).removeClass('open');
			} else {
				//オープンしている場合は閉じる
				reserveMenuClose();
				//クリックしたボックスを表示する
				$('#' + id).velocity("transition.slideLeftIn", {duration: 500});
				$(this).addClass('open');
			}
			//検索ボックスが閉じないように親へのイベントを止める
			event.stopPropagation();
		});

		// 検索ボックスが開いている時に検索ボックス以外をクリックした時に閉じるため
		$(document).on('click', '.menu_position_left', function (event) {
			//オープンしている場合は閉じる
			reserveMenuClose();
		});

		//検索ボックスをクリックした時は閉じないようにイベントをストップ
		$(document).on('click', '.menu_position_left .form-new', function (event) {
			event.stopPropagation();
		});
	}

	//オープンしているボックスをすべて閉じる
	function reserveMenuClose() {
		$(".menu_position_left .gnav__reserve .open").each(function () {
			if ($(this).hasClass('open')) {
				var id = $(this).data('id');
				$('#' + id).velocity("transition.slideLeftOut", {duration: 500});
				$(this).removeClass('open');
			}
		});
	}

	//スマホメニューをクリックした時の処理
	$('#menu-open').on('click', function (event) {
		event.preventDefault();
		if ($(this).hasClass('gnav__toggle--open')) {
			$(this).removeClass('gnav__toggle--open');
			$(this).addClass('gnav__toggle--close');
			$('.gnav__items').removeClass('hidden-sm-down');

			$(".gnav__items").velocity({translateY: '100%'}, {duration: 0});
			$(".gnav__items").velocity({translateY: '0%'}, {duration: 500, easing: "easeOutQuart"});

			$("#gnav").addClass('sp-menu-open');
			$('html, body').css('overflow', 'hidden');

			// メニューをopenした時に宿泊予約空き室確認を開く
			if ($('.gnav__reserve .open').size() == 0) {
				$("#hotel-reservation").show();
				$(".gnav__reservation").addClass('open');
			}
		} else {
			$(this).removeClass('gnav__toggle--close');
			$(this).addClass('gnav__toggle--open');

			$(".gnav__items").velocity({translateY: '100%'}, {
					duration: 500, easing: "easeInCubic",
					complete: function (elements) {
						$('.gnav__items').addClass('hidden-sm-down');
					}
				}
			);

			$("#gnav").removeClass('sp-menu-open');
			$('html, body').css('overflow', '');
		}
	});
});

var queries = [
	{
		context: 'original',
		match: function () {
			$('img.optimize').each(function (index) {
				var set = $(this).data('set');
				var res = _RES;
				if ($(this).hasClass('lang')) {
					res = _LANG_RES
				}
				if ('original' != set) {
					var original = $(this).data('original');
					$(this).attr('src', res + 'img/' + original);
					$(this).data('set', 'original');
				}
			});
			//$(".blocks__item, .blocks__item-2x").imgLiquid();

			$('body').addClass('menu_position_left');
			$('body').removeClass('menu_position_top');

			menu_position_left = true;
			menu_position_top = false;
		},
		unmatch: function () {
		}
	},
	{
		context: 'sm',
		match: function () {
			$('img.optimize').each(function (index) {
				var set = $(this).data('set');
				var res = _RES;
				if ($(this).hasClass('lang')) {
					res = _LANG_RES
				}
				if ('original' != set) {
					var original = $(this).data('original');
					$(this).attr('src', res + 'img/' + original);
					$(this).data('set', 'original');
				}
			});

			//$(".blocks__item, .blocks__item-2x").imgLiquid();

			$('body').addClass('menu_position_top');
			$('body').removeClass('menu_position_left');

			menu_position_left = false;
			menu_position_top = true;
		}
	},
	{
		context: 'xs',
		match: function () {
			$('img.optimize').each(function (index) {
				var set = $(this).data('set');
				var res = _RES;
				if ($(this).hasClass('lang')) {
					res = _LANG_RES
				}
				if ('xs' != set) {
					var xs = $(this).data('xs');
					$(this).attr('src', res + 'img/' + xs);
					$(this).data('set', 'xs');
				}
			});
			//$(".blocks__item, .blocks__item-2x").imgLiquid();

			$('body').addClass('menu_position_top');
			$('body').removeClass('menu_position_left');

			menu_position_left = false;
			menu_position_top = true;
		}
	}
];
MQ.init(queries);