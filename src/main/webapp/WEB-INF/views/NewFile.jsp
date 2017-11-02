<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Video.js Hotkeys</title>
<link href="https://vjs.zencdn.net/5.0/video-js.css" rel="stylesheet">
<script src="https://vjs.zencdn.net/5.0/video.js"></script>
<link href="/test/resources/NF/videojs-resolution-switcher.css"
	rel="stylesheet">
<script src="/test/resources/NF/videojs-resolution-switcher.js"></script>
<script src="/test/resources/NF/vast-client.js"></script>
<script src="/test/resources/NF/videojs.ads.js"></script>
<script src="/test/resources/NF/videojs.vast.js"></script>

<style>
.video-js .vjs-menu-button-inline {
	width: 12em;
}

.vjs-menu-button-inline .vjs-menu {
	display: block;
	opacity: 1;
}
</style>
</head>
<body>
	<div>You can see the Video.js Hotkeys plugin in use below. Look
		at the source to see how to use it with your own videos.</div>

	<video id="video1"
		class="video-js vjs-default-skin vjs-big-play-centered" height="300"
		width="600" controls data-setup="{}">
		<source src="http://vjs.zencdn.net/v/oceans.mp4" type='video/mp4'>
		<source src="http://vjs.zencdn.net/v/oceans.webm" type='video/webm'>
		<source src="http://vjs.zencdn.net/v/oceans.ogv" type='video/ogg'>
	</video>

	<script src="/test/resources/NF/videojs.hotkeys.js"></script>
	<script>
		// initialize the plugin
		var player = videojs('video1', {
			controls : true,
			width : 600,
		})
				.ready(
						function() {
							player
									.hotkeys({
										volumeStep : 0.1,
										seekStep : 5,
										enableMute : true,
										enableFullscreen : true,
										enableNumbers : false,
										enableVolumeScroll : true,
										// Enhance existing simple hotkey with a complex hotkey
										fullscreenKey : function(e) {
											// fullscreen with the F key or Ctrl+Enter
											return ((e.which === 70) || (e.ctrlKey && e.which === 13));
										},
										// Custom Keys
										customKeys : {
											// Add new simple hotkey
											simpleKey : {
												key : function(e) {
													// Toggle something with S Key
													return (e.which === 83);
												},
												handler : function(player,
														options, e) {
													// Example
													if (player.paused()) {
														player.play();
													} else {
														player.pause();
													}
												}
											},
											// Add new complex hotkey
											complexKey : {
												key : function(e) {
													// Toggle something with CTRL + D Key
													return (e.ctrlKey && e.which === 68);
												},
												handler : function(player,
														options, event) {
													// Example
													if (options.enableMute) {
														player.muted(!player
																.muted());
													}
												}
											},
											// Override number keys example from https://github.com/ctd1500/videojs-hotkeys/pull/36
											numbersKey : {
												key : function(event) {
													// Override number keys
													return ((event.which > 47 && event.which < 59) || (event.which > 95 && event.which < 106));
												},
												handler : function(player,
														options, event) {
													// Do not handle if enableModifiersForNumbers set to false and keys are Ctrl, Cmd or Alt
													if (options.enableModifiersForNumbers
															|| !(event.metaKey
																	|| event.ctrlKey || event.altKey)) {
														var sub = 48;
														if (event.which > 95) {
															sub = 96;
														}
														var number = event.which
																- sub;
														player
																.currentTime(player
																		.duration()
																		* number
																		* 0.1);
													}
												}
											},
											emptyHotkey : {
											// Empty
											},
											withoutKey : {
												handler : function(player,
														options, event) {
													console
															.log('withoutKey handler');
												}
											},
											withoutHandler : {
												key : function(e) {
													return true;
												}
											},
											malformedKey : {
												key : function() {
													console
															.log('I have a malformed customKey. The Key function must return a boolean.');
												},
												handler : function(player,
														options, event) {
													//Empty
												}
											}
										}
									});
						});
	</script>
</body>
</html>