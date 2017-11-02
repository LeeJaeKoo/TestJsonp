$(function(){

	var $parent = $('.video-hero'),
			$video = $parent.find('iframe'),
			$playButton = $(".play"),
			$itemsToFadeOut = $(".vid-cap,.overlay,h1"),
			f = $video[0],
			url = $video.attr('src').split('?')[0],
			activeVideoClass = "video-started";

			// setup fitVids
			$parent.fitVids();

			// handle play click
			$playButton.click(function(e){
				
				e.preventDefault();
				
				// grab height of video
				var videoHeight = $video.height();
				
				// add class to hero when video is triggered
				$parent.addClass(activeVideoClass);
				
				// fade out the play button
				$(this).fadeOut("fast");
				
				// fade out poster image, overlay, and heading
				$itemsToFadeOut.fadeOut();
				
				// toggle accessibility features
				$video.attr({
					"aria-hidden" : "false",
					"tabindex" : "0"
				});
				
				// set focus to video for accessibility control
				$video.focus();
				
				// set height of hero based on height of video
				$parent.css("max-height",videoHeight).height(videoHeight);
				
				// send play command to Vimeo api
				runCommand('play');
				
			});

			// send play to vimeo api
			var runCommand = function(cmd){
				var data = {method : cmd};
				f.contentWindow.postMessage(JSON.stringify(data), url);
			}
			
			// handle resize
			$(window).resize(function(){
				var videoHeight = $video.height();
				if($(".video-started").size() === 1){
					$parent.height(videoHeight);
				}
			});
		
});