var YTPReadyFlg = false;
var MainVideoId = '8gqwg5xu9bk';
var movies = ['36fGfnssELk', '4EJVcK8YP0g', 'QIV8ZKu6f00', 'ApcwC46BP0U', '2Hb4HzpO-Uk'];

$(function () {
	//トップページへ戻る
	$('html,body').animate({scrollTop: 0}, '1');
	$(".stay_recommend").imgLiquid({
			verticalAlign: 'top',
			horizontalAlign: 'center'
		}
	);

	$("#owl-banner").owlCarousel({
		stopOnHover: true,
		pagination: false,
		navigation: false,
		slideSpeed: 200,
		autoPlay: 3000, //Set AutoPlay to 3 seconds
		items: 5,
		itemsDesktop: [1199, 3],
		itemsDesktopSmall: [979, 3],
		itemsTablet: [768, 2],
		itemsMobile: [479, 2],
		beforeInit: function () {
			$(".owl-carousel").css("visibility", "visible");
		}
	});

	$("#top-recommend").owlCarousel({
		stopOnHover: true,
		pagination: true,
		navigation: false,
		slideSpeed: 200,
		autoPlay: 3000, //Set AutoPlay to 3 seconds
		items: 4,
		itemsDesktop: [1400, 3],
		itemsDesktopSmall: [1024, 2],
		itemsTablet: [768, 2],
		itemsMobile: [640, 1],
		beforeInit: function () {
			$(".owl-carousel").css("visibility", "visible");
		}
	});

	var longMovie = '';
	// PLAY MOVIE
	$(document).on('opening', '.remodal', function () {
		if (!device.tablet() && !device.mobile()) {
			$("#bgndVideo").YTPPause();
		}
		if (longMovie && longMovie.playVideo) {
			longMovie.seekTo(0, true);
			longMovie.playVideo();
			longMovie.unMute();
			/* 再生 */
			return false;
		}
		$.youtubeReady(function () {
			longMovie = new YT.Player("youtube", {
				videoId: MainVideoId,
				width: '100%',
				height: '100%',
				playerVars: {
					autoplay: 1, // 自動再生する・しない
					controls: 1, // コントロールを表示する・しない
					showinfo: 0, // 動画の情報テキストを表示する・しない
					color: 'white',
					loop: 1,
					rel: 0,
					modestbranding: 1,
					theme: "light" // テーマの選択（dark|light）
				},
				events: {
					onReady: function (e) {
						e.target.unMute();
					},
					onStateChange: function (e) {
					}
				}
			});
		});
	});

	// PLAY MOVIE CLOSE処理
	$(document).on('closed', '.remodal', function () {
		if (!device.tablet() && !device.mobile()) {
			$("#bgndVideo").YTPPlay();
		}
		if (longMovie && longMovie.stopVideo) {
			/* 停止 */
			longMovie.seekTo(0, true);
			longMovie.mute();
			longMovie.stopVideo();

		}
	});

	// SCROLL
	$('#down_scroll').on("click", function (e) {
		var lenght = 0;
		if(menu_position_top) {
			lenght = head_bar_height;
		}
		$("html").velocity("scroll", {offset: $("#wrapper").offset().top-lenght, mobileHA: false});
	});

	// youtube iframe api リソース読込
	$.youtubeReady = function (callback) {
		var EVENT_READY = "youtubeready";

		if (window.YT && window.YT.Player) {
			return callback();
		}
		$(window).on(EVENT_READY, callback);
		window.onYouTubeIframeAPIReady = function () {
			$(this).trigger(EVENT_READY);
			window.onYouTubeIframeAPIReady = void 0;
		};
		$("<script>", {src: "//www.youtube.com/iframe_api"}).appendTo("body");
	};

	var frontFlg = true;
	// 左メニューの固定
	$(window).scroll(function () {
		var scroll = $(window).scrollTop();
		var gnavi = $("#wrapper").offset().top;
		if (scroll > gnavi) {
			if (frontFlg) {
				$("#gnav").removeClass('front');
				frontFlg = false;
			}
		} else {
			if (frontFlg === false) {
				$("#gnav").addClass('front');
				frontFlg = true;
			}
		}
	});

	if (!device.tablet() && !device.mobile()) {
		runPc();
	} else {
		runSm();
	}

	var height = $(".square__overlay .square__summary span").height();
	$(".square__overlay .square__summary").css({'height': height});
});

