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
	src="<c:url value='/resources/js/jquery.min.js'/>"></script>

<script type="text/javascript"
	src="<c:url value='/resources/js/jquery.ajax-cross-origin.min'/>"></script>
</head>


<body>

	<!-- 	<script>
		$(document).ready(function() {
			$.ajax({
				type : 'GET',
				dataType : 'jsonp',
				data : {
					'name' : 'kimyeonsuk'
				},
				url : 'http://www.stoneis.pe.kr/jsonp/jsonpResult.jsp',
				// jsonp 값을 전달할 때 사용되는 파라미터 변수명
				// 이 속성을 생략하면 callback 파라미터 변수명으로 전달된다.
				jsonp : 'stone',
				success : function(json) {
					$('.result').html(json.data.name);
				}
			});
		});
	</script>

	<div class="result"></div> -->

	<video id="example_video_1" class="video-js vjs-default-skin" controls
		preload="auto" width="640" height="264"
		poster="http://vjs.zencdn.net/v/oceans.png"
		data-setup='{
		  "plugins": {
			  "vastClient": {
				"adTagUrl": "http://175.125.132.216:8089/adn/p/in/v1_0/supply/?publisherid=wewdcdvc3048533330000000337383983stv&mediaid=57&medianame=ytn&mediacategory=1&mimes=video+%28mp4&minduration=5&maxduration=100&ua=Mozilla%5C%2F5.0%20(iPhone%3B%20CPU%20iPhone%20OS%206_1_4%20like%20Mac%20OS%20X)%20AppleWebKit%5C%2F536.26%20(KHTML%2C%20like%20Gecko)%20Version%5C%2F6.0%20Mobile%5C%2F10B350%20Safari%5C%2F8536.25&ip=127.0.0.1&os=ios&ifa=e4273e31-97a9-4b29-93a8-8a99f0cea068&startdelay=0",
				"adCancelTimeout": 5000,
				"adsEnabled": true,
				"autoplay": true,
				"crossOrigin": true
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
	</video>
</body>