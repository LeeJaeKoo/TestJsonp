<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>HTML 5 Video Player</title>
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">

<script type="text/javascript"
	src="/test/resources/js/jquery-1.6.2.min.js"></script>
<script src="/test/resources/js/video.js"></script>
<script type="text/javascript"
	src="https://s3.amazonaws.com/videojs-test/videojs_5.vast.vpaid.min.js"></script>

<link rel="stylesheet" href="/test/resources/list/style.css">
<script>
	var tag;
	$(document).ready(function() {

		$.ajax({
			type : "GET",
			url : "http://175.125.132.121:8080/test/getData",
			dataType : "jsonp",
			jsonp : "callback",
			success : function(json) {
				tag = new String(json.xml);
			},
			error : function(e) {
				alert("error!!");
			}
		});

		setTimeout(function() {

			var videoPlayer = videojs("video", {
				controls : true,
				controlBar : {
					muteToggle : false,
				},
				preload : 'auto'
			});
			videoPlayer.vastClient({
				//adTagUrl : getAdsUrl,
				adTagXML : requestVASTXML,
				adsEnabled : true,
				playAdAlways : true,
				adCancelTimeout : 5000,
				verbosity : 4

			});
		}, 100);

		//jsonp로 json 받아와서 callback 함수에 스트링으로 파싱 해준뒤에 videojs 테스트 필요

		function requestVASTXML(callback) {
			//The setTimeout below is to simulate asynchrony
			setTimeout(function() {
				console.log("tag : = " + tag);
				callback(null, tag);
			}, 0);
		}
	});
</script>

</head>

<body>
	<!-- 	<header class="site-header" role="banner">
		<div class="wrapper">
			<h1 class="site-title">
				HTML <span class="title-five">5</span> Video Player
			</h1>
			<p class="credit-line">
				by <a href="https://twitter.com/gianablantin">Giana Blantin</a>
			</p>
		</div>
	</header> -->

	<main class="site-content">

	<section class="video-area">
		<div class="wrapper">

			<header class="video-header">
				<h2 class="video-title">Test Video Main</h2>
				<small class="video-author">Hello <a
					href="http://www.dmcmedia.co.kr">DMC</a></small>
			</header>

			<div class="video-column">
				<div class="video-player">
					<button id="btnReplay" class="btn-replay">
						<span class="fontawesome-refresh"></span>
					</button>

					<video id="video" class="video" src="/test/resources/sample.mp4"
						type="video/mp4"
						poster="https://s3-us-west-2.amazonaws.com/s.cdpn.io/197359/caminandes-1.jpg"
						preload="none">
					</video>

					<div class="video-controls">

						<button id="btnState">
							<span class="fontawesome-play"></span>
						</button>

						<span id="timePlayed">00:00</span>

						<!-- Seeker + progress bar -->
						<div class="video-bars">
							<input type="range" id="barSeeker" class="bar-seeker" value="0"
								min="0" max="100" step="0.1">
							<progress value="0" max="100" step="0.1" id="barProgress"
								class="bar-progress"></progress>
							<progress value="0" max="100" step="0.1" id="barBuffer"
								class="bar-buffer"></progress>
						</div>

						<div id="timeBubble" class="time-bubble">00:00</div>

						<span id="timeDuration">00:00</span>

						<button id="btnSound" class="btn-sound">
							<span class="fontawesome-volume-up"></span>
						</button>
						<input type="range" id="sliderVolume" class="slider-volume"
							value="10" min="0" max="10">

					</div>

				</div>

				<div class="video-info">

					<p class="video-popularity">
						<span class="views">394,7304 views <span
							class="fontawesome-eye-open meta-icon"></span> <span
							class="likes">97,349 likes <a href="#" id="likeThis"
								class="like-this"><span
									class="fontawesome-heart meta-icon like-heart"></span></a><span
								class="like-prompt">Don't forget to like!</span></span>
					</p>

					<div class="description">
						<p>Test Video Test Video Test Video Test Video Test Video Test
							Video Test Video Test Video TeTest Video Test Video Test Video
							Test Video Test Video st Video</p>
					</div>
				</div>
			</div>

			<div id="video-playlist" class="video-playlist">
				<header class="playlist-title">Up next...</header>

				<!-- HTML 5 allows us to wrap block-level elements in <a> tags. -->

				<a href="/test/resources/sample.mp4" class="next-video"> <img
					src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/197359/caminandes-2.jpg"
					alt="">
					<h3 class="next-video-title">Caminandes: Llama Drama - Short
						Movie</h3>
					<p class="next-video-info">
						By the Blender Foundation <br>01:30 <br> <span
							class="next-video-description">Caminandes is a Creative
							Commons movie made by Pablo Vazquez, Beorn Leonard, and Francesco
							Siddi. Music and Sound by Jan Morgenstern.</span>
					</p>
				</a> <a
					href="https://dl.dropboxusercontent.com/u/57653109/html5video/video3.mp4"
					class="next-video"> <img
					src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/197359/big-buck-bunny.jpg"
					alt="">
					<h3 class="next-video-title">Big Buck Bunny</h3>
					<p class="next-video-info">
						By the Blender Foundation <br>09:57 <br> <span
							class="next-video-description">Big Buck Bunny tells the
							story of a giant rabbit with a heart bigger than himself. When
							one sunny day three rodents rudely harass him, something snaps...
							and the rabbit ain't no bunny anymore! In the typical cartoon
							tradition he prepares the nasty rodents a comical revenge.</span>
					</p>
				</a> <a
					href="https://dl.dropboxusercontent.com/u/57653109/html5video/video4.mp4"
					class="next-video"> <img
					src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/197359/sintel.jpg"
					alt="">
					<h3 class="next-video-title">Sintel - Third Open Movie by
						Blender Foundation</h3>
					<p class="next-video-info">
						By the Blender Foundation <br>14:48<br> <span
							class="next-video-description">"Sintel" is an
							independently produced short film, initiated by the Blender
							Foundation as a means to further improve and validate the
							free/open source 3D creation suite Blender. With initial funding
							provided by 1000s of donations via the internet community, it has
							again proven to be a viable development model for both open 3D
							technology as for independent animation film.</span>
					</p>
				</a> <a
					href="https://dl.dropboxusercontent.com/u/57653109/html5video/video1.mp4"
					class="next-video played-video"> <img
					src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/197359/caminandes-2.jpg"
					alt="">
					<h3 class="next-video-title">Caminandes: Grand Dillama</h3>
					<p class="next-video-info">
						By the Blender Foundation <br>00:00<br> <span
							class="next-video-description">Caminandes: Episode 2 is an
							Open Movie produced by Blender Institute in Amsterdam, the
							Netherlands. You can support the makers and open source projects
							by purchasing the 8 GB USB card with all the movie data and
							tutorials.</span>
					</p>
				</a>
			</div>
		</div>
	</section>
	</main>
</body>
</html>