// ターゲットのボックスがブラウザに表示されているか
function targetInScreen($targetSelector) {
	var targetTop = $($targetSelector).offset().top;
	var targetBottom = targetTop + $($targetSelector).height();
	var scrollTop = $(window).scrollTop();
	var scrollBottom = scrollTop + $(window).height();
	// 画面に表示されている場合
	if (scrollBottom > targetTop && targetBottom > scrollTop) {
		return true;
	} else {
		return false;
	}
}

function runPc() {
	$("#manza__time").velocity("transition.slideUpIn", {delay: 500, duration: 2500});
	$("#manza__special").velocity("transition.slideUpIn", {delay: 2000, duration: 2500});
	$("#manza__play").velocity("transition.slideUpIn", {delay: 3500, duration: 2500});

	$("#bgndVideo").YTPlayer();
	$('#bgndVideo').on("YTPReady", function (e) {
		YTPReadyFlg = true;
		$("#bg-pattern").show();
		$("#main-bgimage").velocity("transition.fadeOut", {duration: 4000});
	});

	var players = [];
	// スクロール時
	$(window).on('load scroll resize', function () {

		if (YTPReadyFlg != true) {
			return false;
		}

		if ($("#bgndVideo").YTPPlay !== undefined) {
			if (targetInScreen('#full-screen')) {
				$("#bgndVideo").YTPPlay();
			} else {
				if ($("#bgndVideo").YTPPause !== undefined) {
					$("#bgndVideo").YTPPause();
				}
			}
		}

		for (var i = 1; i <= 5; i++) {
			if (targetInScreen('#P' + i)) {
				// プレーヤーが初期化されて居ない場合
				if (players[i] === undefined) {
					$selecoter = $("#P" + i);
					var height = $selecoter.height()+2;
					var width = $selecoter.width()+2;
					//var targetHeight = width * 0.5625;
					//var heightPlus = height - targetHeight;
					//height = heightPlus + height;
					width = height / 0.5625;

					$.youtubeReady(function () {
						players[i] = new YT.Player("P" + i, {
							videoId: movies[i - 1],
							width: width.toFixed(2),
							//height: height.toFixed(2),
							height: height,
							playerVars: {
								autoplay: 1, // 自動再生する・しない
								controls: 0, // コントロールを表示する・しない
								showinfo: 0, // 動画の情報テキストを表示する・しない
								color: 'white',
								rel: 0,
								modestbranding: 1,
								theme: "light", // テーマの選択（dark|light）
								enablejsapi: 1,
								wmode: 'transparent',
								playlist: movies[i - 1],
								loop: 1
							},
							events: {
								onReady: function (e) {
									e.target.mute();
									var ids = e.target.getPlaylist();
									var no = 0;
									if($.isArray(ids)) {
										no = movies.indexOf(ids[0]);
										if(no == -1) {
											return;
										}
										no++;
									}
									var box = $('#P' + no);
									box.css({
										marginLeft: -(box.width() / 2),
										top: 0,
										left: '50%'
									});
								},
								onStateChange: function (e) {
									var ytStatus = e.data;
									if (ytStatus == YT.PlayerState.PLAYING) {
										var ids = e.target.getPlaylist();
										var no = 0;
										if($.isArray(ids)) {
											no = movies.indexOf(ids[0]);
											if(no == -1) {
												return;
											}
											no++;
										}
										var box = $('#P' + no);
										if (box.parent('.item__wrapper').css("zIndex") != 1) {
											box.parent('.item__wrapper').css("zIndex", 1);
											box.css({
												marginLeft: -(box.width() / 2),
												top: 0,
												left: '50%'
											});
										}
									}
								}
							}
						});
					});
				} else {
					if (players[i].playVideo !== undefined) {
						if (players[i].getPlayerState() != YT.PlayerState.PLAYING) {
							players[i].playVideo();
						}
					}
				}
			} else {
				if (players[i] !== undefined && players[i].pauseVideo !== undefined) {
					players[i].pauseVideo();
				}
			}
		}

	});
}

