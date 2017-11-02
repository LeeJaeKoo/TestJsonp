<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>

<!DOCTYPE html>
<html>
<head>

<script src="/test/resources/js/video.js"></script>
<script type="text/javascript"
	src="https://s3.amazonaws.com/videojs-test/es5-shim.js"></script>
<script src="https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>
<script type="text/javascript"
	src="https://s3.amazonaws.com/videojs-test/videojs_5.vast.vpaid.min.js"></script>
<script type="text/javascript"
	src="/test/resources/js/jquery-1.6.2.min.js"></script>
</head>
<body>

	<div class="media-wrapper">
		<video id="my-player1" width="640" height="360"
			style="max-width: 100%;"
			poster="http://www.mediaelementjs.com/images/big_buck_bunny.jpg"
			preload="none" controls playsinline webkit-playsinline>
			<source
				src="https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4"
				type="video/mp4">
		</video>
	</div>


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

				var videoPlayer = videojs("my-player1", {
					controls : true,
					controlBar : {
						muteToggle : false,
					},
					preload : 'auto',
					loop : true

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
	<script src="/test/resources/build/mediaelement-and-player.js"></script>


</body>