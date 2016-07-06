jQuery(function(){


	// ==================================================
	// スムーススクロール
	// ==================================================
	jQuery('a.smooth[href^=#]').on('click', function(){
			var $_this = jQuery(this);
			var $speed = 500;
			var $href= jQuery(this).attr("href");
			var $target = jQuery($href == "#" || $href == "" ? 'html' : $href);
			var position = $target.offset().top;
			jQuery("html, body").animate({scrollTop:position}, $speed, "swing");
			return false;
	});


	// ==================================================
	// ページの先頭へ戻るボタン
	// ==================================================
	function pageTopButton(){

		$_window = $(window);
		$_btn = $("#page-top");

		if ($_window.scrollTop() > 400) {
			$_btn.addClass('on');
		} else {
			$_btn.removeClass('on');
		}
	}
	$(window).on("scroll", pageTopButton);


});	//document ready