//スマホの処理
function runSm() {
	//setOverlay();
	$("#manza__time").velocity("transition.slideUpIn", {delay: 500, duration: 2500});
	$("#manza__special").velocity("transition.slideUpIn", {delay: 2000, duration: 2500});
	$("#manza__play").velocity("transition.slideUpIn", {
		delay: 3500,
		duration: 3500,
		begin: function () {
			setSlider('#manza__slider', [
				{src: _RES + 'img/root/sp/main2/slider_top01.jpg'},
				{src: _RES + 'img/root/sp/main2/slider_top02.jpg'},
				{src: _RES + 'img/root/sp/main2/slider_top03.jpg'},
				{src: _RES + 'img/root/sp/main2/slider_top04.jpg'},
				{src: _RES + 'img/root/sp/main2/slider_top05.jpg'},
				{src: _RES + 'img/root/sp/main2/slider_top06.jpg'},
				{src: _RES + 'img/root/sp/main2/slider_top07.jpg'}
			], true, false);
		}
	});

	setSlider('#P1', [
		{src: _RES + 'img/root/sp/slider2/slider_top_comfortable01.jpg'},
		{src: _RES + 'img/root/sp/slider2/slider_top_comfortable02.jpg'},
		{src: _RES + 'img/root/sp/slider2/slider_top_comfortable03.jpg'},
		{src: _RES + 'img/root/sp/slider2/slider_top_comfortable04.jpg'}
	], true, true);

	setSlider('#P2', [
		{src: _RES + 'img/root/sp/slider2/slider_top_marine01.jpg'},
		{src: _RES + 'img/root/sp/slider2/slider_top_marine02.jpg'},
		{src: _RES + 'img/root/sp/slider2/slider_top_marine03.jpg'}//,
		//{src: _RES + 'img/root/sp/slider/slider_top_marine04.jpg'},
		//{src: _RES + 'img/root/sp/slider/slider_top_marine05.jpg'}
	], true, true);

	setSlider('#P3', [
		{src: _RES + 'img/root/sp/slider/slider_top_tastytime01.jpg'},
		{src: _RES + 'img/root/sp/slider/slider_top_tastytime02.jpg'},
		{src: _RES + 'img/root/sp/slider/slider_top_tastytime03.jpg'},
		{src: _RES + 'img/root/sp/slider/slider_top_tastytime04.jpg'}
	], true, true);

	setSlider('#P4', [
		{src: _RES + 'img/root/sp/slider/slider_top_relaxation01.jpg'},
		{src: _RES + 'img/root/sp/slider/slider_top_relaxation02.jpg'},
		{src: _RES + 'img/root/sp/slider/slider_top_relaxation03.jpg'}
	], true, true);

	setSlider('#P5', [
		{src: _RES + 'img/root/sp/slider/slider_top_shop01.jpg'},
		{src: _RES + 'img/root/sp/slider/slider_top_shop02.jpg'},
		{src: _RES + 'img/root/sp/slider/slider_top_shop03.jpg'}
	], true, true);

	/**
	 * オーバーレイ
	 */
	function setOverlay() {
		$('<div class="vegas-overlay" style="background-image: url(' + _RES + 'img/overlays/01.png); z-index: 99">').prependTo("#full-screen");
	}

	/**
	 * スライダーセット
	 */
	function setSlider(selector, sliderSrc, autoplayFlg, imgRemove) {
		$(selector).vegas({
			transition: 'fade',
			preloadImage: true,
			transitionDuration: 3000,
			delay: 5000,
			timer: false,
			//animation: 'random',
			animationDuration: 20000,
			autoplay: autoplayFlg,
			slides: sliderSrc,
			play: function (index, slideSettings) {
				//初期画像をフェードアウトしながら非表示
				if (imgRemove) {
					//$(selector).next('img').velocity({opacity: 0}, {visibility: "hidden", duration: 2500});
					$(selector).parent('.item__wrapper').css("zIndex", 1);
				}
			}
		});
	}
}