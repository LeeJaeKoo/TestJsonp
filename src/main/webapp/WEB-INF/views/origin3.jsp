<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Video.js VAST Example</title>

<!--<link href="http://vjs.zencdn.net/4.7.1/video-js.css" rel="stylesheet">-->
<link rel="stylesheet" href="/test/resources/js/video-js.css">
<link rel="stylesheet" href="/test/resources/js/videojs.vast.css">
<link href="/test/resources/js/videojs-contrib-ads/videojs.ads.css"
	rel="stylesheet" type="text/css">
<link href="/test/resources/js/videojs.vast.css" rel="stylesheet"
	type="text/css">
<style>
.example-video-container {
	position: absolute;
	top: 30px;
	left: 50%;
	margin-left: -315px;
}

#vid2 {
	position: absolute;
	top: 30px;
}
</style>
<!--[if lt IE 9]><script src="lib/es5.js"></script><![endif]-->
<!--<script src="http://vjs.zencdn.net/4.7.1/video.js"></script>-->
<script src="/test/resources/js/video.js"></script>
<script src="/test/resources/js/videojs-contrib-ads/videojs.ads.js"></script>

<script src="/test/resources/js/vast-client.js"></script>
<script src="/test/resources/js/videojs.vast.vpaid.js"></script>
</head>
<body>
	<div id="skippable" class="flowplayer"></div>

	<!-- install the player with ima VAST configuration -->
	<script>
		flowplayer(
				"#skippable",
				{
					// configure the VAST plugin for this player
					ima : {
						// adverts configuration
						ads : [ {
							// mandatory: schedule ad time
							// skippable pre-roll
							time : 0,

							// request an advert with an adTag URL
							adTag : "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/48717572/fp-preroll-skippable&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&description_url=https%3A%2F%2Fflowplayer.org&correlator=[timestamp]"
						} ]
					},

					splash : true,
					ratio : 9 / 16,
					clip : {
						sources : [
								{
									type : "application/x-mpegurl",
									src : "//edge.flowplayer.org/FlowplayerHTML5forWordPress.m3u8"
								},
								{
									type : "video/mp4",
									src : "//edge.flowplayer.org/FlowplayerHTML5forWordPress.mp4"
								} ]
					}
				});
	</script>

</body>
</html>