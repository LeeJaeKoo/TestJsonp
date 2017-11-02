<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>videojs-contrib-ads Demo</title>
<link rel='stylesheet prefetch'
	href='https://vjs.zencdn.net/5-unsafe/video-js.css'>
<link
	href="https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-ads/5.1.0/videojs-contrib-ads.css"
	rel="stylesheet">
</head>
<body>
	<video id="videojs-contrib-ads-player"
		class="video-js vjs-default-skin" controls>
	</video>
	<script src='https://vjs.zencdn.net/5-unsafe/video.js'></script>
	<script src="/test/resources/ad/videojs-contrib-ads.js"></script>

	<script>
		(function(window, videojs) {
			var player = window.player = videojs('videojs-contrib-ads-player');
			player.src("//vjs.zencdn.net/v/oceans.mp4");
			player.ads();

			//���� ��û�ϱ�
			player.on('contentupdate', function() {
				player.trigger('adsready');
			});

			//���� preroll(readyforpreroll), midroll(timeupdate), postroll(contentended) ����
			player.on('contentended', function() {
				console.log("����");
				player.ads.startLinearAdMode();
				player.src('/test/resources/ad.mp4');
				player.one('adended', function() {
					player.ads.endLinearAdMode();
					console.log("��");
				});
			});

		}(window, window.videojs));
	</script>
</body>
</html>
