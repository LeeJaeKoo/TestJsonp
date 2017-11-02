<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<head>
<link href="http://vjs.zencdn.net/5.8.8/video-js.css" rel="stylesheet">
<link href="<c:url value='/resources/js/videojs.vast.vpaid.min.css'/>"
	rel="stylesheet">
<!-- If you'd like to support IE8 -->
<script src="http://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>
<link href="http://vjs.zencdn.net/5.4.6/video-js.css" rel="stylesheet">
<script src="http://vjs.zencdn.net/5.4.6/video.js"></script>
<script src="<c:url value='/resources/js/videojs_5.vast.vpaid.min.js'/>"></script>
<script src="<c:url value='/resources/js/ie8fix.js'/>"></script>
<script src="<c:url value='/resources/js/es5-shim.js'/>"></script>

<script type="text/javascript"
	src="<c:url value='/resources/js/jquery-1.6.2.min.js'/>"></script>

</head>


<body>
	<script
		src="//cdnapisec.kaltura.com/p/243342/sp/24334200/embedIframeJs/uiconf_id/13306622/partner_id/243342">
		
	</script>
	<script type="text/javascript"
		src="/test/resources/js/jquery.ajax-cross-origin.min.js"></script>
	<div id="kaltura_player_1504859889587"
		style="width: 400px; height: 330px;" itemprop="video" itemscope
		itemtype="http://schema.org/VideoObject">
		<!-- Search engine metadata, based on schema.org/VideoObject -->
		<span itemprop="description"
			content="The Kaltura player toolkit provides a robust framework for building rich media experinces. Learn more at player.kaltura.com"></span>
		<span itemprop="name" content="Kaltura Player ToolKit"></span> <span
			itemprop="duration" content="114"></span> <span
			itemprop="thumbnailUrl"
			content="http://cfvod.kaltura.com/p/243342/sp/24334200/thumbnail/entry_id/1_sf5ovm7u/version/100011"></span>
		<span itemprop="width" content="400"></span> <span itemprop="height"
			content="330"></span>
	</div>
	<!-- flash 이용 xml 파싱 -->
	<script>
		kWidget
				.embed({
					targetId : "kaltura_player_1504859889587",
					crossOrigin : true,
					wid : "_243342",
					uiconf_id : "13306622",
					entry_id : "1_sf5ovm7u",
					flashvars : {
						"vast" : {
							"prerollUrl" : "http://localhost:8080/test/server/data",
							"numPreroll" : "1",
							"prerollStartWith" : "1",
							"prerollInterval" : "1",
							"preSequence" : "1",
							"numPostroll" : "1",
							"postSequence" : "1",
							"overlayUrl" : "https://loopme.me/api/vast/ads?appId=e18c19fa43&vast=3&uid=1234&ip=8.8.8.8&bundleid=com.loopme&appname=my_talking_pet&sdk=16.2&exchange=admarvel",
							"overlayStartAt" : "20",
							"overlayInterval" : "300",
							"timeout" : "4"
						},
						"adsOnReplay" : true,
						"inlineScript" : false
					}
				})
	</script>

	<div class="result"></div>

	<%-- 	<video id="example_video_1" class="video-js vjs-default-skin" controls
		preload="auto" width="640" height="264"
		poster="http://vjs.zencdn.net/v/oceans.png"
		data-setup='{
		  "plugins": {
			  "vastClient": {
				"adTagUrl": "http://demo.tremorvideo.com/proddev/vast/vast2RegularLinear.xml",
				"adCancelTimeout": 5000,
				"adsEnabled": true,
				"autoplay": true
				}
			  }
		}'>
	<source src="<c:url value='/resources/SampleVideo_1280x720_1mb.mp4'/>"
		type='video/mp4' />
	<p class="vjs-no-js">
		To view this video please enable JavaScript, and consider upgrading to
		a web browser that <a href="http://videojs.com/html5-video-support/"
			target="_blank">supports HTML5 video</a>
	</p>
	</video> --%>
</body>