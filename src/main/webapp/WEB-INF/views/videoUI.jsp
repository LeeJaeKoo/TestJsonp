<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>MediaElement.js 3.0 - audio/video unification library</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
<link rel="icon" href="favicon.ico" type="image/x-icon">
<link href="http://vjs.zencdn.net/6.2.7/video-js.css" rel="stylesheet">

<!-- If you'd like to support IE8 -->
<script src="http://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>
<script src="http://vjs.zencdn.net/6.2.7/video.js"></script>
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
<link rel="stylesheet"
	href="/test/resources/build/mediaelementplayer.css">

<style>
html, body {
	overflow-x: hidden;
}

#container {
	padding: 0 20px 50px;
}

.error {
	color: red;
}

a {
	word-wrap: break-word;
}

code {
	font-size: 0.8em;
}
</style>
</head>

<body>

	<div id="container">

		<section>
			<h3>Global Options</h3>
			<label>Video Screen Option<select name="stretching">
					<option value="auto" selected>Auto (default)</option>
					<option value="responsive">Responsive</option>
					<option value="fill" selected>Fill</option>
					<option value="none" selected>None (original dimensions)</option>
			</select>
			</label>
		</section>
		<br>
		<div class="players" id="player1-container">

			<h3>Video Player</h3>

			<div class="media-wrapper">
				<video id="player1" width="640" height="360"
					style="max-width: 100%;"
					poster="http://www.mediaelementjs.com/images/big_buck_bunny.jpg"
					preload="none" controls playsinline webkit-playsinline muted>
					<source src="/test/resources/sample.mp4" type="video/mp4">
				</video>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		var vid = document.getElementById("player1");
		var player = videojs('player1',
				{
					'playbackRates' : [ 0.5, 1, 1.5, 2 ],
					controlBar : {
						children : {
							'playToggle' : {},
							'muteToggle' : {},
							'volumeControl' : {},
							'currentTimeDisplay' : {},
							'timeDivider' : {},
							'durationDisplay' : {},
							'liveDisplay' : {},
							'flexibleWidthSpacer' : {},
							'progressControl' : {},
							'settingsMenuButton' : {
								entries : [ 'subtitlesButton',
										'playbackRateMenuButton' ]
							},
							'fullscreenToggle' : {}
						}
					}
				});
	</script>

	<script src="/test/resources/build/mediaelement-and-player.js"></script>
	<script src="/test/resources/demo.js"></script>
</body>
</html>