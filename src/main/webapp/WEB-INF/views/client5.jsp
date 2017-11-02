<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Jsonp test with jquery</title>
<link href="https://vjs.zencdn.net/5.16.0/video-js.css" rel="stylesheet">
<link rel="stylesheet" type="text/css"
	href="https://s3.amazonaws.com/videojs-test/videojs.vast.vpaid.min.css" />
<script src="https://vjs.zencdn.net/5.16.0/video.js"></script>
<script type="text/javascript"
	src="https://s3.amazonaws.com/videojs-test/es5-shim.js"></script>
<script src="https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>
<script type="text/javascript" src="/test/resources/c5/c5.js"></script>
<script src="/test/resources/ad/videojs-contrib-ads.js"></script>
<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>

<style>
.vjs-default-skin .vjs-big-play-button {
	left: 9em;
	top: 3.5em;
}
</style>

</head>

<body>
	<video id="my-video" class="video-js vjs-default-skin" controls
		width="640" height="264"></video>

	<script>
		var tag;
		$(document).ready(function() {
			var videoPlayer = videojs("my-video", {
				controls : true,
				controlBar : {
					muteToggle : false,
				},
				preload : 'auto'
			});

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
				videoPlayer.src("/test/resources/sample.mp4");
				videoPlayer.vastClient({
					//adTagUrl : getAdsUrl,
					adTagXML : requestVASTXML,
					postroll : true,
					adsEnabled : true,
					playAdAlways : true,
					adCancelTimeout : 5000,
					verbosity : 4
				});

			}, 100);
			videoPlayer.on('reset', function() {
				if (videoPlayer.vast.isEnabled()) {
					console.log("hel");
					videoPlayer.vast.enable();
				} else {
					console.log("hel2");
					videoPlayer.vast.disable();
				}

			});

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
</body>
</html>