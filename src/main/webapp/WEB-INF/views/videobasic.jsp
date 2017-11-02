<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Minimal Custom HTML5 Video Player</title>
<link rel='stylesheet prefetch'
	href='https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'>
<link rel='stylesheet prefetch'
	href='https://fonts.googleapis.com/css?family=Open+Sans'>
<link rel="stylesheet" href="/test/resources/basic/style.css">
</head>
<body>
<html>
<head>
<title>Video Player</title>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
</head>
<body>
	<div class="container">
		<div class="video-player-container">
			<div class="video-container">
				<video id="media-video">
					<source src="https://www.w3schools.com/html/mov_bbb.mp4"
						type="video/mp4">
					<source src="https://www.w3schools.com/html/mov_bbb.ogg"
						type="video/ogg">
				</video>
			</div>
			<div class="player-container">
				<div class="play-control">
					<div class="play-button">
						<i class="fa fa-play"></i>
					</div>
					<div class="pause-button">
						<i class="fa fa-pause"></i>
					</div>
				</div>
				<div class="volume-control">
					<div class="volume-button">
						<i class="fa fa-volume-up"></i>
					</div>
					<div class="volume-button-mute">
						<i class="fa fa-volume-off"></i>
					</div>
				</div>
				<div class="indicator">0:00 / 0:00</div>
				<div class="progress">
					<div class="progress-background"></div>
					<div class="progress-over"></div>
					<div class="progress-hidden"></div>
				</div>
				<div class="fullscreen-button">
					<i class="fa fa-arrows-alt"></i>
				</div>
			</div>
		</div>
		<div class="container-inner"></div>
	</div>
	<script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
</body>
</html>
<script
	src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
<script src="/test/resources/basic/index.js"></script>
</body>
</html>
