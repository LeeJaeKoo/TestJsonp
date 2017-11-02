// c/o http://stackoverflow.com/a/4904902/604040
// i'm a dummy when it comes to js

$(function () {
	
		var vid = $('.video');
	
    var top = vid.offset().top - parseFloat(vid.css('margin-top').replace(/auto/, 0));
	
	$(window).on('scroll', function(event) {
		// what the y position of the scroll is
		var y = $(this).scrollTop();

		// whether that's below the form
		if (y >= top) {
			// if so, ad the fixed class
			if ( vid.is('.aside') ) {
				return;
			}
			vid.addClass('aside');
		} else {
			// otherwise remove it
			vid.removeClass('aside');
		}
	});
	
});